import { useState, useRef } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import DocumentUpload from '@/components/DocumentUpload';
import AnalysisView from '@/components/AnalysisView';
import ChatBot from '@/components/ChatBot';
import { mockAnalysis } from '@/data/mockAnalysis';
import type { DocumentAnalysis } from '@/types/legal';

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const uploadRef = useRef<HTMLDivElement>(null);

  const scrollToUpload = () => {
    uploadRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay (in production, this would call the AI endpoint)
    setTimeout(() => {
      setAnalysis({
        ...mockAnalysis,
        fileName: file.name,
        uploadedAt: new Date(),
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleBack = () => {
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {analysis ? (
        <AnalysisView analysis={analysis} onBack={handleBack} />
      ) : (
        <>
          <HeroSection onGetStarted={scrollToUpload} />
          <FeaturesSection />
          <div ref={uploadRef}>
            <DocumentUpload 
              onFileSelect={handleFileSelect} 
              isAnalyzing={isAnalyzing} 
            />
          </div>
        </>
      )}
      
      <ChatBot isAnalyzed={!!analysis} />
      
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

export default Index;
