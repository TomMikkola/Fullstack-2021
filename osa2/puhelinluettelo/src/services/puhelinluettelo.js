import axios from 'axios'
const url = '/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then( response => response.data ) 
}

const createPerson = (person) => {
    const request = axios.post(url, person)
    return request.then( response => response.data )
}

const deletePerson = (id) => {
    const request = axios.delete(url+`/${id}`)
    return request.then( response => response )
}

const updatePerson = (id, newPerson) => {
    const request = axios.put(url+`/${id}`, newPerson)
    return request.then( response => response.data )
}

const functions = {
    getAll,
    createPerson,
    deletePerson,
    updatePerson
}

export default functions