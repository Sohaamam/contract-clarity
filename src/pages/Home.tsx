import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/analyze');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection onGetStarted={handleGetStarted} />
      <FeaturesSection />
      
      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 LegalLens. AI-powered document analysis for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
