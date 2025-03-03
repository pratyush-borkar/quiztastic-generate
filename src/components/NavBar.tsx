
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, UserCircle } from "lucide-react";

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Different nav items for teachers and students
  const getNavItems = () => {
    if (!user) return [];
    
    if (user.role === "teacher") {
      return [
        { label: "Dashboard", path: "/teacher-dashboard" }
      ];
    } else {
      return [
        { label: "Dashboard", path: "/student-dashboard" }
      ];
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 500, damping: 10 }}
            >
              <FileText className="h-6 w-6 text-primary" />
            </motion.div>
            <span className="font-bold text-xl">MCQ Generator</span>
          </Link>
          
          {user && (
            <nav className="hidden md:flex gap-6">
              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${
                    isActive(item.path)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{user.name}</span>
                <Badge variant="outline" className="ml-1 capitalize">
                  {user.role}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Missing imports
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export default NavBar;
