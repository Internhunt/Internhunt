
import { ExternalLink } from 'lucide-react';

interface MatchCardProps {
  title: string;
  company: string;
  location: string;
  matchScore: number;
  applicationUrl: string;
}

const MatchCard = ({ title, company, location, matchScore, applicationUrl }: MatchCardProps) => {
  return (
    <div className="card-hover bg-white rounded-xl overflow-hidden border border-slate-100">
      <div className="relative p-6">
        {/* Match score badge */}
        <div className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-accent text-white font-bold text-sm">
          {matchScore}%
        </div>
        
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center text-primary font-bold">
              {company.charAt(0)}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-secondary/60 text-sm">{company}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-secondary/70">
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
        
        <a 
          href={applicationUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary w-full flex items-center justify-center"
        >
          Apply Now
          <ExternalLink size={14} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default MatchCard;
