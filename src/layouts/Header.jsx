import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Box,
  InputBase,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Chip,
  Button,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Storefront as StorefrontIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
  Favorite as FavoriteIcon,
  FilterList as FilterListIcon,
  LocationOn as LocationIcon,
  AccessTime as ClockIcon,
  FlashOn as LightningIcon,
} from '@mui/icons-material';
import { useCart } from '../features/cart/CartContext';
import { useAuth } from '../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import EnhancedSearch from '../components/ui/EnhancedSearch';

/* ---------- Theme Constants ---------- */
const COLORS = {
  primary: '#2563eb',
  secondary: '#1d4ed8',
  accent: '#2563eb',
  lightText: '#1f2937',
  subtleText: '#64748b',
  error: '#ef4444',
};

/* ---------- Styled Components ---------- */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '999px',
  backgroundColor: 'var(--surface)',
  height: '44px',
  padding: '8px 16px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  border: '1px solid #e5e7eb',
  marginLeft: 0,
  width: '100%',
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  '&:focus-within': {
    border: '1px solid var(--brand)',
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1), 0 4px 12px rgba(0,0,0,0.08)',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
    maxWidth: 550,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'var(--brand)',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'var(--text)',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    fontSize: '1rem',
    fontWeight: 500,
    '&::placeholder': {
      color: '#6b7280',
      fontWeight: 400,
    },
    [theme.breakpoints.up('sm')]: {
      width: '35ch',
      '&:focus': { width: '45ch' },
    },
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'var(--text)',
  backgroundColor: 'var(--surface)',
  borderRadius: '50%',
  padding: theme.spacing(1),
  boxShadow: 'var(--soft-shadow)',
  transition: theme.transitions.create(['all'], {
    duration: theme.transitions.duration.standard,
  }),
  '&:hover': {
    backgroundColor: 'var(--surface)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px rgba(16,24,40,0.08)',
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'var(--danger)',
    color: 'white',
    fontWeight: 700,
    fontSize: '0.75rem',
    minWidth: '20px',
    height: '20px',
    borderRadius: '10px',
    border: '2px solid white',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)',
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1),
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(COLORS.primary, 0.1),
    transform: 'scale(1.02)',
  },
}));

