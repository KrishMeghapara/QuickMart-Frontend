import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box, Container } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
// Pages
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import PaymentPage from "./pages/PaymentPage";
import UserProfile from "./pages/UserProfile";

// Features
import { useAuth } from "./features/auth/AuthContext";
import LoginForm from "./features/auth/LoginForm";
import RegisterForm from "./features/auth/RegisterForm";
import { useCart } from "./features/cart/CartContext";
import CartDrawer from "./features/cart/CartDrawer";
import ProductGrid from "./features/products/ProductGrid";
import AddAddressForm from "./features/user/AddAddressForm";
import ProfilePictureTest from "./features/user/ProfilePictureTest";

// Layouts
import Header from "./layouts/Header";

// Components
import ToastProvider from "./components/common/ToastProvider";
import ApiTest from "./components/ui/ApiTest";

// Services
import apiService from "./services/apiService";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme/theme";
import "./App.css";
import "./styles/quickcommerce.css";

function AuthRoutes() {
  const { isAuthenticated, login, logout, user } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [addressAdded, setAddressAdded] = useState(false); 
  const navigate = useNavigate();

  // Redirect to home when authenticated and user has address
  useEffect(() => {
    if (isAuthenticated && user && user.AddressID) {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  // Redirect to home after login
  const handleLogin = (token, userData) => {
    login(token, userData);
    // No need to call navigate here, useEffect will handle it
  };

  if (isAuthenticated && (!user || !user.AddressID) && !addressAdded) {
    return (
      <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <AddAddressForm onSuccess={() => setAddressAdded(true)} />
        <button onClick={logout} style={{ marginTop: 20 }}>Logout</button>
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={
        <LoginForm onLogin={handleLogin} />
      } />
      <Route path="/register" element={
        <RegisterForm onRegister={() => navigate('/login')} />
      } />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

function MainApp() {
  const { cart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [categories, setCategories] = useState([]);
  const filterHandlerRef = React.useRef();

  useEffect(() => {
    const onItemAdded = () => setCartOpen(true);
    window.addEventListener('cart:itemAdded', onItemAdded);
    
    // Load categories for filter
    const loadCategories = async () => {
      try {
        const cats = await apiService.getCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };
    loadCategories();
    
    return () => window.removeEventListener('cart:itemAdded', onItemAdded);
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Debounce search - only search if query is 2+ characters
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await apiService.searchProducts(query.trim());
      setSearchResults(results);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFilterApply = async (filters) => {
    try {
      const products = await apiService.filterProducts(filters);
      // Pass filtered products to HomePage somehow
      console.log('Filtered products:', products);
    } catch (error) {
      console.error('Filter failed:', error);
    }
  };

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Header 
        onCartClick={() => setCartOpen(true)} 
        onSearch={handleSearch}
        onFilterApply={(filters) => {
          if (filterHandlerRef.current) {
            filterHandlerRef.current(filters);
          }
        }}
        categories={categories}
      />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} searchResults={searchResults} onFilterApply={filterHandlerRef} />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/profile-picture-test" element={<ProfilePictureTest />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </Box>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastProvider>
        <Router>
          {isAuthenticated ? <MainApp /> : <AuthRoutes />}
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}