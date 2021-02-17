import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { UserContext } from '../../../../root/store';

import { imageUtils } from '../../../../shared/utils';
import { Images } from '../../../../shared/constants';
import { onInfo } from '../../shared/utils/notifications';
import { materialTheme } from '../../shared/constants';
import { HeaderHeight } from "../../shared/constants/utils";
import { Spinner } from '../../../../shared/components';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function View (props) {
    const [currentUser] = useContext(UserContext);
    const [image, setImage] = useState(currentUser && currentUser.avatar);
    const [avatarUpdate, setAvatarStatus] = useState(false);

    useEffect(() => {
        if (currentUser && currentUser.avatar == '') onInfo('Update your profile image.');
        if (!currentUser) props.navigation.navigate('Login');
    }, []);

    return (
        <Block flex style={styles.profile}>
            <Block flex>
                <TouchableOpacity onPress={() => imageUtils._pickUserAvatar(setImage, currentUser, setAvatarStatus)}>
                    <Spinner inProgress={avatarUpdate}>
                        <ImageBackground
                            source={image ? { uri: image } : Images.user}
                            style={styles.profileContainer}
                            imageStyle={styles.profileImage}>
                            <Block flex style={styles.profileDetails}>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                            </Block>
                        </ImageBackground>
                    </Spinner>
                </TouchableOpacity>
            </Block>
            <Block flex style={styles.options}>
                <ScrollView showsVerticalScrollIndicator={true}>
                    <Block style={styles.title}>
                        <Text bold center size={theme.SIZES.BASE} style={{ paddingBottom: 5 }}>
                            {currentUser && currentUser.name}
                        </Text>
                        <Text center muted size={12}>
                            {currentUser && currentUser.email}
                        </Text>
                    </Block>
                    <Block style={styles.title}>
                        <Text center size={12}>
                            {currentUser && currentUser.city}
                        </Text>
                    </Block>
                    <Block style={styles.title}>
                        <Text center size={12}>
                            {currentUser && currentUser['suburb/township']}
                        </Text>
                    </Block>
                </ScrollView>
            </Block>
        </Block>
    );
}

const styles = StyleSheet.create({
    profile: {
        marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
        marginBottom: -HeaderHeight * 2,
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
        marginTop: -theme.SIZES.BASE * 7,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        backgroundColor: theme.COLORS.WHITE,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0 },
        shadowRadius: 8,
        shadowOpacity: 0.2,
        zIndex: 2,
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
    },
    settings: {
        paddingVertical: theme.SIZES.BASE / 3,
    },
    title: {
        paddingTop: theme.SIZES.BASE,
        paddingBottom: theme.SIZES.BASE / 2,
    },
    rows: {
        height: theme.SIZES.BASE * 2,
        paddingHorizontal: theme.SIZES.BASE,
        marginBottom: theme.SIZES.BASE / 2,
    }
});