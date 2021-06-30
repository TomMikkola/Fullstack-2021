import axios from 'axios'
const url = 'http://localhost:3001/persons'

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
    //console.log("persoonasta ", url+`/${id}`, newPerson)
    const request = axios.put(url+`/${id}`, newPerson)
    return request.then( response => response.data )
}

export default {
    getAll,
    createPerson,
    deletePerson,
    updatePerson
}