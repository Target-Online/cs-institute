import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView
} from 'react-native';
import { Block } from 'galio-framework';

import { pushNotifications } from '../../../../../../shared/utils';
import { realTimedbApi } from '../../../../../../api';
import { Images } from '../../../../../../shared/constants';
import { StudentCourseContext } from '../../../../root/store';
import { UsersContext } from '../../../../../../root/store';

export default Students = props => {
    const [students] = useContext(UsersContext);
    const [studentCourse] = useContext(StudentCourseContext);
    const { course } = props.navigation.state.params;

    const addStudent = (student, course) =>{
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        realTimedbApi.setData('studentCourse', { courseId: course.id, studentId: student.id });
        props.navigation.goBack();

        pushNotifications.sendPushNotifications(
            [student],
            course.name,
            "You have neen added on this course, congratulations."
        )
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => addStudent(item, course)}>
                <View style={styles.row}>
                    <Image source={item.avatar == '' ? Images.user : { uri: item.avatar }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.email}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const data = students.data.filter(s => s.name.toLowerCase().includes(students.search) && s.isStudent && !studentCourse.data.some(sc => sc.courseId == course.id && sc.studentId == s.id))
    return (
        <ScrollView>
            <FlatList
                data={data.sort((a, b) => b.createdAt - a.createdAt)}
                keyExtractor={item => item.id.toString()}
                renderItem={item => renderItem(item)}
            />
            <Block center style={{ marginTop: 10 }}>
                {data.length == 0 && !students.inProgress && <Text>No students.</Text>}
            </Block>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 30,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 280,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '600',
        color: '#222',
        fontSize: 18,
        width: 170,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    msgTxt: {
        fontWeight: '400',
        color: '#008B8B',
        fontSize: 12,
        marginLeft: 15,
    },
}); 