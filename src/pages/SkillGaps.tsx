
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillGapCard from '@/components/SkillGapCard';
import Footer from '@/components/Footer';
import { analyzeSkillGaps } from '@/services/internshipService';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const SkillGaps = () => {
  const [skillGaps, setSkillGaps] = useState<{ skill: string; importance: 'High' | 'Medium' | 'Low' }[]>([]);
  const [loading, setLoading] = useState(true);
  const { userSkills, isProcessed } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Calculate skill coverage percentage - this would be more sophisticated in a real app
  const skillCoverage = Math.min(65, Math.round((userSkills.length / (userSkills.length + skillGaps.length)) * 100));
  
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
    
    const fetchSkillGaps = async () => {
      try {
        setLoading(true);
        const gaps = await analyzeSkillGaps(userSkills);
        setSkillGaps(gaps);
      } catch (error) {
        console.error("Error analyzing skill gaps:", error);
        toast({
          title: "Error analyzing skills",
          description: "There was a problem analyzing your skill gaps. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchSkillGaps();
  }, [userSkills, isProcessed, navigate, toast]);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Skill Profile</h1>
            <p className="text-secondary/70 mb-10">
              See how your skills match up with industry demand and where you can improve.
            </p>
            
            {/* Skill Coverage Chart */}
            <div className="relative w-48 h-48 mx-auto mb-8">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className="text-primary transform -rotate-90 origin-center transition-all duration-1000"
                  strokeDasharray={`${2 * Math.PI * 45}`}
                  strokeDashoffset={`${2 * Math.PI * 45 * (1 - skillCoverage / 100)}`}
                />
                {/* Percentage text */}
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy="0.3em"
                  className="text-2xl font-bold fill-secondary"
                >
                  {skillCoverage}%
                </text>
              </svg>
              <p className="text-center text-sm text-secondary/70 mt-4">Skill Coverage</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : skillGaps.length > 0 ? (
            <div className="bg-slate-50 rounded-xl p-8 mb-8">
              <h2 className="text-xl font-semibold mb-6">Recommended Skills to Learn</h2>
              <div className="space-y-4">
                {skillGaps.map((gap, index) => (
                  <SkillGapCard
                    key={index}
                    skill={gap.skill}
                    importance={gap.importance}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center p-12 bg-slate-50 rounded-xl mb-8">
              <h3 className="text-xl font-semibold mb-2">Great job!</h3>
              <p className="text-secondary/70 mb-4">
                Your skills align well with current internship requirements. Keep up the good work!
              </p>
            </div>
          )}

          <div className="text-center">
            <p className="text-secondary/70 mb-4">
              Learning these skills will increase your match rate with top internships.
            </p>
            <button
              onClick={() => navigate('/courses')}
              className="button-primary"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SkillGaps;
