import { useState, useEffect, useRef, useCallback } from 'react';
import {
  X, TerminalSquare, Minimize2, Maximize2, CornerDownRight,Minus, Slash,
} from 'lucide-react';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { PERSONAL, SKILLS, PROJECTS, EXPERIENCE, COURSES, EASTER_EGGS } from '../../data/portfolio';

// ── macOS traffic-light button ─────────────────────────────────────────────

function TrafficLight({
  color, onClick, title, icon, 'aria-label': ariaLabel,
}: {
  color: 'red' | 'yellow' | 'green';
  onClick: (e: React.MouseEvent) => void;
  title: string;
  'aria-label': string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={`traffic-light tl-${color}`}
      onClick={(e) => { e.stopPropagation(); onClick(e); }}
      title={title}
      aria-label={ariaLabel}
      data-no-drag
    >
      {icon}
    </button>
  );
}

// Group wrapper so hover on the row reveals glyphs (macOS behavior)
function TrafficLightGroup({ children }: { children: React.ReactNode }) {
  return <div className="traffic-light-group flex items-center gap-2 flex-shrink-0">{children}</div>;
}

// ── Types ──────────────────────────────────────────────────────────────────

interface OutputLine {
  id: number;
  type: 'command' | 'output' | 'error' | 'success' | 'info' | 'system';
  text: string;
}

type WindowState = 'open' | 'minimized' | 'maximized' | 'restored';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onMatrixToggle?: () => void;
  onDownloadResume?: () => void;
  onMinimizeChange?: (minimized: boolean) => void;
}

// ── Command registry ───────────────────────────────────────────────────────

const COMMANDS: Record<string, string> = {
  help: 'Show available commands',
  whoami: 'Display user information',
  about: 'About Nithin Reddy M',
  skills: 'List technical skills',
  projects: 'View all projects',
  experience: 'View work experience',
  education: 'View education history',
  certifications: 'View certifications & courses',
  contact: 'Show contact information',
  resume: 'Download resume',
  github: 'Open GitHub profile',
  linkedin: 'Open LinkedIn profile',
  neofetch: 'Display system profile',
  clear: 'Clear terminal output',
  exit: 'Close terminal',
  matrix: 'Toggle Matrix rain effect',
  ls: 'List portfolio sections',
  pwd: 'Print working directory',
  date: 'Show current date',
};

const ALL_COMMANDS = Object.keys(COMMANDS);

let lineId = 0;
const mkLine = (type: OutputLine['type'], text: string): OutputLine => ({
  id: ++lineId,
  type,
  text,
});

const INITIAL_OUTPUT: OutputLine[] = [
  mkLine('system', ''),
  mkLine('success', 'NRM Portfolio OS v1.0 — Interactive Terminal'),
  mkLine('info', `Type 'help' for available commands. 'exit' to close.`),
  mkLine('system', '─'.repeat(50)),
  mkLine('system', ''),
];

// ── Command handler ────────────────────────────────────────────────────────

