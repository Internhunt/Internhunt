
import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [selectedTags, setSelectedTags] = useState(['Tech', 'Remote']);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get user context
  const { userSkills, setUserSkills, isProcessed, clearUserData } = useUser();
  
  // Redirect if no resume processed
  useEffect(() => {
    if (!isProcessed) {
      toast({
        title: "Profile not found",
        description: "Please upload your resume or enter your skills first.",
        variant: "destructive",
      });
      navigate('/upload');
    }
  }, [isProcessed, navigate, toast]);

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !userSkills.includes(newSkill.trim())) {
      setUserSkills([...userSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setUserSkills(userSkills.filter(skill => skill !== skillToRemove));
  };

  const handleExportData = () => {
    const data = {
      profile: { name, email, preferences: selectedTags },
      skills: userSkills,
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'internhunt-profile.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data exported",
      description: "Your profile data has been downloaded successfully.",
    });
  };
  
  const handleReset = () => {
    clearUserData();
    toast({
      title: "Profile reset",
      description: "Your profile has been reset. You'll be redirected to the upload page.",
    });
    setTimeout(() => navigate('/upload'), 1500);
  };

  if (!isProcessed) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Profile</h1>
            <p className="text-secondary/70">
              Manage your personal information and preferences.
            </p>
          </div>

          <div className="space-y-8">
            {/* Basic Info */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h2 className="text-xl font-semibold mb-6">Skills</h2>
              
              <form onSubmit={handleAddSkill} className="mb-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-2 rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button type="submit" className="button-primary">
                    Add
                  </button>
                </div>
              </form>
              
              <div className="flex flex-wrap gap-2">
                {userSkills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center bg-primary/10 text-primary rounded-full px-3 py-1"
                  >
                    <span className="text-sm font-medium">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 hover:text-primary/80"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h2 className="text-xl font-semibold mb-6">Preferences</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Internship Types
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Tech', 'Remote', 'Startup', 'Enterprise', 'Part-time', 'Full-time'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedTags(
                            selectedTags.includes(tag)
                              ? selectedTags.filter(t => t !== tag)
                              : [...selectedTags, tag]
                          );
                        }}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-secondary hover:bg-slate-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 border border-slate-100">
              <h2 className="text-xl font-semibold mb-6">Achievements</h2>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    🎯
                  </div>
                  <p className="font-medium">5 Applications</p>
                  <p className="text-sm text-secondary/70">Sent</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    📚
                  </div>
                  <p className="font-medium">3 Courses</p>
                  <p className="text-sm text-secondary/70">Completed</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    ⭐️
                  </div>
                  <p className="font-medium">90%</p>
                  <p className="text-sm text-secondary/70">Match Rate</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={handleExportData}
                  className="button-secondary flex items-center"
                >
                  <Download size={16} className="mr-2" />
                  Download My Data
                </button>
                
                <button
                  onClick={handleReset}
                  className="button-secondary bg-red-50 text-red-600 hover:bg-red-100"
                >
                  Reset Profile
                </button>
              </div>
              
              <button
                onClick={handleSave}
                className="button-primary w-full sm:w-auto"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
