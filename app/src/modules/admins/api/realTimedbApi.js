import firebase from "firebase";
import { O2A } from 'object-to-array-convert';

import { onError } from '../../../shared/utils/notifications'
import appsettings from '../../../../appsettings.json'
import { secretApi } from ".";

var targetOnline_db = firebase.initializeApp(appsettings.adminFirebaseConfig, "secondary");

const db = targetOnline_db.database();

export const getCollection = (
    ref,
    dispatch
) => db.ref(ref).on("value", data => {
    data.val() && dispatch({ type: 'setData', data: O2A(data) });
    dispatch({ type: 'setInProgress', inProgress: false });
}, error => {
    onError('Error getting document', error);
    dispatch({ type: 'setInProgress', inProgress: false })
});

export const setData = (ref, data) => {
    var id = firebase.database().ref().child(ref).push().key;

    db.ref(ref).child(id).set({
        ...data,
        id: id,
        createdAt: Date.now()
    })
}

export const getData = (ref, id, setData) => db.ref(ref).child(id).on("value", data => setData(data.val()));

export const updateData = (ref, id, data) => db.ref(ref).child(id).update({ ...data })

export const login = user => secretApi.login(db, user)