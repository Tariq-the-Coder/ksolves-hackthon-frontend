import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const API_URL = `https://ksolves-hackathon-backend.onrender.com/api`;  // Update with your API URL if needed

// Create a default unauthenticated Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to create an authenticated Axios instance
const getAuthApi = (token) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',  // Ensure correct format
    },
  });
};

// API function to handle login
export const login = (username, password) =>
  api.post('/auth/login', { username, password });

// API function to handle registration
export const register = (username, password, role) =>
  api.post('/auth/register', { username, password, role });

// Hook to wrap API methods requiring authentication
export const useAuthApi = () => {
  const { token } = useContext(AuthContext);
  const authApi = getAuthApi(token);

  // Authenticated API function to get all classes
  const getClasses = async () => {
    return await authApi.get('/classes');
  };

  const enrollInClass = async (classId) => {
    return await authApi.post(`/classes/${classId}/enroll`);
  };

  // Authenticated API function to get a specific class by ID
  const getClassById = async (id) => {
    return await authApi.get(`/classes/${id}`);
  };

  // Authenticated API function to create a class
  const createClass = async (name, instructorId) => {
    return await authApi.post('/classes', { name, instructor: instructorId });
  };

  // API function to add a unit to a class
  const addUnit = async (classId, unit) => {
    return await authApi.post(`/classes/${classId}/units`, { ...unit });
  };

  // API function to get all units in a class
  const getUnits = async (classId) => {
    return await authApi.get(`/classes/${classId}/units`);
  };

  // API function to add a session to a specific unit
  const addSession = async (classId, unitId, session) => {
    return await authApi.post(`/classes/${classId}/units/${unitId}/sessions`, session);
  };

  // API function to get all sessions in a unit
  const getSessions = async (classId, unitId) => {
    return await authApi.get(`/classes/${classId}/units/${unitId}/sessions`);
  };

  const createLecture = async (sessionId, lectureData) => {
    return await authApi.post(`/sessions/${sessionId}/lectures`, lectureData);
  };
  const getLectures = async (sessionId) => {
    return await authApi.get(`/sessions/${sessionId}/lectures`);
  };


  // API function to create a comment
  const createComment = async (content, sessionId, parentCommentId) => {
    return await authApi.post('/comments', { content, sessionId, parentCommentId });
  };

  // API function to join a class
  const joinClass = async (classId) => {
    try {
      return await authApi.post(`/classes/${classId}/join`);
    } catch (error) {
      throw error;
    }
  };

  // API function to delete a class
  const deleteClass = async (classId) => {
    try {
      const response = await authApi.delete(`/classes/${classId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting class:', error);
      throw error;
    }
  };

  return {
  getClasses,
  enrollInClass,
  getClassById,
  createClass,
  addUnit,
  getUnits,
  addSession,  // Ensure this is included
  getSessions,
  createComment,
  joinClass,
  deleteClass,
  createLecture,
    getLectures,

  };
};

export default api;
