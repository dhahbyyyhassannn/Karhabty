import axios from 'axios';

const url = 'http://127.0.0.1:8000/';

const getHeaders = () => {
  const token = localStorage.getItem('societe_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
};

const encodePath = (value) => encodeURIComponent(String(value));

export async function getCompanyVehicles(societeId) {
  const response = await axios.get(`${url}api/societes/${encodePath(societeId)}/vehicules`, {
    headers: getHeaders(),
  });
  return response.data;
}

export async function createCompanyVehicle(societeId, vehicleData) {
  const response = await axios.post(`${url}api/societes/${encodePath(societeId)}/vehicules`, vehicleData, {
    headers: getHeaders(),
  });
  return response.data;
}

export async function updateCompanyVehicle(societeId, matricule, vehicleData) {
  const response = await axios.put(`${url}api/societes/${encodePath(societeId)}/vehicules/${encodePath(matricule)}`, vehicleData, {
    headers: getHeaders(),
  });
  return response.data;
}

export async function deleteCompanyVehicle(societeId, matricule) {
  const response = await axios.delete(`${url}api/societes/${encodePath(societeId)}/vehicules/${encodePath(matricule)}`, {
    headers: getHeaders(),
  });
  return response.data;
}
