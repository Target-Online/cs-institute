import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/colors';

export default function TabBarIcon(props) {
  return (
    <FontAwesome
      name={props.name}
      size={props.size ? props.size : 26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
