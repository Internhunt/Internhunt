
interface Course {
  id: number;
  title: string;
  platform: string;
  duration: string;
  courseUrl: string;
  imageUrl: string;
  skills: string[];
}

// Mock courses data
const courses: Course[] = [
  {
    id: 1,
    title: "React.js: The Complete Guide",
    platform: "Udemy",
    duration: "40 hours",
    courseUrl: "https://www.udemy.com/course/react-the-complete-guide-incl-redux",
    imageUrl: "/placeholder.svg",
    skills: ["react", "javascript", "redux", "web development"]
  },
  {
    id: 2,
    title: "Machine Learning A-Z",
    platform: "Coursera",
    duration: "60 hours",
    courseUrl: "https://www.coursera.org/learn/machine-learning",
    imageUrl: "/placeholder.svg",
    skills: ["python", "machine learning", "data analysis", "tensorflow"]
  },
  {
    id: 3,
    title: "Complete Python Bootcamp",
    platform: "Udemy",
    duration: "30 hours",
    courseUrl: "https://www.udemy.com/course/complete-python-bootcamp",
    imageUrl: "/placeholder.svg",
    skills: ["python", "programming", "data structures", "algorithms"]
  },
  {
    id: 4,
    title: "AWS Certified Solutions Architect",
    platform: "A Cloud Guru",
    duration: "35 hours",
    courseUrl: "https://acloudguru.com/course/aws-certified-solutions-architect-associate",
    imageUrl: "/placeholder.svg",
    skills: ["aws", "cloud computing", "devops", "infrastructure"]
  },
  {
    id: 5,
    title: "The Complete JavaScript Course",
    platform: "Udemy",
    duration: "28 hours",
    courseUrl: "https://www.udemy.com/course/the-complete-javascript-course",
    imageUrl: "/placeholder.svg",
    skills: ["javascript", "web development", "es6", "dom manipulation"]
  },
  {
    id: 6,
    title: "UI/UX Design Bootcamp",
    platform: "DesignLab",
    duration: "24 weeks",
    courseUrl: "https://www.designlab.com",
    imageUrl: "/placeholder.svg",
    skills: ["ui/ux", "figma", "sketch", "prototyping", "design thinking"]
  },
  {
    id: 7,
    title: "Data Science Specialization",
    platform: "Coursera",
    duration: "10 courses, 6 months",
    courseUrl: "https://www.coursera.org/specializations/jhu-data-science",
    imageUrl: "/placeholder.svg",
    skills: ["r", "statistics", "data analysis", "machine learning", "visualization"]
  },
  {
    id: 8,
    title: "Full Stack Web Development",
    platform: "Pluralsight",
    duration: "40+ hours",
    courseUrl: "https://www.pluralsight.com/paths/full-stack-web-development",
    imageUrl: "/placeholder.svg",
    skills: ["html", "css", "javascript", "nodejs", "databases"]
  },
  {
    id: 9,
    title: "Docker and Kubernetes: The Complete Guide",
    platform: "Udemy",
    duration: "22 hours",
    courseUrl: "https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide",
    imageUrl: "/placeholder.svg",
    skills: ["docker", "kubernetes", "devops", "ci/cd", "containerization"]
  },
  {
    id: 10,
    title: "iOS App Development with Swift",
    platform: "Apple Developer",
    duration: "15 weeks",
    courseUrl: "https://developer.apple.com/tutorials/app-dev-training",
    imageUrl: "/placeholder.svg",
    skills: ["swift", "ios", "mobile development", "xcode", "app design"]
  }
];

// Get all courses
export const getAllCourses = async (): Promise<Course[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return courses;
};

// Get courses by specific skill
export const getCoursesBySkill = async (skill: string): Promise<Course[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const skillLower = skill.toLowerCase();
  return courses.filter(course => 
    course.skills.some(courseSkill => 
      courseSkill.toLowerCase().includes(skillLower) || 
      skillLower.includes(courseSkill.toLowerCase())
    )
  );
};

// Get recommended courses based on skill gaps
export const getRecommendedCourses = async (
  skillGaps: {skill: string, importance: 'High' | 'Medium' | 'Low'}[]
): Promise<Course[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  if (skillGaps.length === 0) {
    return courses.slice(0, 6); // Return some default courses if no gaps
  }
  
  // Extract skill names from gaps
  const gapSkills = skillGaps.map(gap => gap.skill.toLowerCase());
  
  // Find courses that match the gap skills
  const matchedCourses = courses.filter(course => 
    course.skills.some(courseSkill => 
      gapSkills.some(gapSkill => 
        courseSkill.toLowerCase().includes(gapSkill) || 
        gapSkill.includes(courseSkill.toLowerCase())
      )
    )
  );
  
  // Prioritize courses for high importance skills
  const highImportanceSkills = skillGaps
    .filter(gap => gap.importance === 'High')
    .map(gap => gap.skill.toLowerCase());
  
  return matchedCourses
    .sort((a, b) => {
      // Count matches with high importance skills
      const aHighMatches = a.skills.filter(skill => 
        highImportanceSkills.some(highSkill => 
          skill.toLowerCase().includes(highSkill) || 
          highSkill.includes(skill.toLowerCase())
        )
      ).length;
      
      const bHighMatches = b.skills.filter(skill => 
        highImportanceSkills.some(highSkill => 
          skill.toLowerCase().includes(highSkill) || 
          highSkill.includes(skill.toLowerCase())
        )
      ).length;
      
      return bHighMatches - aHighMatches; // Sort by most matches with high importance skills
    })
    .slice(0, 6); // Return top 6 courses
};
