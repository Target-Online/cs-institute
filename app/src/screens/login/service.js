import firebase from "firebase";

import { onSuccess, onError } from '../../shared/utils/notifications'
import appsettings from '../../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

export const login = (user, setUser, navigation, setInprogress) => {
    setInprogress(true);
    firebase.auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(function (response) {
        setInprogress(false);
        setUser({
            ...user,
            isConnected: true
        })
        onSuccess('Welcome '+ response.user.displayName)
        navigation.navigate('Home')
    }, function (error) {
        setInprogress(false);
        onError(error.message);
    });
}

export const validation = user => {
    if(!user.email || user.email == '') {
        onError('Enter email.');
        return false;
    }
    if(!user.password || user.password == '') {
        onError('Enter password.');
        return false;
    }
    return true
}
