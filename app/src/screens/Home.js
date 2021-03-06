import React, { useContext, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Block, theme } from 'galio-framework';

import { ImagesSlider, Product } from '../shared/components';
import { materialTheme } from '../shared/constants';
import { HeaderHeight } from "../../constants/utils";
import { UserContext, UsersContext } from '../root/store';
import { onInfo } from '../shared/utils/notifications'
import { getRemoteConfig } from '../api/realTimedbApi';
import OutOfService from './out-of-service'

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

const options = [
  {
    title: 'Students',
    image: require('../shared/assets/images/grad.png'),
    horizontal: true
  },
  {
    title: 'Admins',
    image: require('../shared/assets/images/teacher.png'),
    horizontal: true
  }
];

export default function Home(props) {
  const { navigation } = props;
  const [users] = useContext(UsersContext);
  const [currentUser] = useContext(UserContext)
  const isAdmin = currentUser && currentUser.isAdmin;
  const [modalVisible, setModalVisible] = useState(false);
  const [remoteConfig, setRemoteConfig] = useState({})

  React.useEffect(() => {
    async function fetchData() {
      return await getRemoteConfig('remote-config', setRemoteConfig);
    }
    fetchData();
  }, [])

  React.useEffect(() => {
    if (remoteConfig.isOutOfService) setModalVisible(true)
  }, [remoteConfig])

  return (
    <Block flex style={styles.profile}>
      <Block flex >
        <ImagesSlider />
      </Block>
      <Block flex style={styles.options}>
        <ScrollView showsVerticalScrollIndicator={true}>
          <TouchableOpacity onPress={() => !users.inProgress && navigation.navigate('Students')}>
            <Product product={options[0]} horizontal inProgress={users.inProgress} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => !users.inProgress && (isAdmin ? navigation.navigate('Admins') : onInfo('No access.'))}>
            <Product product={options[1]} horizontal inProgress={users.inProgress} />
          </TouchableOpacity>
        </ScrollView>
      </Block>
      {modalVisible && (
        <OutOfService
          isVisible={modalVisible}
          setVisible={setModalVisible}
        />
      )}
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    marginBottom: Platform.OS === 'android' ? -HeaderHeight : -HeaderHeight * 3.5,
  },
  profileImage: {
    width: width * 1.1,
    height: 'auto',
  },
  profileContainer: {
    width: width,
    height: height / 2,
  },
  profileDetails: {
    paddingTop: theme.SIZES.BASE * 4,
    justifyContent: 'flex-end',
    position: 'relative',
  },
  profileTexts: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE * 2,
    zIndex: 2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginRight: theme.SIZES.BASE / 2,
    borderRadius: 4,
    height: 19,
    width: 38,
  },
  seller: {
    marginRight: theme.SIZES.BASE / 2,
  },
  options: {
    position: 'relative',
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: height > 700 ? height > 900 ? 0 : -55 : -55,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    backgroundColor: 'transparent'
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  gradient: {
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: 0,
    height: '30%',
    position: 'absolute',
  }
});
