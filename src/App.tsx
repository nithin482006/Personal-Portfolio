import { useState, useRef } from 'react';
import { AuthProvider } from './context/AuthContext';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminButton from './components/AdminButton';
import Terminal, { TerminalButton } from './components/Terminal/Terminal';
import AIAssistant from './components/AIAssistant';
import { Bot } from 'lucide-react';

export default function App() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [matrixOn, setMatrixOn] = useState(false);
  const heroResumeRef = useRef<{ viewResume: (el: HTMLElement) => void; downloadResume: (el: HTMLElement) => void; resumeRef: React.RefObject<HTMLDivElement> } | null>(null);

  const handleDownloadResume = () => {
    const r = heroResumeRef.current?.resumeRef?.current;
    if (r) heroResumeRef.current?.downloadResume(r);
  };

  return (
    <AuthProvider>
      <Nav />
      <main>
        <Hero
          matrixOn={matrixOn}
          onRegisterResume={(api) => { heroResumeRef.current = api; }}
        />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <AdminButton />

      {/* Floating Action Buttons — bottom-right stack */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 items-end">
        {/* AI Assistant toggle */}
        <button
          onClick={() => setShowAIAssistant(true)}
          className="relative w-12 h-12 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green flex items-center justify-center hover:bg-neon-green/20 hover:border-neon-green/50 hover:scale-110 active:scale-95 transition-all shadow-lg group touch-target"
          title="AI Assistant"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-5 h-5" />
          <span className="absolute right-full mr-3 px-2 py-1 bg-cyber-dark border border-cyber-border rounded text-[10px] font-mono text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
            AI_Assistant
          </span>
        </button>
      </div>

      {/* Terminal trigger button — hidden when terminal is fully open, shown when closed or minimized */}
      <TerminalButton
        onOpen={() => setShowTerminal(true)}
        isOpen={showTerminal}
        isMinimized={terminalMinimized}
      />

      {/* Terminal */}
      <Terminal
        isOpen={showTerminal}
        onClose={() => { setShowTerminal(false); setTerminalMinimized(false); }}
        onMatrixToggle={() => setMatrixOn(v => !v)}
        onDownloadResume={handleDownloadResume}
        onMinimizeChange={setTerminalMinimized}
      />

      {/* AI Assistant */}
      <AIAssistant isOpen={showAIAssistant} onClose={() => setShowAIAssistant(false)} />
    </AuthProvider>
  );
}
