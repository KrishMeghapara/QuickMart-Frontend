import React, { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { useAuth } from "../auth/AuthContext";
import apiService from "../../services/apiService";

const CartContext = createContext();

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return { ...state, items: action.items, loading: false };
    case "ADD":
      return {
        ...state,
        items: [...state.items, { ...action.item, quantity: 1 }],
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.cartID === action.cartID
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    case "REMOVE":
      return {
        ...state,
        items: state.items.filter(i => i.cartID !== action.cartID),
      };
    case "CLEAR":
      return { ...state, items: [] };
    case "SET_LOADING":
      return { ...state, loading: action.loading };
    case "SET_ERROR":
      return { ...state, error: action.error, loading: false };
    case "RESET_CART":
      return { ...state, items: [], loading: false, error: null };
    default:
      return state;
  }
}

const initialState = { items: [], loading: true, error: null };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, token } = useAuth();

  // Load cart from database when user logs in
  const loadCart = useCallback(async () => {
    if (!token || !user) {
      dispatch({ type: "RESET_CART" });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", loading: true });
      await new Promise(resolve => setTimeout(resolve, 100));
      const cartData = await apiService.getMyCart();
      dispatch({ type: "SET_CART", items: cartData });
    } catch (error) {
      setTimeout(() => {
        if (token && user) {
          loadCart();
        }
      }, 1000);
    }
  }, [token, user]);

  // Load cart when user changes or token changes
  useEffect(() => {
    if (token && user) {
      loadCart();
    } else {
      // Clear cart when user logs out
      dispatch({ type: "RESET_CART" });
    }
  }, [token, user, loadCart]);

  // Auto-refresh cart periodically (except on payment page)
  useEffect(() => {
    if (!token || !user) return;

    if (window.location.pathname === '/payment') return;

    const interval = setInterval(async () => {
      try {
        if (window.location.pathname === '/payment') return;

        const cartData = await apiService.getMyCart();
        dispatch({ type: "SET_CART", items: cartData });
      } catch (error) {
        // Silently fail on auto-refresh
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [token, user]);

  const addToCart = async (product) => {
    if (!token) {
      alert('Please login to add items to cart');
      return false;
    }

    if (!product) {
      dispatch({ type: "SET_ERROR", error: 'Invalid product' });
      return false;
    }

    try {
      dispatch({ type: "SET_LOADING", loading: true });

      const productId = product.productID || product.ProductID;

      if (!productId) {
        dispatch({ type: "SET_ERROR", error: 'Product ID not found' });
        return false;
      }

      const cartItem = {
        ProductID: productId,
        Quantity: 1
      };

      await apiService.addToCart(cartItem);
      await loadCart();

      window.dispatchEvent(new CustomEvent('cart:itemAdded'));

      return true;
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: error.message || 'Failed to add item to cart' });
      dispatch({ type: "SET_LOADING", loading: false });
      return false;
    }
  };

  const updateQuantity = async (cartID, quantity) => {
    if (!token) {
      dispatch({ type: "SET_ERROR", error: 'Please login to update cart' });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", loading: true });

      const updateData = {
        CartID: cartID,
        Quantity: quantity
      };

      await apiService.updateCartQuantity(updateData);
      dispatch({ type: "UPDATE_QUANTITY", cartID, quantity });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: 'Failed to update quantity' });
      await loadCart();
    }
  };

  const removeFromCart = async (cartID) => {
    if (!token) {
      dispatch({ type: "SET_ERROR", error: 'Please login to remove items from cart' });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", loading: true });
      await apiService.removeFromCart(cartID);
      dispatch({ type: "REMOVE", cartID });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: 'Failed to remove item from cart' });
      await loadCart();
    }
  };

  const clearCart = async () => {
    if (!token) {
      dispatch({ type: "SET_ERROR", error: 'Please login to clear cart' });
      return;
    }

    try {
      dispatch({ type: "SET_LOADING", loading: true });
      for (const item of state.items) {
        await apiService.removeFromCart(item.cartID);
      }
      dispatch({ type: "CLEAR" });
    } catch (error) {
      dispatch({ type: "SET_ERROR", error: 'Failed to clear cart' });
      await loadCart();
    }
  };

  const clearError = () => {
    dispatch({ type: "SET_ERROR", error: null });
  };

  const value = {
    cart: state.items,
    loading: state.loading,
    error: state.error,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    clearError,
    refreshCart: loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 