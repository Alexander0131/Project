import axios from 'axios';
import { apiUrl } from './config';

export async function fetchTracker() {
  try {
    const response = await axios.get(`${apiUrl}/api/track/get`);
    return response.data; 
  } catch (err) {
  }
}

export async function fetchData() {
  try {
    const response = await axios.get(`${apiUrl}/api/posts`);
    const data = response.data;
    localStorage.setItem('cachedData', JSON.stringify(data));
    return data;
  } catch (error) {
    const cachedData = localStorage.getItem('cachedData');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    throw error;
  }
}

export async function fetchStatic() {
  try {
    const response = await axios.get(`${apiUrl}/api/static`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUser() {
  try {
    const response = await axios.get(`${apiUrl}/api/auth0/get`);
    return response.data;
  } catch (error) {
    throw error;
  }
}






