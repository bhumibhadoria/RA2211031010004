import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://20.244.56.144/test',
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // ✅ Replace with your actual token
  }
});

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    console.log("API Response - Users:", response.data);
    return response.data.users || {};
  } catch (error) {
    console.error('Error fetching users:', error.response?.data || error.message);
    return {};
  }
};

// Fetch posts for a given user
export const fetchPosts = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    console.log(`API Response - Posts for User ${userId}:`, response.data);
    return response.data.posts || [];
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error.response?.data || error.message);
    return [];
  }
};

// Fetch comments for a given post
export const fetchComments = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.response?.data || error.message);
    return [];
  }
};
