export type RiskLevel = 'fine' | 'risky' | 'dangerous';

export type UserRole = 'tenant' | 'employee' | 'customer' | 'business_owner';

export interface Clause {
  id: string;
  originalText: string;
  simplifiedText: string;
  riskLevel: RiskLevel;
  riskExplanation: string;
  realWorldImpact: string;
  roleExplanations: Record<UserRole, string>;
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  uploadedAt: Date;
  clauses: Clause[];
  fairnessScore: number;
  complianceIssues: string[];
  summary: string;
}

export interface ComparisonResult {
  saferDocument: 'A' | 'B' | 'equal';
  reasons: string[];
  clauseComparisons: {
    clauseA: Clause;
    clauseB: Clause;
    comparison: string;
  }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
