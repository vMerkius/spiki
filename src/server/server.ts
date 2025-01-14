import axios from "axios";
import { IUserCreation } from "../interfaces/IUser";
import { IReportCreation } from "../interfaces/IReport";
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

export const getUserAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return {};
  }
};
export const getUserAgeAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/user/age/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch age:", error);
    return {};
  }
};

export const joinCourseAPI = async (courseId: number, userId: number) => {
  try {
    const res = await axios.post(`${URL}/user/join/course`, null, {
      params: { userId, courseId },
    });
    return res.status;
  } catch (error) {
    console.error("Failed to join course:", error);
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

export const updateUserProgress = async (courseId: number, userId: number) => {
  try {
    const res = await axios.put(
      `${URL}/user/progress/update/${courseId}/${userId}`
    );
    return res.status;
  } catch (error) {
    console.error("Failed to update progress:", error);
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

export const getUserProgressAPI = async (courseId: number, userId: number) => {
  try {
    const res = await axios.get(`${URL}/user/progress/${courseId}/${userId}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch progress:", error);
    return [];
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

// Subject API
export const getLessonSubjectsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/lesson/all/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch subjects:", error);
    return {};
  }
};

export const getSubjectAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/subject/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch subject:", error);
    return [];
  }
};

//Quiz API
export const getModuleQuizAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/quiz/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch quiz:", error);
    return {};
  }
};

export const getQuizQuestionsAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/quiz/all/questions/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    return {};
  }
};

//QuestionAPI
export const getQuestionAnswersAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/question/all/answers/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch answers:", error);
    return {};
  }
};

export const checkAnswerAPI = async (questionId: number, answer: number) => {
  try {
    const res = await axios.put(`${URL}/question/${questionId}/${answer}`);

    console.log(res.status);
    return res.status;
  } catch (error) {
    console.error("Failed to check answer:", error);
    return {};
  }
};

// LearningAPI
export const getLearningAPI = async (id: number) => {
  try {
    const res = await axios.get(`${URL}/learning/${id}`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch learning data:", error);
    return {};
  }
};

//Report
export const addReportAPI = async (report: IReportCreation) => {
  try {
    const res = await axios.post(`${URL}/report`, report);
    return res.data;
  } catch (error) {
    console.error("Failed to add report:", error);
    return {};
  }
};
