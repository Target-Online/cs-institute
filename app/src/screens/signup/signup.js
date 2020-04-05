import React, { useState, useContext } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView, Image, ImageBackground, Platform } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { materialTheme, utils, Images } from '../../shared/constants';
import { imageUtils, pushNotifications } from '../../shared/utils';
import { Icon, Spinner } from '../../shared/components';
import { signup, validation } from './service';
import { UsersContext } from '../../root/store'

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default AddUser = props => {
    const { navigation } = props;
    const [users] = useContext(UsersContext);
    const [image, setImage] = useState('');
    const [user, setUser] = useState({
        isAdmin: false,
        isStudent: true
    });
    const [inProgress, setInprogress] = useState(false);
    const [avatarUpdate, setAvatarStatus] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Block>
                <TouchableOpacity onPress={() => imageUtils._pickImage(setImage, setAvatarStatus)}>
                    <Spinner inProgress={avatarUpdate}>
                        <ImageBackground
                            source={image != '' ? { uri: image } : Images.user}
                            style={styles.profileContainer}
                            imageStyle={styles.profileImage}>
                            <Block flex style={styles.profileDetails}>
                                <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                            </Block>
                        </ImageBackground>
                    </Spinner>
                </TouchableOpacity>
            </Block>
            <ScrollView style={{ minHeight: height }}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        placeholder="Name"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="user" family="font-awesome" />}
                        onChangeText={value => setUser({
                            ...user,
                            name: value
                        })}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        placeholder="Email"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="envelope" family="font-awesome" />}
                        onChangeText={value => setUser({
                            ...user,
                            email: value
                        })}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        placeholder="City"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="location-city" family="MaterialIcons" />}
                        onChangeText={value => setUser({
                            ...user,
                            city: value
                        })}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        placeholder="Suburb/Township"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="home" family="SimpleLineIcons" />}
                        onChangeText={value => setUser({
                            ...user,
                            'suburb_township': value
                        })}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        password={true}
                        placeholder="Password"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        iconContent={<Icon size={16} color={theme.COLORS.ICON} name="lock" family="Entypo" />}
                        onChangeText={value => setUser({
                            ...user,
                            'password': value
                        })}
                    />
                </Block>

                <Block center>
                    <Button
                        shadowless
                        disabled={inProgress}
                        color={materialTheme.COLORS.PRIMARY}
                        style={[styles.button, styles.shadow]}
                        onPress={() => {
                            if (validation(user)) {
                                signup({ ...user, avatar: image }, navigation, setInprogress)

                                pushNotifications.sendPushNotifications(
                                    users.data,
                                    "New Member Has Joined!",
                                    user.name
                                )
                            }
                        }}>
                        {inProgress || avatarUpdate ? <ActivityIndicator size="small" color="#00ff00" /> : 'Submit'}
                    </Button>
                    <Text
                        size={12}
                        color={materialTheme.COLORS.PRIMARY}
                        onPress={() => !inProgress && navigation.navigate('Login')}>
                        Login
                </Text>
                </Block>
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'android' ? -utils.HeaderHeight : 0,
        marginBottom: -utils.HeaderHeight * 2,
    },
    title: {
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
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
    profileImage: {
        width: width * 1.1,
        height: 'auto',
    },
    profileContainer: {
        width: width,
        height: height / 2.5,
    },
    profileDetails: {
        paddingTop: theme.SIZES.BASE * 4,
        justifyContent: 'flex-end',
        position: 'relative',
    },
    gradient: {
        zIndex: 1,
        left: 0,
        right: 0,
        bottom: 0,
        height: '30%',
        position: 'absolute',
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