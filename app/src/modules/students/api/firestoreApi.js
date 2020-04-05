import firebase from "firebase";

import { onError } from '../shared/utils/notifications'
import appsettings from '../../../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const db = firebase.firestore();

export const getDocument = (
    collection,
    fsdocument,
    setDocument,
    setInProgress
) => {
    const collectionRef = db.collection(collection).doc(fsdocument);

    setInProgress(true);

    collectionRef.get()
        .then(doc => {
            if (!doc.exists) {
                onError(fsdocument + ' does not exist');
                setInProgress(false);
            }

            else {
                setDocument(doc.data())
            }

            setInProgress(false);
        })
        .catch(error => {
            error('Error getting document', error);
            setInProgress(false);
        });
}

export const getCollection = (
    collection,
    setInProgress,
    setCollection
) => {
    db.collection(collection)
        .get()
        .then(querySnapshot => {
            setCollection(querySnapshot.docs.map(doc => doc.data()))
            setInProgress(false)
        }).catch(error => {
            error('Error getting document', error);
            setInProgress(false)
        });
}

export const collectionObserver = (
    collectionId,
    setChange
) => {
    db.collection(collectionId)
        .onSnapshot(function (querySnapshot) {
            querySnapshot.docChanges().forEach(change => {
                if (!change.doc._fromCache) {
                    const modified = change.doc.data();
                    if (change.type === 'added') {
                    }
                    if (change.type === 'modified') {
                        setChange(modified)
                    }
                    if (change.type === 'removed') {
                        setChange(modified)
                    }
                }
            });
        });
}