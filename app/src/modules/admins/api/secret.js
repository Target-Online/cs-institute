import { onError } from '../../../shared/utils/notifications'

export const login = (db, user) => db.app.auth()
    .signInWithEmailAndPassword(user.email, user.id)
    .then(() => {},  error =>  onError(error.message))