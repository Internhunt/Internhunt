
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';

interface SkillGapCardProps {
  skill: string;
  importance: 'High' | 'Medium' | 'Low';
}

const SkillGapCard = ({ skill, importance }: SkillGapCardProps) => {
  const getImportanceColor = () => {
    switch (importance) {
      case 'High':
        return 'bg-accent/10 text-accent';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-500';
      case 'Low':
        return 'bg-slate-500/10 text-slate-500';
      default:
        return 'bg-slate-100 text-slate-500';
    }
  };

  return (
    <div className="card-hover bg-white rounded-xl p-5 border border-slate-100">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Lightbulb size={20} />
          </div>
          <div>
            <h3 className="font-semibold">{skill}</h3>
            <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${getImportanceColor()}`}>
              {importance} importance
            </div>
          </div>
        </div>
        
        <Link 
          to={`/courses?skill=${encodeURIComponent(skill)}`}
          className="button-accent !py-1.5 !px-4 text-sm"
        >
          Learn Now
        </Link>
      </div>
    </div>
  );
};

export default SkillGapCard;
