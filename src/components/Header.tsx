import { motion } from 'framer-motion';
import { Scale, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
              <Scale className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold text-foreground">
                LegalLens
              </h1>
              <p className="text-xs text-muted-foreground">
                Document Analyzer
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/features" 
              className={`text-sm transition-colors ${
                isActive('/features') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Features
            </Link>
            <Link 
              to="/analyze" 
              className={`text-sm transition-colors ${
                isActive('/analyze') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Analyze
            </Link>
            <Link 
              to="/compare" 
              className={`text-sm transition-colors ${
                isActive('/compare') 
                  ? 'text-foreground font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Compare
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary">
              <Shield className="w-3.5 h-3.5 text-risk-fine" />
              <span className="text-xs font-medium text-secondary-foreground">
                Secure
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
