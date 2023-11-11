import axios from "axios";
import { IUserCreation } from "../interfaces/IUser";
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

export const addUserAPI = async (user: IUserCreation) => {
  try {
    const res = await axios.post(`${URL}/user`, user);
    return res.data;
  } catch (error) {
    console.error("Failed to add user:", error);
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

export const getCoursesNonParticipatingAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/courses/nonparticipating/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    return [];
  }
};

export const getCourseAllModulesAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/course/all/modules/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch modules:", error);
    return [];
  }
};

export const loginUserAPI = async (email: string, password: string) => {
  try {
    const res = await axios.post(`${URL}/user/login`, null, {
      params: {
        email: email,
        password: password,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to login user:", error);
    return {};
  }
};

export const getDefinitionAPI = async (searchTerm: string) => {
  try {
    const res = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`
    );
    return res.data;
  } catch (error) {
    console.error("Failed to fetch definition:", error);
    return [];
  }
};

//Module API

export const getModuleAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/module/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch module:", error);
    return {};
  }
};

export const getLessonsFromModuleAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/module/all/lessons/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch lessons:", error);
    return [];
  }
};

export const getFlashcardsFromModuleAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/module/all/flashcards/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch flashcards:", error);
    return [];
  }
};

// Flashcard API

export const getFlashcardAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/flashcard/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch flashcard:", error);
    return [];
  }
};

export const getFlashcardWordsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/flashcard/all/words/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch words:", error);
    return {};
  }
};
