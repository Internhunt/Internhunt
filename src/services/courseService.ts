
/**
 * Course service
 * Handles fetching course data and recommendations
 */

export interface Course {
  id: number;
  title: string;
  platform: string;
  duration: string;
  courseUrl: string;
  imageUrl?: string;
  skills: string[];
}

// Mock course data
// In a real app, this would come from an API
const mockCourses: Course[] = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    platform: "Coursera",
    duration: "8 weeks",
    courseUrl: "https://example.com/course",
    skills: ["machine learning", "python", "data analysis", "numpy", "pandas"]
  },
  {
    id: 2,
    title: "React.js Complete Guide",
    platform: "Udemy",
    duration: "24 hours",
    courseUrl: "https://example.com/course",
    skills: ["react", "javascript", "html", "css", "redux"]
  },
  {
    id: 3,
    title: "Docker for Developers",
    platform: "Pluralsight",
    duration: "6 hours",
    courseUrl: "https://example.com/course",
    skills: ["docker", "devops", "containers", "kubernetes"]
  },
  {
    id: 4,
    title: "AWS Certified Developer",
    platform: "AWS Training",
    duration: "12 weeks",
    courseUrl: "https://example.com/course",
    skills: ["aws", "cloud", "serverless", "lambda", "s3", "ec2"]
  },
  {
    id: 5,
    title: "TypeScript Masterclass",
    platform: "Frontend Masters",
    duration: "8 hours",
    courseUrl: "https://example.com/course",
    skills: ["typescript", "javascript", "react", "node.js"]
  },
  {
    id: 6,
    title: "GraphQL API Development",
    platform: "egghead.io",
    duration: "4 hours",
    courseUrl: "https://example.com/course",
    skills: ["graphql", "api", "node.js", "apollo"]
  },
  {
    id: 7,
    title: "Python for Data Science",
    platform: "DataCamp",
    duration: "20 hours",
    courseUrl: "https://example.com/course",
    skills: ["python", "data analysis", "pandas", "matplotlib", "jupyter"]
  },
  {
    id: 8,
    title: "Full Stack Web Development",
    platform: "Codecademy",
    duration: "12 weeks",
    courseUrl: "https://example.com/course",
    skills: ["javascript", "html", "css", "node.js", "express", "mongodb"]
  },
  {
    id: 9,
    title: "UI/UX Design Principles",
    platform: "Interaction Design Foundation",
    duration: "8 weeks",
    courseUrl: "https://example.com/course",
    skills: ["ui/ux", "figma", "user research", "wireframing", "prototyping"]
  },
  {
    id: 10,
    title: "DevOps Engineering",
    platform: "Linux Academy",
    duration: "10 weeks",
    courseUrl: "https://example.com/course",
    skills: ["devops", "ci/cd", "jenkins", "docker", "kubernetes", "git"]
  }
];

/**
 * Get all courses
 * @returns A promise that resolves to an array of courses
 */
export const getAllCourses = async (): Promise<Course[]> => {
  // In a real app, this would fetch from an API
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCourses;
};

/**
 * Get courses recommended for a specific skill
 * @param skill The skill to find courses for
 * @returns A promise that resolves to an array of recommended courses
 */
export const getCoursesBySkill = async (skill: string): Promise<Course[]> => {
  const courses = await getAllCourses();
  
  // Filter courses by skill
  const normalizedSkill = skill.toLowerCase();
  const matchedCourses = courses.filter(course => 
    course.skills.some(courseSkill => courseSkill.toLowerCase().includes(normalizedSkill))
  );
  
  return matchedCourses;
};

/**
 * Get courses recommended for skill gaps
 * @param skillGaps The skill gaps to address
 * @returns A promise that resolves to an array of recommended courses
 */
export const getRecommendedCourses = async (
  skillGaps: { skill: string; importance: string }[]
): Promise<Course[]> => {
  const courses = await getAllCourses();
  const recommendations: Course[] = [];
  
  // Get high importance skills first
  const prioritizedSkillGaps = [
    ...skillGaps.filter(gap => gap.importance === 'High'),
    ...skillGaps.filter(gap => gap.importance === 'Medium'),
    ...skillGaps.filter(gap => gap.importance === 'Low')
  ];
  
  // Find relevant courses for each skill gap
  for (const gap of prioritizedSkillGaps) {
    const normalizedSkill = gap.skill.toLowerCase();
    
    // Find courses that teach this skill
    const relevantCourses = courses.filter(course => 
      course.skills.some(courseSkill => courseSkill.toLowerCase().includes(normalizedSkill)) &&
      !recommendations.some(rec => rec.id === course.id) // Avoid duplicates
    );
    
    // Add the most relevant course
    if (relevantCourses.length > 0) {
      recommendations.push(relevantCourses[0]);
    }
    
    // Limit to 6 recommendations
    if (recommendations.length >= 6) break;
  }
  
  return recommendations;
};
