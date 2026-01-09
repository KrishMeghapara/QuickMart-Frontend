import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import ProfilePictureUpload from './ProfilePictureUpload';

const ProfilePictureTest = () => {
  const { user, token } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Alert severity="warning">
          Please log in to test the profile picture functionality.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Profile Picture Test
      </Typography>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Current User Info
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Name:</strong> {user.userName || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Email:</strong> {user.email || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Profile Picture:</strong> {user.profilePicture || 'None'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Google Picture:</strong> {user.googlePicture || 'None'}
          </Typography>
        </CardContent>
      </Card>

      <ProfilePictureUpload 
        user={user} 
        onProfileUpdate={(updatedUser) => {
          console.log('Profile updated:', updatedUser);
          // You can add a callback here to update the user context
        }}
      />

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Instructions
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            1. Click "Upload" to select a JPG/JPEG image file (max 5MB)
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            2. Preview the image and click "Upload" to save it
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            3. Use "Remove" to delete the current profile picture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            4. The profile picture will be displayed in the main profile card
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePictureTest;
