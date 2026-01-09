import React, { useState, useRef } from 'react';
import {
  Box,
  Avatar,
  Button,
  IconButton,
  Typography,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import apiService from '../../services/apiService';

const ProfilePictureUpload = ({ user, onProfileUpdate }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/jpg')) {
      setError('Please select a JPG/JPEG image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
      setShowPreview(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!fileInputRef.current?.files[0]) return;

    try {
      setIsUploading(true);
      setError('');
      setSuccess('');

      const file = fileInputRef.current.files[0];
      const result = await apiService.uploadProfilePicture(file);

             if (result.success) {
         setSuccess('Profile picture uploaded successfully!');
         // Update the user context with new profile picture
         if (onProfileUpdate) {
           onProfileUpdate({ ...user, profilePicture: result.profilePictureUrl });
         }
         setShowPreview(false);
         setPreviewImage(null);
         // Clear the file input
         if (fileInputRef.current) {
           fileInputRef.current.value = '';
         }
         // Force a page refresh to show the new profile picture
         setTimeout(() => {
           window.location.reload();
         }, 1000);
       }
    } catch (error) {
      setError(error.message || 'Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsRemoving(true);
      setError('');
      setSuccess('');

      const result = await apiService.removeProfilePicture();

      if (result.success) {
        setSuccess('Profile picture removed successfully!');
        // Update the user context to remove profile picture
        if (onProfileUpdate) {
          onProfileUpdate({ ...user, profilePicture: null });
        }
      }
    } catch (error) {
      setError(error.message || 'Failed to remove profile picture');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleCancel = () => {
    setShowPreview(false);
    setPreviewImage(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getProfilePictureUrl = () => {
    if (user?.profilePicture) {
      // If it's a relative path, prepend the API base URL
      if (user.profilePicture.startsWith('/')) {
        return `http://localhost:5236${user.profilePicture}`;
      }
      // If it's already a full URL, return as is
      if (user.profilePicture.startsWith('http')) {
        return user.profilePicture;
      }
      // Otherwise, assume it's a relative path
      return `http://localhost:5236${user.profilePicture}`;
    }
    return null;
  };

  const profilePictureUrl = getProfilePictureUrl();

  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Profile Picture
        </Typography>

        {/* Error and Success Messages */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Current Profile Picture */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
          <Avatar
            src={profilePictureUrl}
            sx={{
              width: 120,
              height: 120,
              mb: 2,
              border: '3px solid #e0e0e0'
            }}
          >
            {user?.userName?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<PhotoCameraIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading || isRemoving}
            >
              {profilePictureUrl ? 'Change' : 'Upload'}
            </Button>

            {profilePictureUrl && (
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleRemove}
                disabled={isUploading || isRemoving}
              >
                Remove
              </Button>
            )}
          </Box>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/jpg"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </Box>

                 {/* File Upload Info */}
         <Typography variant="body2" color="text.secondary" align="center">
           Supported formats: JPG, JPEG (max 5MB)
         </Typography>
         
         {/* Debug Info - Remove this in production */}
         {profilePictureUrl && (
           <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 1, display: 'block' }}>
             Debug: {profilePictureUrl}
           </Typography>
         )}
      </CardContent>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onClose={handleCancel} maxWidth="sm" fullWidth>
        <DialogTitle>
          Preview Profile Picture
          <IconButton
            aria-label="close"
            onClick={handleCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2 }}>
            <Avatar
              src={previewImage}
              sx={{
                width: 200,
                height: 200,
                mb: 2,
                border: '3px solid #e0e0e0'
              }}
            />
            <Typography variant="body2" color="text.secondary" align="center">
              This is how your profile picture will look
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={16} /> : <EditIcon />}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProfilePictureUpload;
