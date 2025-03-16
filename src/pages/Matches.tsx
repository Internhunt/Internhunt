
import { useState, useEffect } from 'react';
import { Filter, RefreshCw } from 'lucide-react';
import MatchCard from '@/components/MatchCard';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

// Mock data for internships
const mockInternships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    company: 'Google',
    location: 'Mountain View, CA (Remote)',
    matchScore: 95,
    applicationUrl: 'https://example.com',
  },
  {
    id: 2,
    title: 'Data Science Intern',
    company: 'Microsoft',
    location: 'Redmond, WA',
    matchScore: 90,
    applicationUrl: 'https://example.com',
  },
  {
    id: 3,
    title: 'UX/UI Design Intern',
    company: 'Apple',
    location: 'Cupertino, CA',
    matchScore: 88,
    applicationUrl: 'https://example.com',
  },
  {
    id: 4,
    title: 'Machine Learning Intern',
    company: 'Amazon',
    location: 'Seattle, WA (Remote)',
    matchScore: 86,
    applicationUrl: 'https://example.com',
  },
  {
    id: 5,
    title: 'Front-End Developer Intern',
    company: 'Meta',
    location: 'Menlo Park, CA',
    matchScore: 85,
    applicationUrl: 'https://example.com',
  },
  {
    id: 6,
    title: 'Product Management Intern',
    company: 'Netflix',
    location: 'Los Gatos, CA',
    matchScore: 83,
    applicationUrl: 'https://example.com',
  },
];

const Matches = () => {
  const [internships, setInternships] = useState(mockInternships);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    remote: false,
    locations: [] as string[],
    industries: [] as string[],
  });
  const { toast } = useToast();

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Matches refreshed",
        description: "Your matches have been updated with the latest opportunities.",
      });
    }, 1500);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    
    if (name === 'remote') {
      setFilters(prev => ({ ...prev, remote: checked }));
    } else if (name === 'location') {
      setFilters(prev => ({
        ...prev,
        locations: checked 
          ? [...prev.locations, value] 
          : prev.locations.filter(loc => loc !== value)
      }));
    } else if (name === 'industry') {
      setFilters(prev => ({
        ...prev,
        industries: checked 
          ? [...prev.industries, value] 
          : prev.industries.filter(ind => ind !== value)
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Internship Matches</h1>
            <p className="text-secondary/70">
              We found {internships.length} internships that match your profile.
            </p>
          </div>
          
          <button
            onClick={handleRefresh}
            className={`button-secondary flex items-center ${isRefreshing ? 'opacity-80' : ''}`}
            disabled={isRefreshing}
          >
            <RefreshCw size={16} className={`mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Mobile */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="button-secondary w-full flex items-center justify-center"
            >
              <Filter size={16} className="mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            
            {showFilters && (
              <div className="mt-4 p-6 bg-slate-50 rounded-xl">
                <h3 className="font-semibold mb-4">Filters</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Job Type</h4>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remote-mobile"
                        name="remote"
                        checked={filters.remote}
                        onChange={handleFilterChange}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <label htmlFor="remote-mobile" className="ml-2 text-sm">Remote</label>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Location</h4>
                    <div className="space-y-2">
                      {['San Francisco', 'New York', 'Seattle', 'Austin'].map(location => (
                        <div key={location} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`loc-${location}-mobile`}
                            name="location"
                            value={location}
                            checked={filters.locations.includes(location)}
                            onChange={handleFilterChange}
                            className="w-4 h-4 text-primary rounded"
                          />
                          <label htmlFor={`loc-${location}-mobile`} className="ml-2 text-sm">{location}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Industry</h4>
                    <div className="space-y-2">
                      {['Tech', 'Finance', 'Healthcare', 'Education'].map(industry => (
                        <div key={industry} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`ind-${industry}-mobile`}
                            name="industry"
                            value={industry}
                            checked={filters.industries.includes(industry)}
                            onChange={handleFilterChange}
                            className="w-4 h-4 text-primary rounded"
                          />
                          <label htmlFor={`ind-${industry}-mobile`} className="ml-2 text-sm">{industry}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 p-6 bg-slate-50 rounded-xl">
              <h3 className="font-semibold mb-4">Filters</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-3">Job Type</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remote"
                      name="remote"
                      checked={filters.remote}
                      onChange={handleFilterChange}
                      className="w-4 h-4 text-primary rounded"
                    />
                    <label htmlFor="remote" className="ml-2 text-sm">Remote</label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Location</h4>
                  <div className="space-y-2">
                    {['San Francisco', 'New York', 'Seattle', 'Austin'].map(location => (
                      <div key={location} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`loc-${location}`}
                          name="location"
                          value={location}
                          checked={filters.locations.includes(location)}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-primary rounded"
                        />
                        <label htmlFor={`loc-${location}`} className="ml-2 text-sm">{location}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-3">Industry</h4>
                  <div className="space-y-2">
                    {['Tech', 'Finance', 'Healthcare', 'Education'].map(industry => (
                      <div key={industry} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`ind-${industry}`}
                          name="industry"
                          value={industry}
                          checked={filters.industries.includes(industry)}
                          onChange={handleFilterChange}
                          className="w-4 h-4 text-primary rounded"
                        />
                        <label htmlFor={`ind-${industry}`} className="ml-2 text-sm">{industry}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Matches Grid */}
          <div className="flex-1">
            {internships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map((internship) => (
                  <MatchCard
                    key={internship.id}
                    title={internship.title}
                    company={internship.company}
                    location={internship.location}
                    matchScore={internship.matchScore}
                    applicationUrl={internship.applicationUrl}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-secondary/70">No matching internships found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Matches;
