
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Check, Plus, X } from 'lucide-react';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { parseResume } from '@/utils/resumeParser';
import { useUser } from '@/contexts/UserContext';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [manualEntry, setManualEntry] = useState(false);
  const [skills, setSkills] = useState('');
  const { toast } = useToast();
  const [fileError, setFileError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Get user context
  const { setUserSkills, setIsProcessed } = useUser();

  // Handle file error toast with useEffect to avoid React warning
  useEffect(() => {
    if (fileError) {
      toast({
        title: "Invalid file format",
        description: fileError,
        variant: "destructive",
      });
      setFileError(null);
    }
  }, [fileError, toast]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(file);
      } else {
        setFileError("Please upload a PDF or DOCX file.");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(file);
      } else {
        setFileError("Please upload a PDF or DOCX file.");
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file && !manualEntry) {
      toast({
        title: "No input provided",
        description: "Please upload a resume or enter skills manually.",
        variant: "destructive",
      });
      return;
    }

    if (manualEntry && !skills.trim()) {
      toast({
        title: "No skills provided",
        description: "Please enter at least one skill.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      let extractedSkills: string[] = [];
      
      if (manualEntry) {
        // Parse manual skills entry
        extractedSkills = skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
      } else if (file) {
        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 90) {
              clearInterval(progressInterval);
              return 90;
            }
            return prev + 10;
          });
        }, 300);
        
        // Parse the resume
        extractedSkills = await parseResume(file);
        
        clearInterval(progressInterval);
        setProgress(100);
      }
      
      // Update user context with extracted skills
      setUserSkills(extractedSkills);
      setIsProcessed(true);
      
      // Show success toast
      toast({
        title: "Skills extracted successfully!",
        description: "We've analyzed your profile and found matching opportunities.",
      });
      
      // Redirect to matches page after a short delay
      setTimeout(() => {
        navigate('/matches');
      }, 1500);
      
    } catch (error) {
      toast({
        title: "Processing error",
        description: "There was an error processing your input. Please try again.",
        variant: "destructive",
      });
      console.error("Error processing input:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Let's Analyze Your Skills</h1>
            <p className="text-secondary/70">
              Upload your resume or enter your skills to find matching internships.
            </p>
          </div>

          {!manualEntry ? (
            <div
              className={`border-2 border-dashed rounded-xl p-8 transition-all mb-6 text-center ${
                isDragging ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-primary/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="flex flex-col items-center">
                  <div className="mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Upload size={24} />
                  </div>
                  <p className="mb-4 text-secondary">Drop your resume here (PDF/DOCX)</p>
                  <label className="button-secondary cursor-pointer">
                    Browse Files
                    <input 
                      type="file" 
                      className="hidden" 
                      accept=".pdf,.docx" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between bg-slate-50 rounded-md p-3 mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center text-primary mr-3">
                        {file.name.endsWith('.pdf') ? 'PDF' : 'DOC'}
                      </div>
                      <div className="text-left">
                        <p className="font-medium truncate max-w-xs">{file.name}</p>
                        <p className="text-xs text-secondary/60">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                    </div>
                    <button 
                      onClick={handleRemoveFile}
                      className="text-secondary/60 hover:text-secondary p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-secondary mb-2">
                Enter your skills (comma separated)
              </label>
              <textarea
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., Python, JavaScript, React, SQL, Data Analysis"
                className="w-full rounded-md border border-slate-200 p-4 min-h-24 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          )}

          <div className="mb-8 text-center">
            <button
              type="button"
              onClick={() => setManualEntry(!manualEntry)}
              className="text-primary hover:text-primary/80 text-sm font-medium inline-flex items-center"
            >
              {manualEntry ? (
                <>
                  <Upload size={16} className="mr-1" /> 
                  Upload resume instead
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-1" /> 
                  Enter skills manually
                </>
              )}
            </button>
          </div>

          {isProcessing && (
            <div className="mb-6">
              <p className="text-sm font-medium text-secondary mb-2">Processing...</p>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              className="button-primary"
              disabled={isProcessing}
            >
              {isProcessing ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPage;
