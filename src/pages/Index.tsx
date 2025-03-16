
import { useEffect } from 'react';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import Footer from '@/components/Footer';
import { Puzzle, Clock, Lightbulb } from 'lucide-react';

const Index = () => {
  // Animation for sections that become visible when scrolled to
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach(section => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How InternHunt Helps You</h2>
            <p className="text-secondary/70 max-w-2xl mx-auto">
              Our AI-powered platform connects you with the perfect internships and helps you grow your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 fade-in-section">
            <FeatureCard
              icon={Puzzle}
              title="Smart Matching"
              description="Our AI analyzes your skills and matches you with internships that fit your profile perfectly."
            />
            <FeatureCard
              icon={Clock}
              title="Real-Time Opportunities"
              description="Access the latest internships from job boards and GitHub, updated in real-time."
            />
            <FeatureCard
              icon={Lightbulb}
              title="Skill Growth"
              description="Bridge skill gaps with tailored course recommendations to boost your employability."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16 fade-in-section">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-white/10 text-white">
              Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Impact</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center fade-in-section">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">1000+</h3>
              <p className="text-white/80">Internships Matched</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">85%</h3>
              <p className="text-white/80">Match Accuracy</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">5000+</h3>
              <p className="text-white/80">Students Supported</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
