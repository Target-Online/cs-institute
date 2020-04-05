import "firebase/firestore";

import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { height  } = Dimensions.get('screen');

export const Spinner = ({ inProgress, children }) => (
    <ScrollView >
      {inProgress 
        ? <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
        : children
      }
    </ScrollView>
  );

const styles = StyleSheet.create({
    activityIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       height: height / 2
    }
 })

export default Spinner

