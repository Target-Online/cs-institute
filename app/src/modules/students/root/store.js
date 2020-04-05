import React, { useReducer, useEffect } from 'react'

import { realTimedbApi } from '../../../api';
import { rootReducer } from '../../../shared/utils';

export const AnnouncementsContext = React.createContext()
export const CoursesContext = React.createContext()
export const StudentCourseContext = React.createContext()
export const DocumentsContext = React.createContext()
export const MessagesContext = React.createContext()
export const LikesContext = React.createContext()
export const PostsContext = React.createContext()

const initalState = {
    data: [],
    search: '',
    inProgress: true
}

const Store = ({ children }) => {
    const [announcements, setAnnouncements] = useReducer(rootReducer.setStateReducer, initalState)
    const [courses, setCourses] = useReducer(rootReducer.setStateReducer, initalState)
    const [studentCourse, setStudentCourse] = useReducer(rootReducer.setStateReducer, initalState)
    const [documents, setDocuments] = useReducer(rootReducer.setStateReducer, initalState)
    const [messages, setMessages] = useReducer(rootReducer.setStateReducer, initalState)
    const [likes, setLikes] = useReducer(rootReducer.setStateReducer, initalState)
    const [posts, setPosts] = useReducer(rootReducer.setStateReducer, initalState)

    useEffect(() => {
        realTimedbApi.getCollection('announcements', setAnnouncements);
        realTimedbApi.getCollection('courses', setCourses);
        realTimedbApi.getCollection('studentCourse', setStudentCourse);
        realTimedbApi.getCollection('documents', setDocuments);
        realTimedbApi.getCollection('messages', setMessages);
        realTimedbApi.getCollection('likes', setLikes);
        realTimedbApi.getCollection('posts', setPosts);
    }, []);

    return (
        <AnnouncementsContext.Provider value={[announcements, setAnnouncements]}>
            <CoursesContext.Provider value={[courses, setCourses]}>
                <StudentCourseContext.Provider value={[studentCourse, setStudentCourse]}>
                    <DocumentsContext.Provider value={[documents, setDocuments]}>
                        <MessagesContext.Provider value={[messages, setMessages]}>
                            <LikesContext.Provider value={[likes, setLikes]}>
                                <PostsContext.Provider value={[posts, setPosts]}>
                                    {children}
                                </PostsContext.Provider>
                            </LikesContext.Provider>
                        </MessagesContext.Provider>
                    </DocumentsContext.Provider>
                </StudentCourseContext.Provider>
            </CoursesContext.Provider>
        </AnnouncementsContext.Provider>
    );
};
export default Store;