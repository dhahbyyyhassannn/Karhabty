import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

export default async function login({ email, password }) {
    const response = await axios.post(`${url}api/logIn`, { email, password }, {
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function register({ name, email, password }) {
    const response = await axios.post(`${url}api/signIn`, { name, email, password }, {
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}