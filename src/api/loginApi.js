import axios from "./axios";

export const login = async ({ userId, password }) => {
  const body = { userId, password };
  try {
    const response = await axios.post(`/users/login`, body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
