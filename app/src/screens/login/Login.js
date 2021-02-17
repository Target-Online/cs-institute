import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import firebase from "firebase";

import { materialTheme } from '../../shared/constants';
import { pushNotifications } from '../../shared/utils';
import { Icon } from '../../shared/components';
import { login, validation } from './service';
import { UsersContext } from '../../root/store'
import appsettings from '../../../appsettings.json'

if (!firebase.apps.length) firebase.initializeApp(appsettings.firebaseConfig);

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function Login (props) {
  const { navigation } = props;
  const [users] = useContext(UsersContext);
  const [inProgress, setInprogress] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => firebase.auth().signOut(), [])

  return (
    <Block style={styles.group}>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Input
          right
          placeholder="email"
          color={materialTheme.COLORS.PRIMARY}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
          iconContent={<Icon size={16} color={theme.COLORS.ICON} name="envelope-o" family="font-awesome" />}
          onChangeText={value => setUser({
            ...user,
            email: value
          })}
        />
      </Block>
      <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
        <Input
          right
          password viewPass
          placeholder="password"
          color={materialTheme.COLORS.PRIMARY}
          placeholderTextColor={materialTheme.COLORS.DEFAULT}
          style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
          onChangeText={value => setUser({
            ...user,
            password: value
          })}
        />
      </Block>
      <Block center >
        <Button
          shadowless
          isDisabled={inProgress}
          color={materialTheme.COLORS.PRIMARY}
          style={[styles.button, styles.shadow]}
          onPress={() => {
            if (validation(user)) {
              login(user, setUser, navigation, setInprogress);
              
              var _user = users.data.find(u => u.email == user.email);
 
              !user && pushNotifications.sendPushNotifications(
                users.data,
                "Now Online!",
                _user.name
              )
            }
          }}>
          {inProgress ? <ActivityIndicator size="small" color="#00ff00" /> : 'Login'}
        </Button>
        <Text
          size={12}
          color={materialTheme.COLORS.PRIMARY}
          onPress={() => !inProgress && navigation.navigate('Signup')}>
          Create account
        </Text>
      </Block>
    </Block>
  )
}

const styles = StyleSheet.create({
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
    marginTop: height / 10
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
  },
  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO,
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS,
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING,
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});