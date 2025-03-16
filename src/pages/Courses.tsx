
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CourseCard from '@/components/CourseCard';
import Footer from '@/components/Footer';
import { getAllCourses, getCoursesBySkill, getRecommendedCourses } from '@/services/courseService';
import { analyzeSkillGaps } from '@/services/internshipService';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const Courses = () => {
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(3); // Number of completed courses
  const totalCourses = 6; // Total number of required courses
  
  const { userSkills, isProcessed } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Extract skill from URL query param if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const skillParam = params.get('skill');
    if (skillParam) {
      setSelectedSkill(skillParam);
    }
  }, [location.search]);

  useEffect(() => {
    // Check if user has processed a resume
    if (!isProcessed) {
      toast({
        title: "No skills found",
        description: "Please upload your resume or enter your skills first.",
        variant: "destructive",
      });
      navigate('/upload');
      return;
    }
    
    const fetchCourses = async () => {
      try {
        setLoading(true);
        
        if (selectedSkill === 'all') {
          // Get skill gaps first
          const skillGaps = await analyzeSkillGaps(userSkills);
          
          // Get recommended courses based on skill gaps
          const recommendedCourses = await getRecommendedCourses(skillGaps);
          setCourses(recommendedCourses);
        } else {
          // Get courses for specific skill
          const skillCourses = await getCoursesBySkill(selectedSkill);
          setCourses(skillCourses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast({
          title: "Error fetching courses",
          description: "There was a problem finding courses. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, [selectedSkill, userSkills, isProcessed, navigate, toast]);

  // Get all available skills for the dropdown
  const [availableSkills, setAvailableSkills] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchAllSkills = async () => {
      try {
        const allCourses = await getAllCourses();
        const skills = new Set<string>();
        
        allCourses.forEach(course => {
          course.skills.forEach((skill: string) => {
            skills.add(skill);
          });
        });
        
        setAvailableSkills(Array.from(skills).sort());
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };
    
    fetchAllSkills();
  }, []);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Upskill for Your Dream Internship</h1>
            <p className="text-secondary/70">
              Master the skills you need with our curated course recommendations.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold">Recommended Courses</h2>
              
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="all">All Skills</option>
                {availableSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    platform={course.platform}
                    duration={course.duration}
                    courseUrl={course.courseUrl}
                    imageUrl={course.imageUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center p-12 bg-slate-50 rounded-xl">
                <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                <p className="text-secondary/70 mb-4">
                  We couldn't find any courses for the selected skill. Try another skill from the dropdown.
                </p>
              </div>
            )}
          </div>

          <div className="bg-slate-50 rounded-xl p-8">
            <h2 className="text-xl font-semibold mb-6">Your Learning Progress</h2>
            
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Progress</span>
                <span className="text-secondary/70">{progress}/{totalCourses} courses completed</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(progress / totalCourses) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Earned Badges</h3>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-white rounded-full px-4 py-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                    🎯
                  </div>
                  <span className="font-medium">Quick Learner</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                    💻
                  </div>
                  <span className="font-medium">Code Master</span>
                </div>
                <div className="flex items-center bg-white rounded-full px-4 py-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-2">
                    🚀
                  </div>
                  <span className="font-medium">Fast Track</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
