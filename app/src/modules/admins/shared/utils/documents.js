import firebase from 'firebase';
import * as DocumentPicker from 'expo-document-picker';

import { realTimedbApi } from '../../api';
import { onError } from '../../../../shared/utils/notifications'
import appsettings from '../../../../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.adminFirebaseConfig);

const uri2Blob = async uri => await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  }); 

const getResourceUrl = async (uri, location) => {
  var ref = firebase.storage().ref().child(location);
  var snapshot = await ref.put(await uri2Blob(uri));

  return snapshot.ref.getDownloadURL();
}

export const _documentPicker = async (
  parentId,
  dispath
 ) => {
    dispath({ type: 'setInProgress', inProgress: true });

    const result = await DocumentPicker.getDocumentAsync({});
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    if (result.type != "cancel") {
        if (result.name.split('.')[1] != 'pdf') {
            onError('Incorrect file type, pdf only allowed.');
        }
        else {
            realTimedbApi.setData('documents', {
                name: result.name.split('.')[0],
                url: await getResourceUrl(result.uri, appsettings.environment + "/documents/" + id),
                parentId: parentId
            });
        }
    }
    dispath({ type: 'setInProgress', inProgress: false });
}

export default _documentPicker;