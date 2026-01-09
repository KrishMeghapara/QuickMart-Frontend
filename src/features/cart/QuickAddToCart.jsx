import React, { useState } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Fade,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart as CartIcon 
} from '@mui/icons-material';

export default function QuickAddToCart({ 
  product, 
  onAddToCart, 
  cartQuantity = 0,
  onUpdateQuantity 
}) {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAdd = () => {
    if (cartQuantity === 0) {
      onAddToCart(product);
    } else {
      onUpdateQuantity(product.productID, cartQuantity + 1);
    }
    setShowSuccess(true);
  };

  const handleRemove = () => {
    if (cartQuantity > 1) {
      onUpdateQuantity(product.productID, cartQuantity - 1);
    } else {
      onUpdateQuantity(product.productID, 0);
    }
  };

  if (cartQuantity === 0) {
    return (
      <>
        <IconButton
          onClick={handleAdd}
          disabled={product.stockQuantity === 0}
          sx={{
            backgroundColor: 'var(--brand)',
            color: 'white',
            width: 40,
            height: 40,
            '&:hover': {
              backgroundColor: 'var(--brand-2)',
              transform: 'scale(1.05)',
            },
            '&:disabled': {
              backgroundColor: '#d1d5db',
              color: '#9ca3af'
            }
          }}
        >
          <AddIcon />
        </IconButton>
        
        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            Added to cart!
          </Alert>
        </Snackbar>
      </>
    );
  }

  return (
    <Fade in={true}>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'white',
        borderRadius: '20px',
        border: '2px solid var(--brand)',
        padding: '4px'
      }}>
        <IconButton
          size="small"
          onClick={handleRemove}
          sx={{ 
            color: 'var(--brand)',
            width: 28,
            height: 28
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
        
        <Typography sx={{ 
          mx: 1, 
          minWidth: 20, 
          textAlign: 'center',
          fontWeight: 600,
          color: 'var(--brand)'
        }}>
          {cartQuantity}
        </Typography>
        
        <IconButton
          size="small"
          onClick={handleAdd}
          sx={{ 
            color: 'var(--brand)',
            width: 28,
            height: 28
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>
    </Fade>
  );
}