import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme } from "galio-framework";

import Icon from './Icon';
import materialTheme from '../constants/Theme';
import { UserContext } from '../../root/store';
import { Filter } from '../components'

const proScreens = ['Kids', 'New Collection', 'Sign In', 'Sign Up'];

export const DrawerItem = ({ focused, title }) => {
  const [user] = useContext(UserContext)

  renderIcon = () => {
    switch (title) {
      case 'Login':
        return (
          <Icon
            size={16}
            name="user-o"
            family="font-awesome"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Home':
        return (
          <Icon
            size={16}
            name="shop"
            family="GalioExtra"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Students':
        return (
          <Icon
            size={16}
            name="graduation-cap"
            family="font-awesome"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Admins':
        return (
          <Icon
            size={16}
            name="carryout"
            family="AntDesign"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Profile':
        return (
          <Icon
            size={16}
            name="circle-10"
            family="GalioExtra"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Settings':
        return (
          <Icon
            size={16}
            name="gears"
            family="font-awesome"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'ChatRoom':
        return (
          <Icon
            size={16}
            name="chat-33"
            family="GalioExtra"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      default:
        return null;
    }
  }

  renderLabel = () => {
    if (proScreens.includes(title)) {
      return (
        <Block middle style={styles.pro}>
          <Text size={12} color="white">Admin</Text>
        </Block>
      )
    }

    return null;
  }

  const proScreen = proScreens.includes(title);
  const isAdmin = user && user.isAdmin;

  return (
    <Filter hide={title == 'Admins' && !isAdmin}>
        <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}>
          <Block middle flex={0.1} style={{ marginRight: 28 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text size={18} color={focused ? 'white' : proScreen ? materialTheme.COLORS.MUTED : 'black'}>
              {title == 'Login' && user ? 'Logout' : title}
            </Text>
            {this.renderLabel()}
          </Block>
        </Block>
    </Filter>
  );
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.PRIMARY,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
})