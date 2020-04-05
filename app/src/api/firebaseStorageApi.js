import firebase from 'firebase';

import appsettings from '../../appsettings.json'
import { Images } from '../shared/constants/index.js';

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

export const getFolderImages = async (
  folder,
  images,
  setInProgress
) => {
    var listRef = firebase.storage().ref().child(folder);
    listRef.listAll().then(res =>
      res.items.map(imageRef => imageRef.getDownloadURL().then(url => {
        images.push(url);
      }))
    ).catch(error => {
       console.log('error', error.message)
    });
    setInProgress(false)
  }

export default getFolderImages;