import React, { useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { Block } from 'galio-framework';
import moment from 'moment';

import { PostsContext, LikesContext, MessagesContext } from '../../../root/store'
import { UserContext, UsersContext } from '../../../../../root/store';
import TabBarIcon from '../../../shared/components/TabBarIcon';
import { Filter } from '../../../../../shared/components';
import { Images } from '../../../../../shared/constants';
import { realTimedbApi } from '../../../../../api';

export default Feeds = props => {
    const [currentUser] = useContext(UserContext);
    const [likes] = useContext(LikesContext);
    const [posts] = useContext(PostsContext);
    const [users] = useContext(UsersContext);
    const [messages] = useContext(MessagesContext);

    const renderTopSection = post => {
        const user = users.data.find(u => u.id == post.userId)
        return (
            <View style={styles.row}>
                <Image source={user.avatar == '' ? Images.user : { uri: user.avatar }} style={styles.pic} />
                <View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{user.name}</Text>
                    </View>
                    <View style={styles.msgContainer}>
                        <Text style={styles.msgTxt}>{moment(post.createdAt != 0 ? post.createdAt : post.datetime).format('DD MMM YYYY HH:mm')}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const renderMiddleSection = post => {
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.title}>{post.caption}</Text>
                </View>
                <Filter hide={post.image == ''}>
                    <Image
                        indicatorSize="large" // (small | large) or integer
                        source={{ uri: post.image }}
                        style={{ minHeight: Dimensions.get('window').width }}
                        resizeMode="contain"
                    />
                </Filter>
            </View>
        )
    }

    const like = post => {
        if (currentUser) realTimedbApi.updateData('posts', post.id, { likes:  post.likes ?  post.likes + 1 : 1 })
        else props.navigation.navigate('Login')
    }

    const renderBottomSection = post => (
            <View style={styles.cardFooter}>
                <View style={styles.socialBarContainer}>
                    <TouchableOpacity style={styles.socialBarSection} onPress={() => like(post)}>
                        <TabBarIcon focused={true} name={'like'} />
                        <Text style={styles.socialBarLabel}> { post.likes ? post.likes : 0 } </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialBarSection} onPress={() => props.navigation.navigate('PostComments', { 'post': post })}>
                        <TabBarIcon focused={true} name={'bubbles'} />
                        <Text style={styles.socialBarLabel}> { messages.data.filter(m => m.parentId == post.id).length } </Text>
                    </TouchableOpacity>
                </View>
            </View>
    )

    return (
        <ScrollView style={{ flex: 1 }} >
            {posts.data
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((post, key) =>
                <View key={key} >
                    {renderTopSection(post)}
                    {renderMiddleSection(post)}
                    {renderBottomSection(post)}
                </View>
            )}
            <Block center style={{ marginTop: 10 }}>
                {posts.data == 0 && <Text>No posts.</Text>}
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
        borderTopWidth: 5,
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
        color: 'red',
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
    /******** card **************/
    card: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 0,
        backgroundColor: "white"
    },
    cardHeader: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        flex: 1,
    },
    /******** social bar ******************/
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
        backgroundColor: "white"
    },
    socialBarContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1
    },
    socialBarSection: {
        flexDirection: 'row'
    },
    socialBarlabel: {
        paddingVertical: 20,
    },
    socialBarButton: {
        flexDirection: 'row'
    },
    icon: {
        width: 25,
        height: 25,
    },
    postButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ECF0F1',
        height: 40,
        borderRadius: 20,
        margin: 5,
        zIndex: 100,
    },
    /************ modals ************/
    message: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#008080",
        fontWeight: 'bold'
    },
    popup: {
        backgroundColor: 'white',
        marginTop: 250,
        marginHorizontal: 20,
        borderRadius: 7,
    },
    popupOverlay: {
        backgroundColor: "#00000057",
        flex: 1,
        marginTop: 30
    },
    popupContent: {
        margin: 5,
        height: 30,
    },
    popupHeader: {
        marginBottom: 45
    },
    popupButtons: {
        marginTop: 15,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: "#eee",
        justifyContent: 'center'
    },
    popupButton: {
        flex: 1,
        marginVertical: 16
    },
    btnClose: {
        height: 30,
        width: 100,
        padding: 5,
        backgroundColor: '#20b2aa',
        alignItems: 'center',
    },
    modalInfo: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteIcon: {
        height: 20,
        width: 20,
        flexDirection: 'row',
        borderRadius: 20,
        alignItems: 'flex-end',
        margin: 5,
        alignSelf: 'flex-end',
    },
});   