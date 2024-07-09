import axios from "./axios";

export const editProfileImage = async (userId, formData) => {
  try {
    const res = await axios.put(`/users/${userId}/profile-image`, formData);

    console.log(res);

    return res.data;
  } catch (err) {
    throw new Error("fetch 중 오류 발생");
  }
};

export const deleteProfileImage = async (userId) => {
  try {
    const res = await axios.delete(`/users/${userId}/profile-image`);

    console.log(res);

    return res.data;
  } catch (error) {
    throw new Error(error);
  }
};
