import firebase from "firebase";
import { O2A } from "object-to-array-convert";

import appsettings from "appsettings.json";

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const db = firebase.database();
const fs_db = firebase.firestore();

export const sendEmail = email => {
  var id = fs_db.collection("mail").doc().id;
  fs_db
    .collection("mail")
    .doc(id)
    .set({
      to: appsettings.sendToEmail,
      message: {
        subject: "Name: " + email.name + " Email: " + email.email,
        text: email.message
      }
    });
};

export const getCollection = (ref, dispatch) =>
  db.ref(ref).on(
    "value",
    data => {
      data.val() && dispatch({ type: "setData", data: O2A(data) });
      dispatch({ type: "setInProgress", inProgress: false });
    },
    error => {
      console.log("Error getting document", error);
      dispatch({ type: "setInProgress", inProgress: false });
    }
  );

export const setData = (ref, data) => {
  var id = firebase
    .database()
    .ref()
    .child(ref)
    .push().key;

  db.ref(ref)
    .child(id)
    .set({
      ...data,
      id: id,
      createdAt: Date.now()
    });
};

export const getData = (ref, id, setData) =>
  db
    .ref(ref)
    .child(id)
    .on("value", data => setData(data.val()));

export const updateData = (ref, id, data) =>
  db
    .ref(ref)
    .child(id)
    .update({ ...data });

export const updateAuthUser = async data =>
  firebase.auth().currentUser.updateProfile({
    ...data
  });
