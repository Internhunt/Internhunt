
/**
 * Resume parser utility
 * Extracts text and skills from uploaded resumes
 */

import { PDFDocument } from 'pdf-lib';

// List of common skills to extract from resumes
// In a real implementation, this would be much more comprehensive
const COMMON_SKILLS = [
  "javascript", "typescript", "react", "angular", "vue", "node", "express",
  "python", "django", "flask", "java", "spring", "c#", ".net", "php", "laravel",
  "ruby", "rails", "go", "rust", "sql", "mysql", "postgresql", "mongodb", "nosql",
  "aws", "azure", "gcp", "docker", "kubernetes", "jenkins", "git", "ci/cd",
  "html", "css", "sass", "less", "tailwind", "bootstrap", "materialui", "figma",
  "photoshop", "illustrator", "ui/ux", "responsive design", "mobile development",
  "ios", "android", "flutter", "react native", "swift", "kotlin", "objective-c",
  "data analysis", "machine learning", "deep learning", "nlp", "computer vision",
  "tensorflow", "pytorch", "scikit-learn", "pandas", "numpy", "r", "tableau",
  "power bi", "excel", "agile", "scrum", "jira", "confluence", "leadership",
  "teamwork", "communication", "problem solving", "critical thinking"
];

/**
 * Extract text from a PDF file
 * @param file The PDF file to extract text from
 * @returns A promise that resolves to the extracted text
 */
export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    
    // This is a simplified implementation
    // In a real app, we would use a more robust PDF text extraction library
    const numPages = pdfDoc.getPages().length;
    
    // Simulating text extraction (in reality, we'd extract actual text)
    // We're mocking this because PDF text extraction is complex and requires additional libraries
    return `Sample resume content with ${numPages} pages containing skills like javascript, react, python, sql, data analysis, and machine learning.`;
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw new Error("Failed to extract text from PDF");
  }
};

/**
 * Extract text from a DOCX file
 * @param file The DOCX file to extract text from
 * @returns A promise that resolves to the extracted text
 */
export const extractTextFromDOCX = async (file: File): Promise<string> => {
  // In a real app, we would use a DOCX parsing library
  // This is a simplified version for demonstration
  return "Sample resume content from DOCX containing skills like typescript, node.js, mongodb, aws, and docker.";
};

/**
 * Extract text from a resume file (PDF or DOCX)
 * @param file The resume file
 * @returns A promise that resolves to the extracted text
 */
export const extractTextFromResume = async (file: File): Promise<string> => {
  const fileType = file.type;
  
  if (fileType === 'application/pdf') {
    return extractTextFromPDF(file);
  } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractTextFromDOCX(file);
  } else {
    throw new Error("Unsupported file format");
  }
};

/**
 * Extract skills from resume text
 * @param text The resume text
 * @returns An array of extracted skills
 */
export const extractSkills = (text: string): string[] => {
  if (!text) return [];
  
  const lowerText = text.toLowerCase();
  const foundSkills = COMMON_SKILLS.filter(skill => 
    lowerText.includes(skill.toLowerCase())
  );
  
  return [...new Set(foundSkills)]; // Remove duplicates
};

/**
 * Parse a resume file and extract skills
 * @param file The resume file
 * @returns A promise that resolves to an array of extracted skills
 */
export const parseResume = async (file: File): Promise<string[]> => {
  try {
    const text = await extractTextFromResume(file);
    return extractSkills(text);
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume");
  }
};
