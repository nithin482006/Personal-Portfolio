import { X, Github, Calendar, Tag, CheckCircle, AlertTriangle, Lightbulb, Zap, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string | null;
}

const roleColors: Record<string, string> = {
  IoT: '#00ff88',
  Web: '#00fff2',
  Security: '#ff3366',
  AI: '#b14eff',
};

export default function ProjectDetailModal({ isOpen, onClose, projectId }: ProjectDetailModalProps) {
  if (!isOpen || !projectId) return null;

  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return null;

  const accentColor = roleColors[project.category] || '#00ff88';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-darker/95 backdrop-blur-md">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden bg-cyber-dark border border-cyber-border rounded-xl shadow-2xl">
        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-scan" />
        </div>

        {/* Header */}
        <div className="relative px-6 py-4 border-b border-cyber-border bg-cyber-surface">
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }} />
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase"
                  style={{ backgroundColor: `${accentColor}20`, color: accentColor, border: `1px solid ${accentColor}40` }}
                >
                  [{project.status}]
                </span>
                <span
                  className="px-2 py-0.5 rounded text-[10px] font-mono"
                  style={{ color: accentColor }}
                >
                  {project.type}
                </span>
              </div>
              <h2 className="text-xl font-display font-semibold text-white leading-snug">
                {project.title}
              </h2>
              <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                <Calendar className="w-3.5 h-3.5" />
                <span className="font-mono">{project.period}</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-border transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-6 space-y-6">
            {/* Overview */}
            <section>
              <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                <ArrowRight className="w-3.5 h-3.5" />
                Overview
              </h3>
              <p className="text-gray-300 leading-relaxed">{project.overview}</p>
            </section>

            {/* Problem & Solution */}
            <section>
              <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                <AlertTriangle className="w-3.5 h-3.5" />
                Problem
              </h3>
              <p className="text-gray-400 leading-relaxed">{project.problem}</p>
            </section>

            {/* Key Features */}
            <section>
              <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                <Zap className="w-3.5 h-3.5" />
                Key Features
              </h3>
              <div className="grid gap-2">
                {project.features?.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3" style={{ color: accentColor }}>
                <Tag className="w-3.5 h-3.5" />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded text-xs font-mono"
                    style={{ backgroundColor: `${accentColor}10`, border: `1px solid ${accentColor}30`, color: accentColor }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Challenges & Lessons */}
            <div className="grid md:grid-cols-2 gap-6">
              <section>
                <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3 text-neon-red">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Challenges
                </h3>
                <ul className="space-y-2">
                  {project.challenges?.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-neon-red mt-1">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-3 text-neon-cyan">
                  <Lightbulb className="w-3.5 h-3.5" />
                  Lessons Learned
                </h3>
                <ul className="space-y-2">
                  {project.lessons?.map((l, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-neon-cyan mt-1">•</span>
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Impact */}
            {project.impact && (
              <section className="p-4 rounded-lg bg-cyber-surface border border-cyber-border">
                <h3 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-2 text-neon-green">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Impact
                </h3>
                <p className="text-gray-300">{project.impact}</p>
              </section>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cyber-border bg-cyber-surface/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-border text-gray-300 hover:text-white hover:bg-cyber-border/80 transition-colors text-sm"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-gray-400 hover:text-white transition-colors text-sm font-mono"
            >
              [ Close ]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
