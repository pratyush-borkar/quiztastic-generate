
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import { ArrowRight, BookOpen, CheckCircle, FileText, Sparkles } from "lucide-react";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "PDF-Powered MCQs",
      description: "Upload any PDF document and generate multiple-choice questions automatically."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary" />,
      title: "Smart Question Generation",
      description: "Our AI extracts key concepts and creates meaningful assessment questions."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      title: "Streamlined Assessments",
      description: "Create, distribute, and grade exams all in one platform."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Instant Feedback",
      description: "Students receive immediate results and teachers get detailed performance analytics."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-1">
        <section className="py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 max-w-3xl"
              >
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                  PDF to MCQ Transformation
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                  Transform Documents into
                  <span className="text-primary"> Interactive Quizzes</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Upload PDFs, generate multiple-choice questions, and create assessments with a few clicks. Perfect for educators and students.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {user ? (
                  <Link to={user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard"}>
                    <Button className="text-base" size="lg">
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/signup">
                      <Button className="text-base" size="lg">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link to="/login">
                      <Button variant="outline" className="text-base" size="lg">
                        Sign In
                      </Button>
                    </Link>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold tracking-tight text-center mb-12"
            >
              How It Works
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Upload PDF",
                  description: "Upload your course materials, textbooks, or study notes in PDF format."
                },
                {
                  step: "2",
                  title: "Generate Questions",
                  description: "Our AI analyzes the content and creates relevant multiple-choice questions."
                },
                {
                  step: "3",
                  title: "Create Assessments",
                  description: "Distribute the questions as exams or use them for study practice."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center space-y-3"
                >
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">
                  Powerful Features for Teachers and Students
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Streamline the assessment process from creation to grading
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="glass-card p-6 space-y-4"
                  >
                    <div className="rounded-full bg-primary/10 p-3 w-fit">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-4 flex-1"
              >
                <h2 className="text-3xl font-bold tracking-tight">
                  Ready to transform your assessments?
                </h2>
                <p className="text-muted-foreground">
                  Join thousands of educators and students who are already using our platform to create better assessments and study materials.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link to="/signup">
                  <Button size="lg" className="text-base">
                    Get Started for Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold">MCQ Generator</span>
            <span className="text-sm text-muted-foreground ml-2">
              © {new Date().getFullYear()}
            </span>
          </div>
          
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground">Terms</Link>
            <Link to="#" className="hover:text-foreground">Privacy</Link>
            <Link to="#" className="hover:text-foreground">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
