
import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileIcon, UploadIcon, X, File } from "lucide-react";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  label: string;
  acceptedFileTypes?: string;
  maxFileSizeMB?: number;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  label,
  acceptedFileTypes = ".pdf",
  maxFileSizeMB = 10
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.name.endsWith('.pdf')) {
      toast.error("Only PDF files are accepted");
      return false;
    }
    
    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      toast.error(`File size should be less than ${maxFileSizeMB}MB`);
      return false;
    }
    
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        handleFileUpload(droppedFile);
      }
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        handleFileUpload(selectedFile);
      }
    }
  };

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setIsUploading(true);
    
    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      onFileUpload(uploadedFile);
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("Error uploading file");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 text-sm font-medium">{label}</div>
      
      {!file ? (
        <div
          className={`file-drop-area ${isDragging ? "active" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFileTypes}
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              animate={{ scale: isDragging ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="mx-auto mb-3 rounded-full bg-primary/10 p-3">
                <UploadIcon className="h-6 w-6 text-primary" />
              </div>
            </motion.div>
            
            <div className="mb-2 text-base font-medium">
              Drag & drop your file here or <span className="text-primary">browse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Supported format: PDF (max {maxFileSizeMB}MB)
            </p>
          </div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-primary/10 p-2">
                <FileIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-medium text-sm truncate max-w-[200px]">
                  {file.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              {isUploading ? (
                <div className="animate-spin mr-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  >
                    <File className="h-4 w-4 text-primary" />
                  </motion.div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemoveFile}
                  className="h-8 w-8 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default FileUploader;
