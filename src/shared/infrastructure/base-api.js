import axios from 'axios';


export const kessickApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
});

export const winesApi = axios.create({
    baseURL: import.meta.env.VITE_SAMPLE_API_URL
});