import Superagent from 'superagent'
import Storage from './storage.service'
import LocalstoreService from '../services/localstore.service'

const { HOST_API } = _CONSTANTS_

export default {
    getUser,
    userLogin,
    updateUser,
    getUsersAgreement,
    recoveryUser,
    recoveryHash,
    userSignup,
    verifyToken
}


function getUser(userId) {
    return new Promise((resolve, reject) => {
        Superagent
            .get(`${HOST_API}/users/${ userId }`)
            .set('token', LocalstoreService.getItem('session').token)
            .timeout({deadline: 20000, response: 20000})
            .end((err, res) => {
                resolve(res.body)
            })
    })
}

function userLogin(data) {
    return new Promise(async(resolve, reject) => {
        console.log(HOST_API)
        await Superagent
            .post(`${HOST_API}/login`)
            .send(data)
            .end((err, res) => {
 
                if(!err) {
                    Storage.setItem('user', res.body.data.user)
                    Storage.setItem('access', res.body.data.access)
                }

                resolve(res.body)
            })
    })
}

function userSignup(data) {
    return new Promise((resolve, reject) => {

        Superagent
            .post(`${HOST_API}/users`)
            .timeout({deadline: 20000, response: 20000})
            .send(data)
            .end((err,res) => {
                resolve(res.body)
            })
    }) 
}


function updateUser(userId, data) {
    return new Promise((resolve, reject) => {

        Superagent
            .put(`${HOST_API}/users/${ userId }`)
            .set('token', LocalstoreService.getItem('session').token)
            .timeout({deadline: 20000, response: 20000})
            .send(data)
            .end((err, res) => {
                resolve(res.body)
            })
    })
}

function getUsersAgreement() {
    return new Promise((resolve, reject) => {

        if(!Storage.getItem('access'))
            return {success: true}

        Superagent
            .get(`${HOST_API}/users/agreement`)
            .set('access', Storage.getItem('access'))
            .end((err, res) => {
                $logout(res.body)
                resolve(res.body)
            })
    })
}

function recoveryUser(data) {
    return new Promise((resolve, reject) => {

        Superagent
            .post(`${HOST_API}/users/recovery`)
            .send(data)
            .end((err, res) => {
                resolve(res.body)
            })
    })
}

function recoveryHash(hash, data) {
    return new Promise((resolve, reject) => {

        Superagent
            .post(`${HOST_API}/users/recovery/${hash}`)
            .send(data)
            .end((err, res) => {
                resolve(res.body)
            })
    })
}

function verifyToken(token) {
    return new Promise((resolve, reject) => {

        Superagent
            .get(`${ HOST_API }/sessions/token/${ token }`)
            .timeout({deadline: 20000, response: 20000})
            .set('token', token)
            .end((err, res) => {
                resolve(res.body)
            })
    })
}