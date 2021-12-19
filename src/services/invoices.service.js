import Superagent from 'superagent'
import Storage from './storage.service'
import LocalstoreService from './localstore.service'

const { HOST_API } = _CONSTANTS_

export default {
    createInvoice,
    getInvoices,
    updateInvoice,
    deleteInvoice
}

function createInvoice(data) {
    return new Promise(async(resolve, reject) => {
        await Superagent
            .post(`${HOST_API}/invoices`)
            .set('token', LocalstoreService.getItem('session').token)
            .timeout({deadline: 20000, response: 20000})
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


function getInvoices(userId) {
    return new Promise((resolve, reject) => {
        
        Superagent
            .get(`${ HOST_API }/invoices`)
            .set('token', LocalstoreService.getItem('session').token)
            .timeout({deadline: 20000, response: 20000})
            .query({ userId })
            .end((err, res) => {
                resolve(res.body)
            })
    })
}


function updateInvoice(invoiceId, data) {
    return new Promise((resolve, reject) => {
        
        Superagent
            .put(`${ HOST_API }/invoices/${invoiceId}`)
            .set('token', LocalstoreService.getItem('session').token)
            .timeout({deadline: 20000, response: 20000})
            .send(data)
            .end((err, res) => {
                resolve(res.body)
            })
    })
}

function deleteInvoice(invoiceId) {
    return new Promise((resolve, reject) => {

        Superagent
           .delete(`${HOST_API}/invoices/${invoiceId}`)
           .set('token', LocalstoreService.getItem('session').token)
           .timeout({deadline: 20000, response: 20000})
           .end((err, res) => {
               resolve(res.body)
           })
    })
}