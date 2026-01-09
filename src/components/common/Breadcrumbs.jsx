import React from 'react';
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { Home as HomeIcon, NavigateNext as NextIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);
  
  const breadcrumbNameMap = {
    '/': 'Home',
    '/login': 'Login',
    '/register': 'Register',
    '/profile': 'Profile',
    '/payment': 'Payment',
    '/cart': 'Cart'
  };

  if (pathnames.length === 0) return null;

  return (
    <Box sx={{ mb: 2, px: { xs: 2, md: 0 } }}>
      <MuiBreadcrumbs
        separator={<NextIcon fontSize="small" sx={{ color: '#9ca3af' }} />}
        sx={{
          '& .MuiBreadcrumbs-ol': {
            alignItems: 'center'
          }
        }}
      >
        <Link
          color="inherit"
          onClick={() => navigate('/')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            '&:hover': { color: '#4c1d95' }
          }}
        >
          <HomeIcon sx={{ mr: 0.5, fontSize: 18 }} />
          Home
        </Link>
        
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const name = breadcrumbNameMap[to] || value.charAt(0).toUpperCase() + value.slice(1);

          return last ? (
            <Typography key={to} color="text.primary" sx={{ fontWeight: 600, color: '#111827' }}>
              {name}
            </Typography>
          ) : (
            <Link
              key={to}
              color="inherit"
              onClick={() => navigate(to)}
              sx={{
                textDecoration: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                '&:hover': { color: '#4c1d95' }
              }}
            >
              {name}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Box>
  );
}