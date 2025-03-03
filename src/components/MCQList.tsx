
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Download, Edit, Trash2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface MCQ {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface MCQListProps {
  mcqs: MCQ[];
  onEdit?: (mcq: MCQ) => void;
  onDelete?: (id: number) => void;
}

const MCQList: React.FC<MCQListProps> = ({ mcqs, onEdit, onDelete }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  
  const handleExport = () => {
    // In a real app, this would generate and download a PDF or other file format
    toast.success("MCQs exported successfully");
  };
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const handleAnswerSelect = (mcqId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [mcqId]: answerIndex
    }));
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Generated MCQs ({mcqs.length})</h2>
        <Button onClick={handleExport} className="flex items-center">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
      
      <div className="space-y-4">
        <AnimatePresence>
          {mcqs.map((mcq, index) => (
            <motion.div
              key={mcq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
                <CardHeader 
                  className="cursor-pointer bg-secondary/50 transition-colors hover:bg-secondary/80"
                  onClick={() => toggleExpand(mcq.id)}
                >
                  <CardTitle className="text-base font-medium flex items-start justify-between">
                    <div className="flex">
                      <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3">
                        {index + 1}
                      </span>
                      <span>{mcq.question}</span>
                    </div>
                    {selectedAnswers[mcq.id] === mcq.correctAnswer && (
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 ml-2" />
                    )}
                  </CardTitle>
                </CardHeader>
                
                <AnimatePresence>
                  {expandedId === mcq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardContent className="pt-4">
                        <RadioGroup 
                          value={selectedAnswers[mcq.id]?.toString() || ""}
                          onValueChange={(value) => handleAnswerSelect(mcq.id, parseInt(value))}
                          className="space-y-3"
                        >
                          {mcq.options.map((option, optionIndex) => (
                            <div 
                              key={optionIndex}
                              className={`flex items-center space-x-2 p-3 rounded-md transition-colors ${
                                selectedAnswers[mcq.id] === optionIndex
                                  ? selectedAnswers[mcq.id] === mcq.correctAnswer
                                    ? "bg-green-50 border border-green-100"
                                    : "bg-red-50 border border-red-100"
                                  : "hover:bg-secondary"
                              }`}
                            >
                              <RadioGroupItem 
                                value={optionIndex.toString()} 
                                id={`mcq-${mcq.id}-option-${optionIndex}`} 
                              />
                              <Label 
                                htmlFor={`mcq-${mcq.id}-option-${optionIndex}`}
                                className="flex-1 cursor-pointer"
                              >
                                {option}
                              </Label>
                              {selectedAnswers[mcq.id] === optionIndex && 
                               selectedAnswers[mcq.id] === mcq.correctAnswer && (
                                <span className="text-xs font-medium text-green-600">Correct</span>
                              )}
                              {selectedAnswers[mcq.id] === optionIndex && 
                               selectedAnswers[mcq.id] !== mcq.correctAnswer && (
                                <span className="text-xs font-medium text-red-600">Incorrect</span>
                              )}
                            </div>
                          ))}
                        </RadioGroup>
                        
                        {onEdit && onDelete && (
                          <div className="flex space-x-2 mt-4 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => onEdit(mcq)}
                              className="h-8"
                            >
                              <Edit className="h-3.5 w-3.5 mr-1" />
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => onDelete(mcq.id)}
                              className="h-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3.5 w-3.5 mr-1" />
                              Delete
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MCQList;
