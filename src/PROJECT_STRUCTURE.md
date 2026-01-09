# 📁 Project Structure

## Overview
The project has been reorganized into a clean, scalable folder structure following React best practices.

## 📂 Folder Structure

```
src/
├── pages/                      # Page-level components (routes)
│   ├── HomePage.jsx           # Main landing page
│   ├── CategoryPage.jsx       # Category listing page
│   ├── ProductDetailPage.jsx # Product details page
│   ├── PaymentPage.jsx        # Payment/checkout page
│   ├── UserProfile.jsx        # User profile page
│   └── index.js               # Barrel export
│
├── features/                   # Feature-based modules
│   ├── auth/                  # Authentication feature
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── GoogleLoginButton.jsx
│   │   ├── AuthContext.jsx
│   │   └── index.js
│   │
│   ├── cart/                  # Shopping cart feature
│   │   ├── CartContext.jsx
│   │   ├── CartDrawer.jsx
│   │   ├── QuickAddToCart.jsx
│   │   ├── SimpleCheckout.jsx
│   │   └── index.js
│   │
│   ├── products/              # Product-related components
│   │   ├── ProductCarousel.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilter.jsx
│   │   ├── ProductReviews.jsx
│   │   └── index.js
│   │
│   └── user/                  # User profile features
│       ├── ProfilePictureUpload.jsx
│       ├── AddAddressForm.jsx
│       ├── AddressMap.jsx
│       └── index.js
│
├── layouts/                    # Layout components
│   ├── Header.jsx             # Main header/navigation
│   ├── HeroSection.jsx        # Hero section
│   ├── ModernHero.jsx         # Modern hero variant
│   └── index.js
│
├── components/                 # Shared components
│   ├── common/                # Common utilities
│   │   ├── ErrorBoundary.jsx
│   │   ├── LoadingStates.jsx
│   │   ├── RetryComponent.jsx
│   │   ├── ToastProvider.jsx
│   │   ├── BackButton.jsx
│   │   ├── Breadcrumbs.jsx
│   │   └── index.js
│   │
│   └── ui/                    # UI components
│       ├── EnhancedSearch.jsx
│       ├── ApiTest.jsx
│       └── index.js
│
├── services/                   # API services
│   └── apiService.js          # Main API service
│
├── config/                     # Configuration files
│   └── api.js                 # API configuration
│
├── theme/                      # Theme & design tokens
│   ├── designTokens.js        # Design system tokens
│   └── theme.js               # MUI theme configuration
│
├── utils/                      # Utility functions
│   ├── cache.js               # Caching utilities
│   └── imageOptimizer.js      # Image optimization
│
├── App.jsx                     # Main app component
├── main.jsx                    # Entry point
└── index.css                   # Global styles
```

## 🎯 Import Examples

### Before (Old Structure)
```javascript
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import ProductGrid from './components/ProductGrid';
import { useCart } from './components/CartContext';
```

### After (New Structure)
```javascript
// Pages
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Features
import LoginForm from './features/auth/LoginForm';
import RegisterForm from './features/auth/RegisterForm';
import { useAuth } from './features/auth/AuthContext';
import CartDrawer from './features/cart/CartDrawer';
import { useCart } from './features/cart/CartContext';
import ProductGrid from './features/products/ProductGrid';
import ProductCarousel from './features/products/ProductCarousel';

// Layouts
import Header from './layouts/Header';
import ModernHero from './layouts/ModernHero';

// Common components
import ErrorBoundary from './components/common/ErrorBoundary';
import { PageSkeleton } from './components/common/LoadingStates';
import { useToast } from './components/common/ToastProvider';
```

## 📋 Folder Descriptions

### `/pages`
Contains page-level components that represent routes in the application. Each page component orchestrates multiple features and components.

### `/features`
Feature-based modules containing related components, contexts, and logic. Each feature is self-contained and can be developed/tested independently.

### `/layouts`
Reusable layout components like headers, footers, navigation, and hero sections that provide consistent structure across pages.

### `/components/common`
Shared utility components used across multiple features (error boundaries, loading states, toast notifications, etc.).

### `/components/ui`
Reusable UI components and widgets that don't belong to a specific feature.

### `/services`
API service layer for backend communication.

### `/config`
Configuration files for API endpoints, environment variables, etc.

### `/theme`
Design system tokens, MUI theme configuration, and styling constants.

### `/utils`
Pure utility functions and helpers.

## ✅ Benefits

1. **Better Organization**: Clear separation of concerns
2. **Scalability**: Easy to add new features without cluttering
3. **Maintainability**: Related files are grouped together
4. **Direct Imports**: No barrel exports, explicit import paths
5. **Team Collaboration**: Developers can work on features independently
6. **Testing**: Easier to test isolated features
7. **Code Splitting**: Better support for lazy loading by feature

## 🔄 Migration Notes

All import paths need to be updated to reflect the new structure. Use direct imports with full paths.

Example migration:
```javascript
// Old
import ProductGrid from '../components/ProductGrid';

// New
import ProductGrid from '../features/products/ProductGrid';
```
