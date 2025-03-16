
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Upload Resume', path: '/upload' },
    { name: 'Matches', path: '/matches' },
    { name: 'Skill Gaps', path: '/skill-gaps' },
    { name: 'Courses', path: '/courses' },
    { name: 'Profile', path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-2xl font-bold text-primary transition-transform hover:scale-[1.02]"
        >
          <span className="text-gradient">InternHunt</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-all hover:text-primary ${
                isActive(link.path) 
                  ? 'text-primary'
                  : 'text-secondary/80 hover:text-secondary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-secondary hover:text-primary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="container-custom py-4 flex flex-col space-y-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium py-2 transition-colors ${
                isActive(link.path) 
                  ? 'text-primary' 
                  : 'text-secondary/80 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
