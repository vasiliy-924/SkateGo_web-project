import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Rating,
  Box,
  Paper,
  Divider
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const ReviewList = ({ reviews }) => {
  return (
    <Paper elevation={0} sx={{ bgcolor: 'background.default' }}>
      <List>
        {reviews.map((review, index) => (
          <React.Fragment key={review.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle1" component="span">
                      {review.user.username}
                    </Typography>
                    <Rating value={review.rating} readOnly size="small" />
                  </Box>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                      sx={{ display: 'block', mb: 1 }}
                    >
                      {review.comment}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {index < reviews.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default ReviewList; 