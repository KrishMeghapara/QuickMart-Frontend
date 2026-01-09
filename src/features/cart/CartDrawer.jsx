import React, { useState } from "react";
import { 
  Drawer, 
  Box, 
  Typography, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  Button, 
  Divider, 
  Input,
  Avatar,
  Chip
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaymentIcon from '@mui/icons-material/Payment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useCart } from "./CartContext";
import { useNavigate } from 'react-router-dom';
import { CartSkeleton } from "../../components/common/LoadingStates";
import { useToast } from "../../components/common/ToastProvider";
import "./CartDrawer.css";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart, updateQuantity, clearCart, loading, error } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  const [savedForLater, setSavedForLater] = useState([]);
  const total = cart.reduce((sum, item) => sum + (item.product?.productPrice || 0) * item.quantity, 0);
  const deliveryTime = 12; // mins
  const freeDeliveryThreshold = 299;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - total);
  const deliveryFee = total >= freeDeliveryThreshold ? 0 : 29;

  // Suggested items for cart optimization
  const suggestedItems = [
    { id: 1, name: 'Milk - Amul Gold', price: 65, emoji: '🥛', reason: 'Often bought together' },
    { id: 2, name: 'Bread - Britannia', price: 25, emoji: '🍞', reason: 'Complete your breakfast' },
    { id: 3, name: 'Eggs - Farm Fresh', price: 84, emoji: '🥚', reason: 'Popular combo' },
    { id: 4, name: 'Bananas - Organic', price: 48, emoji: '🍌', reason: 'Healthy addition' }
  ];

  const saveForLater = (item) => {
    setSavedForLater(prev => [...prev, item]);
    removeFromCart(item.cartID);
    toast.info('Item saved for later');
  };

  const moveToCart = (item) => {
    setSavedForLater(prev => prev.filter(saved => saved.id !== item.id));
    // Add back to cart logic would go here
    toast.success('Item moved to cart');
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ 
        width: { xs: '100vw', sm: 420, md: 480 }, 
        maxWidth: '100vw',
        p: { xs: 2, sm: 3 }, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)',
        borderLeft: '1px solid var(--border)'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ShoppingBagIcon sx={{ mr: 1, color: '#10b981' }} />
          <Typography 
            variant="h5" 
            sx={{ 
              flexGrow: 1, 
              fontWeight: 700,
              color: 'var(--text)'
            }}
          >
            Shopping Cart
          </Typography>
          <Chip 
            label={`${cart.length} items`} 
            size="small" 
            sx={{ 
              background: 'linear-gradient(135deg, #10b981, #059669)', 
              color: 'white',
              fontWeight: 600,
              mr: 1,
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }} 
          />
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </Box>

        {/* Delivery Info */}
        <Box sx={{ 
          mb: 3, 
          p: 2, 
          bgcolor: 'rgba(16, 185, 129, 0.1)', 
          borderRadius: 2,
          border: '1px solid rgba(16, 185, 129, 0.2)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 18, color: '#10b981', mr: 1 }} />
            <Typography sx={{ fontWeight: 600, color: '#10b981' }}>
              Delivery in {deliveryTime} minutes
            </Typography>
          </Box>
          {remainingForFreeDelivery > 0 ? (
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              Add ₹{remainingForFreeDelivery} more for free delivery
            </Typography>
          ) : (
            <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
              🎉 You've qualified for free delivery!
            </Typography>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List sx={{ flexGrow: 1, overflow: 'auto' }}>
          {loading ? (
            <CartSkeleton />
          ) : error ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              color: '#ef4444'
            }}>
              <Typography variant="h6" sx={{ mb: 1 }}>Error loading cart</Typography>
              <Typography variant="body2">{error}</Typography>
            </Box>
          ) : cart.length === 0 ? (
            <Box sx={{ 
              textAlign: 'center', 
              py: 6,
              color: '#6b7280'
            }}>
              <ShoppingBagIcon sx={{ fontSize: 64, mb: 2, opacity: 0.3 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Your cart is empty</Typography>
              <Typography variant="body2">Add some products to get started!</Typography>
            </Box>
          ) : cart.map(item => (
            <ListItem 
              key={item.cartID} 
              alignItems="flex-start"
              sx={{ 
                mb: 2,
                background: 'var(--surface)',
                borderRadius: 2,
                boxShadow: 'var(--soft-shadow)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Avatar 
                sx={{ 
                  mr: 2, 
                  background: 'linear-gradient(135deg, #e0e7ff, #8b5cf6)',
                  color: 'white',
                  width: 48,
                  height: 48,
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
                }}
              >
                {item.product?.productName?.charAt(0) || 'P'}
              </Avatar>
              <ListItemText
                primary={<>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text)' }}>
                    {item.product?.productName || 'Product'}
                  </Typography>
                  <Chip 
                    label={`x${item.quantity}`} 
                    size="small" 
                    sx={{ 
                      bgcolor: 'var(--accent)', 
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      ml: 1
                    }} 
                  />
                </>}
                secondary={
                  <>
                    <Typography variant="body2" sx={{ color: 'var(--success)', fontWeight: 600 }}>
                      ₹{item.product?.productPrice || 0} each
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                      {item.product?.category?.categoryName || 'Category'}
                    </Typography>
                  </>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                  <IconButton 
                    size="small"
                    onClick={() => {
                      updateQuantity(item.cartID, Math.max(1, item.quantity - 1));
                      toast.info('Quantity updated');
                    }}
                    sx={{ 
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      width: 28,
                      height: 28,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: '#e5e7eb',
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>-</Typography>
                  </IconButton>
                  <Typography sx={{ 
                    mx: 1.5, 
                    minWidth: 20, 
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--text)'
                  }}>
                    {item.quantity}
                  </Typography>
                  <IconButton 
                    size="small"
                    onClick={() => {
                      updateQuantity(item.cartID, item.quantity + 1);
                      toast.info('Quantity updated');
                    }}
                    sx={{ 
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                      width: 28,
                      height: 28,
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        backgroundColor: '#e5e7eb',
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>+</Typography>
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                  <IconButton 
                    size="small"
                    onClick={() => saveForLater(item)}
                    sx={{ 
                      color: '#f59e0b',
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        bgcolor: 'rgba(245, 158, 11, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton 
                    size="small"
                    onClick={() => {
                      removeFromCart(item.cartID);
                      toast.success('Item removed from cart');
                    }}
                    sx={{ 
                      color: '#ef4444',
                      transition: 'all 0.2s ease',
                      '&:hover': { 
                        bgcolor: 'rgba(239, 68, 68, 0.1)',
                        transform: 'scale(1.1)'
                      }
                    }}
                  >
                    <DeleteIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>

        {/* Suggested Items Section */}
        {cart.length > 0 && (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text)', mb: 2 }}>
                🛒 Frequently bought together
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1 }}>
                {suggestedItems.slice(0, 3).map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      minWidth: 120,
                      p: 1.5,
                      bgcolor: 'rgba(16, 185, 129, 0.05)',
                      borderRadius: 2,
                      border: '1px solid rgba(16, 185, 129, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: 'rgba(16, 185, 129, 0.1)',
                        borderColor: 'rgba(16, 185, 129, 0.3)',
                        transform: 'translateY(-2px)'
                      }
                    }}
                  >
                    <Box sx={{ textAlign: 'center', mb: 1, fontSize: '1.2rem' }}>
                      {item.emoji}
                    </Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#111827', mb: 0.5, textAlign: 'center' }}>
                      {item.name.split(' - ')[0]}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, textAlign: 'center', mb: 1 }}>
                      ₹{item.price}
                    </Typography>
                    <Button
                      size="small"
                      fullWidth
                      sx={{
                        bgcolor: '#10b981',
                        color: 'white',
                        fontSize: '0.7rem',
                        py: 0.5,
                        '&:hover': { bgcolor: '#059669' }
                      }}
                    >
                      ADD
                    </Button>
                  </Box>
                ))}
              </Box>
              <Typography variant="caption" sx={{ color: '#6b7280', mt: 1, display: 'block' }}>
                💡 {suggestedItems[0].reason}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Free Delivery Progress */}
        {remainingForFreeDelivery > 0 && cart.length > 0 && (
          <Box sx={{ 
            mb: 2, 
            p: 2, 
            bgcolor: 'rgba(245, 158, 11, 0.1)', 
            borderRadius: 2,
            border: '1px solid rgba(245, 158, 11, 0.2)'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: 600, color: '#d97706', fontSize: '0.9rem' }}>
                🚚 Add ₹{remainingForFreeDelivery} for FREE delivery
              </Typography>
            </Box>
            <Box sx={{ 
              width: '100%', 
              height: 6, 
              bgcolor: '#fef3c7', 
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                width: `${Math.min((total / freeDeliveryThreshold) * 100, 100)}%`, 
                height: '100%', 
                bgcolor: '#f59e0b',
                transition: 'width 0.3s ease'
              }} />
            </Box>
            <Typography variant="caption" sx={{ color: '#92400e', mt: 1, display: 'block' }}>
              You're {Math.round((total / freeDeliveryThreshold) * 100)}% there!
            </Typography>
          </Box>
        )}

        <Divider sx={{ my: 2 }} />
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Subtotal:</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>₹{total}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Delivery fee:</Typography>
            <Typography variant="body1" sx={{ 
              fontWeight: 600,
              color: deliveryFee === 0 ? '#10b981' : 'inherit',
              textDecoration: deliveryFee === 0 ? 'line-through' : 'none'
            }}>
              {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
            </Typography>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: 'var(--text)'
              }}
            >
              Total:
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 700,
                color: '#10b981',
                fontSize: '1.4rem'
              }}
            >
              ₹{total + deliveryFee}
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: '#6b7280', mt: 1, display: 'flex', alignItems: 'center' }}>
            <FlashOnIcon sx={{ fontSize: 14, mr: 0.5 }} />
            Order in {deliveryTime - 2} mins for {deliveryTime} min delivery
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          fullWidth 
          disabled={cart.length === 0} 
          startIcon={<LocalShippingIcon />}
          onClick={() => {
            onClose();
            navigate('/payment');
          }}
          sx={{ 
            mb: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: 'white',
            fontWeight: 600,
            fontSize: '1.1rem',
            borderRadius: 3,
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
            textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            '&:hover': {
              background: 'linear-gradient(135deg, #059669, #047857)',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
            }
          }}
        >
          Order Now • {deliveryTime} mins
        </Button>
        <Button 
          variant="outlined" 
          fullWidth 
          onClick={() => {
            clearCart();
            toast.success('Cart cleared');
          }} 
          disabled={cart.length === 0}
          sx={{
            borderColor: '#d1d5db',
            color: '#6b7280',
            fontWeight: 600,
            borderRadius: 3,
            '&:hover': {
              borderColor: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.05)',
              color: '#ef4444'
            }
          }}
        >
          Clear Cart
        </Button>

        {/* Saved for Later Section */}
        {savedForLater.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'var(--text)', mb: 2 }}>
              🔖 Saved for Later ({savedForLater.length})
            </Typography>
            <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
              {savedForLater.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 1.5,
                    mb: 1,
                    bgcolor: 'rgba(245, 158, 11, 0.05)',
                    borderRadius: 2,
                    border: '1px solid rgba(245, 158, 11, 0.2)'
                  }}
                >
                  <Avatar sx={{ mr: 1.5, bgcolor: '#f59e0b', width: 32, height: 32 }}>
                    {item.product?.productName?.charAt(0) || 'P'}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#111827' }}>
                      {item.product?.productName || 'Product'}
                    </Typography>
                    <Typography sx={{ fontSize: '0.8rem', color: '#f59e0b', fontWeight: 600 }}>
                      ₹{item.product?.productPrice || 0}
                    </Typography>
                  </Box>
                  <Button
                    size="small"
                    onClick={() => moveToCart(item)}
                    sx={{
                      bgcolor: '#10b981',
                      color: 'white',
                      fontSize: '0.75rem',
                      px: 2,
                      '&:hover': { bgcolor: '#059669' }
                    }}
                  >
                    Move to Cart
                  </Button>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
} 