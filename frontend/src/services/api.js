import axios from 'axios';

// Backend URL
const API_URL = 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH API CALLS

// Register new user
export const register = async (username, email, password) => {
  const response = await api.post('/auth/register', {
    username,
    email,
    password,
  });
  return response.data;
};

// Login user
export const login = async (email, password) => {
  const response = await api.post('/auth/login', {
    email,
    password,
  });
  
  // Save token to localStorage
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

// Logout user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Get current user from localStorage
// Get current user from localStorage
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error('Error parsing user:', error);
    return null;
  }
};
// Check if user is logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// NOTES API CALLS

// Get all notes
export const getAllNotes = async () => {
  const response = await api.get('/notes');
  return response.data;
};

// Get single note
export const getNote = async (id) => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
};

// Create new note
export const createNote = async (title, content) => {
  const response = await api.post('/notes', {
    title,
    content,
  });
  return response.data;
};

// Update note
export const updateNote = async (id, title, content) => {
  const response = await api.put(`/notes/${id}`, {
    title,
    content,
  });
  return response.data;
};

// Delete note
export const deleteNote = async (id) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};