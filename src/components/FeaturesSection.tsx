import { motion } from 'framer-motion';
import { 
  FileSearch, 
  ShieldCheck, 
  MessageSquareText, 
  Scale, 
  Users, 
  GitCompare 
} from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: FileSearch,
    title: 'Plain English Translation',
    description: 'Complex legal jargon translated into simple, understandable language.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: ShieldCheck,
    title: 'Risk Detection',
    description: 'AI-powered analysis identifies hidden risks and unfair terms.',
    color: 'text-risk-risky',
    bg: 'bg-risk-risky-bg',
  },
  {
    icon: Users,
    title: 'Role-Based Insights',
    description: 'Get explanations tailored to your specific situation and role.',
    color: 'text-risk-fine',
    bg: 'bg-risk-fine-bg',
  },
  {
    icon: Scale,
    title: 'Fairness Scoring',
    description: 'Objective scoring system rates the overall fairness of contracts.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: GitCompare,
    title: 'Document Comparison',
    description: 'Compare two contracts to see which offers better terms.',
    color: 'text-risk-dangerous',
    bg: 'bg-risk-dangerous-bg',
  },
  {
    icon: MessageSquareText,
    title: 'AI Chat Assistant',
    description: 'Ask questions about your document in natural conversation.',
    color: 'text-risk-fine',
    bg: 'bg-risk-fine-bg',
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wide">
            Features
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            Everything You Need to
            <br />
            Understand Legal Documents
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform breaks down complex legal language, 
            identifies risks, and helps you make informed decisions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 group">
                <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
