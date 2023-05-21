import { BASE_URL } from './base_url'
import axios from 'axios'

//Get All Authors
export const getAllAuthors = async (name) => {
    let globalData;
    let URL;
    if (!name) {
        URL = BASE_URL + '/authors'
    }
    else {
        URL = BASE_URL + '/authors' + `?name=${name}`
    }
    await axios.get(URL)
        .then(res => {
            globalData = res.data.data
        })
    return globalData;
}

//Get Author BY id
export const getAuthorByID = async (id) => {
    let globalData;
    await axios.get(`${BASE_URL}/authors/${id}`)
        .then(res => {
            globalData = res.data.data;
        })
    return globalData;
}

//Post Author
export const addAuthor = async (payload) => {
    await axios.post(`${BASE_URL}/authors`, payload)
}

//Edit Author
export const editAuthor = async (id, payload) => {
    await axios.put(`${BASE_URL}/authors/${id}`, payload)
}

//Delete Author By ID
export const deleteAuthor = async (id) => {
    await axios.delete(`${BASE_URL}/authors/${id}`)
}