
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import NavBar from "@/components/NavBar";
import FileUploader from "@/components/FileUploader";
import ExamCard from "@/components/ExamCard";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, FileText, Upload, BookOpen } from "lucide-react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("available");

  // Mock exams data
  const exams = [
    {
      id: "1",
      title: "Midterm Exam",
      description: "Covers chapters 1-5 of the textbook",
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      duration: 90,
      questionsCount: 30,
      status: "available" as const
    },
    {
      id: "2",
      title: "Quiz: Introduction to Data Structures",
      description: "Basic concepts of data structures and algorithms",
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      duration: 45,
      questionsCount: 15,
      status: "available" as const
    },
    {
      id: "3",
      title: "Chapter 3 Assessment",
      description: "Test your knowledge of Chapter 3",
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      duration: 60,
      questionsCount: 20,
      status: "upcoming" as const
    },
    {
      id: "4",
      title: "Programming Concepts Test",
      description: "Fundamentals of programming and logic",
      deadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      duration: 75,
      questionsCount: 25,
      status: "submitted" as const
    },
    {
      id: "5",
      title: "Final Project",
      description: "End of semester comprehensive assessment",
      deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      duration: 120,
      questionsCount: 40,
      status: "graded" as const,
      score: 85
    }
  ];

  const handleStartExam = (examId: string) => {
    toast.success(`Started exam: ${examId}`);
  };

  const handleViewResults = (examId: string) => {
    toast.success(`Viewing results for exam: ${examId}`);
  };

  const handleFileUpload = (file: File) => {
    toast.success(`Uploaded file: ${file.name}`);
  };

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

  // Filter exams based on active tab
  const filteredExams = exams.filter(exam => {
    if (activeTab === "available") return exam.status === "available";
    if (activeTab === "upcoming") return exam.status === "upcoming";
    if (activeTab === "completed") return ["submitted", "graded"].includes(exam.status);
    return true;
  });

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <main className="flex-1 py-8">
          <div className="container px-4 md:px-6">
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
                <p className="text-muted-foreground">View and take exams from your dashboard</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 text-primary mr-2" />
                      <CardTitle className="text-lg">Your Progress</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Completed Exams</span>
                          <span className="font-medium">2/5</span>
                        </div>
                        <Progress value={40} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Average Score</span>
                          <span className="font-medium">85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {exams
                        .filter(exam => exam.status === "available")
                        .slice(0, 2)
                        .map(exam => (
                          <div key={exam.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                            <span className="font-medium truncate">{exam.title}</span>
                            <span className="text-muted-foreground text-xs">
                              {Math.ceil((exam.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-primary mr-2" />
                      <CardTitle className="text-lg">Recent Results</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {exams
                        .filter(exam => exam.status === "graded")
                        .map(exam => (
                          <div key={exam.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                            <span className="font-medium truncate">{exam.title}</span>
                            <span className={`font-medium ${(exam.score || 0) >= 80 ? 'text-green-600' : 'text-orange-600'}`}>
                              {exam.score}%
                            </span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Submit Exam</CardTitle>
                    <CardDescription>
                      Upload your exam paper in PDF format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FileUploader
                      onFileUpload={handleFileUpload}
                      label="Upload your exam submission"
                    />
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Tabs 
                    defaultValue="available" 
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="grid w-full grid-cols-3 bg-background h-12">
                      <TabsTrigger value="available">Available Exams</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value={activeTab} className="mt-6">
                      {filteredExams.length > 0 ? (
                        <motion.div
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                          {filteredExams.map((exam, index) => (
                            <motion.div
                              key={exam.id}
                              variants={itemVariants}
                              custom={index}
                            >
                              <ExamCard
                                exam={exam}
                                onStartExam={handleStartExam}
                                onViewResults={handleViewResults}
                              />
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        <div className="text-center py-12">
                          <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                          <h3 className="text-lg font-medium">No exams found</h3>
                          <p className="text-muted-foreground">
                            There are no {activeTab} exams at the moment.
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default StudentDashboard;
