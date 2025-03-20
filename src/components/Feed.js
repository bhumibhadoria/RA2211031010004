import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPosts } from '../api';
import PostCard from './PostCard';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);

        const allPosts = await Promise.all(
          Object.keys(usersData || {}).map(async (userId) => {
            const userPosts = await fetchPosts(userId);
            return userPosts.map((post) => ({ ...post, userId, username: usersData[userId] }));
          })
        );

        setPosts(allPosts.flat().sort((a, b) => b.id - a.id));
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
    };

    fetchFeed();

    // Set up interval to refresh posts every 10 seconds (Real-time updates)
    const interval = setInterval(fetchFeed, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p>Loading or no posts available.</p>
      )}
    </div>
  );
};

export default Feed;
