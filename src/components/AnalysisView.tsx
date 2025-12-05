import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import ClauseCard from './ClauseCard';
import ScoreSummary from './ScoreSummary';
import type { DocumentAnalysis } from '@/types/legal';

interface AnalysisViewProps {
  analysis: DocumentAnalysis;
  onBack: () => void;
}

const AnalysisView = ({ analysis, onBack }: AnalysisViewProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Upload New Document
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {analysis.fileName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {analysis.clauses.length} clauses analyzed • {new Date(analysis.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Clauses */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
              Clause Analysis
            </h3>
            {analysis.clauses.map((clause, index) => (
              <ClauseCard key={clause.id} clause={clause} index={index} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ScoreSummary analysis={analysis} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalysisView;
