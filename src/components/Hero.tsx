
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-white z-0"></div>
      
      {/* Animated background circles */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/5 animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-64 h-64 rounded-full bg-accent/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-secondary/5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container-custom relative z-10">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              AI-Powered Internship Matching
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Find Your <span className="text-gradient">Perfect Internship</span> With AI
          </h1>
          
          <p className="text-lg md:text-xl text-secondary/80 mb-10 max-w-2xl mx-auto">
            Upload your resume or enter your skills to get matched with internships and personalized learning paths.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link 
              to="/upload" 
              className="button-primary group flex items-center"
            >
              Start Now
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/matches" 
              className="button-secondary"
            >
              Explore Matches
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
