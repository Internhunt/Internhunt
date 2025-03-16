
/**
 * Internship service
 * Handles fetching internship data and matching with user skills
 */

export interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  requiredSkills: string[];
  description: string;
  applicationUrl: string;
}

// Mock internship data
// In a real app, this would come from an API
const mockInternships: Internship[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA (Remote)",
    requiredSkills: ["javascript", "react", "html", "css", "git"],
    description: "Join our team to build modern web applications with React.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 2,
    title: "Backend Developer Intern",
    company: "DataSystems",
    location: "New York, NY",
    requiredSkills: ["python", "django", "sql", "api development", "git"],
    description: "Work on our backend services and APIs using Python and Django.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 3,
    title: "Full Stack Developer Intern",
    company: "WebSolutions",
    location: "Austin, TX (Remote)",
    requiredSkills: ["javascript", "react", "node.js", "express", "mongodb"],
    description: "Develop full stack applications using the MERN stack.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 4,
    title: "Data Science Intern",
    company: "AnalyticsPro",
    location: "Seattle, WA",
    requiredSkills: ["python", "sql", "machine learning", "data analysis", "pandas"],
    description: "Apply machine learning techniques to real-world problems.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 5,
    title: "Mobile Developer Intern",
    company: "AppWorks",
    location: "Los Angeles, CA",
    requiredSkills: ["react native", "javascript", "mobile development", "api integration"],
    description: "Build cross-platform mobile applications with React Native.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 6,
    title: "DevOps Intern",
    company: "CloudTech",
    location: "Chicago, IL (Remote)",
    requiredSkills: ["aws", "docker", "kubernetes", "ci/cd", "linux"],
    description: "Help automate our deployment pipeline and infrastructure.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 7,
    title: "UI/UX Design Intern",
    company: "DesignHub",
    location: "Boston, MA",
    requiredSkills: ["figma", "ui/ux", "responsive design", "wireframing", "user research"],
    description: "Design intuitive and beautiful user interfaces for web and mobile apps.",
    applicationUrl: "https://example.com/apply"
  },
  {
    id: 8,
    title: "Machine Learning Intern",
    company: "AILabs",
    location: "San Diego, CA",
    requiredSkills: ["python", "machine learning", "deep learning", "tensorflow", "numpy"],
    description: "Implement and optimize machine learning models for our products.",
    applicationUrl: "https://example.com/apply"
  }
];

/**
 * Calculate the match score between user skills and required skills
 * @param userSkills The user's skills
 * @param requiredSkills The required skills for the internship
 * @returns A match score between 0 and 100
 */
const calculateMatchScore = (userSkills: string[], requiredSkills: string[]): number => {
  if (!requiredSkills.length) return 0;
  
  // Convert to lowercase for case-insensitive matching
  const normalizedUserSkills = userSkills.map(skill => skill.toLowerCase());
  const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase());
  
  // Count matching skills
  const matchingSkills = normalizedRequiredSkills.filter(skill => 
    normalizedUserSkills.includes(skill)
  );
  
  // Calculate match percentage
  const score = (matchingSkills.length / normalizedRequiredSkills.length) * 100;
  
  return Math.round(score);
};

/**
 * Get all internships
 * @returns A promise that resolves to an array of internships
 */
export const getAllInternships = async (): Promise<Internship[]> => {
  // In a real app, this would fetch from an API
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockInternships;
};

/**
 * Get internships matched to user skills
 * @param userSkills The user's skills
 * @returns A promise that resolves to an array of internships with match scores
 */
export const getMatchedInternships = async (userSkills: string[]): Promise<{internship: Internship, matchScore: number}[]> => {
  // Get all internships
  const internships = await getAllInternships();
  
  // Calculate match scores
  const matchedInternships = internships.map(internship => ({
    internship,
    matchScore: calculateMatchScore(userSkills, internship.requiredSkills)
  }));
  
  // Sort by match score (highest first)
  return matchedInternships.sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Analyze skill gaps based on top internships
 * @param userSkills The user's skills
 * @returns A promise that resolves to an array of skill gaps with importance levels
 */
export const analyzeSkillGaps = async (userSkills: string[]): Promise<{skill: string, importance: 'High' | 'Medium' | 'Low'}[]> => {
  // Get all internships
  const internships = await getAllInternships();
  
  // Normalize user skills to lowercase
  const normalizedUserSkills = userSkills.map(skill => skill.toLowerCase());
  
  // Count skill occurrences across all internships
  const skillOccurrences: Record<string, number> = {};
  
  internships.forEach(internship => {
    internship.requiredSkills.forEach(skill => {
      const normalizedSkill = skill.toLowerCase();
      if (!normalizedUserSkills.includes(normalizedSkill)) {
        skillOccurrences[normalizedSkill] = (skillOccurrences[normalizedSkill] || 0) + 1;
      }
    });
  });
  
  // Convert to array and sort by occurrence count
  const skillGaps = Object.entries(skillOccurrences)
    .map(([skill, count]) => ({
      skill,
      count,
      importance: count >= 4 ? 'High' : count >= 2 ? 'Medium' : 'Low' as 'High' | 'Medium' | 'Low'
    }))
    .sort((a, b) => b.count - a.count);
  
  // Return top skill gaps with importance levels
  return skillGaps.slice(0, 10).map(({ skill, importance }) => ({ skill, importance }));
};
