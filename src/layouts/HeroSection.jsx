import React from 'react';
import { Box, Typography, Button, Container, Grid, Card, CardContent } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const HeroContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #F5F6FA, #E0F2FE)',
  color: 'var(--text)',
  padding: theme.spacing(10, 0),
  position: 'relative',
  overflow: 'hidden',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
    `,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100px',
    background: 'linear-gradient(to top, rgba(248, 250, 252, 0.1), transparent)',
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: 'var(--surface)',
  borderRadius: '14px',
  padding: '28px',
  textAlign: 'center',
  boxShadow: 'var(--card-shadow)',
  border: '1px solid rgba(16,24,40,0.03)',
  transition: 'transform 200ms ease, box-shadow 200ms ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-6px)',
    boxShadow: '0 18px 30px rgba(16,24,40,0.08)',
  }
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  background: 'var(--accent-gradient)',
  color: '#ffffff',
  fontWeight: 700,
  padding: theme.spacing(1.5, 4),
  borderRadius: '50px',
  fontSize: '1.2rem',
  textTransform: 'none',
  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
  border: 'none',
  '&:hover': {
    background: 'linear-gradient(135deg, #38BDF8, #0EA5E9)',
    transform: 'translateY(-2px) scale(1.03)',
    boxShadow: 'var(--glow-blue)',
  },
  '&:active': {
    transform: 'translateY(0)',
  }
}));

const FloatingIcon = styled(Box)(({ theme }) => ({
  animation: `${float} 3s ease-in-out infinite`,
  '&:nth-of-type(2n)': {
    animationDelay: '1s',
  },
  '&:nth-of-type(3n)': {
    animationDelay: '2s',
  }
}));

export default function HeroSection() {
  const features = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 48 }} />,
      title: 'Free Delivery',
      description: 'On orders above ₹500',
      color: 'var(--success)'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 48 }} />,
      title: '12 Min Delivery',
      description: 'Lightning fast service',
      color: 'var(--warning)'
    },
    {
      icon: <VerifiedIcon sx={{ fontSize: 48 }} />,
      title: 'Quality Assured',
      description: '100% fresh products',
      color: 'var(--brand)'
    },
    {
      icon: <LocalOfferIcon sx={{ fontSize: 48 }} />,
      title: 'Best Prices',
      description: 'Unbeatable deals daily',
      color: 'var(--danger)'
    }
  ];

  return (
    <HeroContainer>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              animation: `${slideInLeft} 1s ease-out`,
              textAlign: { xs: 'center', md: 'left' }
            }}>
              <Typography 
                variant="h1" 
                component="h1" 
                sx={{ 
                  fontWeight: 900,
                  mb: 3,
                  color: '#111827',
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                  lineHeight: 1.1,
                  letterSpacing: '-2px'
                }}
              >
                Fresh Groceries
                <br />
                <Box component="span" sx={{ 
                  color: 'var(--brand)',
                }}>
                  Delivered Fast
                </Box>
              </Typography>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4, 
                  color: '#374151',
                  lineHeight: 1.6,
                  fontSize: { xs: '1.1rem', md: '1.3rem' },
                  fontWeight: 400,
                  maxWidth: '500px',
                  mx: { xs: 'auto', md: 0 }
                }}
              >
                Get your daily essentials delivered to your doorstep in just 12 minutes. 
                Fresh, quality products at unbeatable prices with zero delivery charges.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            
                <AnimatedButton
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Shop Now
                </AnimatedButton>

                <Button 
                  variant="outlined" 
                  size="large"
                  sx={{ 
                    borderColor: 'var(--brand)',
                    color: 'var(--brand)',
                    background: 'transparent',
                    fontWeight: 600,
                    borderRadius: '50px',
                    px: 3,
                    '&:hover': {
                      borderColor: 'var(--brand-2)',
                      color: 'var(--brand-2)',
                      backgroundColor: 'rgba(124, 58, 237, 0.05)',
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ animation: `${slideInRight} 1s ease-out 0.3s both` }}>
              <Grid container spacing={3}>
                {features.map((feature, index) => (
                  <Grid item xs={6} key={index}>
                    <FeatureCard sx={{ 
                      animationDelay: `${index * 0.2}s`,
                      animation: `${slideInRight} 0.8s ease-out both`
                    }}>
                      <CardContent sx={{ 
                        textAlign: 'center', 
                        p: 0,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        '&:last-child': { pb: 0 }
                      }}>
                        <FloatingIcon sx={{ mb: 2, color: feature.color }}>
                          {feature.icon}
                        </FloatingIcon>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: '1.1rem', color: '#111827' }}>
                          {feature.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </HeroContainer>
  );
}