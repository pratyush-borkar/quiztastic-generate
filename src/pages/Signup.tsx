
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AuthForm from "@/components/AuthForm";
import PageTransition from "@/components/PageTransition";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Signup = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <div className="container py-4">
          <Link to="/" className="inline-flex items-center">
            <Button variant="ghost" className="gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">MCQ Generator</span>
            </Button>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md">
            <AuthForm type="signup" />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
