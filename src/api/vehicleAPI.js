import axios from "axios";

const url = 'http://127.0.0.1:8000/';

export async function addVehicleForSale(vehicleData) { 
    const token = localStorage.getItem('token');
    const response = await axios.post(`${url}/api/vehicles/addCar`, vehicleData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export async function getRentalVehicles() {
    const response = await axios.get(`${url}api/vehicles/rentals`);
    return response.data;
}

export async function getSaleVehicles() {
    const response = await axios.get(`${url}api/vehicles/sales`);
    return response.data;
}

export async function getVehicleById(id) {
    const response = await axios.get(`${url}api/vehicles/${id}`);
    return response.data;
}