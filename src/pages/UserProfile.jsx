import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Avatar,
  Chip,
  IconButton,
  Fade,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingBag as ShoppingBagIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Star as StarIcon,
  CheckCircle as CheckIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useAuth } from '../features/auth/AuthContext';
import { useCart } from '../features/cart/CartContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config/api';
import './UserProfile.css';
import AddAddressForm from '../features/user/AddAddressForm';
import ProfilePictureUpload from '../features/user/ProfilePictureUpload';
import apiService from '../services/apiService';

export default function UserProfile() {
  const { user, token, updateUser, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressId, setDefaultAddressId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    house: '',
    street: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    addressType: 'Home',
    label: ''
  });

  // Fetch user's data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      setError('');

      // Fetch address, orders, and profile in parallel
      const [addressResponse, ordersResponse, profileResponse] = await Promise.allSettled([
        fetchUserAddress(),
        fetchUserOrders(),
        fetchUserProfile()
      ]);

      // Results are handled inside each fetch function

    } catch (error) {
      setError('Failed to load user data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserAddress = async () => {
    try {
      const addressData = await apiService.getMyAddress();

      if (addressData && !Array.isArray(addressData)) {
        const addressArray = [{
          ...addressData,
          addressType: addressData.addressType || 'Home',
          label: addressData.label || 'Primary Address',
          isDefault: true
        }];
        setAddresses(addressArray);
        setDefaultAddressId(addressData.AddressID || addressData.addressID);
      } else if (Array.isArray(addressData)) {
        setAddresses(addressData);
        const defaultAddr = addressData.find(addr => addr.isDefault);
        if (defaultAddr) {
          setDefaultAddressId(defaultAddr.AddressID || defaultAddr.addressID);
        }
      } else {
        setAddresses([]);
      }
    } catch (error) {
      if (error.message?.includes('404')) {
        setAddresses([]);
      } else {
        setAddresses([]);
        throw error;
      }
    }
  };

  const fetchUserOrders = async () => {
    try {
      if (!user?.UserID) return;
      const ordersData = await apiService.getOrdersByUser(user.UserID);
      setOrders(ordersData);
    } catch (error) {
      setOrders([]);
      throw error;
    }
  };

  const fetchUserProfile = async () => {
    try {
      const profileData = await apiService.getUserProfile();
      updateUser(profileData);
    } catch (error) {
      // Silently fail on profile fetch
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveAddress = async () => {
    try {
      setIsSaving(true);
      setError('');

      await apiService.updateMyAddress(formData);
      setSuccess('Address updated successfully!');
      setEditingAddressId(null);
      await fetchUserAddress();
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to update address');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setIsSaving(true);
      setError('');

      await apiService.changePassword({ currentPassword, newPassword });
      setSuccess('Password changed successfully!');
      setShowPasswordDialog(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to change password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetDefaultAddress = (addressId) => {
    setDefaultAddressId(addressId);
    setSuccess('Default address updated!');
    setTimeout(() => setSuccess(''), 3000);
  };



  const handleEditAddress = (address) => {
    setEditingAddressId(address.AddressID || address.addressID);
    setFormData({
      house: address.house || '',
      street: address.street || '',
      landmark: address.landmark || '',
      city: address.city || '',
      state: address.state || '',
      pincode: address.pincode || '',
      phone: address.phone || '',
      addressType: address.addressType || 'Home',
      label: address.label || ''
    });
  };

  const handleDeleteAddress = (address) => {
    setAddressToDelete(address);
    setShowDeleteDialog(true);
  };

  const confirmDeleteAddress = async () => {
    try {
      setIsSaving(true);
      setError('');

      const addressId = addressToDelete?.AddressID || addressToDelete?.addressID || addressToDelete?.id;
      if (!addressId) {
        throw new Error('Could not find address ID');
      }

      await apiService.deleteAddress(addressId);

      setSuccess('Address deleted successfully!');
      setAddresses(prev => prev.filter(addr =>
        (addr.AddressID || addr.addressID) !== addressId
      ));

      if (defaultAddressId === addressId) {
        setDefaultAddressId(null);
      }

      setShowDeleteDialog(false);
      setAddressToDelete(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to delete address.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    updateUser(updatedUser);
    // Refresh the user data to get the latest profile picture
    setTimeout(() => {
      fetchUserData();
    }, 500);
  };



  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress size={60} sx={{ color: '#10b981' }} />
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'var(--main-bg)',
      position: 'relative',
      px: { xs: 2, md: 8 },
      py: { xs: 3, md: 6 },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '50%',
        background: 'radial-gradient(circle at top right, rgba(102, 126, 234, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      {/* Header */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography sx={{
          fontSize: { xs: '2rem', md: '2.5rem' },
          fontWeight: 700,
          color: 'var(--text)',
          letterSpacing: '-0.5px',
          lineHeight: 1
        }}>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', mt: 1 }}>
          Manage your account settings and addresses
        </Typography>
      </Box>

      {/* Alerts */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 3 }}>
          {success}
        </Alert>
      )}

      <Grid container spacing={{ xs: 3, md: 4.5 }} sx={{
        '@media (max-width: 980px)': {
          flexDirection: 'column',
          '& .MuiGrid-item': {
            maxWidth: '100%'
          }
        }
      }}>
        {/* Left Column - Profile Info */}
        <Grid size={{ xs: 12, md: 5, lg: 4 }} sx={{ minWidth: '320px' }}>
          <Fade in={true} timeout={600}>
            <Card sx={{
              borderRadius: '24px',
              boxShadow: 'var(--soft-shadow)',
              border: '1px solid var(--border)',
              background: 'var(--glass)',
              backdropFilter: 'blur(20px)',
              position: { md: 'sticky' },
              top: { md: 5 }
            }}>
              <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative', minHeight: '500px' }}>
                {/* Profile Picture */}
                <Box sx={{ position: 'relative', display: 'inline-block', mb: 3, mt: 2 }}>
                  <Box sx={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '50%',
                    padding: '8px',
                    display: 'inline-block',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                    '&:hover': {
                      transform: 'translateY(-4px) scale(1.02)',
                      boxShadow: '0 12px 35px rgba(16, 185, 129, 0.4)'
                    }
                  }}>
                    {(user?.profilePicture || user?.googlePicture) ? (
                      <img
                        src={user?.profilePicture ?
                          (user.profilePicture.startsWith('http') ? user.profilePicture : `${API_BASE.replace('/api', '')}${user.profilePicture}`)
                          : user?.googlePicture}
                        alt={user?.UserName || 'User Avatar'}
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          border: '6px solid white',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 100,
                          height: 100,
                          border: '6px solid white',
                          background: 'var(--surface)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      >
                        <PersonIcon sx={{ fontSize: 70 }} />
                      </Avatar>
                    )}
                  </Box>
                </Box>

                {/* User Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text)' }}>
                    {user?.UserName || user?.userName || user?.googleName || 'User Name'}
                  </Typography>
                  {user?.isGoogleUser && (
                    <Chip
                      icon={<StarIcon sx={{ fontSize: 14 }} />}
                      label="Verified"
                      size="small"
                      sx={{
                        background: 'var(--success)',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        height: '20px'
                      }}
                    />
                  )}
                </Box>
                <Typography variant="body2" sx={{ mb: 2, fontSize: '0.95rem', color: 'var(--muted)', fontWeight: 400 }}>
                  {user?.Email || user?.email || user?.googleEmail || 'user@example.com'}
                </Typography>

                {/* Google User Badge */}
                {user?.isGoogleUser && (
                  <Button
                    fullWidth
                    startIcon={<CheckIcon />}
                    sx={{
                      mb: 2,
                      background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                      color: '#166534',
                      fontWeight: 600,
                      borderRadius: '12px',
                      px: 3,
                      py: 1.5,
                      border: '1px solid rgba(34, 197, 94, 0.2)',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)'
                      }
                    }}
                  >
                    Google Account
                  </Button>
                )}

                {/* Quick Stats */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, gap: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <ShoppingBagIcon sx={{ fontSize: 24, color: orders.length > 0 ? '#10b981' : 'var(--muted)', mb: 0.5 }} />
                    </Box>
                    <Typography variant="h6" sx={{
                      fontWeight: 700,
                      color: orders.length > 0 ? '#10b981' : 'var(--muted)',
                      fontSize: '1.2rem'
                    }}>
                      {orders.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                      Orders
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <ShoppingBagIcon sx={{ fontSize: 24, color: cart.length > 0 ? '#f59e0b' : 'var(--muted)', mb: 0.5 }} />
                    </Box>
                    <Typography variant="h6" sx={{
                      fontWeight: 700,
                      color: cart.length > 0 ? '#f59e0b' : 'var(--muted)',
                      fontSize: '1.2rem'
                    }}>
                      {cart.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                      Cart Items
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 1 }}>
                      <LocationIcon sx={{ fontSize: 24, color: addresses.length > 0 ? '#10b981' : 'var(--muted)', mb: 0.5 }} />
                    </Box>
                    <Typography variant="h6" sx={{
                      fontWeight: 700,
                      color: addresses.length > 0 ? '#10b981' : 'var(--muted)',
                      fontSize: '1.2rem'
                    }}>
                      {addresses.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                      {addresses.length === 1 ? 'Address' : 'Addresses'}
                    </Typography>
                  </Box>
                </Box>

                {/* Sidebar Actions */}
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {!user?.isGoogleUser && (
                    <Button
                      fullWidth
                      startIcon={<SecurityIcon />}
                      onClick={() => setShowPasswordDialog(true)}
                      sx={{
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        p: 2,
                        justifyContent: 'flex-start',
                        color: 'var(--text)',
                        textTransform: 'none',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          color: 'white',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                        }
                      }}
                    >
                      Change Password
                    </Button>
                  )}
                  <Button
                    fullWidth
                    startIcon={<LogoutIcon />}
                    onClick={logout}
                    sx={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '12px',
                      p: 2,
                      justifyContent: 'flex-start',
                      color: '#ef4444',
                      textTransform: 'none',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: '#ef4444',
                        color: 'white',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
                      }
                    }}
                  >
                    Sign Out
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>

        {/* Right Column - Content */}
        <Grid size={{ xs: 12, md: 7, lg: 8 }} sx={{ minWidth: { md: '760px' } }}>
          <Fade in={true} timeout={1000}>
            <Card sx={{
              borderRadius: '20px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.995))',
              backdropFilter: 'blur(10px)',
              overflow: 'visible'
            }}>
              <CardContent sx={{ p: { xs: 2, md: '22px' } }}>
                {/* Tabs */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                    {[
                      { id: 0, label: 'Personal Info', icon: <PersonIcon /> },
                      { id: 1, label: 'Address', icon: <LocationIcon /> }
                    ].map((tab) => (
                      <Button
                        key={tab.id}
                        startIcon={tab.icon}
                        onClick={() => setActiveTab(tab.id)}
                        aria-current={activeTab === tab.id ? 'true' : undefined}
                        sx={{
                          px: 2.25,
                          py: 1.25,
                          borderRadius: '999px',
                          textTransform: 'none',
                          fontWeight: 700,
                          transition: 'transform 0.18s cubic-bezier(0.2, 0.9, 0.2, 1), box-shadow 0.18s ease',
                          '&:focus-visible': {
                            outline: 'none',
                            boxShadow: '0 0 0 6px rgba(124, 58, 237, 0.06)'
                          },
                          ...(activeTab === tab.id ? {
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: '#fff',
                            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.25), 0 2px 8px rgba(0, 0, 0, 0.06)',
                            transform: 'translateY(-3px)'
                          } : {
                            background: 'rgba(241, 245, 249, 0.92)',
                            border: '1px solid rgba(15, 23, 42, 0.03)',
                            color: '#64748b',
                            '&:hover': {
                              background: 'rgba(226, 232, 240, 0.9)',
                              transform: 'translateY(-1px)'
                            }
                          })
                        }}
                      >
                        {tab.label}
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* Tab Content */}
                <Box sx={{ p: { xs: 2, md: 3 }, minHeight: '320px' }}>
                  {/* Personal Info Tab */}
                  {activeTab === 0 && (
                    <Box>
                      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#111827' }}>
                        Personal Information
                      </Typography>

                      {/* Profile Picture Upload */}
                      <ProfilePictureUpload
                        user={user}
                        onProfileUpdate={handleProfileUpdate}
                      />

                      <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            value={user?.userName || user?.googleName || user?.UserName || ''}
                            disabled
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Email"
                            value={user?.email || user?.googleEmail || user?.Email || ''}
                            disabled
                            sx={{ mb: 2 }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                          <Typography variant="body2" color="text.secondary">
                            {user?.isGoogleUser
                              ? 'Profile information is managed through your Google account.'
                              : 'Contact support to update your profile information.'
                            }
                          </Typography>

                        </Grid>
                      </Grid>
                    </Box>
                  )}

                  {/* Address Tab */}
                  {activeTab === 1 && (
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827' }}>
                          Delivery Addresses
                        </Typography>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={() => setShowAddressDialog(true)}
                          sx={{
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              background: 'linear-gradient(135deg, #059669, #047857)',
                              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
                              transform: 'translateY(-2px)'
                            }
                          }}
                        >
                          Add New Address
                        </Button>
                      </Box>

                      {addresses.length > 0 ? (
                        <Grid container spacing={3}>
                          {addresses.map((address) => {
                            const addressId = address.AddressID || address.addressID;
                            const isDefault = addressId === defaultAddressId;
                            const isEditing = addressId === editingAddressId;

                            return (
                              <Grid size={{ xs: 12 }} key={addressId}>
                                <Fade in={true} timeout={400}>
                                  <Card sx={{
                                    border: isDefault ? '2px solid #10b981' : '1px solid #e0e0e0',
                                    borderRadius: 4,
                                    background: isDefault ? 'rgba(16, 185, 129, 0.03)' : 'white',
                                    boxShadow: isDefault ? '0 4px 20px rgba(16, 185, 129, 0.15)' : '0 2px 12px rgba(0, 0, 0, 0.05)',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                      transform: 'translateY(-2px)',
                                      boxShadow: isDefault ? '0 6px 25px rgba(16, 185, 129, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.1)'
                                    }
                                  }}>
                                    <CardContent sx={{ p: 3 }}>
                                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box sx={{ flex: 1 }}>
                                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                                            <Chip
                                              label={address.addressType || 'Home'}
                                              size="small"
                                              icon={address.addressType === 'Work' ? <SettingsIcon sx={{ fontSize: 14 }} /> : <LocationIcon sx={{ fontSize: 14 }} />}
                                              sx={{
                                                background: address.addressType === 'Work' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 'linear-gradient(135deg, #10b981, #059669)',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.75rem'
                                              }}
                                            />
                                            {isDefault && (
                                              <Chip
                                                label="Default"
                                                size="small"
                                                icon={<CheckIcon sx={{ fontSize: 14 }} />}
                                                sx={{
                                                  background: '#f59e0b',
                                                  color: 'white',
                                                  fontWeight: 600,
                                                  fontSize: '0.75rem'
                                                }}
                                              />
                                            )}

                                          </Box>

                                          {!isEditing ? (
                                            <>
                                              <Typography variant="body1" sx={{ fontWeight: 600, mb: 1, color: '#111827' }}>
                                                {address.house}, {address.street}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                {address.landmark && `${address.landmark}, `}
                                                {address.city}, {address.state} {address.pincode}
                                              </Typography>
                                              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                📞 {address.phone}
                                              </Typography>
                                            </>
                                          ) : (
                                            <Box sx={{ mt: 2 }}>
                                              <Grid container spacing={2}>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="House/Flat No."
                                                    name="house"
                                                    value={formData.house}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 6 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="Street"
                                                    name="street"
                                                    value={formData.street}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="Landmark"
                                                    name="landmark"
                                                    value={formData.landmark}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="City"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="State"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid size={{ xs: 12, sm: 4 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="Pincode"
                                                    name="pincode"
                                                    value={formData.pincode}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                                <Grid size={{ xs: 12 }}>
                                                  <TextField
                                                    fullWidth
                                                    label="Phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    size="small"
                                                  />
                                                </Grid>
                                              </Grid>
                                            </Box>
                                          )}
                                        </Box>

                                        {!isEditing && (
                                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, ml: 2 }}>
                                            {!isDefault && (
                                              <Button
                                                size="small"
                                                startIcon={<CheckIcon />}
                                                onClick={() => handleSetDefaultAddress(addressId)}
                                                sx={{
                                                  borderRadius: '10px',
                                                  px: 2,
                                                  py: 1,
                                                  background: 'rgba(16, 185, 129, 0.1)',
                                                  color: '#10b981',
                                                  border: '1px solid rgba(16, 185, 129, 0.2)',
                                                  fontWeight: 600,
                                                  textTransform: 'none',
                                                  fontSize: '0.8rem',
                                                  transition: 'all 0.2s ease',
                                                  '&:hover': {
                                                    background: '#10b981',
                                                    color: 'white',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                                                  }
                                                }}
                                              >
                                                Set Default
                                              </Button>
                                            )}
                                            <Button
                                              size="small"
                                              startIcon={<EditIcon />}
                                              onClick={() => handleEditAddress(address)}
                                              sx={{
                                                borderRadius: '10px',
                                                px: 2,
                                                py: 1,
                                                background: 'rgba(59, 130, 246, 0.1)',
                                                color: '#3b82f6',
                                                border: '1px solid rgba(59, 130, 246, 0.2)',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                fontSize: '0.8rem',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                  background: '#3b82f6',
                                                  color: 'white',
                                                  transform: 'translateY(-2px)',
                                                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                                                }
                                              }}
                                            >
                                              Edit
                                            </Button>
                                            <Button
                                              size="small"
                                              startIcon={<DeleteIcon />}
                                              onClick={() => handleDeleteAddress(address)}
                                              sx={{
                                                borderRadius: '10px',
                                                px: 2,
                                                py: 1,
                                                background: 'rgba(239, 68, 68, 0.1)',
                                                color: '#ef4444',
                                                border: '1px solid rgba(239, 68, 68, 0.2)',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                fontSize: '0.8rem',
                                                transition: 'all 0.2s ease',
                                                '&:hover': {
                                                  background: '#ef4444',
                                                  color: 'white',
                                                  transform: 'translateY(-2px)',
                                                  boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                                                }
                                              }}
                                            >
                                              Delete
                                            </Button>
                                          </Box>
                                        )}
                                      </Box>

                                      {isEditing && (
                                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                          <Button
                                            variant="contained"
                                            onClick={handleSaveAddress}
                                            disabled={isSaving}
                                            startIcon={isSaving ? <CircularProgress size={16} /> : <SaveIcon />}
                                            sx={{
                                              background: 'linear-gradient(135deg, #10b981, #059669)',
                                              borderRadius: 3,
                                              px: 3,
                                              py: 1.5,
                                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                                              textTransform: 'none',
                                              fontWeight: 600,
                                              '&:hover': {
                                                background: 'linear-gradient(135deg, #059669, #047857)',
                                                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)'
                                              }
                                            }}
                                          >
                                            {isSaving ? 'Saving...' : 'Save Changes'}
                                          </Button>
                                          <Button
                                            variant="outlined"
                                            onClick={() => setEditingAddressId(null)}
                                            sx={{
                                              borderColor: '#e5e7eb',
                                              color: '#6b7280',
                                              borderRadius: 3,
                                              px: 3,
                                              py: 1.5,
                                              textTransform: 'none',
                                              fontWeight: 600,
                                              '&:hover': {
                                                borderColor: '#d1d5db',
                                                background: '#f9fafb'
                                              }
                                            }}
                                          >
                                            Cancel
                                          </Button>
                                        </Box>
                                      )}
                                    </CardContent>
                                  </Card>
                                </Fade>
                              </Grid>
                            );
                          })}
                        </Grid>
                      ) : (
                        <Box sx={{
                          textAlign: 'center',
                          py: 8,
                          border: '2px dashed rgba(16, 185, 129, 0.3)',
                          borderRadius: 4,
                          background: 'linear-gradient(180deg, rgba(236, 253, 245, 0.6), rgba(255, 255, 255, 0.8))'
                        }}>
                          <Box sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'rgba(16, 185, 129, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                              '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                              '50%': { transform: 'scale(1.05)', opacity: 0.8 }
                            }
                          }}>
                            <LocationIcon sx={{ fontSize: 40, color: '#10b981' }} />
                          </Box>
                          <Typography variant="h5" sx={{ mb: 2, fontWeight: 700, color: '#0F172A' }}>
                            No Delivery Address Added
                          </Typography>
                          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 400, mx: 'auto', lineHeight: 1.6 }}>
                            Add your delivery address to get groceries delivered in just 12 minutes! ⚡
                          </Typography>
                          <Button
                            variant="contained"
                            size="large"
                            startIcon={<AddIcon />}
                            onClick={() => setShowAddressDialog(true)}
                            sx={{
                              background: 'linear-gradient(135deg, #10b981, #059669)',
                              borderRadius: 3,
                              px: 4,
                              py: 2,
                              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                              textTransform: 'none',
                              fontWeight: 600,
                              fontSize: '1rem',
                              '&:hover': {
                                background: 'linear-gradient(135deg, #059669, #047857)',
                                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)',
                                transform: 'translateY(-2px)'
                              }
                            }}
                          >
                            Add Your First Address
                          </Button>
                        </Box>
                      )}
                    </Box>
                  )}

                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>

      {/* Address Dialog */}
      <Dialog
        open={showAddressDialog}
        onClose={() => setShowAddressDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>Add New Address</DialogTitle>
        <DialogContent>
          <AddAddressForm onSuccess={() => {
            setShowAddressDialog(false);
            fetchUserAddress();
          }} />
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: '#111827' }}>Change Password</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPasswordDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePasswordChange}
            disabled={isSaving}
            sx={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: 3,
              px: 3,
              py: 1.5,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(135deg, #059669, #047857)',
                boxShadow: '0 6px 16px rgba(16, 185, 129, 0.4)'
              }
            }}
          >
            {isSaving ? 'Changing...' : 'Change Password'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Address Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)'
          }
        }}
      >
        <DialogTitle sx={{ color: 'error.main', fontWeight: 700 }}>Delete Address</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ pt: 1 }}>
            Are you sure you want to delete your saved address? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDeleteAddress}
            disabled={isSaving}
            startIcon={isSaving ? <CircularProgress size={16} /> : <DeleteIcon />}
          >
            {isSaving ? 'Deleting...' : 'Delete Address'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 