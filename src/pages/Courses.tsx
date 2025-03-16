
import { useState } from 'react';
import CourseCard from '@/components/CourseCard';
import Footer from '@/components/Footer';

// Mock data for courses
const mockCourses = [
  {
    id: 1,
    title: 'Machine Learning Fundamentals',
    platform: 'Coursera',
    duration: '8 weeks',
    courseUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'React.js Complete Guide',
    platform: 'Udemy',
    duration: '24 hours',
    courseUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'Docker for Developers',
    platform: 'Pluralsight',
    duration: '6 hours',
    courseUrl: 'https://example.com',
  },
  {
    id: 4,
    title: 'AWS Certified Developer',
    platform: 'AWS Training',
    duration: '12 weeks',
    courseUrl: 'https://example.com',
  },
  {
    id: 5,
    title: 'TypeScript Masterclass',
    platform: 'Frontend Masters',
    duration: '8 hours',
    courseUrl: 'https://example.com',
  },
  {
    id: 6,
    title: 'GraphQL API Development',
    platform: 'egghead.io',
    duration: '4 hours',
    courseUrl: 'https://example.com',
  },
];

const Courses = () => {
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [progress, setProgress] = useState(3); // Number of completed courses
  const totalCourses = 6; // Total number of required courses

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
                <option value="machine-learning">Machine Learning</option>
                <option value="react">React</option>
                <option value="docker">Docker</option>
                <option value="aws">AWS</option>
                <option value="typescript">TypeScript</option>
                <option value="graphql">GraphQL</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  title={course.title}
                  platform={course.platform}
                  duration={course.duration}
                  courseUrl={course.courseUrl}
                />
              ))}
            </div>
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
