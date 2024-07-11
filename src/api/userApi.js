import axios from "./axios";

export const fetchUser = async (userId) => {
  try {
    const response = await axios(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const editUserInfo = async (userId, body) => {
  try {
    const response = await axios.put(`/users/${userId}`, body);
    console.log(response)
    return response.data
  } catch (error) {
    throw new Error(error);
  }
};
