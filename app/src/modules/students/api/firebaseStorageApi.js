import firebase from 'firebase';

import appsettings from '../../../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

export const getFolderImages = async (images, folder) => {
    var listRef = firebase.storage().ref().child(folder);
  
    listRef.listAll().then(res => {
      res.items.map(imageRef => imageRef.getDownloadURL().then(url =>
        images.push(url)
      ))
    }).catch(function (error) {
      // Uh-oh, an error occurred!
    });
  }

export default getFolderImages;