import React, { useContext, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { UserContext, UsersContext } from '../../../../../root/store';
import { MessagesContext } from '../../../root/store';
import { realTimedbApi } from '../../../../../api';
import { sendPushNotifications } from '../../../../../shared/utils/pushNotificatons'

export default function Comments (props) {
    const [currentUser] = useContext(UserContext);
    const [users] = useContext(UsersContext);
    const [messages] = useContext(MessagesContext);
    const { post } = props.navigation.state.params

    useEffect(() =>{ if(!currentUser) props.navigation.navigate('Login') }, []);

    const notifyEveryone = message => sendPushNotifications(
        users.data,
        "Market Update Comment",
        `${currentUser.name}: ${message}`
    )

    onSend = message => {
        realTimedbApi.setData('messages', { ...message, parentId: post.id })
        notifyEveryone(message.text)
    }

    return (
        <GiftedChat
            renderUsernameOnMessage
            messages={
                messages.data
                    .filter(m => m.parentId == post.id)
                    .sort((a, b) => b.createdAt - a.createdAt)
            }
            onSend={messages => onSend(messages[0])}
            user={{ ...currentUser, _id: currentUser ? currentUser.id : 0 }}
        />
    )
}