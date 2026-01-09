import React from 'react';
import { Button } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function BackButton({ to, children = 'Back' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      startIcon={<BackIcon />}
      onClick={handleBack}
      sx={{
        color: '#6b7280',
        fontWeight: 500,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'rgba(107, 114, 128, 0.1)',
          color: '#4c1d95'
        }
      }}
    >
      {children}
    </Button>
  );
}