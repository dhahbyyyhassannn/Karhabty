import axios from 'axios';

const url = 'http://localhost:8000/';

export default async function login({ email, password }) {
    const response = await axios.post(`${url}api/logIn`, { email, password }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function register({ name, email, password }) {
    try {
        const response = await axios.post(`${url}api/signIn`, { name, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Status:', error.response?.status);
        console.error('Error:', error.response?.data);
        throw error;
    }
    
}