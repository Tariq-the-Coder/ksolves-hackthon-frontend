// api.js
import axios from 'axios';

const API_URL = `https://ksolves-hackathon-backend.onrender.com/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getInstructorIdByUsername = async (username) => {
  const response = await api.get(`/auth/findByUsername?username=${username}`);
  return response._id; // Adjust this if your actual response structure differs
};

export const login = (username, password) =>
  api.post('/auth/login', { username, password });

export const register = (username, password, role) =>
  api.post('/auth/register', { username, password, role });

export const getClasses = () => api.get('/classes');
export const getClassById = (id) => api.get(`/classes/${id}`);
export const createClass = (name, instructorId) =>
  api.post('/classes', { name, instructor: instructorId });


// New function to add a unit to a class
export const addUnitToClass = (classId, unit) =>
  api.post(`/units`, { ...unit, classId });

export const getUnits = (classId) => api.get(`/units?classId=${classId}`);
export const createUnit = (name, classId) =>
  api.post('/units', { name, classId });

export const getSessions = (unitId) => api.get(`/sessions?unitId=${unitId}`);
export const createSession = (title, unitId, lectures) =>
  api.post('/sessions', { title, unitId, lectures });

export const getComments = (sessionId) => api.get(`/comments?sessionId=${sessionId}`);
export const createComment = (content, sessionId, parentCommentId) =>
  api.post('/comments', { content, sessionId, parentCommentId });

export const joinClass = (classId) => api.post(`/classes/${classId}/join`);



export default api;
