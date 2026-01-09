# 🔄 Import Path Migration Guide

## Quick Reference Table

| Old Path | New Path |
|----------|----------|
| `./components/HomePage` | `./pages/HomePage` |
| `./components/CategoryPage` | `./pages/CategoryPage` |
| `./components/ProductDetailPage` | `./pages/ProductDetailPage` |
| `./components/PaymentPage` | `./pages/PaymentPage` |
| `./components/UserProfile` | `./pages/UserProfile` |
| `./components/LoginForm` | `./features/auth/LoginForm` |
| `./components/RegisterForm` | `./features/auth/RegisterForm` |
| `./components/GoogleLoginButton` | `./features/auth/GoogleLoginButton` |
| `./components/AuthContext` | `./features/auth/AuthContext` |
| `./components/CartContext` | `./features/cart/CartContext` |
| `./components/CartDrawer` | `./features/cart/CartDrawer` |
| `./components/QuickAddToCart` | `./features/cart/QuickAddToCart` |
| `./components/SimpleCheckout` | `./features/cart/SimpleCheckout` |
| `./components/ProductCarousel` | `./features/products/ProductCarousel` |
| `./components/ProductGrid` | `./features/products/ProductGrid` |
| `./components/ProductFilter` | `./features/products/ProductFilter` |
| `./components/ProductReviews` | `./features/products/ProductReviews` |
| `./components/ProfilePictureUpload` | `./features/user/ProfilePictureUpload` |
| `./components/AddAddressForm` | `./features/user/AddAddressForm` |
| `./components/AddressMap` | `./features/user/AddressMap` |
| `./components/Header` | `./layouts/Header` |
| `./components/HeroSection` | `./layouts/HeroSection` |
| `./components/ModernHero` | `./layouts/ModernHero` |
| `./components/ErrorBoundary` | `./components/common/ErrorBoundary` |
| `./components/LoadingStates` | `./components/common/LoadingStates` |
| `./components/RetryComponent` | `./components/common/RetryComponent` |
| `./components/ToastProvider` | `./components/common/ToastProvider` |
| `./components/BackButton` | `./components/common/BackButton` |
| `./components/Breadcrumbs` | `./components/common/Breadcrumbs` |
| `./components/EnhancedSearch` | `./components/ui/EnhancedSearch` |
| `./components/ApiTest` | `./components/ui/ApiTest` |

## Files That Need Updates

The following files need their import statements updated:

### Pages
- ✅ `src/App.jsx` - Already updated
- ✅ `src/main.jsx` - Already updated
- `src/pages/HomePage.jsx`
- `src/pages/CategoryPage.jsx`
- `src/pages/ProductDetailPage.jsx`
- `src/pages/PaymentPage.jsx`
- `src/pages/UserProfile.jsx`

### Features
- `src/features/auth/LoginForm.jsx`
- `src/features/auth/RegisterForm.jsx`
- `src/features/cart/CartDrawer.jsx`
- `src/features/cart/SimpleCheckout.jsx`
- `src/features/products/ProductCarousel.jsx`
- `src/features/products/ProductGrid.jsx`
- `src/features/user/AddAddressForm.jsx`

### Layouts
- `src/layouts/Header.jsx`

## Search & Replace Patterns

Use these patterns in your IDE to quickly update imports:

1. **Pages:**
   - Find: `from ['"]\.\.?/components/(HomePage|CategoryPage|ProductDetailPage|PaymentPage|UserProfile)`
   - Replace: `from '../pages/$1`

2. **Auth:**
   - Find: `from ['"]\.\.?/components/(LoginForm|RegisterForm|GoogleLoginButton|AuthContext)`
   - Replace: `from '../features/auth/$1`

3. **Cart:**
   - Find: `from ['"]\.\.?/components/(CartContext|CartDrawer|QuickAddToCart|SimpleCheckout)`
   - Replace: `from '../features/cart/$1`

4. **Products:**
   - Find: `from ['"]\.\.?/components/(ProductCarousel|ProductGrid|ProductFilter|ProductReviews)`
   - Replace: `from '../features/products/$1`

5. **User:**
   - Find: `from ['"]\.\.?/components/(ProfilePictureUpload|AddAddressForm|AddressMap)`
   - Replace: `from '../features/user/$1`

6. **Layouts:**
   - Find: `from ['"]\.\.?/components/(Header|HeroSection|ModernHero)`
   - Replace: `from '../layouts/$1`

7. **Common:**
   - Find: `from ['"]\.\.?/components/(ErrorBoundary|LoadingStates|RetryComponent|ToastProvider|BackButton|Breadcrumbs)`
   - Replace: `from '../components/common/$1`

8. **UI:**
   - Find: `from ['"]\.\.?/components/(EnhancedSearch|ApiTest)`
   - Replace: `from '../components/ui/$1`

## CSS Files

Don't forget to update CSS imports as well:
- `ProductCarousel.css` → `../features/products/ProductCarousel.css`
- `ProductGrid.css` → `../features/products/ProductGrid.css`
- `CartDrawer.css` → `../features/cart/CartDrawer.css`
- `HomePage.css` → `../pages/HomePage.css`
- etc.

## Testing

After updating imports, test:
1. Run `npm run dev` to check for build errors
2. Navigate through all pages
3. Test authentication flow
4. Test cart functionality
5. Test product browsing

## Status

- ✅ Folder structure created
- ✅ Files moved to new locations
- ✅ App.jsx updated
- ✅ main.jsx updated
- ⏳ Individual component imports need updating
