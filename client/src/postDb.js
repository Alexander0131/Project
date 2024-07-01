import axios from 'axios';
import { apiUrl } from './config';
import {localData} from './tempData';

export async function fetchTracker() {
  try {
    const response = await axios.get(`${apiUrl}/api/track/get`);
    return response.data; 
  } catch (err) {
  }
}

export async function fetchData() {
  var data = localData 

  try {
    const response = await axios.get(`${apiUrl}/api/posts`);
     data = response.data;
    localStorage.setItem('cachedData', JSON.stringify(data));
  } catch (error) {
    const cachedData = localStorage.getItem('cachedData');
    if (cachedData) {
      data = JSON.parse(cachedData);
    }
    throw error;
  }
  
  
  return data;
}

export async function fetchStatic() {
  try {
    const response = await axios.get(`${apiUrl}/api/static`);
    localStorage.setItem('cachedStatic', JSON.stringify(response.data));

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






