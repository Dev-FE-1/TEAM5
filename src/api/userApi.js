import axios from "./axios";

export const fetchUser = async (userId) => {
  try {
    const response = await axios(`/users/${userId}`);
    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};
