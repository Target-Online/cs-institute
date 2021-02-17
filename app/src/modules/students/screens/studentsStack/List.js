import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    Dimensions
} from 'react-native';
import { Block } from 'galio-framework';

import { Images } from '../../../../shared/constants';
import { UsersContext } from '../../../../root/store';

const { height } = Dimensions.get('screen');

export default function Students (props) {
    const [users] = useContext(UsersContext);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('View', { student: item })}>
                <View style={styles.row}>
                    <Image source={item.avatar == '' ? Images.user : {uri: item.avatar}} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={styles.mblTxt}>Mobile</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.msgTxt}>{item.email}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const data = users.data.filter(s => s.name.toLowerCase().includes(users.search) && s.isStudent);
    return (
        <ScrollView>
            <FlatList
                data={data.sort((a, b) => b.createdAt - a.createdAt)} 
                keyExtractor={item => item.id.toString()}
                renderItem={item => renderItem(item)}
            />
            <Block center style={{ marginTop: 10 }}>
                {data.length == 0 && <Text>No students.</Text>}
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
        resizeMode: height < 650 ? 'contain' : 'cover'
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