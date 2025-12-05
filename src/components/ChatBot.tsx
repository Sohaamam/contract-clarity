import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import type { ChatMessage } from '@/types/legal';

interface ChatBotProps {
  documentContext?: string;
  isAnalyzed: boolean;
}

const ChatBot = ({ documentContext, isAnalyzed }: ChatBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: isAnalyzed 
        ? "Hello! I'm your legal document assistant. I've analyzed your document and I'm ready to answer any questions you have about it. What would you like to know?"
        : "Hello! I'm your legal document assistant. Upload a document first, and then I can help you understand it better.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isAnalyzed && messages.length === 1) {
      setMessages([
        {
          id: '1',
          role: 'assistant',
          content: "Hello! I've analyzed your document. I can help you understand any clause, explain legal terms, or highlight potential concerns. What would you like to know?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isAnalyzed]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response (in production, this would call the AI endpoint)
    setTimeout(() => {
      const responses = [
        "Based on the document analysis, this clause requires you to provide 30 days notice before terminating the agreement. If you fail to do so, you may be liable for an additional month's payment.",
        "The indemnification clause I found is quite broad. It means you would be responsible for covering legal costs if the other party faces any claims related to your use of their service.",
        "Looking at the data usage terms, they have the right to share your data with third-party partners. This is marked as 'risky' because your personal information could be used for marketing purposes without explicit consent.",
        "The refund policy states that refunds are only available within 7 days of purchase, and even then, only for defective products. This is stricter than typical industry standards.",
      ];

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full shadow-lg"
          size="icon"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)]"
          >
            <Card className="flex flex-col h-[500px] shadow-xl overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-border bg-primary">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary-foreground">
                      Legal Assistant
                    </h3>
                    <p className="text-xs text-primary-foreground/70">
                      {isAnalyzed ? 'Document analyzed' : 'Upload a document to start'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-2 ${
                      message.role === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-primary' 
                        : 'bg-secondary'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      )}
                    </div>
                    <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-tr-sm'
                        : 'bg-secondary text-secondary-foreground rounded-tl-sm'
                    }`}>
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Bot className="w-4 h-4 text-secondary-foreground" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-secondary">
                      <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={isAnalyzed ? "Ask about your document..." : "Upload a document first"}
                    disabled={!isAnalyzed || isLoading}
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSend} 
                    size="icon"
                    disabled={!inputValue.trim() || isLoading || !isAnalyzed}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
