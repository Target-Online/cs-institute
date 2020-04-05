import "firebase/firestore";

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Dimensions } from 'react-native';

import { firestoreApi } from '../../api';

const { height } = Dimensions.get('screen');

export const FeatureToggle = ({ description, children }) => {
  const [feature, setFeature] = useState({ isEnabled: false })
  const [inProgress, setInProgress] = useState(true);

  useEffect(() =>
   firestoreApi.getDocument('features', description, setFeature, setInProgress)
  , [])

  return(
    <ScrollView>
      {inProgress 
        ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
        : feature.isEnabled == true && children
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activityIndicator: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     minHeight: 114
  }
})

export default FeatureToggle