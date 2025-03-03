
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserRole = "teacher" | "student" | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, you would validate credentials with an API
      // For now, we'll simulate a login with mock data
      setTimeout(() => {
        const mockUser: User = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name: email.split('@')[0],
          email,
          role
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        toast.success("Login successful");
        
        if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-dashboard");
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Login failed");
      setIsLoading(false);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // In a real app, you would create a user with an API
      // For now, we'll simulate a signup with mock data
      setTimeout(() => {
        const mockUser: User = {
          id: "user-" + Math.random().toString(36).substr(2, 9),
          name,
          email,
          role
        };
        
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        
        toast.success("Signup successful");
        
        if (role === "teacher") {
          navigate("/teacher-dashboard");
        } else {
          navigate("/student-dashboard");
        }
        
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("Signup failed");
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
