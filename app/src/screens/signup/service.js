import firebase from "firebase";

import { onSuccess, onError } from '../../shared/utils/notifications'
import appsettings from '../../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const db = firebase.database();
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const signup = (user, navigation, setInprogress) => {
    setInprogress(true);
    firebase.auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(response => { 
            setInprogress(false);
            updateDetails(user, navigation);

            const uid = response.user.email.replace(/[^0-9a-z]/gi, '');
            db.ref('users').child(uid).set({
                ...user, 
                id: uid,
                uid: response.user.uid,
                password: "*********",
                createdAt: Date.now()
            });
        },
        error => {
            setInprogress(false);
            onError(error.message);
        }
    );
}

const updateDetails = (user, navigation) => { 
    firebase.auth().currentUser.updateProfile({
        photoURL: user.avatar,
        displayName: user.name
    }).then(function () {
        onSuccess('Welcome '+ user.name)
        navigation.navigate('Home')
    }, function (error) {
        onError(error);
    });
}

export const validation = user => {
    if(!user.name || user.name === '') {
        onError('Enter name.');
        return false;
    }
    if(!user.email || user.email == '') {
        onError('Enter email.');
        return false;
    }
    if (!user.email.match(mailFormat)){
        onError("You have entered an invalid email address!")
        return false
   }
    if(!user.city || user.city == '') {
        onError('Enter city.');
        return false;
    }
    if(!user.password || user.password == '') {
        onError('Enter password.');
        return false;
    }

    return true
}
