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
  Chip,
  LinearProgress
} from '@mui/material';
import { 
  Person as PersonIcon,
  Email as EmailIcon, 
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
  Storefront as StorefrontIcon,
  CheckCircle as CheckCircleIcon,
  ShoppingCart,
  LocalShipping,
  Security,
  Redeem,
  Star
} from '@mui/icons-material';
import GoogleLoginButton from './GoogleLoginButton';
import apiService from '../../services/apiService';

const RegisterForm = ({ onRegister }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation states
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = (strength) => {
    if (strength < 25) return '#ef4444';
    if (strength < 50) return '#f59e0b';
    if (strength < 75) return '#eab308';
    return '#10b981';
  };

  const getPasswordStrengthText = (strength) => {
    if (strength < 25) return 'Weak';
    if (strength < 50) return 'Fair';
    if (strength < 75) return 'Good';
    return 'Strong';
  };

  const handleUserNameChange = (e) => {
    const value = e.target.value;
    setUserName(value);
    if (value && value.length < 2) {
      setUserNameError('Username must be at least 2 characters');
    } else if (value && value.length > 50) {
      setUserNameError('Username must be less than 50 characters');
    } else {
      setUserNameError('');
    }
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
    
    // Check confirm password match
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value && value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!userName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (userName.length < 2) {
      setError('Username must be at least 2 characters');
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
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const data = await apiService.register({ 
        UserName: userName, 
        Email: email, 
        Password: password,
        ConfirmPassword: confirmPassword
      });
      
      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onRegister();
        }, 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = getPasswordStrength(password);

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
                  Start getting groceries in 12 minutes
                </Typography>
                <Typography variant="h6" sx={{ color: '#6b7280', fontWeight: 400, mb: 3 }}>
                  Create your account and experience the fastest grocery delivery
                </Typography>
              </Box>

              {/* Quick Commerce Features */}
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {[
                    { icon: '⚡', text: '12-minute delivery', subtext: 'Lightning fast to your door' },
                    { icon: '🥬', text: 'Fresh groceries', subtext: 'Farm to your home' },
                    { icon: '💰', text: 'Best prices', subtext: 'Save on every order' },
                    { icon: '🎁', text: 'Welcome offer', subtext: 'Get ₹100 off on first order' }
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

        {/* Right Side - Register Form */}
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
                    Create Account
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#64748b' }}>
                    Join QuickMart and get groceries in 12 minutes
                  </Typography>
                </Box>

                {success && (
                  <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                    Account created successfully! Redirecting to login...
                  </Alert>
                )}

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={userName}
                    onChange={handleUserNameChange}
                    error={!!userNameError}
                    helperText={userNameError}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#94a3b8'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#10b981',
                          boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
                        }
                      }
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                      ),
                    }}
                  />

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
                          borderColor: '#10b981',
                          boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
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
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#94a3b8'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#10b981',
                          boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
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

                  {/* Password Strength Indicator */}
                  {password && (
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          Password Strength
                        </Typography>
                        <Typography variant="caption" sx={{ color: getPasswordStrengthColor(passwordStrength) }}>
                          {getPasswordStrengthText(passwordStrength)}
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={passwordStrength} 
                        sx={{ 
                          height: 4, 
                          borderRadius: 2,
                          bgcolor: 'rgba(0,0,0,0.1)',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: getPasswordStrengthColor(passwordStrength)
                          }
                        }} 
                      />
                    </Box>
                  )}

                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    error={!!confirmPasswordError}
                    helperText={confirmPasswordError}
                    sx={{ 
                      mb: 3,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#94a3b8'
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#10b981',
                          boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.1)'
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
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                    sx={{
                      mt: 3,
                      mb: 2,
                      py: 2,
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: 2,
                      '&:hover': {
                        background: 'linear-gradient(135deg, #059669, #047857)',
                        transform: 'translateY(-1px)',
                        boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                      },
                      '&:disabled': {
                        background: '#cbd5e0'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account & Start Shopping'}
                  </Button>

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
                    onLogin={onRegister} 
                    disabled={loading || success}
                  />

                  {/* Footer */}
                  <Box sx={{ textAlign: 'center', mt: 3 }}>
                    <Typography variant="body2" sx={{ color: '#6b7280' }}>
                      Already have an account?{' '}
                      <Button 
                        variant="text" 
                        onClick={() => window.location.href = '/login'}
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
                        Sign in here
                      </Button>
                    </Typography>
                  </Box>
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

export default RegisterForm;