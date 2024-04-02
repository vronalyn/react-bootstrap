import React, { createContext, useContext, useState, useEffect } from "react";
import { doGetUserAccount } from "../firebase/auth";
import { useAuth } from "./authContext";
// Create a new context for user roles
const UserRoleContext = createContext();

// Custom hook to use the user role context
export function useUserRole() {
  return useContext(UserRoleContext);
}

// User role provider component
export function UserRoleProvider({ children }) {
  const { currentUser } = useAuth();

  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user role when currentUser changes
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        // Retrieve user account data from Firestore
        const userData = await doGetUserAccount(currentUser.uid);
        setUserRole(userData ? userData.role : null);
      } catch (error) {
        console.error("Error fetching user role:", error);
      } finally {
        setLoading(false);
      }
    };

    // Call fetchUserRole() when currentUser changes
    if (currentUser) {
      fetchUserRole();
    } else {
      // Reset user role when currentUser is null
      setUserRole(null);
      setLoading(false);
    }
  }, [currentUser]);

  // Value provided by the context provider
  const value = {
    userRole,
    loading,
  };

  return (
    <UserRoleContext.Provider value={value}>
      {children}
    </UserRoleContext.Provider>
  );
}
