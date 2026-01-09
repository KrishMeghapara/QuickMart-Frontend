# QuickCommerce Color Scheme Guide

## 🎨 Overall Brand Colors

### Primary Brand Colors
- **Primary Purple**: `#4C1D95` (Deep Purple)
- **Secondary Purple**: `#7C3AED` (Vibrant Purple)
- **Primary Blue**: `#0EA5E9` (Sky Blue)
- **Secondary Blue**: `#38BDF8` (Light Blue)

### Gradients
- **Brand Gradient**: `linear-gradient(135deg, #4C1D95, #7C3AED)`
- **Accent Gradient**: `linear-gradient(135deg, #0EA5E9, #38BDF8)`
- **Glass Effect**: `linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.25))`

### Neutral Colors
- **Background**: `#F5F6FA` (Light Gray-Blue)
- **Surface**: `#FFFFFF` (Pure White)
- **Border**: `#E2E8F0` (Light Gray)
- **Text Primary**: `#0F172A` (Dark Blue-Gray)
- **Text Secondary**: `#334155` (Medium Gray)
- **Muted**: `#64748B` (Light Gray)

### Status Colors
- **Success**: `#059669` (Green)
- **Success Background**: `#D1FAE5` (Light Green)
- **Danger**: `#B91C1C` (Red)
- **Danger Background**: `#FECACA` (Light Red)
- **Warning**: `#D97706` (Orange)
- **Warning Background**: `#FEF3C7` (Light Orange)
- **Info**: `#0EA5E9` (Blue)
- **Info Background**: `#E0F2FE` (Light Blue)

### Shadows & Effects
- **Card Shadow**: `0 10px 28px rgba(0,0,0,0.06)`
- **Soft Shadow**: `0 6px 16px rgba(0,0,0,0.05)`
- **Purple Glow**: `0 6px 24px rgba(124, 58, 237, 0.45)`
- **Blue Glow**: `0 6px 24px rgba(14, 165, 233, 0.4)`
- **Green Glow**: `0 6px 24px rgba(5, 150, 105, 0.35)`

---

## 📱 Page-Specific Color Schemes

### 1. **Login Page** (`LoginForm.jsx`)
```css
/* Background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Card Background */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);

/* Primary Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
hover: linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%);

/* Text Colors */
primary-text: #1a202c;
secondary-text: #4a5568;
link-color: #667eea;

/* Input Fields */
border: #e2e8f0;
focus-border: #667eea;
background: #f7fafc;
```

### 2. **Registration Page** (`RegisterForm.jsx`)
```css
/* Background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Card Background */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);

/* Primary Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
hover: linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%);

/* Password Strength Indicator */
weak: #ef4444;
fair: #f59e0b;
good: #eab308;
strong: #10b981;

/* Feature Icons */
check-circle: #10b981;
shipping: #3b82f6;
redeem: #f59e0b;
security: #8b5cf6;
```

### 3. **Home Page** (`HomePage.jsx`)
```css
/* Background */
background: #f8fafc;

/* Hero Section */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Category Cards */
background: #ffffff;
border: #e2e8f0;
hover-shadow: 0 10px 28px rgba(0,0,0,0.1);

/* Product Cards */
background: #ffffff;
border: #e2e8f0;
hover-shadow: 0 10px 28px rgba(0,0,0,0.1);

/* Price Tags */
original-price: #64748b;
discount-price: #059669;
```

### 4. **Header Component** (`Header.jsx`)
```css
/* Background */
background: rgba(255, 255, 255, 0.95);
backdrop-filter: blur(20px);
border-bottom: #e2e8f0;

/* Logo */
text-color: #4C1D95;
gradient: linear-gradient(135deg, #4C1D95, #7C3AED);

/* Navigation Links */
text-color: #334155;
hover-color: #4C1D95;

/* Cart Badge */
background: #ef4444;
text-color: #ffffff;

/* Search Bar */
background: #f7fafc;
border: #e2e8f0;
focus-border: #4C1D95;
```

### 5. **Product Grid** (`ProductGrid.jsx`)
```css
/* Product Cards */
background: #ffffff;
border: #e2e8f0;
border-radius: 12px;
shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

/* Product Images */
border-radius: 8px;
overlay: rgba(0, 0, 0, 0.1);

/* Product Titles */
text-color: #1a202c;
font-weight: 600;

/* Product Prices */
original-price: #64748b;
discount-price: #059669;
font-weight: 700;

/* Add to Cart Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
hover: linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%);
text-color: #ffffff;
```

### 6. **Product Carousel** (`ProductCarousel.jsx`)
```css
/* Carousel Container */
background: #ffffff;
border: #e2e8f0;
border-radius: 16px;

/* Category Header */
text-color: #1a202c;
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Product Cards */
background: #ffffff;
border: #e2e8f0;
hover-shadow: 0 10px 28px rgba(0,0,0,0.1);

/* Navigation Arrows */
background: rgba(255, 255, 255, 0.9);
border: #e2e8f0;
hover-background: #4C1D95;
hover-text: #ffffff;
```

