import axios from 'axios';

const API_BASE = 'http://127.0.0.1:8000/';

export async function login({ email, password }) {
  try {
    const { data } = await axios.post(`${API_BASE}/logIn`, { email, password }, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Invalid credentials');
  }
}

export async function register({ name, email, password, role }) {
  try {
    const { data } = await axios.post(`${API_BASE}/signIn`, { name, email, password }, {
      headers: {
        Authorization: localStorage.getItem('token'),
        'Content-Type': 'application/json',
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

export async function submitVehicleListing(endpoint, payload) {
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

