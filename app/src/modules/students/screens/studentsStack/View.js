import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Platform } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { UserContext } from '../../../../root/store';

import { imageUtils } from '../../../../shared/utils';
import { Images } from '../../../../shared/constants';
import { onInfo } from '../../shared/utils/notifications';
import { utils, materialTheme } from '../../shared/constants';
import { HeaderHeight } from "../../shared/constants/utils";
import { Spinner } from '../../../../shared/components';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function View (props) {
    const [currentUser, setUser] = useContext(UserContext);
    const { student } = props.navigation.state.params;
    const [avatarUpdate, setAavatarStatus] = useState(false);
    const [image, setImage] = useState(student.avatar);

    const updateProfile = () => {
        if (student.id == currentUser.id || currentUser.isAdmin) {
            imageUtils._pickUserAvatar(setImage, currentUser, setAavatarStatus)
        }
    }

    useEffect(() => {
        if (currentUser) {
            if (student.avatar == '' && currentUser.id == student.id)
                onInfo('Update your profile image.');
        }
        else props.navigation.navigate('Login');
    }, []);

    return (
        <Block flex style={styles.profile}>
            <Block flex>
                <TouchableOpacity onPress={() => updateProfile()}>
                    <Spinner childStyles={{ marginTop: 100 }} inProgress={avatarUpdate}>
                        <ImageBackground
                            source={image == '' ? Images.user : { uri: image }}
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
                            {student.name}
                        </Text>
                        <Text center muted size={12}>
                            {student.email}
                        </Text>
                    </Block>
                    <Block style={styles.title}>
                        <Text center size={12}>
                            {student.city}
                        </Text>
                    </Block>
                    <Block style={styles.title}>
                        <Text center size={12}>
                            {student['suburb/township']}
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
