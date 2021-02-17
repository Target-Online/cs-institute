import React, { useEffect, useState, useContext } from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, ImageBackground, Platform, View, Modal } from 'react-native';
import { Block, Text, Input, theme, Icon } from 'galio-framework';
import { LinearGradient } from 'expo-linear-gradient';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { SimpleLineIcons } from '@expo/vector-icons';

import { UserContext, UsersContext } from '../../../../../root/store';
import { StudentCourseContext } from '../../../root/store';
import { realTimedbApi } from '../../../../../api';
import { imageUtils, pushNotifications, documentPicker } from '../../../../../shared/utils';
import { onInfo, onSuccess } from '../../../shared/utils/notifications';
import { materialTheme, colors } from '../../../shared/constants';
import { HeaderHeight } from "../../../shared/constants/utils";
import { Filter } from '../../../../../shared/components';
import { Images } from '../../../../../shared/constants';

import StudentsList from './students/List'
import Announcements from './announcements/List';
import Documents from './resources/List';
import { DocumentsContext } from '../../../root/store';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default function CourseView (props){
    const { product } = props.navigation.state.params;
    const [image, setImage] = useState(product.avatar);

    const [currentUser] = useContext(UserContext);
    const isAdmin = currentUser && currentUser.isAdmin;

    const [documents, disapchDocuments] = useContext(DocumentsContext);
    const [section, setSection] = useState('description');

    const [addAnnouncements, setAnnouncements] = useState(false);
    const [announcement, setAnnouncement] = useState('');

    const [editDescription, setEditDescription] = useState(false);
    const [description, setDescription] = useState(product.description);

    const [students] = useContext(UsersContext);
    const [studentCourse] = useContext(StudentCourseContext);

    const [expand, setExpand] = useState(false);

    const updateCourse = () => {
        if (isAdmin) imageUtils._updateDocumentImage(setImage, product.id);
    }

    const studentsEnrolledForThisCourse = students.data.filter(s =>
        studentCourse.data.filter(sc => sc.courseId == product.id)
            .map(es => es.studentId)
            .includes(s.id))

    const AddAnnouncement = (
        <ConfirmDialog
            title="Add an announcement"
            visible={addAnnouncements}
            onTouchOutside={() => setAnnouncements(false)}
            positiveButton={{
                title: "Submit",
                onPress: () => {
                    realTimedbApi.setData('announcements', {
                        parentId: product.id,
                        message: announcement
                    })
                    setAnnouncements(false);
                    pushNotifications.sendPushNotifications(
                        studentsEnrolledForThisCourse,
                        product.name,
                        announcement
                    )
                }
            }}
            negativeButton={{
                title: "Cancel",
                onPress: () => setAnnouncements(false)
            }} >
            <View>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input
                        right
                        placeholder="announcement"
                        color={materialTheme.COLORS.PRIMARY}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        onChangeText={value => setAnnouncement(value)}
                    />
                </Block>
            </View>
        </ConfirmDialog>
    )

    const EditDescripton = (
        <ConfirmDialog
            title="Edit description"
            visible={editDescription}
            onTouchOutside={() => setEditDescription(false)}
            positiveButton={{
                title: "Submit",
                onPress: () => {
                    realTimedbApi.updateData('courses', product.id, {
                        description: description
                    })
                    setEditDescription(false);
                }
            }}
            dialogStyle={{ marginBottom: 100 }}
            negativeButton={{
                title: "Cancel",
                onPress: () => setEditDescription(false)
            }} >
            <View>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE, height: height/3 }}>
                    <TextInput
                        multiline
                        placeholder="Description"
                        numberOfLines={5}
                        value={description}
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        onChangeText={value => setDescription(value)}
                    />
                </Block>
            </View>
        </ConfirmDialog>
    )

    useEffect(() => {
        if (isAdmin && product.avatar == '')  onInfo('Update course profile image.');        
    }, []);


    const redirect = () => {
        if (section == 'students') props.navigation.navigate('AddStudent', { 'course': product });
        if (section == 'announcements') setAnnouncements(true)
        if (section == 'description') setEditDescription(true)
        if (section == 'resources') documentPicker(product.id, disapchDocuments)
    }

    const Tab = ({ name, addname, sec }) => {
        const focus = section == sec;
        return (
            <TouchableOpacity style={[styles.button]} onPress={() => focus && isAdmin ? redirect() : setSection(sec)}>
                <SimpleLineIcons
                    size={20}
                    name={focus ? addname : name}
                    style={{ marginBottom: -3 }}
                    color={focus ? materialTheme.COLORS.PRIMARY : colors.tabIconDefault}
                />
            </TouchableOpacity>
        )
    };

    return (
        <Block flex style={styles.profile}>
            {AddAnnouncement}
            {EditDescripton}
            <Block flex>
                <TouchableOpacity onPress={() => updateCourse()}>
                    <ImageBackground
                        source={image == '' ? Images.placeholder : { uri: image }}
                        style={styles.profileContainer}
                        imageStyle={styles.profileImage}>
                        <Block flex style={styles.profileDetails}>
                            <Block style={styles.profileTexts}>
                            </Block>
                            <LinearGradient colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} style={styles.gradient} />
                        </Block>
                    </ImageBackground>
                </TouchableOpacity>
            </Block>
            <Block flex style={[styles.options, expand && { marginTop: -theme.SIZES.BASE * 30 }]}>
                <Block row fixed space="between" style={{ padding: theme.SIZES.BASE, }}>
                    <Block middle>
                        <Tab name={'doc'} addname={'note'} sec={'description'} />
                        <Text muted size={12}>Description</Text>
                    </Block>
                    <Block middle>
                        <Tab name={'people'} addname={'user-follow'} sec={'students'} />
                        <Text muted size={12}>Students</Text>
                    </Block>
                    <Block middle>
                        <Tab name={'folder'} addname={'note'} sec={'resources'} />
                        <Text muted size={12}>Resources</Text>
                    </Block>
                    <Block middle>
                        <Tab name={'bell'} addname={'note'} sec={'announcements'} />
                        <Text muted size={12}>Nofications</Text>
                    </Block>
                </Block>
                <ScrollView style={{marginHorizontal: theme.SIZES.BASE}}>
                    <Filter hide={section != 'description'}>
                        <Block row style={{ height: height }}>
                            <Block style={styles.title}>
                                <Text muted size={12}>
                                    {description}
                                </Text>
                            </Block>
                        </Block>
                    </Filter>

                    <Filter hide={section != 'announcements'}>
                        <Block row style={{ height: height }}>
                            <Announcements id={product.id} />
                        </Block>
                    </Filter>

                    <Filter hide={section != 'resources'}>
                        <Block row style={{ height: height }}>
                            <Documents setExpand={setExpand} id={product.id} />
                        </Block>
                    </Filter>

                    <Filter hide={section != 'students'}>
                        <Block row style={{ height: height }}>
                            <StudentsList
                                course={product}
                                height={theme.SIZES.BASE * 10}
                                navigation={props.navigation}
                            />
                        </Block>
                    </Filter>
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
    },
    button: {
        padding: 12,
        position: 'relative',
    },
});
