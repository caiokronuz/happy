import axios from 'axios';

const api = axios.create({
    baseURL: 'https://projecthappyapi.herokuapp.com'
})

export default api;