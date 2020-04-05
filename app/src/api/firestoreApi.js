import firebase from "firebase";

import { onError, onSuccess } from '../shared/utils/notifications'
import appsettings from '../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const db = firebase.firestore();

export const getDocument = (
    collection,
    documentId,
    setDocument,
) => {
    db.collection(collection)
        .doc(documentId)
        .get()
        .then(doc => {
            if (!doc.exists) {
                onError(fsdocument + ' does not exist');
                console.log(fsdocument + ' does not exist')
            }
            else setDocument(doc.data())
        })
        .catch(err => {
            error('Error getting document', err);
            console.log('Error getting document', err)
        });
}

export const addDocument = (collection, id, data, navigation, navigateTo) => {
    db.collection(collection)
        .doc(id)
        .set({
            ...data,
            id: id,
            createdAt: Date.now()
        })
    navigation.navigate(navigateTo)
}

export const setDocument = (collection, id, data) => {
    db.collection(collection)
        .doc(id)
        .set({
            ...data,
            id: id,
            createdAt: Date.now()
        })
}

export const plusDocument = (collection, id, data) => {
    db.collection(collection)
        .doc(id)
        .set({
            ...data,
            id: id,
            createdAt: Date.now()
        })
}


export const overWriteDocument = (
    collection,
    data,
) => {
    const documentRef = db.collection(collection).doc(data.userId)
    documentRef.get().then(() => documentRef.set({
        ...data,
        createdAt: Date.now()
    }));
}

export const addSecton2Document = (collection1Id, documentId, collection2Id, dataId, navigation) => {
    db.collection(collection1Id)
        .doc(documentId)
        .collection(collection2Id)
        .doc(dataId)
        .set({ id: dataId })

    navigation.goBack()
}

export const updateDocument = (collection, documentId, data) => {
    db.collection(collection)
        .doc(documentId)
        .update({ ...data });
}

export const updateAuthUser = async data => {
    firebase
        .auth()
        .currentUser
        .updateProfile({
            ...data
        }).then(function () {
            onSuccess('Profile updated!')
        }, function (error) {
            onError(error.message);
        });
}

export const getCollection = (
    collectionRef,
    dispatch
) => db.collection(collectionRef)
    .get()
    .then(querySnapshot => {
        dispatch({ type: 'setData', data: querySnapshot.docs.map(doc => doc.data()) });
        dispatch({ type: 'setInProgress', inProgress: false });
    }).catch(error => {
        error('Error getting document', error);
        dispatch({ type: 'setInProgress', inProgress: false })
    });

export const collectionObserver = (
    collectionRef,
    dispatch
) => {
    db.collection(collectionRef).onSnapshot(querySnapshot => {
        querySnapshot.docChanges()
        .forEach(change => {
            const doc = change.doc.data();
            if (change.type === 'added') dispatch({ type: 'added', doc: doc })

            if (change.type === 'modified') dispatch({ type: 'modified', doc: doc })

            if (change.type === 'removed') dispatch({ type: 'removed', doc: doc })
        });
    });

}

export const getDocumentCollection = (
    collectionId,
    documentId,
    collection2Id,
    collection3Id,
    setInProgress,
    setCollection
) => {
    var references = [];
    db.collection(collectionId)
        .doc(documentId)
        .collection(collection2Id)
        .get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                references.push(doc.data().id);
            });
        }).then(() => {
            db.collection(collection3Id)
                .where('id', 'in', references)
                .get()
                .then(querySnapshot => {
                    setCollection(querySnapshot.docs.map(doc => doc.data()))
                })
        });
    setInProgress(false);
}