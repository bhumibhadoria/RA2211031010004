import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPosts, fetchComments } from '../api';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const usersData = await fetchUsers();

        const postsWithCommentCount = await Promise.all(
          Object.keys(usersData || {}).map(async (userId) => {
            const posts = await fetchPosts(userId);
            return Promise.all(
              posts.map(async (post) => {
                const comments = await fetchComments(post.id);
                return { ...post, commentCount: comments.length };
              })
            );
          })
        ).then((postsArray) => postsArray.flat());

        const maxCommentCount = Math.max(...postsWithCommentCount.map((post) => post.commentCount), 0);
        const trendingPosts = postsWithCommentCount.filter((post) => post.commentCount === maxCommentCount);
        setTrendingPosts(trendingPosts);
      } catch (error) {
        console.error("Error fetching trending posts:", error);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <h2>Trending Posts</h2>
      {trendingPosts.map((post) => (
        <div key={post.id}>
          <p>Post ID: {post.id} - {post.content} ({post.commentCount} comments)</p>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
