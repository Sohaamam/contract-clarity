import { motion } from 'framer-motion';
import { Scale, FileText, Shield } from 'lucide-react';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass-card border-b"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
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
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#features" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a 
              href="#analyze" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Analyze
            </a>
            <a 
              href="#compare" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Compare
            </a>
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
