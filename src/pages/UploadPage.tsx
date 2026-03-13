import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Image, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
  status: "uploading" | "processing" | "complete" | "error";
  progress: number;
}

const UploadPage: React.FC = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const simulateUpload = useCallback((fileName: string, fileSize: string, fileType: string) => {
    const newFile: UploadedFile = { name: fileName, size: fileSize, type: fileType, status: "uploading", progress: 0 };
    setFiles((prev) => [...prev, newFile]);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles((prev) =>
          prev.map((f) => f.name === fileName ? { ...f, progress: 100, status: "processing" } : f)
        );
        setTimeout(() => {
          setFiles((prev) =>
            prev.map((f) => f.name === fileName ? { ...f, status: "complete" } : f)
          );
        }, 1500);
      } else {
        setFiles((prev) =>
          prev.map((f) => f.name === fileName ? { ...f, progress } : f)
        );
      }
    }, 300);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((f) => {
      simulateUpload(f.name, `${(f.size / 1024).toFixed(1)} KB`, f.type.includes("pdf") ? "pdf" : "image");
    });
  }, [simulateUpload]);

  const handleFileSelect = useCallback(() => {
    // Simulate file selection
    simulateUpload("blood_panel_report.pdf", "2.4 MB", "pdf");
  }, [simulateUpload]);

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl lg:text-3xl font-display font-bold">Upload Reports</h1>
        <p className="text-muted-foreground mt-1">Upload medical reports for AI-powered analysis</p>
      </div>

      {/* Drop zone */}
      <motion.div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={handleFileSelect}
        className={`glass-card border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragging ? "border-primary bg-accent/50 scale-[1.01]" : "border-border hover:border-primary/50"
        }`}
        whileHover={{ scale: 1.005 }}
      >
        <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-4">
          <Upload className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-display font-semibold mb-2">Drop your reports here</h3>
        <p className="text-muted-foreground text-sm mb-4">Supports PDF, JPG, PNG, DICOM files up to 20MB</p>
        <Button variant="outline" size="sm">Browse Files</Button>
      </motion.div>

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-display font-semibold">Uploaded Files</h3>
          {files.map((file, i) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {file.type === "pdf" ? (
                    <FileText className="w-5 h-5 text-destructive" />
                  ) : (
                    <Image className="w-5 h-5 text-primary" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {file.status === "complete" && <CheckCircle2 className="w-5 h-5 text-success" />}
                  {file.status === "error" && <AlertCircle className="w-5 h-5 text-destructive" />}
                  {file.status === "processing" && (
                    <span className="text-xs text-primary font-medium animate-pulse">Analyzing...</span>
                  )}
                  <button onClick={() => removeFile(file.name)} className="text-muted-foreground hover:text-foreground">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {file.status === "uploading" && (
                <Progress value={file.progress} className="h-1.5" />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
