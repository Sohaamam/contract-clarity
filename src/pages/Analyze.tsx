import { useState } from 'react';
import Header from '@/components/Header';
import DocumentUpload from '@/components/DocumentUpload';
import AnalysisView from '@/components/AnalysisView';
import ChatBot from '@/components/ChatBot';
import type { DocumentAnalysis } from '@/types/legal';

const Analyze = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay (in production, this would call the AI endpoint)
    setTimeout(() => {
      // For now, just set empty analysis - will be populated by actual AI in production
      setAnalysis(null);
      setIsAnalyzing(false);
    }, 2000);
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
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Analyze Your Document
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload a PDF or DOCX file to get started
            </p>
          </div>
          
          <DocumentUpload 
            onFileSelect={handleFileSelect} 
            isAnalyzing={isAnalyzing} 
          />
        </div>
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

export default Analyze;