function handleCommand(
  raw: string,
  navigate: (section: string) => void,
  onExit: () => void,
  onMatrixToggle: () => void,
  downloadResume: () => void,
): OutputLine[] {
  const input = raw.trim();
  const cmd = input.toLowerCase();
  const lines: OutputLine[] = [];

  if (EASTER_EGGS[cmd]) {
    const egg = EASTER_EGGS[cmd];
    (Array.isArray(egg) ? egg : (egg as string).split('\n')).forEach(l =>
      lines.push(mkLine('output', l)),
    );
    return lines;
  }

  switch (cmd) {
    case 'help':
      lines.push(mkLine('info', '┌─ Available Commands ─────────────────────────────┐'));
      Object.entries(COMMANDS).forEach(([c, desc]) => {
        lines.push(mkLine('output', `  ${c.padEnd(18)} — ${desc}`));
      });
      lines.push(mkLine('info', '└──────────────────────────────────────────────────┘'));
      lines.push(mkLine('info', 'Tip: Use ↑/↓ for history, Tab for autocomplete'));
      break;

    case 'whoami':
      lines.push(mkLine('success', PERSONAL.name));
      lines.push(mkLine('output', `role    : ${PERSONAL.title}`));
      lines.push(mkLine('output', `study   : ${PERSONAL.university}`));
      lines.push(mkLine('output', `degree  : ${PERSONAL.degree}`));
      lines.push(mkLine('output', `location: ${PERSONAL.location}`));
      lines.push(mkLine('output', `status  : Open to opportunities`));
      break;

    case 'about':
      lines.push(mkLine('info', '=== About Nithin Reddy M ==='));
      lines.push(mkLine('output', PERSONAL.summary));
      lines.push(mkLine('output', `University: ${PERSONAL.university}`));
      lines.push(mkLine('output', `Graduation: Expected ${PERSONAL.graduationYear}`));
      break;

    case 'skills': {
      lines.push(mkLine('info', '=== Technical Skills ==='));
      Object.entries(SKILLS).forEach(([cat, skills]) => {
        lines.push(mkLine('success', `[${cat}]`));
        lines.push(mkLine('output', `  ${skills.join(' · ')}`));
      });
      break;
    }

    case 'projects':
      lines.push(mkLine('info', '=== Featured Projects ==='));
      PROJECTS.forEach((p, i) => {
        lines.push(mkLine('success', `[${i + 1}] ${p.title}`));
        lines.push(mkLine('output', `    Period: ${p.period}`));
        lines.push(mkLine('output', `    Stack : ${p.tech.slice(0, 4).join(', ')}`));
        lines.push(mkLine('output', `    Status: [${p.status}]`));
        lines.push(mkLine('output', `    ${p.description.slice(0, 100)}...`));
      });
      lines.push(mkLine('info', `> Navigating to Projects section...`));
      navigate('#projects');
      break;

    case 'experience':
      lines.push(mkLine('info', '=== Work Experience ==='));
      EXPERIENCE.forEach((e, i) => {
        lines.push(mkLine('success', `[${i + 1}] ${e.role}`));
        lines.push(mkLine('output', `    Company: ${e.company}`));
        lines.push(mkLine('output', `    Dates  : ${e.dates}`));
        lines.push(mkLine('output', `    Type   : ${e.type}`));
      });
      navigate('#experience');
      break;

    case 'education':
      lines.push(mkLine('info', '=== Education ==='));
      lines.push(mkLine('success', `[Current] ${PERSONAL.degree}`));
      lines.push(mkLine('output', `  ${PERSONAL.university}`));
      lines.push(mkLine('output', `  Expected: ${PERSONAL.graduationYear}`));
      navigate('#education');
      break;

    case 'certifications':
      lines.push(mkLine('info', '=== Courses & Certifications ==='));
      COURSES.forEach((c, i) => {
        lines.push(mkLine('output', `[${i + 1}] ${c.name}`));
        lines.push(mkLine('output', `    ${c.org} — ${c.period}`));
      });
      navigate('#education');
      break;

    case 'contact':
      lines.push(mkLine('info', '=== Contact Information ==='));
      lines.push(mkLine('output', `email   : ${PERSONAL.email}`));
      lines.push(mkLine('output', `phone   : ${PERSONAL.phone}`));
      lines.push(mkLine('output', `location: ${PERSONAL.location}`));
      lines.push(mkLine('output', `github  : ${PERSONAL.githubHandle}`));
      lines.push(mkLine('output', `linkedin: ${PERSONAL.linkedinHandle}`));
      lines.push(mkLine('info', '> Navigating to Contact section...'));
      navigate('#contact');
      break;

    case 'resume':
      lines.push(mkLine('info', 'Initiating resume download...'));
      lines.push(mkLine('success', '[OK] Resume generation complete.'));
      lines.push(mkLine('output', 'Downloading: Nithin_Reddy_M_Resume.pdf'));
      downloadResume();
      break;

    case 'github':
      lines.push(mkLine('output', `Opening: github.com/${PERSONAL.githubHandle}`));
      window.open(PERSONAL.github, '_blank');
      break;

    case 'linkedin':
      lines.push(mkLine('output', `Opening: linkedin.com/in/${PERSONAL.linkedinHandle}`));
      window.open(PERSONAL.linkedin, '_blank');
      break;

    case 'neofetch':
      lines.push(mkLine('system', ''));
      lines.push(mkLine('system', '          ████████  NRM OS v1.0'));
      lines.push(mkLine('system', '        ██░░░░░░██  ─────────────────────────'));
      lines.push(mkLine('system', '       █░░░░░░░░░█  OS      : NRM-Portfolio 2026'));
      lines.push(mkLine('system', '      █░░░░░░░░░░░█ Host    : Presidency University'));
      lines.push(mkLine('system', '      █░░░░████░░░█ Role    : CS Student & Dev'));
      lines.push(mkLine('system', '      █░░░░████░░░█ Shell   : zsh + React'));
      lines.push(mkLine('system', '       █░░░░░░░░░█  Memory  : Infinite curiosity'));
      lines.push(mkLine('system', '        ██░░░░░░██  CPU     : Creative problem solver'));
      lines.push(mkLine('system', '          ████████  Skills  : Python Java JS React'));
      lines.push(mkLine('system', '                    Status  : ONLINE | AVAILABLE'));
      lines.push(mkLine('system', ''));
      break;

    case 'matrix':
      lines.push(mkLine('success', 'Toggling Matrix rain effect...'));
      onMatrixToggle();
      break;

    case 'clear':
      return [];

    case 'exit':
      onExit();
      return [];

    default:
      if (input.startsWith('echo ')) {
        lines.push(mkLine('output', input.slice(5)));
      } else if (input === '') {
        // empty — do nothing
      } else {
        lines.push(mkLine('error', `bash: ${input}: command not found`));
        lines.push(mkLine('info', `Type 'help' to see available commands.`));
      }
  }

  return lines;
}

