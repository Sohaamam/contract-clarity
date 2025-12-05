import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, AlertCircle, User } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import type { Clause, UserRole } from '@/types/legal';

interface ClauseCardProps {
  clause: Clause;
  index: number;
}

const roleLabels: Record<UserRole, string> = {
  tenant: 'Tenant',
  employee: 'Employee',
  customer: 'Customer',
  business_owner: 'Business Owner',
};

const roleIcons: Record<UserRole, string> = {
  tenant: '🏠',
  employee: '💼',
  customer: '🛒',
  business_owner: '🏢',
};

const ClauseCard = ({ clause, index }: ClauseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskIcon = () => {
    switch (clause.riskLevel) {
      case 'fine':
        return <CheckCircle className="w-4 h-4" />;
      case 'risky':
        return <AlertTriangle className="w-4 h-4" />;
      case 'dangerous':
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getRiskLabel = () => {
    switch (clause.riskLevel) {
      case 'fine':
        return 'Low Risk';
      case 'risky':
        return 'Medium Risk';
      case 'dangerous':
        return 'High Risk';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card className={`overflow-hidden border-l-4 ${
        clause.riskLevel === 'fine' ? 'border-l-risk-fine' :
        clause.riskLevel === 'risky' ? 'border-l-risk-risky' :
        'border-l-risk-dangerous'
      }`}>
        {/* Header */}
        <div 
          className="p-5 cursor-pointer hover:bg-accent/30 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-medium text-muted-foreground">
                  Clause {index + 1}
                </span>
                <Badge variant={clause.riskLevel}>
                  <span className="flex items-center gap-1.5">
                    {getRiskIcon()}
                    {getRiskLabel()}
                  </span>
                </Badge>
              </div>
              <p className="text-foreground font-medium leading-relaxed">
                {clause.simplifiedText}
              </p>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-border"
          >
            <div className="p-5 space-y-6">
              {/* Original Text */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Original Text
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed bg-secondary/50 p-3 rounded-lg">
                  {clause.originalText}
                </p>
              </div>

              {/* Risk Explanation */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Risk Analysis
                </h4>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {clause.riskExplanation}
                </p>
              </div>

              {/* Real World Impact */}
              <div className={`p-4 rounded-lg ${
                clause.riskLevel === 'fine' ? 'bg-risk-fine-bg' :
                clause.riskLevel === 'risky' ? 'bg-risk-risky-bg' :
                'bg-risk-dangerous-bg'
              }`}>
                <h4 className={`text-xs font-semibold uppercase tracking-wide mb-2 ${
                  clause.riskLevel === 'fine' ? 'text-risk-fine' :
                  clause.riskLevel === 'risky' ? 'text-risk-risky' :
                  'text-risk-dangerous'
                }`}>
                  Real World Impact
                </h4>
                <p className={`text-sm leading-relaxed ${
                  clause.riskLevel === 'fine' ? 'text-risk-fine' :
                  clause.riskLevel === 'risky' ? 'text-risk-risky' :
                  'text-risk-dangerous'
                }`}>
                  {clause.realWorldImpact}
                </p>
              </div>

              {/* Role-Based Explanations */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  <User className="w-3.5 h-3.5 inline mr-1.5" />
                  What This Means For You
                </h4>
                <Tabs defaultValue="tenant" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 h-auto p-1">
                    {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                      <TabsTrigger
                        key={role}
                        value={role}
                        className="text-xs py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      >
                        <span className="mr-1.5">{roleIcons[role]}</span>
                        <span className="hidden sm:inline">{roleLabels[role]}</span>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                    <TabsContent key={role} value={role} className="mt-4">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {clause.roleExplanations[role]}
                      </p>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};

export default ClauseCard;
