import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PostCard = ({ post }) => {
  const randomImage = `https://source.unsplash.com/random/300x200?sig=${post.id}`; // Random Image

  return (
    <Card sx={{ marginBottom: 2 }}>
      <CardContent>
        <img src={randomImage} alt="Random Post" style={{ width: '100%', height: '150px' }} />
        <Typography variant="h6">{post.username || "Unknown User"}</Typography>
        <Typography variant="body1">{post.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
