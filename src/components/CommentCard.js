import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const CommentCard = ({ comment }) => {
  return (
    <Card sx={{ marginBottom: 1 }}>
      <CardContent>
        <Typography variant="body1">Comment ID: {comment.id}</Typography>
        <Typography variant="body1">Content: {comment.content}</Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
