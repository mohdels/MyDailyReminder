import axios from 'axios';

const API_BASE_URL = 'https://mydailyhadith.onrender.com';

export const fetchHadeeth = async (language) => {
  const response = await axios.get(`${API_BASE_URL}/daily-hadeeth?Language=${language}`);
  return response.data;
};

export const subscribeToEmails = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });
  return response.data;
};



