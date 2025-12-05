import Header from '@/components/Header';
import FeaturesSection from '@/components/FeaturesSection';

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Features
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to understand legal documents
          </p>
        </div>
      </div>
      
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

export default Features;
