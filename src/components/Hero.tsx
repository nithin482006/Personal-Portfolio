import { useState, useEffect, useRef } from 'react';
import {
  ArrowDown, Github, Linkedin, Mail, Shield, Download, Eye,
  Wifi, Cpu, Activity, FolderKanban, GraduationCap, Code2,
  AlertCircle, CheckCircle2, BookOpen, FileText, RefreshCw
} from 'lucide-react';
import MatrixRain from './MatrixRain';
import Resume from './Resume';
import ResumeGeneratorModal from './ResumeGeneratorModal';
import { useResume } from '../hooks/useResume';
import { STATS, PERSONAL } from '../data/portfolio';

// ── Animated counter ───────────────────────────────────────────────────────

function useCounter(target: number, duration = 1800, delay = 400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const timeout = setTimeout(() => {
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setCount(Math.floor(progress * target));
        if (progress < 1) raf = requestAnimationFrame(step);
        else setCount(target);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, duration, delay]);
  return count;
}

// ── Stat card ──────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color?: string;
  delay?: number;
  animate?: boolean;
}

function StatCard({ icon: Icon, label, value, sub, color = 'neon-green', delay = 0, animate = false }: StatCardProps) {
  const numericVal = typeof value === 'number' ? value : parseInt(value as string) || 0;
  const count = useCounter(animate ? numericVal : 0, 1800, delay);
  const displayVal = animate ? (numericVal === count || !animate ? value : count) : value;

  const borderColor = color === 'neon-cyan' ? 'hover:border-neon-cyan/50' : 'hover:border-neon-green/50';
  const iconColor = color === 'neon-cyan' ? 'text-neon-cyan' : 'text-neon-green';
  const numColor = color === 'neon-cyan' ? 'text-neon-cyan' : 'text-neon-green';

  return (
    <div
      className={`cyber-card rounded-lg p-4 transition-all duration-300 ${borderColor} hover:scale-[1.03] group`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-[10px] font-mono uppercase tracking-widest text-gray-500`}>{label}</span>
        <Icon size={14} className={`${iconColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
      </div>
      <div className={`font-display font-bold text-2xl ${numColor}`}>{displayVal}</div>
      {sub && <div className="text-[10px] text-gray-600 mt-1 font-mono">{sub}</div>}
    </div>
  );
}

// ── Status indicator bar ───────────────────────────────────────────────────

interface StatusBadgeProps { label: string; ok: boolean; pulse?: boolean }
function StatusBadge({ label, ok, pulse }: StatusBadgeProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`relative w-1.5 h-1.5 rounded-full ${ok ? 'bg-neon-green' : 'bg-red-400'}`}>
        {pulse && ok && (
          <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-40" />
        )}
      </div>
      <span className={`text-[10px] font-mono tracking-wider ${ok ? 'text-neon-green/70' : 'text-red-400/70'}`}>
        {label}
      </span>
    </div>
  );
}

// ── Radar animation ────────────────────────────────────────────────────────