### 7. **Cart Drawer** (`CartDrawer.jsx`)
```css
/* Drawer Background */
background: #ffffff;
border-left: #e2e8f0;

/* Cart Header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Cart Items */
background: #f8fafc;
border: #e2e8f0;
border-radius: 8px;

/* Item Details */
product-title: #1a202c;
product-price: #059669;
quantity-controls: #e2e8f0;

/* Total Section */
background: #f8fafc;
border-top: #e2e8f0;
total-text: #1a202c;
total-amount: #059669;

/* Checkout Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;
```

### 8. **User Profile** (`UserProfile.jsx`)
```css
/* Background */
background: #f8fafc;

/* Profile Header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Profile Card */
background: #ffffff;
border: #e2e8f0;
border-radius: 16px;
shadow: 0 10px 28px rgba(0,0,0,0.06);

/* Profile Avatar */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
border: 4px solid #ffffff;

/* Form Fields */
background: #f7fafc;
border: #e2e8f0;
focus-border: #4C1D95;

/* Save Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;
```

### 9. **Add Address Form** (`AddAddressForm.jsx`)
```css
/* Background */
background: #f8fafc;

/* Form Container */
background: #ffffff;
border: #e2e8f0;
border-radius: 16px;
shadow: 0 10px 28px rgba(0,0,0,0.06);

/* Form Header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Input Fields */
background: #f7fafc;
border: #e2e8f0;
focus-border: #4C1D95;

/* Map Container */
border: #e2e8f0;
border-radius: 8px;

/* Submit Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;
```

### 10. **Payment Page** (`PaymentPage.jsx`)
```css
/* Background */
background: #f8fafc;

/* Payment Container */
background: #ffffff;
border: #e2e8f0;
border-radius: 16px;
shadow: 0 10px 28px rgba(0,0,0,0.06);

/* Payment Header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Payment Methods */
background: #f7fafc;
border: #e2e8f0;
selected-border: #4C1D95;
selected-background: #e0f2fe;

/* Order Summary */
background: #f8fafc;
border: #e2e8f0;
border-radius: 8px;

/* Total Amount */
text-color: #059669;
font-weight: 700;

/* Pay Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;
```

### 11. **Simple Checkout** (`SimpleCheckout.jsx`)
```css
/* Background */
background: #f8fafc;

/* Checkout Container */
background: #ffffff;
border: #e2e8f0;
border-radius: 16px;
shadow: 0 10px 28px rgba(0,0,0,0.06);

/* Checkout Header */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;

/* Order Items */
background: #f8fafc;
border: #e2e8f0;
border-radius: 8px;

/* Item Details */
product-name: #1a202c;
product-price: #059669;
quantity: #64748b;

/* Total Section */
background: #f8fafc;
border-top: #e2e8f0;
total-text: #1a202c;
total-amount: #059669;

/* Place Order Button */
background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
text-color: #ffffff;
```

---

## 🎯 Color Usage Guidelines

### Primary Actions
- Use **Brand Gradient** for main CTAs (Create Account, Login, Add to Cart, Checkout)
- Use **Solid Purple** (#4C1D95) for secondary actions

### Success States
- Use **Green** (#059669) for successful actions, prices, and positive feedback
- Use **Light Green Background** (#D1FAE5) for success messages

### Error States
- Use **Red** (#B91C1C) for errors and destructive actions
- Use **Light Red Background** (#FECACA) for error messages

### Information
- Use **Blue** (#0EA5E9) for informational content and links
- Use **Light Blue Background** (#E0F2FE) for info messages

### Warnings
- Use **Orange** (#D97706) for warnings and important notices
- Use **Light Orange Background** (#FEF3C7) for warning messages

### Text Hierarchy
- **Primary Text**: #0F172A (Dark Blue-Gray) for headings and important text
- **Secondary Text**: #334155 (Medium Gray) for body text
- **Muted Text**: #64748B (Light Gray) for captions and less important text

### Interactive Elements
- **Hover States**: Use lighter/darker variations of the base color
- **Focus States**: Use the brand color (#4C1D95) for focus indicators
- **Disabled States**: Use muted colors (#64748B) with reduced opacity

---

## 🔧 Implementation Notes

1. **CSS Variables**: All colors are defined as CSS custom properties in `index.css`
2. **Material-UI Theme**: Colors can be integrated with Material-UI theme system
3. **Responsive Design**: Colors work across all device sizes
4. **Accessibility**: All color combinations meet WCAG contrast requirements
5. **Dark Mode**: Consider adding dark mode variants for future implementation

This color scheme provides a cohesive, professional, and user-friendly experience across all pages of your QuickCommerce application.
