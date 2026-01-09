import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Alert
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  Home as HomeIcon,
  ErrorOutline as ErrorIcon
} from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          p: 3,
          backgroundColor: '#f9fafb'
        }}>
          <Card sx={{ maxWidth: 500, textAlign: 'center', borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <ErrorIcon sx={{ fontSize: 64, color: '#ef4444', mb: 2 }} />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 700, color: '#111827' }}>
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                We're sorry for the inconvenience. Please try refreshing the page or go back to home.
              </Typography>
              
              {process.env.NODE_ENV === 'development' && (
                <Alert severity="error" sx={{ mb: 3, textAlign: 'left' }}>
                  <Typography variant="caption">
                    {this.state.error?.toString()}
                  </Typography>
                </Alert>
              )}
              
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={() => window.location.reload()}
                  sx={{ borderColor: '#7c3aed', color: '#7c3aed' }}
                >
                  Refresh Page
                </Button>
                <Button
                  variant="contained"
                  startIcon={<HomeIcon />}
                  onClick={() => window.location.href = '/'}
                  sx={{ 
                    backgroundColor: '#7c3aed',
                    '&:hover': { backgroundColor: '#6d28d9' }
                  }}
                >
                  Go Home
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;