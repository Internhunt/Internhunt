
import { ExternalLink, Clock } from 'lucide-react';

interface CourseCardProps {
  title: string;
  platform: string;
  duration: string;
  courseUrl: string;
  imageUrl?: string;
}

const CourseCard = ({ title, platform, duration, courseUrl, imageUrl }: CourseCardProps) => {
  return (
    <div className="card-hover bg-white rounded-xl overflow-hidden border border-slate-100">
      <div className="h-36 bg-slate-100 relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <span className="text-primary font-semibold">{platform}</span>
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary">
          {platform}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
        
        <div className="flex items-center text-sm text-secondary/70 mb-4">
          <Clock size={14} className="mr-1" />
          <span>{duration}</span>
        </div>
        
        <a 
          href={courseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary w-full flex items-center justify-center"
        >
          Start Learning
          <ExternalLink size={14} className="ml-2" />
        </a>
      </div>
    </div>
  );
};

export default CourseCard;
