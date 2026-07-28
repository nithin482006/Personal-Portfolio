import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, Sparkles, Minimize2, Maximize2 } from 'lucide-react';
import { AI_KNOWLEDGE, PERSONAL } from '../data/portfolio';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

function processMessage(input: string): string {
  const lower = input.toLowerCase().trim();

  // Check greetings
  if (AI_KNOWLEDGE.greetings.some(g => lower === g || lower.startsWith(g + ' '))) {
    return `Hello! I'm Nithin's AI assistant. I can tell you about his skills, projects, experience, and how to contact him. What would you like to know?`;
  }

  // Check each knowledge category
  for (const [category, data] of Object.entries(AI_KNOWLEDGE)) {
    if (category === 'greetings') continue;
    if ('triggers' in data && 'response' in data) {
      const triggers = data.triggers as string[];
      const response = data.response as string;
      if (triggers.some(t => lower.includes(t.toLowerCase()))) {
        return response;
      }
    }
  }

  // Fallback
  return `I'm not sure about that. Try asking about Nithin's **projects**, **skills**, **education**, **experience**, or how to **contact** him. You can also ask about his **resume** or **GitHub**.`;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hi! I'm an AI assistant for **${PERSONAL.name}**'s portfolio. Ask me anything about his skills, projects, experience, or background!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const response = processMessage(input.trim());

    setTimeout(() => {
      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 300);

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
    {/* Mobile backdrop */}
    <div
      className="fixed inset-0 z-40 bg-cyber-darker/50 backdrop-blur-sm sm:hidden backdrop-enter"
      onClick={onClose}
    />
    <div
      className={`fixed z-50 flex flex-col bg-cyber-dark border border-cyber-border rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
        isExpanded
          ? 'inset-4 sm:inset-8 md:inset-16'
          : 'bottom-4 right-4 left-4 sm:left-auto w-full sm:w-[360px] max-w-[400px] h-[60vh] sm:h-[480px] max-h-[600px]'
      }`}
      style={{ animation: 'terminalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-cyber-border bg-cyber-surface">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center">
            <Bot className="w-4 h-4 text-neon-green" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Assistant</h3>
            <p className="text-[10px] text-gray-400 font-mono">Portfolio_Guide_v1.0</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-cyber-border transition-colors touch-target flex items-center justify-center"
            aria-label={isExpanded ? 'Minimize' : 'Maximize'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-gray-400 hover:text-white hover:bg-cyber-border transition-colors touch-target flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div
              className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-neon-blue/20 text-neon-blue'
                  : 'bg-neon-green/20 text-neon-green'
              }`}
            >
              {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </div>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-neon-blue/10 border border-neon-blue/20 text-white'
                  : 'bg-cyber-surface border border-cyber-border text-gray-200'
              }`}
            >
              <div className="prose prose-sm prose-invert whitespace-pre-wrap">
                {msg.content.split('**').map((part, j) =>
                  j % 2 === 1 ? <strong key={j} className="text-neon-green font-semibold">{part}</strong> : part
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-cyber-border bg-cyber-surface/50">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about skills, projects..."
            className="flex-1 bg-cyber-dark border border-cyber-border rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neon-green/30 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 rounded-lg bg-neon-green text-cyber-dark hover:bg-neon-green/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed touch-target flex items-center justify-center"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {['Skills', 'Projects', 'Experience', 'Contact', 'Resume'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
                inputRef.current?.focus();
              }}
              className="px-2 py-1 text-[10px] font-mono rounded bg-cyber-border text-gray-400 hover:text-neon-green hover:border-neon-green/30 border border-transparent transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
