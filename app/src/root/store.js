import React, { useState, useReducer, useEffect } from 'react'
import firebase from "firebase";

import { realTimedbApi } from '../api';
import appsettings from '../../appsettings.json'
import { pushNotifications, rootReducer } from '../shared/utils';

export const UserContext = React.createContext()
export const UsersContext = React.createContext()

const initalState = {
	data: [],
	search: '',
	inProgress: true
}

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const Store = ({ children }) => {
	const [currentUser, setUser] = useState()
	const [users, dispatchUsers] = useReducer(rootReducer.setStateReducer, initalState)

	useEffect(() => {
		realTimedbApi.getCollection('users', dispatchUsers);

		firebase.auth().onAuthStateChanged(user => {
			if(user){
				const userId = user.email.replace(/[^0-9a-z]/gi, '')
				realTimedbApi.getData('users', userId, setUser);
				pushNotifications.registerForPushNotificationsAsync(userId)
			}
		});

		return () => {}
	}, []);

	return (
		<UserContext.Provider value={[currentUser, setUser]}>
			<UsersContext.Provider value={[users, dispatchUsers]}>
				{children}
			</UsersContext.Provider>
		</UserContext.Provider>
	);
};
export default Store;