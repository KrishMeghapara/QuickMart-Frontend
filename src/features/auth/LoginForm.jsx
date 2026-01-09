import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Alert, 
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  CircularProgress,
  Divider,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip
} from '@mui/material';
import apiService from '../../services/apiService';
import GoogleLoginButton from './GoogleLoginButton';
import { 
  Email as EmailIcon, 
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Storefront as StorefrontIcon,
  ShoppingCart,
  LocalShipping,
  Redeem,
  Security,
  CheckCircle,
  Star
} from '@mui/icons-material';
import { colors, shadows } from '../../theme/designTokens';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value && value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await apiService.login({ Email: email, Password: password });
      
      if (data.Token || data.token) {
        onLogin(data.Token || data.token, {
          UserID: data.UserID,
          UserName: data.UserName,
          Email: data.Email,
          AddressID: data.AddressID
        });
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
      display: 'flex',
      alignItems: 'center',
      py: 4
    }}>
    <Container maxWidth="lg">
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Quick Commerce Brand */}
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={800}>
            <Box sx={{ textAlign: { xs: 'center', md: 'left' }, mb: { xs: 4, md: 0 } }}>
              {/* Brand Section */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, mb: 3 }}>
                  <Box sx={{ fontSize: '3rem', mr: 2 }}>⚡</Box>
                  <Typography sx={{ 
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    fontSize: '2.5rem',
                    background: 'linear-gradient(45deg, #10b981 0%, #059669 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>
                    QuickMart
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ mb: 2, color: '#111827', fontSize: '2rem', fontWeight: 700 }}>
                  Groceries in 12 minutes
                </Typography>
                <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 400, mb: 3 }}>
                  Sign in to get fresh groceries delivered to your doorstep
                </Typography>
              </Box>

              {/* Quick Commerce Features */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { icon: '⚡', text: '12-minute delivery', subtext: 'Lightning fast to your door', color: '#10b981' },
                    { icon: '🥬', text: 'Fresh groceries', subtext: 'Farm to your home', color: '#10b981' },
                    { icon: '📍', text: 'Hyperlocal', subtext: 'Serving your area', color: '#10b981' },
                    { icon: '🔒', text: 'Secure payments', subtext: '100% safe & protected', color: '#10b981' }
                  ].map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1 }}>
                      <Box sx={{ 
                        fontSize: '2rem',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        borderRadius: 2
                      }}>
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: '#111827' }}>
                          {feature.text}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280' }}>
                          {feature.subtext}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>


            </Box>
          </Fade>
        </Grid>

        {/* Right Side - Login Form */}
        <Grid item xs={12} md={6}>
          <Fade in={true} timeout={1000}>
            <Card sx={{ 
              maxWidth: 480, 
              mx: 'auto',
              borderRadius: 3,
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              border: '1px solid #f1f5f9',
              background: 'white'
            }}>
              <CardContent sx={{ p: 5 }}>
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, color: '#1e293b' }}>
                    Sign In
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    Access your account to start shopping
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={!!emailError}
                    helperText={emailError}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#94a3b8'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                          boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePasswordChange}
                    error={!!passwordError}
                    helperText={passwordError}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#94a3b8'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2563eb',
                          boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)'
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      py: 2,
                      mb: 3,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                      },
                      '&:disabled': {
                        background: '#cbd5e0',
                        transform: 'none'
                      }
                    }}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                  >
                    {loading ? 'Signing In...' : 'Sign In & Start Shopping'}
                  </Button>
                </Box>

                {/* Divider */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Divider sx={{ flex: 1 }} />
                  <Typography variant="body2" sx={{ px: 2, color: 'text.secondary' }}>
                    or
                  </Typography>
                  <Divider sx={{ flex: 1 }} />
                </Box>

                {/* Google Login Button */}
                <GoogleLoginButton 
                  onLogin={onLogin} 
                  disabled={loading}
                />

                {/* Footer */}
                <Box sx={{ textAlign: 'center', mt: 3 }}>
                  <Typography variant="body2" sx={{ color: '#6b7280' }}>
                    Don't have an account?{' '}
                    <Button 
                      variant="text" 
                      onClick={() => window.location.href = '/register'}
                      sx={{ 
                        color: '#10b981',
                        fontWeight: 600,
                        textTransform: 'none',
                        p: 0,
                        minWidth: 'auto',
                        '&:hover': {
                          bgcolor: 'rgba(16, 185, 129, 0.1)',
                          color: '#059669'
                        }
                      }}
                    >
                      Create one now
                    </Button>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default LoginForm;