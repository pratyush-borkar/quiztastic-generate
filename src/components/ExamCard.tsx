
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, Award, ArrowRight } from "lucide-react";
import { format } from "date-fns";

interface Exam {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  duration: number; // in minutes
  questionsCount: number;
  status: "upcoming" | "available" | "submitted" | "graded";
  score?: number;
}

interface ExamCardProps {
  exam: Exam;
  onStartExam?: (examId: string) => void;
  onViewResults?: (examId: string) => void;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam, onStartExam, onViewResults }) => {
  const getStatusColor = (status: Exam["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-orange-100 text-orange-600";
      case "available":
        return "bg-green-100 text-green-600";
      case "submitted":
        return "bg-blue-100 text-blue-600";
      case "graded":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };
  
  const getStatusText = (status: Exam["status"]) => {
    switch (status) {
      case "upcoming":
        return "Upcoming";
      case "available":
        return "Available";
      case "submitted":
        return "Submitted";
      case "graded":
        return "Graded";
      default:
        return "Unknown";
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Card className="h-full glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <Badge className={`${getStatusColor(exam.status)} font-medium`}>
              {getStatusText(exam.status)}
            </Badge>
            {exam.status === "graded" && exam.score !== undefined && (
              <div className="flex items-center">
                <Award className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="font-semibold">{exam.score}%</span>
              </div>
            )}
          </div>
          <CardTitle className="text-xl mt-2">{exam.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="pb-0">
          <p className="text-sm text-muted-foreground mb-4">{exam.description}</p>
          
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{format(exam.deadline, "MMM d, yyyy")}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{exam.duration} minutes</span>
            </div>
            <div className="flex items-center col-span-2">
              <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>{exam.questionsCount} questions</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="mt-4">
          {exam.status === "available" && onStartExam && (
            <Button 
              onClick={() => onStartExam(exam.id)}
              className="w-full"
              size="sm"
            >
              Start Exam
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {exam.status === "graded" && onViewResults && (
            <Button 
              onClick={() => onViewResults(exam.id)}
              variant="outline"
              className="w-full"
              size="sm"
            >
              View Results
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          
          {exam.status === "upcoming" && (
            <Button 
              disabled
              variant="outline"
              className="w-full"
              size="sm"
            >
              Not Available Yet
            </Button>
          )}
          
          {exam.status === "submitted" && (
            <Button 
              disabled
              variant="outline"
              className="w-full"
              size="sm"
            >
              Waiting for Grading
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ExamCard;
