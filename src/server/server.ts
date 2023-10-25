import axios from "axios";
const URL = "https://localhost:7275/api";

export const getUserByEmailAPI = async (email: string) => {
  try {
    const res = await axios.get(`${URL}/user/byemail/${email}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {};
  }
};

export const getUserCoursesAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/courses/attended/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user's courses:", error);
    return {};
  }
};

export const getCoursesAPI = async () => {
  try {
    const res = await axios.get(`${URL}/course`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};
