import React from 'react';
import { Box, Container, Typography, Button, Grid, Stack } from '@mui/material';
import { LocalShipping, Security, CheckCircle, AssignmentReturn } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { colors, transitions, shadows } from '../theme/designTokens';

export default function ModernHero() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{
      background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.success[600]} 100%)`,
      color: 'white',
      py: 8,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 70% 20%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)',
      }
    }}>
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container alignItems="center" spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" sx={{ 
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              fontSize: '3rem',
              mb: 2,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              ⚡ Quick Commerce
            </Typography>
            <Typography sx={{ 
              fontSize: '1.4rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.95)',
              maxWidth: '500px',
              lineHeight: 1.4,
              mb: 2
            }}>
              Groceries delivered in 12 minutes
            </Typography>
            <Typography sx={{ 
              fontSize: '1.1rem',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              maxWidth: '500px',
              lineHeight: 1.6,
              mb: 4
            }}>
              Fresh groceries, daily essentials & more delivered to your doorstep in minutes
            </Typography>
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ mb: 4 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleShopNow}
                sx={{
                  bgcolor: '#2563eb',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#1d4ed8',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)'
                  }
                }}
              >
                🛍️ Shop Now
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/category/1')}
                sx={{
                  color: '#2563eb',
                  borderColor: '#2563eb',
                  bgcolor: 'white',
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    bgcolor: '#f0f7ff',
                    borderColor: '#1d4ed8',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                📂 Browse Categories
              </Button>
            </Stack>
            <Grid container spacing={2}>
              {[
                { emoji: '⚡', title: '12 Min Delivery', desc: 'Fastest in the city' },
                { emoji: '🥬', title: 'Fresh Produce', desc: 'Farm to your door' },
                { emoji: '🏪', title: '10,000+ Products', desc: 'Everything you need' },
                { emoji: '📍', title: 'Hyperlocal', desc: 'Serving your area' }
              ].map((feature, idx) => (
                <Grid item xs={6} key={idx}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <Box sx={{ fontSize: '1.75rem', lineHeight: 1 }}>{feature.emoji}</Box>
                    <Box>
                      <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', mb: 0.25 }}>
                        {feature.title}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)' }}>
                        {feature.desc}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: '400px' }}>
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    position: 'absolute',
                    width: '200px',
                    height: '240px',
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: shadows.large,
                    top: `${i * 60}px`,
                    left: `${i * 80}px`,
                    animation: `float${i} 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                    '@keyframes float0': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-20px)' }
                    },
                    '@keyframes float1': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-15px)' }
                    },
                    '@keyframes float2': {
                      '0%, 100%': { transform: 'translateY(0px)' },
                      '50%': { transform: 'translateY(-25px)' }
                    }
                  }}
                >
                  <Box sx={{
                    width: '100%',
                    height: '140px',
                    background: `linear-gradient(135deg, ${colors.primary[400]}, ${colors.primary[600]})`,
                    borderRadius: '20px 20px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    opacity: 0.8
                  }}>
                    {['🛍️', '📦', '🚀'][i]}
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <Box sx={{ height: '8px', bgcolor: 'rgba(255,255,255,0.3)', borderRadius: '4px', mb: 1 }} />
                    <Box sx={{ height: '8px', bgcolor: 'rgba(255,255,255,0.2)', borderRadius: '4px', width: '60%' }} />
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