// ── Terminal core (shared logic) ───────────────────────────────────────────

function useTerminalLogic(onClose: () => void, onMatrixToggle?: () => void, onDownloadResume?: () => void) {
  const [output, setOutput] = useState<OutputLine[]>(INITIAL_OUTPUT);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const navigate = useCallback((section: string) => {
    setTimeout(() => {
      document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, []);

  const downloadResume = useCallback(() => onDownloadResume?.(), [onDownloadResume]);
  const matrixToggle = useCallback(() => onMatrixToggle?.(), [onMatrixToggle]);

  const submitCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim();
    if (trimmed) {
      setOutput(prev => [...prev, mkLine('command', `$ ${trimmed}`)]);
      setHistory(prev => [trimmed, ...prev.slice(0, 49)]);
    } else {
      setOutput(prev => [...prev, mkLine('command', '$')]);
    }
    setInput('');
    setHistoryIdx(-1);
    setSuggestions([]);

    const result = handleCommand(trimmed, navigate, onClose, matrixToggle, downloadResume);
    if (result.length === 0 && trimmed === 'clear') {
      setOutput([mkLine('info', 'Terminal cleared. Type \'help\' for commands.')]);
    } else {
      setOutput(prev => [...prev, ...result]);
    }
  }, [navigate, onClose, matrixToggle, downloadResume]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(newIdx);
      setInput(history[newIdx] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIdx = Math.max(historyIdx - 1, -1);
      setHistoryIdx(newIdx);
      setInput(newIdx === -1 ? '' : history[newIdx] ?? '');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = ALL_COMMANDS.filter(c => c.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0]);
        setSuggestions([]);
      } else if (matches.length > 1) {
        setSuggestions(matches);
      }
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setOutput([mkLine('info', 'Terminal cleared.')]);
    }
  };

  const lineClass = (type: OutputLine['type']): string => {
    switch (type) {
      case 'command': return 'text-white font-semibold';
      case 'success': return 'text-neon-green';
      case 'error': return 'text-red-400';
      case 'info': return 'text-neon-cyan';
      case 'system': return 'text-gray-500';
      default: return 'text-gray-300';
    }
  };

  const clear = useCallback(() => setOutput([mkLine('info', 'Cleared.')]), []);

  return {
    output, input, suggestions, inputRef, outputRef,
    setInput, setSuggestions, handleKeyDown, submitCommand, lineClass, clear,
  };
}

