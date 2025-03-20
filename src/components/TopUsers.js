import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchPosts } from '../api';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const usersData = await fetchUsers();
        
        const usersWithPostCount = await Promise.all(
          Object.keys(usersData || {}).map(async (userId) => {
            const posts = await fetchPosts(userId);
            return { userId, name: usersData[userId], postCount: posts.length };
          })
        );

        const sortedUsers = usersWithPostCount.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
        setTopUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };

    fetchTopUsers();
  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      {topUsers.map((user) => (
        <div key={user.userId}>
          <p>{user.name} - {user.postCount} posts</p>
        </div>
      ))}
    </div>
  );
};

export default TopUsers;
