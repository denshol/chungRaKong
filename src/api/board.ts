// src/api/board.ts
import axios from 'axios';
import {Post, Comment} from '../types/board';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const boardAPI = {
  getPosts: async (page: number = 1, limit: number = 10) => {
    const response = await axios.get(`${API_URL}/posts`, {
      params: {page, limit},
    });
    return response.data;
  },

  getPost: async (id: string) => {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  },

  createPost: async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  },

  updatePost: async (id: string, post: Partial<Post>) => {
    const response = await axios.put(`${API_URL}/posts/${id}`, post);
    return response.data;
  },

  deletePost: async (id: string) => {
    const response = await axios.delete(`${API_URL}/posts/${id}`);
    return response.data;
  },
};
