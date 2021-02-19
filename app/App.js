console.disableYellowBox = true;

//import 'firebase/firestore'
import { Platform, StatusBar, Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Block, GalioProvider } from 'galio-framework';
import { decode, encode } from 'base-64';

//import AppContainer from './navigation/Screens';
import AppContainer from './src/navigation/DrawerNavigator';
import { materialTheme } from './constants';
import Store from './src/root/store';
import StudentsStore from './src/modules/students/root/store';
import AdminsStore from './src/modules/admins/root';

global.crypto = require("@firebase/firestore");
global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

if (!global.btoa) { global.btoa = encode; }

if (!global.atob) { global.atob = decode; }


export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <GalioProvider theme={materialTheme}>
        <Block flex>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Store>
            <StudentsStore>
              <AdminsStore>
                <AppContainer />
              </AdminsStore>
            </StudentsStore>
          </Store>
        </Block>
      </GalioProvider>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      //'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      //'amaticsc': require('./assets/fonts/AmaticSC-Regular.ttf'),
      //'caviardreams_italic': require('./assets/fonts/CaviarDreams_Italic.ttf')//UniSansDemo
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
