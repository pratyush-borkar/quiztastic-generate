
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const { login, signup, isLoading } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      await login(email, password, role);
    } else {
      await signup(name, email, password, role);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card overflow-hidden">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {type === "login" ? "Welcome back" : "Create an account"}
        </CardTitle>
        <CardDescription>
          {type === "login"
            ? "Enter your credentials to access your account"
            : "Fill in your details to create a new account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
                />
              </motion.div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: type === "signup" ? 0.1 : 0 }}
            >
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: type === "signup" ? 0.2 : 0.1 }}
            >
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="transition-all duration-300 focus:ring-2 focus:ring-primary/50"
              />
            </motion.div>
          </div>
          
          <div className="space-y-2">
            <Label>I am a</Label>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: type === "signup" ? 0.3 : 0.2 }}
            >
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as "teacher" | "student")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="cursor-pointer">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                </div>
              </RadioGroup>
            </motion.div>
          </div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="pt-2"
          >
            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {type === "login" ? "Logging in..." : "Signing up..."}
                </>
              ) : (
                type === "login" ? "Sign In" : "Sign Up"
              )}
            </Button>
          </motion.div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          {type === "login" ? "Don't have an account? " : "Already have an account? "}
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="text-primary font-medium hover:underline"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
