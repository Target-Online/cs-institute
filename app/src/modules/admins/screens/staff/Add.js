import React, { useState, useEffect, useContext } from 'react';
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

import { realTimedbApi } from '../../../../api';
import { Spinner } from '../../../../shared/components';
import { Images } from '../../../../shared/constants';
import { UsersContext } from '../../../../root/store';

export default function users (props) {
    const [users] = useContext(UsersContext);

    const addStudent = userId =>{
        realTimedbApi.updateData('users', userId, { isAdmin: true, isStudent: false });
        props.navigation.goBack();
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => addStudent(item.id)}>
                <View style={styles.row}>
                    <Image source={item.avatar == '' ? Images.user : { uri: item.avatar }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={styles.mblTxt}>Mobile</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.city} {item['suburb/township']}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const data = users.data.filter(s => s.name.toLowerCase().includes(users.search) && !s.isAdmin)
    return (
        <ScrollView>
            <FlatList
                data={data.sort((a, b) => b.createdAt - a.createdAt)}
                keyExtractor={item => item.id.toString()}
                renderItem={item => renderItem(item)}
            />
            <Block center style={{ marginTop: 10 }}>
                {data.length == 0 && !users.inProgress && <Text>No users.</Text>}
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