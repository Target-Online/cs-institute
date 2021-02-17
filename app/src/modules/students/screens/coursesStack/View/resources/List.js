import React, { useContext, useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Linking,
    FlatList,
    Keyboard
} from 'react-native';
import { Block, Input, theme } from 'galio-framework';

import { materialTheme } from '../../../../../../shared/constants';
import { Spinner, FontAwesomeIcons, Icon } from '../../../../../../shared/components';
import { DocumentsContext } from '../../../../root/store';

export default function Documents (props){
    const [documents] = useContext(DocumentsContext);
    const [search, setSearch] = useState('');
    
    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => props.setExpand(true)
    const _keyboardDidHide = () => props.setExpand(false)

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                <View style={styles.row}>
                    <FontAwesomeIcons focused={true} name={'file-pdf-o'} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} >{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    const data = documents.data.filter(d => d.parentId == props.id && d.name.toLowerCase().includes(search))
    return (
        <Spinner inProgress={documents.inProgress}>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                <Input
                    right
                    placeholder="search..."
                    color={materialTheme.COLORS.PRIMARY}
                    placeholderTextColor={materialTheme.COLORS.DEFAULT}
                    style={{ borderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    iconContent={<Icon size={16} color={materialTheme.COLORS.INPUT} name="search" family="font-awesome" />}
                    onChangeText={value => setSearch(value)}
                />
            </Block>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={item => renderItem(item)}
            />
            <Block center style={{ marginTop: 10 }}>
                {data.length == 0 && <Text>No documents.</Text>}
            </Block>
        </Spinner>
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
        fontWeight: '500',
        color: '#222',
        fontSize: 10,
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