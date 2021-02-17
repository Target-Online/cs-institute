import moment from 'moment'
import React, { useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { Block } from 'galio-framework';

import { Spinner } from '../../../../../../shared/components';
import { AnnouncementsContext } from '../../../../root/store';

export default function Announcements (props){
    const [announcements] = useContext(AnnouncementsContext);
    const data = announcements.data.filter(d => d.parentId == props.id)

    return (
        <Spinner inProgress={announcements.inProgress} >
            <View style={styles.container}>
                <FlatList
                    style={styles.tasks}
                    columnWrapperStyle={styles.listContainer}
                    data={data.sort((a, b) => b.createdAt - a.createdAt)}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={[styles.card, { borderColor: '#228B22' }]}>
                                <Image style={styles.image} source={{ uri: 'https://img.icons8.com/flat_round/64/000000/checkmark.png' }} />
                                <View style={styles.cardContent}>
                                    <Text style={[styles.description, styles.descriptionStyle]}>{item.message}</Text>
                                    <Text style={styles.date}>{moment(item.createdAt).format('MM/DD/YYYY HH:MM')}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }} />
            </View>
            <Block center style={{ marginTop: 10 }}>
                {data.length == 0 && <Text>No announcements.</Text>}
            </Block>
        </Spinner>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "white"
    },
    tasks: {
        flex: 1,
    },
    cardContent: {
        marginLeft: 20,
        marginTop: 10,
    },
    image: {
        width: 25,
        height: 25,
    },

    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: "white",
        flexBasis: '46%',
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderLeftWidth: 6,
    },

    description: {
        fontSize: 18,
        flex: 1,
        color: "#008080",
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        flex: 1,
        color: "#696969",
        marginTop: 5
    },
    descriptionStyle: {
        fontStyle: 'italic',
        color: "#808080"
    }
});  