/* ---------- Header Component ---------- */
export default function Header({ onCartClick, onSearch, onFilterApply, categories = [] }) {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [locationAnchorEl, setLocationAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Rajkot, Gujarat');
  const [deliveryTime, setDeliveryTime] = useState('12');
  const [filters, setFilters] = useState({
    categoryId: '',
    minPrice: '',
    maxPrice: '',
    inStockOnly: false,
    sortBy: 'name_asc'
  });

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const goToProfile = () => {
    closeMenu();
    navigate('/profile');
  };
  const handleLogout = () => {
    closeMenu();
    logout();
  };

  const handleFilterClick = (event) => setFilterAnchorEl(event.currentTarget);
  const closeFilterMenu = () => setFilterAnchorEl(null);
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  const applyFilters = () => {
    console.log('Applying filters:', filters);
    onFilterApply?.(filters);
    closeFilterMenu();
  };

  const handleLocationClick = (event) => setLocationAnchorEl(event.currentTarget);
  const closeLocationMenu = () => setLocationAnchorEl(null);
  const handleLocationChange = (location, time) => {
    setCurrentLocation(location);
    setDeliveryTime(time);
    closeLocationMenu();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: 'var(--glass)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--soft-shadow)',
        color: 'var(--text)',
        height: '72px'
      }}
    >
      <Toolbar sx={{
        justifyContent: 'space-between',
        py: { xs: 1, sm: 1.5 },
        px: { xs: 1, sm: 2, md: 4 },
        minHeight: { xs: '56px', sm: '64px' },
        flexWrap: { xs: 'wrap', md: 'nowrap' }
      }}>
        {/* Logo */}
        <LogoContainer onClick={() => navigate('/')}>
          <LightningIcon sx={{ fontSize: 36, color: '#10b981' }} />
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              fontFamily: 'Poppins, sans-serif',
              color: 'var(--text)',
              letterSpacing: '-1px',
            }}
          >
            QuickMart
          </Typography>
          <Chip
            label="Express"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.7rem',
              height: '20px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}
          />
        </LogoContainer>

        {/* Delivery Info */}
        <Box sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          ml: 3,
          order: { xs: 4, md: 1.5 }
        }}>
          <Button
            onClick={handleLocationClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textTransform: 'none',
              color: 'var(--text)',
              bgcolor: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '12px',
              px: 2,
              py: 1,
              '&:hover': {
                bgcolor: 'rgba(16, 185, 129, 0.15)',
                borderColor: 'rgba(16, 185, 129, 0.3)'
              }
            }}
          >
            <ClockIcon sx={{ fontSize: 18, color: '#10b981' }} />
            <Box sx={{ textAlign: 'left' }}>
              <Typography sx={{
                fontSize: '0.75rem',
                color: '#10b981',
                fontWeight: 600,
                lineHeight: 1
              }}>
                Delivering in {deliveryTime} mins
              </Typography>
              <Typography sx={{
                fontSize: '0.8rem',
                color: 'var(--text)',
                fontWeight: 500,
                lineHeight: 1.2
              }}>
                <LocationIcon sx={{ fontSize: 12, mr: 0.5 }} />
                {currentLocation}
              </Typography>
            </Box>
          </Button>
        </Box>

        {/* Enhanced Search */}
        <Box sx={{
          flexGrow: 1,
          mx: { xs: 1, sm: 2, md: 4 },
          display: 'flex',
          justifyContent: 'center',
          order: { xs: 3, md: 2 },
          width: { xs: '100%', md: 'auto' },
          mt: { xs: 1, md: 0 }
        }}>
          <EnhancedSearch
            onSearch={(query) => {
              setSearchQuery(query);
              onSearch?.(query);
            }}
            categories={categories}
          />
        </Box>

        {/* Icons */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 2 },
          order: { xs: 2, md: 3 }
        }}>
          <StyledIconButton onClick={handleMenu}>
            <Avatar
              src={user?.googlePicture}
              sx={{
                width: 32, height: 32,
                bgcolor: alpha(COLORS.primary, 0.2),
                border: `2px solid rgba(161, 164, 255, 0.3)`,
                fontSize: '1rem', fontWeight: 600, color: COLORS.lightText,
              }}
            >
              {user?.userName?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </StyledIconButton>
          <StyledIconButton onClick={onCartClick} sx={{ p: 1.5 }}>
            <StyledBadge badgeContent={itemCount} max={99}>
              <ShoppingCartIcon sx={{ fontSize: 32 }} />
            </StyledBadge>
          </StyledIconButton>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            background: 'var(--glass)',
            border: '1px solid var(--border)',
            '& .MuiMenuItem-root': {
              borderRadius: 2,
              margin: '4px 8px',
              color: 'var(--text)',
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            },
          },
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid rgba(161, 164, 255, 0.2)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar src={user?.googlePicture} sx={{ bgcolor: COLORS.primary }}>
              {user?.userName?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'var(--text)' }}>
                {user?.userName || 'User'}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--muted)' }}>
                {user?.email}
              </Typography>
            </Box>
          </Box>
        </Box>
        <MenuItem onClick={goToProfile}>
          <ListItemIcon><AccountCircleIcon sx={{ color: COLORS.accent }} /></ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon><LogoutIcon sx={{ color: COLORS.error }} /></ListItemIcon>
          <ListItemText primary="Sign Out" sx={{ color: COLORS.error }} />
        </MenuItem>
      </Menu>

      {/* Location Menu */}
      <Menu
        anchorEl={locationAnchorEl}
        open={Boolean(locationAnchorEl)}
        onClose={closeLocationMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 300,
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            background: 'var(--glass)',
            border: '1px solid var(--border)',
            p: 2
          }
        }}
      >
        <Typography variant="h6" sx={{ color: 'var(--text)', mb: 2, fontWeight: 600 }}>
          <LocationIcon sx={{ mr: 1, color: '#10b981' }} />
          Select Delivery Location
        </Typography>

        {[
          { location: 'Rajkot, Gujarat', time: '12', area: 'University Road' },
          { location: 'Ahmedabad, Gujarat', time: '15', area: 'Satellite' },
          { location: 'Surat, Gujarat', time: '18', area: 'Adajan' },
          { location: 'Vadodara, Gujarat', time: '14', area: 'Alkapuri' }
        ].map((loc, idx) => (
          <MenuItem
            key={idx}
            onClick={() => handleLocationChange(loc.location, loc.time)}
            sx={{
              borderRadius: 2,
              mb: 1,
              border: currentLocation === loc.location ? '2px solid #10b981' : '1px solid transparent',
              bgcolor: currentLocation === loc.location ? 'rgba(16, 185, 129, 0.1)' : 'transparent'
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 600, color: 'var(--text)' }}>
                  {loc.location}
                </Typography>
                <Chip
                  label={`${loc.time} mins`}
                  size="small"
                  sx={{
                    bgcolor: '#10b981',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: 'var(--muted)', mt: 0.5 }}>
                {loc.area} area
              </Typography>
            </Box>
          </MenuItem>
        ))}

        <Box sx={{ mt: 2, p: 1, bgcolor: 'rgba(16, 185, 129, 0.1)', borderRadius: 2 }}>
          <Typography variant="body2" sx={{ color: '#10b981', fontWeight: 600 }}>
            🚀 Express delivery available in selected areas
          </Typography>
        </Box>
      </Menu>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={closeFilterMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 320,
            borderRadius: 3,
            backdropFilter: 'blur(20px)',
            background: 'var(--glass)',
            border: '1px solid var(--border)',
            p: 3
          }
        }}
      >
        <Typography variant="h6" sx={{ color: 'var(--text)', mb: 2, fontWeight: 600 }}>
          Filter Products
        </Typography>

        {/* Quick Filters */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 1 }}>Quick Filters</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {[
              { label: 'Under 10 mins', icon: '⚡' },
              { label: 'Fresh Produce', icon: '🥬' },
              { label: 'Dairy & Eggs', icon: '🥛' },
              { label: 'Snacks', icon: '🍿' }
            ].map((filter, idx) => (
              <Chip
                key={idx}
                label={`${filter.icon} ${filter.label}`}
                size="small"
                clickable
                sx={{
                  bgcolor: 'rgba(16, 185, 129, 0.1)',
                  color: '#10b981',
                  fontWeight: 500,
                  '&:hover': {
                    bgcolor: 'rgba(16, 185, 129, 0.2)'
                  }
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Category */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 1 }}>Category</Typography>
          <select
            value={filters.categoryId}
            onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)'
            }}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat.categoryID} value={cat.categoryID}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </Box>

        {/* Price Range */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 1 }}>Price Range</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)'
              }}
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)'
              }}
            />
          </Box>
        </Box>

        {/* In Stock */}
        <Box sx={{ mb: 2 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={filters.inStockOnly}
              onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
            />
            <Typography variant="body2" sx={{ color: 'var(--muted)' }}>In Stock Only</Typography>
          </label>
        </Box>

        {/* Sort By */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ color: 'var(--muted)', mb: 1 }}>Sort By</Typography>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)'
            }}
          >
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
            <option value="price_asc">Price Low-High</option>
            <option value="price_desc">Price High-Low</option>
            <option value="delivery_time">Fastest Delivery</option>
          </select>
        </Box>

        {/* Apply Button */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <button
            onClick={() => {
              setFilters({
                categoryId: '',
                minPrice: '',
                maxPrice: '',
                inStockOnly: false,
                sortBy: 'name_asc'
              });
            }}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              cursor: 'pointer'
            }}
          >
            Clear
          </button>
          <button
            onClick={applyFilters}
            style={{
              flex: 2,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#10b981',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Apply Filters
          </button>
        </Box>
      </Menu>
    </AppBar>
  );
}
