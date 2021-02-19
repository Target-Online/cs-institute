import React, { useContext } from 'react';
import { DrawerItems } from 'react-navigation';
import { TouchableWithoutFeedback, ScrollView, StyleSheet, Dimensions, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import firebase from "firebase";

import appsettings from '../../appsettings.json'
import { materialTheme } from "../shared/constants";
import { UserContext } from '../root/store';

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const { width, height } = Dimensions.get('screen');

const Drawer = props => {
  const [currentUser] = useContext(UserContext)
  const redirect = currentUser ? 'Profile' : 'Login'

  return (
  <Block style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
    <Block flex={0.2} style={styles.header}>
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate(redirect)} >
        <Block style={styles.profile}>
          <Image source={{ uri: currentUser && currentUser.avatar != '' ? currentUser.avatar : profile.avatar}} style={styles.avatar} />
          <Text h5 color="white">{currentUser ? currentUser.name : profile.name}</Text>
        </Block>
      </TouchableWithoutFeedback>
    </Block>
    <Block flex>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        <DrawerItems {...props} />
      </ScrollView>
    </Block>
    <Block>
      <Text center style={{ paddingBottom: 100 }}> Version: {appsettings.version} </Text>
    </Block>
  </Block>
)};

const profile = {
  avatar: 'https://i.stack.imgur.com/l60Hf.png',
  name: 'Hi! Visitor'
};

const Menu = {
  contentComponent: props => <Drawer {...props} profile={profile} />,
  drawerBackgroundColor: 'white',
  drawerWidth: width * 0.8,
  contentOptions: {
    activeTintColor: 'white',
    inactiveTintColor: '#000',
    activeBackgroundColor: 'transparent',
    itemStyle: {
      width: width * 0.75,
      backgroundColor: 'transparent',
    },
    labelStyle: {
      fontSize: 18,
      marginLeft: 12,
      fontWeight: 'normal',
    },
    itemsContainerStyle: {
      paddingVertical: 16,
      paddingHorizonal: 12,
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: materialTheme.COLORS.PRIMARY,
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 2,
    justifyContent: 'center',
  },
  footer: {
    paddingHorizontal: 28,
    justifyContent: 'flex-end'
  },
  profile: {
    marginBottom: theme.SIZES.BASE / 2,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE,
    resizeMode: height < 650 ? 'contain' : 'cover'
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: 8,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: 16,
  }
});

export default Menu;
