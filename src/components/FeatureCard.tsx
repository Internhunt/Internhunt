
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="card-hover bg-white rounded-xl p-8 shadow-sm border border-slate-100">
      <div className="mb-5 inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-secondary/70">{description}</p>
    </div>
  );
};

export default FeatureCard;
