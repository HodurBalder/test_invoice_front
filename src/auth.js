import { UserStore, SessionStore } from './stores'
import LocalstoreService from './services/localstore.service'

export default {
    isLogin,
    needLogin
}

function needLogin() {

    const user = LocalstoreService.getItem('user')
    const session = LocalstoreService.getItem('session')

    if(!user || !session)
        return true
    
    UserStore.set(user)
    SessionStore.set(session)

    return false
}

function isLogin() {

    const user = LocalstoreService.getItem('user')
    const session = LocalstoreService.getItem('session')

    if(!user || !session)
        return false
    
    UserStore.set(user)
    SessionStore.set(session)

    return true
}