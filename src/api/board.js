// src/api/board.js
import api from './axios';

export const boardAPI = {
  // 게시글 목록 조회
  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await api.get(`/posts?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('게시글 목록 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 상세 조회
  getPost: async id => {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      console.error('게시글 상세 조회 실패:', error);
      throw error;
    }
  },

  // 게시글 작성
  createPost: async data => {
    try {
      const response = await api.post('/posts', data);
      return response.data;
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      throw error;
    }
  },

  // 댓글 작성
  createComment: async (postId, content) => {
    try {
      const response = await api.post(`/posts/${postId}/comments`, {content});
      return response.data;
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      throw error;
    }
  },
};
