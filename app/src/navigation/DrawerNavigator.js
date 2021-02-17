import React from 'react';
import { Easing, Animated } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {  createDrawerNavigator } from 'react-navigation-drawer';
import {  createStackNavigator } from 'react-navigation-stack';

import { Block, Text } from "galio-framework";

import { StudentsModule, AdminsModule, AddAdmin, ViewAdmin, ChatAdmin } from '../modules'
import { HomeScreen, LoginScreen, SignupScreen, ChatRoomScreen } from '../screens';
import ProfileScreen from '../screens/Profile';
import Menu from './Menu';
import { Drawer, Header } from '../shared/components';
import appsettings from '../../appsettings.json'

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  transitionConfig,
});

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header black title={appsettings.appName} navigation={navigation} />,
      headerTransparent: true,
    })
  },
  ChatRoom: {
    screen: ChatRoomScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="ChatRoom" navigation={navigation} />,
    })
  },
},
{
  cardStyle: { 
    backgroundColor: 'white', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const AdminStack = createStackNavigator({
  Admin: {
    screen: AdminsModule,
    navigationOptions: ({ navigation }) => ({
      header: <Header black navigation={navigation} title={appsettings.appName} />,
      headerTransparent: true,
    })
  },
  AddAdmin: {
    screen: AddAdmin,
    navigationOptions: ({ navigation }) => ({
      header: <Header search black back navigation={navigation} title="Add Admin" />,
      headerTransparent: false,
    })
  },
  ViewAdmin: {
    screen: ViewAdmin,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent back navigation={navigation} />,
      headerTransparent: true,
    })
  },
  ChatAdmin: {
    screen: ChatAdmin,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="Chat" black navigation={navigation} />,
      headerTransparent: false
    })
  }
},
{
  cardStyle: { 
    backgroundColor: 'white', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const LoginStack = createStackNavigator({
    Login: {
      screen: LoginScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header transparent black title="Login" navigation={navigation} />,
      })
    },
    Signup: {
      screen: SignupScreen,
      navigationOptions: ({ navigation }) => ({
        header: <Header black back title="Signup" navigation={navigation} />,
        headerTransparent: false
      })
    },
  },
  {
    cardStyle: { 
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
});

const AppStack = createDrawerNavigator(
  { 
    Home: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Home" title='Home' />
        )
      }
    },
    Students: {
      screen: StudentsModule,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer back focused={focused} screen="Students" title="Students" />
        ),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({focused}) => (
          <Drawer focused={focused} title="Profile" />
        ),
      }),
    },
    Admins: {
      screen: AdminStack,
        navigationOptions: (navOpt) => ({
          drawerLabel: ({focused}) => (
            <Drawer focused={focused} screen="Admins" title="Admins" />
          ),
        }),
    },
    Login: {
      screen: LoginStack,
      navigationOptions: {
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Login" title="Login"/>
        )
      }
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{marginVertical: 8}}><Text>{` `}</Text></Block>,
      },
    },
  },
  Menu,
  
);

const AppContainer = createAppContainer(AppStack);

export default AppContainer;