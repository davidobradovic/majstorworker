import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import AuthService from "../services/AuthService";
import { useNavigation } from "@react-navigation/native";

// Create authentication context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([])
  const [bookings, setBookings] = useState([])
  const [categories, setCategories] = useState([]);

  const fetchProfileData = async (id) => {
    await fetch(`https://backend.davidtesla.online/api/user/${id}`).then((res) => res.json()).then((response) => setProfile(response)).catch((err) => {
        console.log(err)
    });
  };

  const fetchBookings = async (id) => {
    await fetch(`https://backend.davidtesla.online/api/order/customer/${id}`).then((res) => res.json()).then((response) => setBookings(response)).catch((err) => {
        console.log(err)
    });
  };

  const statusFormatter = (status) => {
    switch (status) {
      case "inProgress":
        return { text: "In Progress", color: "#FFA500" }; // orange
      case "requested":
        return { text: "Requested", color: "#007BFF" }; // blue
      case "accepted":
        return { text: "Accepted", color: "#28A745" }; // green
      case "rejected":
        return { text: "Rejected", color: "#DC3545" }; // red
      case "cancelled":
        return { text: "Cancelled", color: "#DC3545" }; // gray
      case "completed":
        return { text: "Completed", color: "#20C997" }; // teal
      default:
        return { text: status, color: "#000000" }; // fallback: black
    }
  };
  
  
  const navigation = useNavigation();

  // Initialize the auth state when app loads
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const authenticated = await AuthService.isAuthenticated();
        setIsAuthenticated(authenticated);

   

        if (authenticated) {
          navigation.reset({
            index: 0,
            routes: [{ name: "Authed" }],
          });

        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {

        const userDataString = await AuthService.getUserData();
        const userData = JSON.parse(userDataString);    

        setLoading(false);
        setUser(userData);

      }
    };

    initializeAuth();
  }, []);

  
  const fetchCategories = useCallback(async () => {
    await fetch("https://backend.davidtesla.online/api/categories")
      .then((res) => res.json())
      .then((response) => {
        setCategories(response)
      })
      .catch((err) => console.log(err));
  }, []);
  
  useEffect(() => {
    fetchCategories();
  }, [])


  useEffect(() => {
    if(user) {
      fetchProfileData(user.id)
      fetchBookings(user.id)
    }
  }, [user])

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await AuthService.login(email, password);

      if (result.success) {
        setIsAuthenticated(true);
        // If the token response includes user data
        if (result.data.user) {
          setUser(result.data.user);
        }
        return { success: true };
      } else {
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "An unexpected error occurred during login",
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await AuthService.logout();
      setIsAuthenticated(false);
      setUser(null);

      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
      
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile function
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Auth context value
  const contextValue = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    profile,
    bookings,
    statusFormatter,
    categories
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
