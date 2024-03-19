import axios from 'axios';
const BASE_URL = 'http://localhost:8080';
const BASE_URL1 = 'http://localhost:8080';
const BASE_URL2 = 'http://localhost:8081';

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL1,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
export const axiosPrivate1 = axios.create({
    baseURL: BASE_URL2,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});