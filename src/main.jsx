import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './features/cart/CartContext';
import { AuthProvider } from './features/auth/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import 'leaflet/dist/leaflet.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!clientId) {
  console.error('Google Client ID is missing! Please check your .env file.');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId || 'placeholder'}>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </GoogleOAuthProvider>
  </StrictMode>,
)
