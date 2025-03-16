
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MatchCard from '@/components/MatchCard';
import Footer from '@/components/Footer';
import { getMatchedInternships } from '@/services/internshipService';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

const MatchesPage = () => {
  const [matches, setMatches] = useState<{internship: any, matchScore: number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all', 'remote', 'onsite'
  const { userSkills, isProcessed } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const matchedInternships = await getMatchedInternships(userSkills);
        setMatches(matchedInternships);
      } catch (error) {
        console.error("Error fetching matches:", error);
        toast({
          title: "Error fetching matches",
          description: "There was a problem finding your matches. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatches();
  }, [userSkills, isProcessed, navigate, toast]);

  // Filter matches based on selected filter
  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true;
    if (filter === 'remote') return match.internship.location.toLowerCase().includes('remote');
    if (filter === 'onsite') return !match.internship.location.toLowerCase().includes('remote');
    return true;
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Internship Matches</h1>
            <p className="text-secondary/70 mb-2">
              Based on your skills, we've found these internships that match your profile.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-100 text-secondary hover:bg-slate-200'
                }`}
              >
                All Internships
              </button>
              <button
                onClick={() => setFilter('remote')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'remote' 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-100 text-secondary hover:bg-slate-200'
                }`}
              >
                Remote Only
              </button>
              <button
                onClick={() => setFilter('onsite')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === 'onsite' 
                    ? 'bg-primary text-white' 
                    : 'bg-slate-100 text-secondary hover:bg-slate-200'
                }`}
              >
                On-site Only
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMatches.map(({ internship, matchScore }) => (
                <MatchCard
                  key={internship.id}
                  title={internship.title}
                  company={internship.company}
                  location={internship.location}
                  matchScore={matchScore}
                  applicationUrl={internship.applicationUrl}
                />
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-slate-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">No matches found</h3>
              <p className="text-secondary/70 mb-4">
                Try adjusting your filter or add more skills to your profile.
              </p>
              <button
                onClick={() => navigate('/skill-gaps')}
                className="button-accent"
              >
                See Skill Recommendations
              </button>
            </div>
          )}
          
          {filteredMatches.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-secondary/70 mb-4">
                Want to improve your match rate? Check out your skill gaps and recommended courses.
              </p>
              <button
                onClick={() => navigate('/skill-gaps')}
                className="button-accent"
              >
                Improve Your Skills
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MatchesPage;
