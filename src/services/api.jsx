import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const API_URL = `http://localhost:5000/api`;

// Create a default unauthenticated Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to create an authenticated Axios instance
const getAuthApi = (token) => {
  console.log('Token in Authorization header:', token);  // Log token for debugging
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

  // Authenticated API function to get a specific class by ID
  const getClassById = async (id) => {
    return await authApi.get(`/classes/${id}`);
  };

  // Authenticated API function to create a class
  const createClass = async (name, instructorId) => {
    console.log('Creating class with:', { name, instructor: instructorId });
    try {
      const response = await authApi.post('/classes', { name, instructor: instructorId });
      return response.data;
    } catch (error) {
      console.error('Error creating class:', error);
      throw error;
    }
  };

  // API function to add a unit to a class
  const addUnitToClass = async (classId, unit) => {
    return await authApi.post(`/units`, { ...unit, classId });
  };

  // API function to get all units in a class
  const getUnits = async (classId) => {
    return await authApi.get(`/units?classId=${classId}`);
  };

  // API function to create a new unit
  const createUnit = async (name, classId) => {
    return await authApi.post('/units', { name, classId });
  };

  // API function to get all sessions in a unit
  const getSessions = async (unitId) => {
    return await authApi.get(`/sessions?unitId=${unitId}`);
  };

  // API function to create a new session with lectures
  const createSession = async (title, unitId, lectures) => {
    return await authApi.post('/sessions', { title, unitId, lectures });
  };

  // API function to get comments on a session
  const getComments = async (sessionId) => {
    return await authApi.get(`/comments?sessionId=${sessionId}`);
  };

  // API function to create a comment
  const createComment = async (content, sessionId, parentCommentId) => {
    return await authApi.post('/comments', { content, sessionId, parentCommentId });
  };

  // API function to join a class
  const joinClass = async (classId) => {
    return await authApi.post(`/classes/${classId}/join`);
  };

  return {
    getClasses,
    getClassById,
    createClass,
    addUnitToClass,
    getUnits,
    createUnit,
    getSessions,
    createSession,
    getComments,
    createComment,
    joinClass,
  };
};

export default api;
