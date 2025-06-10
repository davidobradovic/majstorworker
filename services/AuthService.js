import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for your API endpoints
const API_URL = 'https://backend.davidtesla.online';

// Authentication service for handling JWT tokens and auth requests
class AuthService {
  // Store JWT token in AsyncStorage
  static async setToken(token) {
    try {
      await AsyncStorage.setItem('authToken', token);
      return true;
    } catch (error) {
      console.error('Error storing token:', error);
      return false;
    }
  }

  // Retrieve JWT token from AsyncStorage
  static async getToken() {
    try {
      return await AsyncStorage.getItem('authToken');
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  }

  // Remove JWT token from AsyncStorage (logout)
  static async removeToken() {
    try {
      await AsyncStorage.removeItem('authToken');
      return true;
    } catch (error) {
      console.error('Error removing token:', error);
      return false;
    }
  }

  // Check if user is authenticated
  static async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  }

  static async getUserData() {
    try {
        return await AsyncStorage.getItem('userData');
    } catch (error) {
        console.error('Error retrieving user profile:', error);
        return null;
    }
  }

  static async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        // Store the JWT token
        await this.setToken(data.token);
        
        // Also store user data if available
        if (data.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        }
        
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || 'Login failed',
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'Network or server error',
      };
    }
  }
  
  // Logout user by removing JWT token
  static async logout() {
    try {
      // You might want to call a logout endpoint on your server as well
      await this.removeToken();
      return {
        success: true,
      };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        message: 'Error during logout',
      };
    }
  }

  // Get auth headers for authenticated requests
  static async getAuthHeaders() {
    const token = await this.getToken();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Make authenticated API requests
  static async authenticatedRequest(endpoint, method = 'GET', body = null) {
    try {
      const headers = await this.getAuthHeaders();
      
      const options = {
        method,
        headers,
      };

      if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${API_URL}${endpoint}`, options);
      const data = await response.json();

      return {
        success: response.ok,
        data: data,
        status: response.status,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        success: false,
        message: 'Network or server error',
      };
    }
  }
}

export default AuthService;