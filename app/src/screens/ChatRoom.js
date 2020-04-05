import React, { useState, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import firebase from "firebase";
import _ from 'lodash';

import appsettings from '../../appsettings.json'
import { onError } from '../shared/utils/notifications'

if (!firebase.apps.length) {
  firebase.initializeApp(appsettings.firebaseConfig);
}

export default ChatRoom = props => {
  const firebaseUser = firebase.auth().currentUser;
  
  if(firebaseUser === null) props.navigation.navigate('Login');

  const currentUser = firebaseUser === null ? {} : { _id: firebaseUser.uid, name: firebaseUser.displayName, avatar: firebaseUser.photoURL };
  const ref = firebase.database().ref("chat-rooms/everyone/messages/");
  const [messages, setMessages] = useState([]);
  const [messagesRetrieved, setMessagesRetrieved] = useState(false);

  if(!messagesRetrieved)
    ref.on("value", function (snapshot) {
      setMessages(_.toArray(snapshot.val()))
      setMessagesRetrieved(true)
    }, function (error) {
      onError("The read failed: " + error.message);
    })

  onSend = message => {
    setMessages(GiftedChat.append(messages, message));
    ref.push().set({
      ...message,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    })
  }

  return (
    <GiftedChat
      renderUsernameOnMessage
      messages={messages.sort((a, b) => b.createdAt - a.createdAt)}
      onSend={messages => onSend(messages[0])}
      user={currentUser}
    />
  )
}