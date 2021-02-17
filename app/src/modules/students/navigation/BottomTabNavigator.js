import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {  createStackNavigator } from 'react-navigation-stack';

import TabBarIcon from '../shared/components/TabBarIcon';
import { Header } from '../shared/components';
import { materialTheme } from '../shared/constants'

import { FeedsList, AddPost, PostComments } from '../screens/feedsStack'
import { StudentsList, StudentsView } from '../screens/studentsStack';
import { ProfileView } from '../screens/profileStack';
import { CoursesList, CoursesAdd, CoursesView, AddStudent, CoursesChat } from '../screens/coursesStack';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const FeedsStack = createStackNavigator({
  Posts: {
    screen: FeedsList,
    navigationOptions: ({ navigation }) => ({
      header: <Header title={'CS Institute'} navigation={navigation} />,
      headerTransparent: false,
    })
  },
  AddPost: {
    screen: AddPost,
    navigationOptions: ({ navigation }) => ({
      header: <Header title={"What's on your mind ?"} back navigation={navigation} />,
      headerTransparent: false,
    })
  },
  PostComments: {
    screen: PostComments,
    navigationOptions: ({ navigation }) => ({
      header: <Header title={'Comments'} back navigation={navigation} />,
      headerTransparent: false,
    })
  },
}, {
  cardStyle: { backgroundColor: 'white', },
  config,
});

const StudentsStack = createStackNavigator({
  Students: {
    screen: StudentsList,
    navigationOptions: ({ navigation }) => ({
      header: <Header search title="Students" navigation={navigation} />,
      headerTransparent: false,
    })
  },
  View: {
    screen: StudentsView,
    navigationOptions: ({ navigation }) => ({
      header: <Header white back transparent navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: 'white', },
  config,
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileView,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
  cardStyle: { backgroundColor: '#EEEEEE', },
  config,
});

const CoursesStack = createStackNavigator({
  Courses: {
    screen: CoursesList,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Courses" navigation={navigation} />,
      headerTransparent: false,
    })
  },
  ViewCourse: {
    screen: CoursesView,
    navigationOptions: ({ navigation }) => ({
      header: <Header back black title="Course" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  AddCourse: {
    screen: CoursesAdd,
    navigationOptions: ({ navigation }) => ({
      header: <Header back black title="Add Course" navigation={navigation} />,
      headerTransparent: false,
    })
  },
  CourseChat: {
    screen: CoursesChat,
    navigationOptions: ({ navigation }) => ({
      header: <Header back black title={'Chat'} navigation={navigation} />,
      headerTransparent: false,
    })
  },
  AddStudent: {
    screen: AddStudent,
    navigationOptions: ({ navigation }) => ({
      header: <Header back black search title="AddStudent" navigation={navigation} />,
      headerTransparent: false,
    })
  },

}, {
  cardStyle: { backgroundColor: 'white', },
  config,
});

const tabNavigator = createBottomTabNavigator({
  Posts: {
    screen: FeedsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={'home'} />
      ),
      tabBarOptions: { activeTintColor: materialTheme.COLORS.PRIMARY }
    }
  },
  Students: {
    screen: StudentsStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={'graduation'} />
      ),
      tabBarOptions: { activeTintColor: materialTheme.COLORS.PRIMARY }
    }
  },
  Courses: {
    screen: CoursesStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={'notebook'} />
      ),
      tabBarOptions: { activeTintColor: materialTheme.COLORS.PRIMARY }
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} name={'user'} />
      ),
      tabBarOptions: { activeTintColor: materialTheme.COLORS.PRIMARY }
    }
  },
});

export default tabNavigator;
