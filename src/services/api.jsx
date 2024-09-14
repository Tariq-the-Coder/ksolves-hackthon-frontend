import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) =>
  api.post('/auth/login', { username, password });

export const register = (username, password, role) =>
  api.post('/auth/register', { username, password, role });

export const getClasses = () => api.get('/classes');
export const getClassById = (id) => api.get(`/classes/${id}`);
export const createClass = (name, instructor) =>
  api.post('/classes', { name, instructor });

export const getUnits = (classId) => api.get(`/units?classId=${classId}`);
export const createUnit = (name, classId) =>
  api.post('/units', { name, classId });

export const getSessions = (unitId) => api.get(`/sessions?unitId=${unitId}`);
export const createSession = (title, unitId, lectures) =>
  api.post('/sessions', { title, unitId, lectures });

export const getComments = (sessionId) => api.get(`/comments?sessionId=${sessionId}`);
export const createComment = (content, sessionId, parentCommentId) =>
  api.post('/comments', { content, sessionId, parentCommentId });

export default api;