// ── Terminal body (output + input — shared between desktop/mobile) ─────────

function TerminalBody({ logic }: { logic: ReturnType<typeof useTerminalLogic> }) {
  const { output, input, suggestions, inputRef, outputRef, setInput, setSuggestions, handleKeyDown, lineClass } = logic;

  return (
    <>
      {/* Output */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-0.5 text-[11px] sm:text-xs leading-5 select-text"
        style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ff88 #0a0a0f', WebkitOverflowScrolling: 'touch' }}
      >
        {output.map(line => (
          <div key={line.id} className={`whitespace-pre-wrap break-all ${lineClass(line.type)}`}>
            {line.text}
          </div>
        ))}
      </div>

      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <div className="px-3 sm:px-4 pb-2 flex flex-wrap gap-2">
          {suggestions.map(s => (
            <button
              key={s}
              onMouseDown={e => { e.preventDefault(); setInput(s); setSuggestions([]); }}
              className="text-[10px] text-neon-green/70 border border-neon-green/20 px-2 py-1 rounded hover:bg-neon-green/10 transition-colors touch-target"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex-shrink-0 border-t border-neon-green/20 px-3 sm:px-4 py-2 flex items-center gap-2">
        <span className="text-neon-cyan text-xs flex-shrink-0">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => { setInput(e.target.value); setSuggestions([]); }}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-white text-xs outline-none caret-neon-green placeholder-gray-700 min-w-0"
          placeholder="type a command..."
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal command input"
        />
        <span className="text-neon-green animate-blink text-xs flex-shrink-0">█</span>
      </div>
    </>
  );
}

// ── Helper: detect if a pointer event target is an interactive control ────
// This is the root-cause fix: setPointerCapture() on the header hijacks all
// subsequent pointer events, preventing click from ever reaching buttons.
// Instead of capturing unconditionally, we check whether the pointerdown
// originated on an interactive element (button, dot) and skip drag init.
function isInteractiveTarget(e: React.PointerEvent): boolean {
  const el = e.target as HTMLElement;
  return !!el.closest('button, .terminal-dot, [data-no-drag]');
}

// ── Desktop / Tablet floating window ───────────────────────────────────────

interface PosState { x: number; y: number; }

function DesktopTerminal({
  logic, onClose, onMinimize, windowState, setWindowState, exitAnimClass,
}: {
  logic: ReturnType<typeof useTerminalLogic>;
  onClose: () => void;
  onMinimize: () => void;
  windowState: WindowState;
  setWindowState: (s: WindowState) => void;
  exitAnimClass: string;
}) {
  const [pos, setPos] = useState<PosState>({ x: -1, y: -1 });
  const dragRef = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Center on first open
  useEffect(() => {
    if (pos.x === -1 && containerRef.current) {
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      setPos({
        x: Math.max(16, (window.innerWidth - w) / 2),
        y: Math.max(80, (window.innerHeight - h) / 2),
      });
    }
  }, [pos.x]);

  // Keep in bounds on resize
  useEffect(() => {
    const onResize = () => {
      if (!containerRef.current || pos.x === -1) return;
      const w = containerRef.current.offsetWidth;
      const h = containerRef.current.offsetHeight;
      setPos(p => ({
        x: Math.min(p.x, window.innerWidth - w - 16),
        y: Math.min(p.y, window.innerHeight - h - 16),
      }));
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [pos.x]);

  // ── Fixed drag handlers: skip capture if clicking a button ──
  const onDragStart = (e: React.PointerEvent) => {
    if (windowState === 'maximized') return;
    if (isInteractiveTarget(e)) return; // ← root-cause fix: let clicks reach buttons

    const headerEl = e.currentTarget as HTMLElement;
    headerEl.setPointerCapture(e.pointerId);
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseX: pos.x,
      baseY: pos.y,
    };
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const newX = dragRef.current.baseX + dx;
    const newY = dragRef.current.baseY + dy;
    const margin = 16;
    setPos({
      x: Math.max(margin, Math.min(newX, window.innerWidth - 80)),
      y: Math.max(margin, Math.min(newY, window.innerHeight - 80)),
    });
  };

  const onDragEnd = (e: React.PointerEvent) => {
    dragRef.current = null;
    try { (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); } catch { /* noop */ }
  };

  const isMax = windowState === 'maximized';

  const sizeClasses = isMax
    ? 'fixed inset-3 sm:inset-4'
    : 'fixed w-[min(680px,calc(100vw-2rem))] h-[min(480px,calc(100vh-7rem))]';

  const style: React.CSSProperties = isMax
    ? {}
    : { left: `${pos.x}px`, top: `${pos.y}px` };

  return (
    <div
      ref={containerRef}
      className={`${sizeClasses} z-50 flex flex-col terminal-window shadow-neon-lg ${exitAnimClass || 'terminal-enter-desktop'}`}
      style={{ ...style, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      onClick={() => logic.inputRef.current?.focus()}
    >
      {/* Draggable title bar */}
      <div
        className="terminal-header flex-shrink-0 cursor-grab active:cursor-grabbing select-none touch-none"
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        onPointerCancel={onDragEnd}
      >
        <TrafficLightGroup>
          <TrafficLight color="red" onClick={() => onClose()} title="Close" aria-label="Close terminal" icon={<X strokeWidth={2.5} />} />
          <TrafficLight color="yellow" onClick={() => onMinimize()} title="Minimize" aria-label="Minimize terminal" icon={<Minus strokeWidth={2.5} />} />
          <TrafficLight color="green" onClick={() => setWindowState(isMax ? 'restored' : 'maximized')} title={isMax ? 'Restore' : 'Maximize'} aria-label={isMax ? 'Restore terminal' : 'Maximize terminal'} icon={isMax ? <CornerDownRight strokeWidth={2.5} /> : <Slash strokeWidth={2.5} />} />
        </TrafficLightGroup>

        <span className="ml-3 text-gray-500 text-[10px] sm:text-xs truncate">
          nithin@portfolio:~{' '}
          <span className="text-neon-green/50 hidden sm:inline">[ {ALL_COMMANDS.length} commands ]</span>
        </span>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="p-1.5 rounded text-gray-600 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-colors touch-target flex items-center justify-center"
            title="Minimize"
            aria-label="Minimize terminal"
            data-no-drag
          >
            <Minimize2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setWindowState(isMax ? 'restored' : 'maximized'); }}
            className="p-1.5 rounded text-gray-600 hover:text-neon-green hover:bg-neon-green/10 transition-colors touch-target flex items-center justify-center"
            title={isMax ? 'Restore' : 'Maximize'}
            aria-label={isMax ? 'Restore terminal' : 'Maximize terminal'}
            data-no-drag
          >
            {isMax ? <CornerDownRight size={14} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-1.5 rounded text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors touch-target flex items-center justify-center"
            title="Close"
            aria-label="Close terminal"
            data-no-drag
          >
            <X size={14} />
          </button>
        </div>
      </div>

      <TerminalBody logic={logic} />
    </div>
  );
}

// ── Mobile bottom-sheet terminal ───────────────────────────────────────────

function MobileTerminal({
  logic, onClose, onMinimize, isMaximized, onToggleMax, exitAnimClass,
}: {
  logic: ReturnType<typeof useTerminalLogic>;
  onClose: () => void;
  onMinimize: () => void;
  isMaximized: boolean;
  onToggleMax: () => void;
  exitAnimClass: string;
}) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ startY: number; currentY: number } | null>(null);

  // Swipe-down-to-close / minimize
  const onPointerDown = (e: React.PointerEvent) => {
    if (isInteractiveTarget(e)) return; // ← same fix: don't capture on buttons
    dragRef.current = { startY: e.clientY, currentY: 0 };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dy = e.clientY - dragRef.current.startY;
    dragRef.current.currentY = Math.max(0, dy);
    if (sheetRef.current) {
      sheetRef.current.style.transform = `translateY(${Math.max(0, dy)}px)`;
      sheetRef.current.style.transition = 'none';
    }
  };

  const onPointerUp = () => {
    if (!dragRef.current || !sheetRef.current) return;
    const dy = dragRef.current.currentY;
    sheetRef.current.style.transition = '';
    sheetRef.current.style.transform = '';
    if (dy > 100) {
      onClose();
    }
    dragRef.current = null;
  };

  const heightClass = isMaximized ? 'h-[70vh] max-h-[70vh]' : 'h-[45vh] max-h-[45vh]';

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-cyber-darker/60 backdrop-blur-sm ${exitAnimClass ? 'backdrop-exit' : 'backdrop-enter'}`}
        onClick={onClose}
      />

      {/* Bottom sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 inset-x-0 z-50 ${heightClass} flex flex-col terminal-window rounded-b-none rounded-t-xl shadow-neon-lg ${exitAnimClass || 'terminal-enter-mobile'} transition-[height] duration-300 ease-out`}
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      >
        {/* Swipe handle header */}
        <div
          data-swipe-handle
          className="terminal-header flex-shrink-0 cursor-grab active:cursor-grabbing touch-none rounded-t-xl relative"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Visual grabber */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-gray-600" />
          <TrafficLightGroup>
            <TrafficLight color="red" onClick={() => onClose()} title="Close" aria-label="Close terminal" icon={<X strokeWidth={2.5} />} />
            <TrafficLight color="yellow" onClick={() => onMinimize()} title="Minimize" aria-label="Minimize terminal" icon={<Minus strokeWidth={2.5} />} />
            <TrafficLight color="green" onClick={onToggleMax} title={isMaximized ? 'Restore' : 'Maximize'} aria-label={isMaximized ? 'Restore terminal' : 'Maximize terminal'} icon={isMaximized ? <CornerDownRight strokeWidth={2.5} /> : <Slash strokeWidth={2.5} />} />
          </TrafficLightGroup>
          <span className="ml-3 text-gray-500 text-[10px] truncate">nithin@portfolio:~</span>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={onToggleMax}
              className="p-1.5 rounded text-gray-600 hover:text-neon-green hover:bg-neon-green/10 transition-colors touch-target flex items-center justify-center"
              title={isMaximized ? 'Restore' : 'Maximize'}
              aria-label={isMaximized ? 'Restore terminal' : 'Maximize terminal'}
              data-no-drag
            >
              {isMaximized ? <CornerDownRight size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={onMinimize}
              className="p-1.5 rounded text-gray-600 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-colors touch-target flex items-center justify-center"
              title="Minimize"
              aria-label="Minimize terminal"
              data-no-drag
            >
              <Minimize2 size={14} />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition-colors touch-target flex items-center justify-center"
              title="Close"
              aria-label="Close terminal"
              data-no-drag
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <TerminalBody logic={logic} />
      </div>
    </>
  );
}

// ── Minimized floating chip (shared) ───────────────────────────────────────

function MinimizedChip({ onRestore, onClose }: { onRestore: () => void; onClose: () => void }) {
  return (
    <div
      className={`fixed z-40 flex items-center gap-2 bottom-4 right-4 terminal-window rounded-lg shadow-neon px-3 py-2 terminal-enter-desktop`}
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      <TerminalSquare size={14} className="text-neon-green flex-shrink-0" />
      <button
        onClick={onRestore}
        className="text-[10px] sm:text-xs text-neon-green hover:text-white transition-colors font-mono touch-target flex items-center"
        aria-label="Restore terminal"
      >
        Terminal
        <span className="text-neon-green/50 animate-blink ml-0.5">_</span>
      </button>
      <button
        onClick={onClose}
        className="text-gray-600 hover:text-red-400 transition-colors flex items-center justify-center touch-target"
        aria-label="Close terminal"
      >
        <X size={12} />
      </button>
    </div>
  );
}

// ── Main Terminal component ────────────────────────────────────────────────

export default function Terminal({ isOpen, onClose, onMatrixToggle, onDownloadResume, onMinimizeChange }: TerminalProps) {
  const isMobile = useIsMobile();
  const [windowState, setWindowState] = useState<WindowState>('restored');
  const [exitAnim, setExitAnim] = useState<'close' | 'minimize' | null>(null);
  const logic = useTerminalLogic(onClose, onMatrixToggle, onDownloadResume);
  const animTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Notify parent when minimize state changes
  useEffect(() => {
    onMinimizeChange?.(windowState === 'minimized');
  }, [windowState, onMinimizeChange]);

  // Clean up animation timer on unmount
  useEffect(() => () => { if (animTimer.current) clearTimeout(animTimer.current); }, []);

  // Focus input when opening/restoring
  useEffect(() => {
    if (isOpen && windowState !== 'minimized' && !exitAnim) {
      const t = setTimeout(() => logic.inputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [isOpen, windowState, exitAnim]);

  // ── Animated actions: play exit CSS, then commit state change ──
  const animatedClose = useCallback(() => {
    if (exitAnim) return;
    setExitAnim('close');
    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => {
      setExitAnim(null);
      onClose();
    }, 220);
  }, [exitAnim, onClose]);

  const animatedMinimize = useCallback(() => {
    if (exitAnim) return;
    setExitAnim('minimize');
    if (animTimer.current) clearTimeout(animTimer.current);
    animTimer.current = setTimeout(() => {
      setExitAnim(null);
      setWindowState('minimized');
    }, 250);
  }, [exitAnim]);

  // Global keyboard shortcuts when terminal is visible
  useEffect(() => {
    if (!isOpen || windowState === 'minimized' || exitAnim) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        animatedClose();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
        e.preventDefault();
        animatedMinimize();
      } else if (e.key === 'F11') {
        e.preventDefault();
        setWindowState(prev => prev === 'maximized' ? 'restored' : 'maximized');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, windowState, exitAnim, animatedClose, animatedMinimize]);

  if (!isOpen) return null;

  // Minimized — show floating chip (both mobile & desktop)
  if (windowState === 'minimized' && !exitAnim) {
    return (
      <MinimizedChip
        onRestore={() => setWindowState('restored')}
        onClose={animatedClose}
      />
    );
  }

  // Compute exit animation class
  const exitClass = exitAnim === 'close'
    ? 'terminal-exit'
    : exitAnim === 'minimize'
      ? (isMobile ? 'terminal-exit-minimize-mobile' : 'terminal-exit-minimize-desktop')
      : '';

  if (isMobile) {
    return (
      <MobileTerminal
        logic={logic}
        onClose={animatedClose}
        onMinimize={animatedMinimize}
        isMaximized={windowState === 'maximized'}
        onToggleMax={() => setWindowState(prev => prev === 'maximized' ? 'restored' : 'maximized')}
        exitAnimClass={exitClass}
      />
    );
  }

  return (
    <DesktopTerminal
      logic={logic}
      onClose={animatedClose}
      onMinimize={animatedMinimize}
      windowState={windowState}
      setWindowState={setWindowState}
      exitAnimClass={exitClass}
    />
  );
}

// ── Floating trigger button ────────────────────────────────────────────────

interface TerminalButtonProps {
  onOpen: () => void;
  isOpen: boolean;
  isMinimized?: boolean;
}

export function TerminalButton({ onOpen, isOpen, isMinimized }: TerminalButtonProps) {
  // Hide the "Open Terminal" button when the terminal is fully visible
  // (open + not minimized) to avoid a confusing duplicate trigger.
  const showButton = !isOpen || isMinimized;

  if (!showButton) return null;

  return (
    <button
      onClick={onOpen}
      title="Open Terminal"
      aria-label="Open terminal"
      className={`fixed bottom-24 right-4 z-40 flex items-center gap-2 px-4 py-2.5 rounded-lg border font-mono text-xs font-semibold transition-all duration-300 shadow-lg touch-target ${
        isMinimized
          ? 'bg-neon-green/30 border-neon-green text-neon-green shadow-neon animate-pulse'
          : 'bg-cyber-dark/90 border-neon-green/40 text-neon-green/80 hover:border-neon-green hover:text-neon-green hover:shadow-neon'
      }`}
    >
      <TerminalSquare size={15} />
      <span>{isMinimized ? 'Restore Terminal' : 'Open Terminal'}</span>
      <span className="text-neon-green/50 animate-blink">_</span>
    </button>
  );
}

// Re-export for convenience
export { useTerminalLogic };
export type { OutputLine, TerminalProps };
