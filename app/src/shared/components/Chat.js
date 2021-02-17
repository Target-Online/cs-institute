import React, { useState, useEffect, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import { UserContext, StateContext } from '../../root/store';
import { firestoreApi } from '../../api'

export default function ChatRoom (props) {
    const [currentUser, setUser] = useContext(UserContext);
    const [messages, setMessages] = useState([])
    const [onChange, setChange] = useState({})
    const [inProgress, setInProgress] = useState(false)
    const { product } = props.navigation.state.params

    useEffect(() => {
        if (currentUser) {
            firestoreApi.getCollection('messages', setInProgress, setMessages);
        }
        else props.navigation.navigate('Login');
    }, [onChange]);

    const data = messages.filter(m => m.parentId == product.id)
     
    return (
        
        <GiftedChat
            renderUsernameOnMessage
            isLoadingEarlier
            messages={data.map(d => ({ ...d, createdAt: d.createdAt}))} 
            onSend={mssgs => {
                const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                firestoreApi.setDocument(
                    'messages', 
                    id, 
                    { 
                        ...mssgs[0], 
                        parentId: product.id 
                    } 
                )
            }}
            user={{...currentUser, _id: currentUser.id }}
        />
    )
}