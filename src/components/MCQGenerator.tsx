
import React, { useState } from "react";
import { motion } from "framer-motion";
import FileUploader from "./FileUploader";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface MCQGeneratorProps {
  onGenerate: (mcqs: any[]) => void;
}

const MCQGenerator: React.FC<MCQGeneratorProps> = ({ onGenerate }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<"upload" | "configure" | "generating">("upload");

  const handleFileUpload = (file: File) => {
    setFile(file);
    setStep("configure");
  };

  const handleGenerate = async () => {
    if (!file) return;
    
    setIsGenerating(true);
    setStep("generating");
    setProgress(0);
    
    try {
      // Simulate MCQ generation with progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 500);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Mock MCQ data
      const mockMCQs = Array.from({ length: numQuestions }, (_, i) => ({
        id: i,
        question: `Sample question ${i + 1} from the PDF document?`,
        options: [
          `Option A for question ${i + 1}`,
          `Option B for question ${i + 1}`,
          `Option C for question ${i + 1}`,
          `Option D for question ${i + 1}`
        ],
        correctAnswer: Math.floor(Math.random() * 4)
      }));
      
      setTimeout(() => {
        toast.success(`Generated ${numQuestions} MCQs successfully`);
        onGenerate(mockMCQs);
        setIsGenerating(false);
      }, 500);
      
    } catch (error) {
      toast.error("Failed to generate MCQs");
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {step === "upload" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <FileUploader
            onFileUpload={handleFileUpload}
            label="Upload PDF to Generate MCQs"
          />
        </motion.div>
      )}
      
      {step === "configure" && file && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="num-questions" className="text-base font-medium">
                      Number of Questions
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Select how many MCQs to generate
                    </p>
                  </div>
                  <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-medium">
                    {numQuestions}
                  </div>
                </div>
                
                <Slider
                  id="num-questions"
                  min={1}
                  max={20}
                  step={1}
                  defaultValue={[numQuestions]}
                  onValueChange={(value) => setNumQuestions(value[0])}
                  className="py-4"
                />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setStep("upload")}
              className="flex-1"
            >
              Back
            </Button>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleGenerate}
                className="w-full"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Generate MCQs
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
      
      {step === "generating" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="glass-card p-6 rounded-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg">Generating MCQs</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we analyze your PDF
                </p>
              </div>
              <div className="relative h-12 w-12">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-0"
                >
                  <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent"></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-medium">{Math.round(progress)}%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ type: "spring", stiffness: 50, damping: 10 }}
                ></motion.div>
              </div>
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Step {progress < 30 ? 1 : progress < 70 ? 2 : 3} of 3</span>
                <span>
                  {progress < 30
                    ? "Analyzing document..."
                    : progress < 70
                    ? "Extracting key concepts..."
                    : "Generating questions..."}
                </span>
              </div>
            </div>
            
            <div className="pt-2">
              <Button
                disabled={isGenerating}
                variant="outline"
                onClick={() => {
                  setStep("configure");
                  setIsGenerating(false);
                }}
                className="w-full"
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MCQGenerator;
