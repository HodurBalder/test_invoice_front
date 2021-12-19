import { writable } from 'svelte/store'

export const ModalStore = Modal()

export const UserStore = Model('User')
export const SessionStore = Model('Session')
export const InvoiceStore = Model('Invoice')

export const InvoicesStore = Collection('Invoices')


function Modal(state = null) {

    const {subscribe, update, set} = writable(state)

    function close() {
        set(null)
    }

    function open(action) {
        set(action)
    }

    return {
        subscribe,
        update,
        set,
        close,
        open
    }
}




function Model(name, state = null) {

    const {subscribe, update, set} = writable(state)

    function modalCreate(data = null) {
        ModalStore.set(`${name}Create`)
        if(data) set(data)
    }

    function modalRead(data = null) {
        ModalStore.set(`${name}Read`)
        if(data) set(data)
    }

    function modalUpdate(data = null) {
        ModalStore.set(`${name}Update`)
        if(data) set(data)
    }

    function modalDelete(data = null) {
        ModalStore.set(`${name}Delete`)
        if(data) set(data)
    }

    function modalOpen(data = null) {
        ModalStore.set(`${name}`)
        if(data) set(data)
    }


    function modalClose() {
        ModalStore.set(null)
        set(null)
    }

    return {
        subscribe,
        update,
        set,
        modalCreate,
        modalRead,
        modalUpdate,
        modalDelete,
        modalClose,
        modalOpen
    }
}


function Collection(name, state = []) {

    const {subscribe, update, set} = writable(state)

    function modal(data, action) {
        ModalStore.set(`${name}${action}`)
        set(data)
    }

    function append(data, update) {
        return update(items => {
            items.unshift(data)
            return items
        })
    }

    function replace(data, update) {
        return update(items => {
            return items.map(item => {
                return item._id === data._id? data : item
            })
        })
    }

    function remove(dataId, update) {
        return update(items => {
            return items.filter(item => item._id != dataId)
        })
    }

    return {
        subscribe,
        update,
        set,
        modal,
        append: item => append(item, update),
        replace: item => replace(item, update),
        remove: itemId => remove(itemId, update)
    }
}