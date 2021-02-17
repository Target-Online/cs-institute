import React, { useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { UserContext } from '../../../root/store';
import { MessagesContext, ClientsContext } from '../root';
import { realTimedbApi } from '../api';
import appsettings from '../../../../appsettings.json'

export default function ChatRoom (props) {
    const [currentUser] = useContext(UserContext);
    const [clients] = useContext(ClientsContext);
    const [messages] = useContext(MessagesContext);
    const client = clients.data.filter(c => c.name == appsettings.appName)[0] 

    onSend = message => {
        realTimedbApi.setData('messages', { ...message, parentId: client.id })
    }

    return (
        <GiftedChat
            renderUsernameOnMessage
            messages={
                messages.data
                    .filter(m => m.parentId == client.id)
                    .sort((a, b) => b.createdAt - a.createdAt)
            }
            onSend={messages => onSend(messages[0])}
            user={{ ...currentUser, _id: currentUser.id }}
        />
    )
}