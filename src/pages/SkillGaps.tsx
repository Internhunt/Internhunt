
import SkillGapCard from '@/components/SkillGapCard';
import Footer from '@/components/Footer';

// Mock data for skill gaps
const mockSkillGaps = [
  { id: 1, skill: 'Machine Learning', importance: 'High' as const },
  { id: 2, skill: 'React.js', importance: 'High' as const },
  { id: 3, skill: 'Docker', importance: 'Medium' as const },
  { id: 4, skill: 'AWS', importance: 'Medium' as const },
  { id: 5, skill: 'TypeScript', importance: 'High' as const },
  { id: 6, skill: 'GraphQL', importance: 'Low' as const },
];

const SkillGaps = () => {
  // Calculate skill coverage percentage
  const skillCoverage = 65; // This would come from an actual calculation in a real app
  
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

          <div className="bg-slate-50 rounded-xl p-8 mb-8">
            <h2 className="text-xl font-semibold mb-6">Recommended Skills to Learn</h2>
            <div className="space-y-4">
              {mockSkillGaps.map((gap) => (
                <SkillGapCard
                  key={gap.id}
                  skill={gap.skill}
                  importance={gap.importance}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-secondary/70 mb-4">
              Learning these skills will increase your match rate with top internships.
            </p>
            <button
              onClick={() => window.location.href = '/courses'}
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