function RadarSweep() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-10">
      <div className="relative w-[500px] h-[500px]">
        {/* Concentric rings */}
        {[1, 0.75, 0.5, 0.25].map((scale, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-neon-green/30"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
          />
        ))}
        {/* Cross hairs */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-neon-green/20" />
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-neon-green/20" />
        {/* Sweep */}
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ animation: 'spin 4s linear infinite' }}
        >
          <div
            className="absolute top-1/2 left-1/2 w-1/2 h-px origin-left"
            style={{
              background: 'linear-gradient(90deg, rgba(0,255,136,0.8), transparent)',
              boxShadow: '0 0 10px rgba(0,255,136,0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Main Hero ──────────────────────────────────────────────────────────────

interface HeroProps {
  matrixOn?: boolean;
  onRegisterResume?: (api: {
    viewResume: (el: HTMLElement) => void;
    downloadResume: (el: HTMLElement) => void;
    resumeRef: React.RefObject<HTMLDivElement>;
  }) => void;
}

export default function Hero({ matrixOn = false, onRegisterResume }: HeroProps = {}) {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { generating, downloadResume, viewResume } = useResume();
  const [uptime, setUptime] = useState(0);
  const [showResumeGenerator, setShowResumeGenerator] = useState(false);

  useEffect(() => {
    if (onRegisterResume) {
      onRegisterResume({ viewResume, downloadResume, resumeRef });
    }
  }, [onRegisterResume, viewResume, downloadResume]);

  // Simulated uptime counter
  useEffect(() => {
    const id = setInterval(() => setUptime(s => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (n: number) => {
    const h = Math.floor(n / 3600).toString().padStart(2, '0');
    const m = Math.floor((n % 3600) / 60).toString().padStart(2, '0');
    const s = (n % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-cyber-dark"
    >
      {/* Matrix rain */}
      <MatrixRain opacity={matrixOn ? 0.25 : 0.08} />

      {/* Radar sweep background */}
      <RadarSweep />

      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30" />

      {/* Gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-neon-green/4 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-neon-cyan/4 blur-[120px]" />
      </div>

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-neon-green/15 to-transparent"
          style={{ animation: 'scan 6s linear infinite' }}
        />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-20"
        style={{ animation: 'fadeUp 0.8s ease 0.1s both' }}
      >
        {/* Top status bar */}
        <div
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-6"
          style={{ animation: 'fadeIn 0.6s ease 0.2s both' }}
        >
          <StatusBadge label="SYSTEM_ONLINE" ok pulse />
          <StatusBadge label="FIREWALL_ACTIVE" ok />
          <StatusBadge label="NO_ACTIVE_THREATS" ok />
          <StatusBadge label="INTEGRITY_100%" ok />
          <div className="flex items-center gap-1.5">
            <Activity size={10} className="text-neon-cyan/60" />
            <span className="text-[10px] font-mono text-neon-cyan/60">UPTIME: {fmt(uptime)}</span>
          </div>
        </div>

        {/* SOC header label */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 bg-neon-green/5 border border-neon-green/20 rounded-full px-5 py-1.5"
            style={{ animation: 'fadeIn 0.6s ease 0.3s both' }}
          >
            <Shield size={12} className="text-neon-green" />
            <span className="text-neon-green text-[10px] font-mono font-semibold tracking-[3px] uppercase">
              Security Operations Center — Portfolio Dashboard
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          </div>
        </div>

        {/* Name */}
        <div className="text-center mb-4">
          <h1
            className="glitch font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] cursor-default"
            data-text="Nithin Reddy M"
          >
            <span className="text-neon-green/60">[</span>
            Nithin Reddy M
            <span className="text-neon-green/60">]</span>
          </h1>
          <p className="text-gray-400 text-base sm:text-lg font-mono mt-3">
            <span className="text-neon-green">&gt;</span>{' '}
            <span className="text-white">CS Student</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-neon-cyan">Full-Stack Developer</span>
            <span className="text-gray-600 mx-2">|</span>
            <span className="text-neon-green">Cybersecurity Enthusiast</span>
          </p>
        </div>

        {/* SOC Dashboard stat cards */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6"
          style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}
        >
          <StatCard icon={FolderKanban} label="PROJECTS" value={STATS.projects} sub="deployed" animate delay={500} />
          <StatCard icon={Code2} label="SKILLS" value={STATS.skills} sub="technologies" color="neon-cyan" animate delay={600} />
          <StatCard icon={Activity} label="LANGUAGES" value={STATS.languages} sub="programming" animate delay={700} />
          <StatCard icon={BookOpen} label="COURSES" value={STATS.courses} sub="completed" color="neon-cyan" animate delay={800} />
          <StatCard icon={GraduationCap} label="GRAD YEAR" value={STATS.gradYear} sub="expected" animate delay={900} />
          <StatCard icon={Cpu} label="EXPERIENCE" value={STATS.experience} sub="projects" color="neon-cyan" animate delay={1000} />
        </div>

        {/* System status panel */}
        <div
          className="cyber-card rounded-lg px-4 py-3 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
          style={{ animation: 'fadeUp 0.8s ease 0.5s both' }}
        >
          {[
            { icon: CheckCircle2, label: 'Secure Connection', ok: true },
            { icon: Shield, label: 'Monitoring Active', ok: true },
            { icon: Wifi, label: 'Signal Strength', ok: true },
            { icon: AlertCircle, label: 'Threat Level: NONE', ok: true },
          ].map(({ icon: Icon, label, ok }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={13} className={ok ? 'text-neon-green' : 'text-red-400'} />
              <span className={`text-[10px] font-mono ${ok ? 'text-gray-400' : 'text-red-400'}`}>{label}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/50 text-neon-green font-mono font-semibold px-6 py-3 rounded transition-all duration-300 hover:bg-neon-green/20 hover:border-neon-green hover:shadow-neon text-sm"
          >
            <Mail size={15} />
            <span className="text-neon-green/50">&gt;</span>
            Initialize_Contact
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 font-mono font-semibold px-6 py-3 rounded transition-all duration-300 hover:border-neon-cyan/50 hover:text-neon-cyan hover:bg-neon-cyan/5 text-sm"
          >
            <FolderKanban size={15} />
            View_Projects
          </a>
        </div>

        {/* Resume buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => resumeRef.current && viewResume(resumeRef.current)}
            disabled={generating}
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 border border-gray-800 hover:border-neon-green/50 hover:text-neon-green px-4 py-2 rounded transition-all duration-300 disabled:opacity-50"
          >
            <Eye size={13} />
            {generating ? 'Processing...' : 'View_Resume'}
          </button>
          <button
            onClick={() => resumeRef.current && downloadResume(resumeRef.current)}
            disabled={generating}
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold bg-neon-green/10 border border-neon-green/30 text-neon-green px-4 py-2 rounded transition-all duration-300 hover:bg-neon-green/20 hover:border-neon-green disabled:opacity-50"
          >
            {generating ? <RefreshCw size={13} className="animate-spin" /> : <Download size={13} />}
            {generating ? 'Generating...' : 'Download_Resume'}
          </button>
          <button
            onClick={() => setShowResumeGenerator(true)}
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 border border-gray-800 hover:border-neon-cyan/50 hover:text-neon-cyan px-4 py-2 rounded transition-all duration-300"
          >
            <FileText size={13} />
            Role_Resume
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-3">
          {[
            { href: PERSONAL.linkedin, icon: Linkedin, label: 'LinkedIn' },
            { href: PERSONAL.github, icon: Github, label: 'GitHub' },
            { href: `mailto:${PERSONAL.email}`, icon: Mail, label: 'Email' },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="group relative w-11 h-11 flex items-center justify-center border border-gray-800 text-gray-500 rounded transition-all duration-300 hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5 active:scale-95 touch-target"
            >
              <Icon size={18} />
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-neon-green/50 font-mono opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-700 hover:text-neon-green transition-colors group"
      >
        <div className="flex flex-col items-center gap-1">
          <span className="text-[9px] font-mono text-gray-700 group-hover:text-neon-green/50 transition-colors">
            scroll_down
          </span>
          <ArrowDown size={18} className="animate-bounce" />
        </div>
      </a>

      {/* Corner decorations */}
      <div className="absolute top-20 left-4 sm:left-6 font-mono text-[9px] text-gray-800 select-none pointer-events-none leading-4">
        <div className="text-neon-green/20">0x4E 0x52 0x4D</div>
        <div>v1.0.0 | SOC_DASH</div>
      </div>
      <div className="absolute top-20 right-4 sm:right-6 font-mono text-[9px] text-gray-800 select-none pointer-events-none leading-4 text-right">
        <div className="text-neon-green/20">[SECURED]</div>
        <div>{new Date().toISOString().split('T')[0]}</div>
      </div>

      {/* Hidden resume element */}
      <div style={{ position: 'absolute', left: '-9999px', top: '0', width: '210mm', overflow: 'hidden' }}>
        <Resume ref={resumeRef} />
      </div>

      {/* Resume Generator Modal */}
      <ResumeGeneratorModal isOpen={showResumeGenerator} onClose={() => setShowResumeGenerator(false)} />
    </section>
  );
}
