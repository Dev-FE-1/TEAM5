import axios from './axios';

export const fetchCommutes = async () => {
  try {
    const response = await axios('/commutes');
    return response.data.data;
  } catch (error) {
    throw new Error('fetch 중 오류 발생')
  }
};

export const fetchCommutesByUserId = async (userId) => {
  try {
    const response = await axios.get('/commutes' + `/${userId}`);
    
    return response.data.data;
  } catch (error) {
    throw new Error('fetch 중 오류 발생')
  }
};