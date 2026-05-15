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

async function submitVehicleListing(endpoint, payload) {
  const token = getToken();

  if (!token) {
    throw new Error('You need to sign in before submitting a vehicle listing');
  }

  try {
    const { data } = await axios.post(`${API_BASE}${endpoint}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  } catch (error) {
    const message = error.response?.data?.message || error.response?.data?.error || 'Vehicle listing submission failed';
    throw new Error(message);
  }
}

export function submitSaleVehicle(payload) {
  return submitVehicleListing('/vehicules/vente', payload);
}

export function submitRentalVehicle(payload) {
  return submitVehicleListing('/vehicules/location', payload);
}

const auth = { login, signup, getToken, logout };

export default auth;
