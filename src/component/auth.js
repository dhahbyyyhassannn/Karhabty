import axios from 'axios/dist/browser/axios.cjs';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://127.0.0.1:8000/api';

export async function login({ email, password }) {
  try {
    const { data } = await axios.post(`${API_BASE}/logIn`, { email, password }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Invalid credentials');
  }
}

export async function signup({ name, email, password, role }) {
  try {
    const { data } = await axios.post(`${API_BASE}/signIn`, { name, email, password, role }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || 'Signup failed';
    throw new Error(message);
  }
}

export function getToken() {
  return localStorage.getItem('token');
}

export function logout() {
  localStorage.removeItem('token');
}

const auth = { login, signup, getToken, logout };

export default auth;
