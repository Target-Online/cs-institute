import React from 'react';
import { ScrollView } from 'react-native';

export const Filter = ({hide, children}) => (
    <ScrollView>
      {hide 
        ? null
        : children
      }
    </ScrollView>
);

export default Filter