import React from 'react';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import Theme from '../constants/Theme';

export default function TabBarIcon(props) {
  return (
    <SimpleLineIcons
      name={props.name}
      size={26}
      style={{ marginBottom: -3 }}
      color={props.focused ? Theme.COLORS.PRIMARY : Theme.COLORS.DEFAULT}
    />
  );
}
