import React, { useState, useReducer, useEffect } from 'react'

import { realTimedbApi } from '../api';
import { rootReducer } from '../../../shared/utils';

export const AnnouncementsContext = React.createContext()
export const DocumentsContext = React.createContext()
export const MessagesContext = React.createContext()
export const ClientsContext = React.createContext()

const initalState = {
    data: [],
    search: '',
    inProgress: false
}

const Store = ({ children }) => {
    const [announcements, dispatchAnnouncements] = useReducer(rootReducer.setStateReducer, initalState)
    const [documents, dispatchDocuments] = useReducer(rootReducer.setStateReducer, initalState)
    const [messages, dispatchMessages] = useReducer(rootReducer.setStateReducer, initalState)
    const [clients, dispatchClients] = useReducer(rootReducer.setStateReducer, initalState)

    useEffect(() => {
        realTimedbApi.getCollection('announcements', dispatchAnnouncements);
        realTimedbApi.getCollection('documents', dispatchDocuments);
        realTimedbApi.getCollection('messages', dispatchMessages);
        realTimedbApi.getCollection('clients', dispatchClients);
        
        return () => {}
    }, []);

    return (
        <AnnouncementsContext.Provider value={[announcements, dispatchAnnouncements]}>
            <DocumentsContext.Provider value={[documents, dispatchDocuments]}>
                <MessagesContext.Provider value={[messages, dispatchMessages]}>
                    <ClientsContext.Provider value={[clients, dispatchClients]}>
                        {children}
                    </ClientsContext.Provider>
                </MessagesContext.Provider>
            </DocumentsContext.Provider>
        </AnnouncementsContext.Provider>
    );
};
export default Store;