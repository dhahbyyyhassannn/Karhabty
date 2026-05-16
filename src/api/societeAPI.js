import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

export async function getSocietes() {
  const response = await axios.get(`${url}api/societes`);
  return response.data;
}

export async function createSociete(data) {
  const response = await axios.post(`${url}api/societes`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export async function loginSociete(data) {
  const response = await axios.post(`${url}api/societes/login`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
