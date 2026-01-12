import { API_BASE, API_TIMEOUT } from '../config/api';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE;
    this.timeout = API_TIMEOUT;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const token = localStorage.getItem('jwtToken');

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    };

    const config = { ...defaultOptions, ...options };
    delete config.timeout;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      // Read response body once
      const responseText = await response.text();

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = JSON.parse(responseText);
        } catch {
          // Response is not JSON
        }

        // Handle 401 Unauthorized - token expired or invalid
        if (response.status === 401) {
          console.log('Token expired or invalid. Clearing auth...');
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('user');
          // Only redirect if not already on login page
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          throw new Error('Session expired. Please login again.');
        }

        // Handle 500 server errors
        if (response.status === 500) {
          console.error('Server error:', errorData.message || responseText);
          throw new Error(errorData.message || 'Server error. Please try again later.');
        }

        // Handle FluentValidation errors
        if (errorData.errors && Array.isArray(errorData.errors)) {
          const validationErrors = errorData.errors.map(err => `${err.field}: ${err.message}`).join(', ');
          throw new Error(`Validation failed: ${validationErrors}`);
        }

        // Handle other API errors
        throw new Error(errorData.message || responseText || `HTTP ${response.status}: ${response.statusText}`);
      }

      // Try to parse as JSON, fallback to text
      try {
        return JSON.parse(responseText);
      } catch {
        return responseText;
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  // Test endpoint
  async testConnection() {
    return this.request('/Test');
  }

  async healthCheck() {
    return this.request('/Test/health');
  }

  async testDatabase() {
    return this.request('/Test/db-test');
  }

  async testRegister(userData) {
    return this.request('/Test/test-register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // Auth endpoints
  async login(credentials) {
    return this.request('/User/Login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  async register(userData) {
    return this.request('/User/Register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async validateToken() {
    return this.request('/User/ValidateToken');
  }

  async googleLogin(idToken) {
    return this.request('/User/GoogleLogin', {
      method: 'POST',
      body: JSON.stringify({ IdToken: idToken })
    });
  }

  // Product endpoints
  async getProducts() {
    return this.request('/Product');
  }

  async getProductById(id) {
    return this.request(`/Product/${id}`);
  }

  async getProductsByCategory(categoryId) {
    return this.request(`/Product/ByCategory/${categoryId}`);
  }

  async searchProducts(query) {
    return this.request(`/Product/Search?query=${encodeURIComponent(query)}`);
  }

  async filterProducts(filters) {
    const params = new URLSearchParams();
    if (filters.categoryId) params.append('CategoryId', filters.categoryId);
    if (filters.minPrice) params.append('MinPrice', filters.minPrice);
    if (filters.maxPrice) params.append('MaxPrice', filters.maxPrice);
    if (filters.inStockOnly) params.append('InStockOnly', filters.inStockOnly);
    if (filters.sortBy) params.append('SortBy', filters.sortBy);
    if (filters.search) params.append('Search', filters.search);

    return this.request(`/Product/Filter?${params.toString()}`);
  }

  async getPriceRange() {
    return this.request('/Product/PriceRange');
  }

  // Category endpoints
  async getCategories() {
    return this.request('/Category');
  }

  // Cart endpoints
  async getCartByUserId(userId) {
    return this.request(`/Cart/User/${userId}`);
  }

  async getMyCart() {
    return this.request('/Cart/MyCart');
  }

  async addToCart(cartItem) {
    return this.request('/Cart/Add', {
      method: 'POST',
      body: JSON.stringify(cartItem)
    });
  }

  async updateCartQuantity(cartItem) {
    return this.request('/Cart/UpdateQty', {
      method: 'PUT',
      body: JSON.stringify(cartItem)
    });
  }

  async removeFromCart(cartId) {
    return this.request(`/Cart/Remove/${cartId}`, {
      method: 'DELETE'
    });
  }

  // Address endpoints
  async addAddress(addressData) {
    return this.request('/Address', {
      method: 'POST',
      body: JSON.stringify(addressData)
    });
  }

  async updateAddress(id, addressData) {
    return this.request(`/Address/${id}`, {
      method: 'PUT',
      body: JSON.stringify(addressData)
    });
  }

  async deleteAddress(addressId) {
    return this.request(`/Address/${addressId}`, {
      method: 'DELETE'
    });
  }

  // User endpoints
  async getUserById(id) {
    return this.request(`/User/${id}`);
  }

  async getUserProfile() {
    return this.request('/User/Profile');
  }

  async updateUser(id, userData) {
    return this.request(`/User/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async changePassword(passwordData) {
    return this.request('/User/ChangePassword', {
      method: 'POST',
      body: JSON.stringify(passwordData)
    });
  }

  // Profile Picture endpoints
  async uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('jwtToken');
    const url = `${this.baseUrl}/User/UploadProfilePicture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  }

  async removeProfilePicture() {
    return this.request('/User/RemoveProfilePicture', {
      method: 'DELETE'
    });
  }

  // Order endpoints
  async createOrder(orderData) {
    return this.request('/Order', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrdersByUser(userId) {
    return this.request(`/Order/User/${userId}`);
  }

  async getOrderById(orderId) {
    return this.request(`/Order/${orderId}`);
  }

  // Product Review endpoints
  async getProductReviews(productId) {
    return this.request(`/ProductReview/Product/${productId}`);
  }

  async addProductReview(reviewData) {
    return this.request('/ProductReview', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }
}

export default new ApiService(); 