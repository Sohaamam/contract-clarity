import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, ArrowLeftRight } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Compare = () => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const handleFile1Select = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile1(file);
  };

  const handleFile2Select = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile2(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Compare Documents
            </h1>
            <p className="text-lg text-muted-foreground">
              Upload two documents to compare and find out which is safer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Document 1 */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Document 1</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFile1Select}
                    className="hidden"
                  />
                  {file1 ? (
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <span className="text-sm font-medium text-foreground">{file1.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                    </>
                  )}
                </label>
              </CardContent>
            </Card>

            {/* Document 2 */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-lg font-medium">Document 2</CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex flex-col items-center justify-center py-12 cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFile2Select}
                    className="hidden"
                  />
                  {file2 ? (
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <span className="text-sm font-medium text-foreground">{file2.name}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                      <span className="text-sm text-muted-foreground">Click to upload</span>
                    </>
                  )}
                </label>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              disabled={!file1 || !file2}
              className="gap-2 px-8"
            >
              <ArrowLeftRight className="w-5 h-5" />
              Compare Documents
            </Button>
          </div>
        </motion.div>
      </div>

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

export default Compare;
