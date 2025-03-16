
interface Internship {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requiredSkills: string[];
  applicationUrl: string;
}

// Mock internship data
const internships: Internship[] = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Google",
    location: "Mountain View, CA (Remote)",
    description: "Join our team to build cutting-edge software solutions.",
    requiredSkills: ["javascript", "react", "typescript", "git"],
    applicationUrl: "https://careers.google.com"
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Microsoft",
    location: "Seattle, WA",
    description: "Work on real-world data analytics problems.",
    requiredSkills: ["python", "sql", "machine learning", "pandas"],
    applicationUrl: "https://careers.microsoft.com"
  },
  {
    id: 3,
    title: "UX Design Intern",
    company: "Apple",
    location: "Cupertino, CA",
    description: "Design intuitive interfaces for millions of users.",
    requiredSkills: ["figma", "ui/ux", "sketch", "prototyping"],
    applicationUrl: "https://www.apple.com/careers"
  },
  {
    id: 4,
    title: "Frontend Developer Intern",
    company: "Netflix",
    location: "Los Gatos, CA (Remote)",
    description: "Build responsive user interfaces for our streaming platform.",
    requiredSkills: ["react", "css", "html", "javascript"],
    applicationUrl: "https://jobs.netflix.com"
  },
  {
    id: 5,
    title: "Machine Learning Intern",
    company: "Amazon",
    location: "Seattle, WA",
    description: "Apply ML techniques to solve complex business problems.",
    requiredSkills: ["python", "machine learning", "tensorflow", "data analysis"],
    applicationUrl: "https://www.amazon.jobs"
  },
  {
    id: 6,
    title: "Backend Engineer Intern",
    company: "Facebook",
    location: "Menlo Park, CA",
    description: "Work on scalable backend services that power our platforms.",
    requiredSkills: ["nodejs", "databases", "api design", "algorithms"],
    applicationUrl: "https://www.facebook.com/careers"
  },
  {
    id: 7,
    title: "Mobile App Developer Intern",
    company: "Uber",
    location: "San Francisco, CA (Remote)",
    description: "Develop mobile applications for our transportation platform.",
    requiredSkills: ["react native", "javascript", "mobile development", "git"],
    applicationUrl: "https://www.uber.com/careers"
  },
  {
    id: 8,
    title: "DevOps Intern",
    company: "Twitter",
    location: "San Francisco, CA",
    description: "Help us improve our infrastructure and deployment processes.",
    requiredSkills: ["docker", "kubernetes", "aws", "ci/cd"],
    applicationUrl: "https://careers.twitter.com"
  }
];

// Function to calculate the match score between user skills and internship
const calculateMatchScore = (userSkills: string[], requiredSkills: string[]): number => {
  if (userSkills.length === 0 || requiredSkills.length === 0) return 0;

  const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
  const requiredSkillsLower = requiredSkills.map(skill => skill.toLowerCase());
  
  const matchedSkills = userSkillsLower.filter(skill => 
    requiredSkillsLower.some(reqSkill => reqSkill.includes(skill) || skill.includes(reqSkill))
  );
  
  return Math.round((matchedSkills.length / requiredSkillsLower.length) * 100);
};

// Get internships matched to user skills
export const getMatchedInternships = async (userSkills: string[]): Promise<{internship: Internship, matchScore: number}[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return internships.map(internship => ({
    internship,
    matchScore: calculateMatchScore(userSkills, internship.requiredSkills)
  })).sort((a, b) => b.matchScore - a.matchScore);
};

// Analyze skill gaps
export const analyzeSkillGaps = async (userSkills: string[]): Promise<{skill: string, importance: 'High' | 'Medium' | 'Low'}[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Count skill frequency across all internships to determine importance
  const skillFrequency: Record<string, number> = {};
  
  internships.forEach(internship => {
    internship.requiredSkills.forEach(skill => {
      skillFrequency[skill.toLowerCase()] = (skillFrequency[skill.toLowerCase()] || 0) + 1;
    });
  });
  
  // Determine missing skills (not in user skills)
  const userSkillsLower = userSkills.map(skill => skill.toLowerCase());
  const allSkills = Object.keys(skillFrequency);
  const missingSkills = allSkills.filter(skill => 
    !userSkillsLower.some(userSkill => 
      userSkill.includes(skill) || skill.includes(userSkill)
    )
  );
  
  // Determine importance based on frequency
  const maxFrequency = Math.max(...Object.values(skillFrequency));
  
  return missingSkills.map(skill => {
    const frequency = skillFrequency[skill] || 0;
    const importance: 'High' | 'Medium' | 'Low' = 
      frequency > maxFrequency * 0.7 ? 'High' :
      frequency > maxFrequency * 0.4 ? 'Medium' : 'Low';
    
    return {
      skill: skill.charAt(0).toUpperCase() + skill.slice(1), // Capitalize first letter
      importance
    };
  }).sort((a, b) => {
    // Sort by importance (High -> Medium -> Low)
    const importanceValue = { 'High': 3, 'Medium': 2, 'Low': 1 };
    return importanceValue[b.importance] - importanceValue[a.importance];
  }).slice(0, 5); // Return top 5 skills to learn
};
