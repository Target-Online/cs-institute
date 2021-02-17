import React, { useReducer, useEffect, useContext } from 'react';
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

import { Images } from '../../../../shared/constants';
import { UsersContext } from '../../../../root/store';

export default function Users (props){
    const [users] = useContext(UsersContext);
        
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('ViewAdmin', { student: item })}>
                <View style={styles.row}>
                    <Image source={item.avatar == '' ? Images.user : { uri: item.avatar }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={styles.mblTxt} numberOfLines={1} ellipsizeMode="tail">{item.city}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.title}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    
    return (
        <ScrollView>
            <FlatList
                data={users.data.filter(user => user.isAdmin)}
                keyExtractor={item => item.id.toString()}
                renderItem={item => renderItem(item)}
            />
            <Block center style={{ marginTop: 10 }}>
                {users.data.filter(user => user.isAdmin).length == 0 && <Text>No admins.</Text>}
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
        width: 200,
    },
    nameTxt: {
        marginLeft: 15,
        fontWeight: '500',
        color: '#222',
        fontSize: 15,
        width: 100,
    },
    mblTxt: {
        fontWeight: '100',
        color: '#777',
        fontSize: 13,
        width: 80,
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