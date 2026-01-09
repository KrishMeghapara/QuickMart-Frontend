import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  ErrorOutline as ErrorIcon,
  Wifi as WifiIcon
} from '@mui/icons-material';

export default function RetryComponent({ 
  error, 
  onRetry, 
  loading = false,
  title = "Something went wrong",
  description = "Please check your connection and try again"
}) {
  const [retryCount, setRetryCount] = useState(0);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    onRetry();
  };

  const getErrorMessage = () => {
    if (error?.message?.includes('Network')) {
      return "Network connection error. Please check your internet connection.";
    }
    if (error?.message?.includes('404')) {
      return "The requested resource was not found.";
    }
    if (error?.message?.includes('500')) {
      return "Server error. Please try again later.";
    }
    return error?.message || description;
  };

  return (
    <Box sx={{ 
      textAlign: 'center', 
      py: 6,
      px: 3,
      border: '2px dashed #e5e7eb',
      borderRadius: 3,
      backgroundColor: '#f9fafb'
    }}>
      <Box sx={{
        width: 72,
        height: 72,
        borderRadius: '50%',
        backgroundColor: '#fef2f2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mx: 'auto',
        mb: 3
      }}>
        {error?.message?.includes('Network') ? (
          <WifiIcon sx={{ fontSize: 32, color: '#ef4444' }} />
        ) : (
          <ErrorIcon sx={{ fontSize: 32, color: '#ef4444' }} />
        )}
      </Box>
      
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600, color: '#111827' }}>
        {title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
        {getErrorMessage()}
      </Typography>

      {retryCount > 2 && (
        <Alert severity="warning" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
          Multiple retry attempts failed. Please check your connection or try again later.
        </Alert>
      )}
      
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <RefreshIcon />}
        onClick={handleRetry}
        disabled={loading}
        sx={{
          backgroundColor: '#7c3aed',
          '&:hover': { backgroundColor: '#6d28d9' },
          '&:disabled': { backgroundColor: '#d1d5db' }
        }}
      >
        {loading ? 'Retrying...' : `Try Again${retryCount > 0 ? ` (${retryCount})` : ''}`}
      </Button>
    </Box>
  );
}