import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchSales = async (params) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      queryParams.append(key, value);
    }
  });

  const response = await axios.get(`${API_BASE_URL}/sales?${queryParams}`);
  return response.data;
};

export const fetchFilterOptions = async () => {
  const response = await axios.get(`${API_BASE_URL}/sales/filters`);
  return response.data;
};
