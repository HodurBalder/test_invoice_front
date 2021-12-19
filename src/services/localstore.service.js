
export default {
    setItem,
    getItem,
    deleteItem
}

function setItem(key, value) {
    try {

        if(typeof value != 'string')
            value = JSON.stringify(value)

        localStorage.setItem(key, value)

    } catch(e) {}
}

function getItem(key) {

    let value = localStorage.getItem(key)

    try {
        return JSON.parse(value)
    } catch(e) {
        return typeof value === 'string'? value : null
    }
}

function deleteItem(key) {
    localStorage.removeItem(key)
}