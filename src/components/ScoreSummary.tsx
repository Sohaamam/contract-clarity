import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, AlertCircle, FileWarning } from 'lucide-react';
import { Card } from './ui/card';
import type { DocumentAnalysis } from '@/types/legal';

interface ScoreSummaryProps {
  analysis: DocumentAnalysis;
}

const ScoreSummary = ({ analysis }: ScoreSummaryProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-risk-fine';
    if (score >= 40) return 'text-risk-risky';
    return 'text-risk-dangerous';
  };

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-risk-fine-bg';
    if (score >= 40) return 'bg-risk-risky-bg';
    return 'bg-risk-dangerous-bg';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 70) return 'Good';
    if (score >= 50) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Very Risky';
  };

  const riskCounts = {
    fine: analysis.clauses.filter(c => c.riskLevel === 'fine').length,
    risky: analysis.clauses.filter(c => c.riskLevel === 'risky').length,
    dangerous: analysis.clauses.filter(c => c.riskLevel === 'dangerous').length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6">
        <h3 className="font-serif text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Analysis Summary
        </h3>

        {/* Fairness Score */}
        <div className={`p-6 rounded-xl mb-6 ${getScoreBg(analysis.fairnessScore)}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Fairness Score
              </p>
              <p className={`text-4xl font-serif font-bold ${getScoreColor(analysis.fairnessScore)}`}>
                {analysis.fairnessScore}
                <span className="text-lg font-normal">/100</span>
              </p>
            </div>
            <div className={`px-4 py-2 rounded-full ${getScoreColor(analysis.fairnessScore)} bg-background/50`}>
              <span className="font-semibold">
                {getScoreLabel(analysis.fairnessScore)}
              </span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="h-2 bg-background/50 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${analysis.fairnessScore}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className={`h-full rounded-full ${
                analysis.fairnessScore >= 70 ? 'bg-risk-fine' :
                analysis.fairnessScore >= 40 ? 'bg-risk-risky' :
                'bg-risk-dangerous'
              }`}
            />
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-4 rounded-lg bg-risk-fine-bg text-center">
            <CheckCircle className="w-5 h-5 text-risk-fine mx-auto mb-2" />
            <p className="text-2xl font-bold text-risk-fine">{riskCounts.fine}</p>
            <p className="text-xs text-risk-fine/80">Low Risk</p>
          </div>
          <div className="p-4 rounded-lg bg-risk-risky-bg text-center">
            <AlertTriangle className="w-5 h-5 text-risk-risky mx-auto mb-2" />
            <p className="text-2xl font-bold text-risk-risky">{riskCounts.risky}</p>
            <p className="text-xs text-risk-risky/80">Medium Risk</p>
          </div>
          <div className="p-4 rounded-lg bg-risk-dangerous-bg text-center">
            <AlertCircle className="w-5 h-5 text-risk-dangerous mx-auto mb-2" />
            <p className="text-2xl font-bold text-risk-dangerous">{riskCounts.dangerous}</p>
            <p className="text-xs text-risk-dangerous/80">High Risk</p>
          </div>
        </div>

        {/* Compliance Issues */}
        {analysis.complianceIssues.length > 0 && (
          <div className="p-4 rounded-lg bg-risk-risky-bg border border-risk-risky/20">
            <h4 className="text-sm font-semibold text-risk-risky flex items-center gap-2 mb-3">
              <FileWarning className="w-4 h-4" />
              Missing Elements
            </h4>
            <ul className="space-y-2">
              {analysis.complianceIssues.map((issue, index) => (
                <li key={index} className="text-sm text-risk-risky/90 flex items-start gap-2">
                  <span className="text-risk-risky mt-1">•</span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-muted-foreground mb-2">
            Document Summary
          </h4>
          <p className="text-sm text-foreground/80 leading-relaxed">
            {analysis.summary}
          </p>
        </div>
      </Card>
    </motion.div>
  );
};

export default ScoreSummary;
