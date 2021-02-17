import React, { useState } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView, TextInput, ImageBackground, Platform } from 'react-native';
import { Button, Block, Input, theme } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';

import { materialTheme, utils } from '../../shared/constants';
import { imageUtils, validation } from '../../../../shared/utils';
import { Images } from '../../../../shared/constants';
import { realTimedbApi } from '../../../../api';
import { Spinner } from '../../../../shared/components';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function AddCourse (props){
    const { navigation } = props;
    const [image, setImage] = useState('');
    const [course, setCourse] = useState({});
    const [avatarUpload, setAvatarStatus] = useState(false);

    return (
        <ScrollView style={styles.container}>
            <Block>
                <TouchableOpacity onPress={() => imageUtils._pickImage(setImage, setAvatarStatus)}>
                    <Spinner inProgress={avatarUpload}>
                        <ImageBackground
                            source={image != '' ? { uri: image } : Images.placeholder}
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
                        onChangeText={value => setCourse({
                            ...course,
                            name: value
                        })}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <TextInput
                        multiline
                        placeholder="Description"
                        numberOfLines={5}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ minHeight: 150, padding: 10, backgroundColor: '#ffff', borderRadius: 3, borderColor: materialTheme.COLORS.DEFAULT, borderWidth: 1 }}
                        onChangeText={value => setCourse({
                            ...course,
                            description: value
                        })}
                    />
                </Block>

                <Block center >
                    <Button
                        shadowless
                        color={materialTheme.COLORS.PRIMARY}
                        style={[styles.button, styles.shadow]}
                        onPress={() => {
                            if (validation(course, ['name', 'description'])) {
                                realTimedbApi.setData('courses', { ...course, avatar: image })
                                navigation.goBack();
                            }
                        }}>
                        Submit
                </Button>
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