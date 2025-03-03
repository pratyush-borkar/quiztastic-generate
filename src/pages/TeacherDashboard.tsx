
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import FileUploader from "@/components/FileUploader";
import MCQGenerator from "@/components/MCQGenerator";
import MCQList from "@/components/MCQList";
import PageTransition from "@/components/PageTransition";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, List, CheckSquare } from "lucide-react";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [mcqs, setMcqs] = useState<any[]>([]);
  const [showGenerator, setShowGenerator] = useState(true);

  const handleGenerate = (generatedMcqs: any[]) => {
    setMcqs(generatedMcqs);
    setShowGenerator(false);
  };

  const handleReset = () => {
    setShowGenerator(true);
    setMcqs([]);
  };

  // Mock exams data
  const exams = [
    {
      id: "1",
      title: "Midterm Exam",
      submitted: 24,
      total: 30,
      averageScore: 78
    },
    {
      id: "2",
      title: "Chapter 5 Quiz",
      submitted: 18,
      total: 25,
      averageScore: 85
    },
    {
      id: "3",
      title: "Final Project",
      submitted: 12,
      total: 30,
      averageScore: 92
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
      transition: { duration: 0.4 }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
                <p className="text-muted-foreground">Generate and manage MCQs from your documents</p>
              </div>
              
              <Tabs defaultValue="generator" className="space-y-6">
                <TabsList className="bg-background">
                  <TabsTrigger value="generator" className="gap-2 text-sm">
                    <Upload className="h-4 w-4" />
                    Generate MCQs
                  </TabsTrigger>
                  <TabsTrigger value="exams" className="gap-2 text-sm">
                    <List className="h-4 w-4" />
                    My Exams
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="generator" className="space-y-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>MCQ Generator</CardTitle>
                      <CardDescription>
                        Upload a PDF document to automatically generate multiple-choice questions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {showGenerator ? (
                        <MCQGenerator onGenerate={handleGenerate} />
                      ) : (
                        <div className="space-y-8">
                          <MCQList 
                            mcqs={mcqs}
                            onEdit={(mcq) => console.log("Edit MCQ", mcq)}
                            onDelete={(id) => {
                              setMcqs(mcqs.filter(mcq => mcq.id !== id));
                            }}
                          />
                          
                          <div className="flex justify-center">
                            <Button onClick={handleReset} variant="outline">
                              Generate New MCQs
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="exams" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">30</CardTitle>
                        <CardDescription>Total Students</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">12</CardTitle>
                        <CardDescription>Active Exams</CardDescription>
                      </CardHeader>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-2xl">85%</CardTitle>
                        <CardDescription>Average Score</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Exams</CardTitle>
                      <CardDescription>
                        Track the progress of your exams and assessments
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-4"
                      >
                        {exams.map((exam) => (
                          <motion.div
                            key={exam.id}
                            variants={itemVariants}
                            className="glass-card p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="rounded-full bg-primary/10 p-2">
                                <FileText className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{exam.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {exam.submitted} of {exam.total} submitted
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <div className="text-sm font-medium">{exam.averageScore}%</div>
                                <div className="text-xs text-muted-foreground">Average score</div>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckSquare className="h-5 w-5 text-green-600" />
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default TeacherDashboard;
