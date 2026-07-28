import { Briefcase, Cpu, Globe, FolderOpen } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const experiences = [
  {
    role: 'Project Lead — Smart Groundwater Level Tracking System',
    company: 'Presidency University, Bangalore',
    dates: 'Oct 2024 – Dec 2024',
    type: 'Academic Project',
    icon: Cpu,
    bullets: [
      'Designed an Arduino-based monitoring solution, integrated sensors, created schematics, implemented firmware, and led end-to-end project execution.',
      'Delivered a functional prototype enabling real-time groundwater monitoring and automated alerts for sustainable water management.',
    ],
  },
  {
    role: 'Front-End Web Developer — Bangalore Smiles Dental Care',
    company: 'Freelance / Academic Project',
    dates: 'Mar 2026',
    type: 'Freelance',
    icon: Globe,
    bullets: [
      'Developed a fully responsive website, optimised performance, improved accessibility standards, and coordinated stakeholder feedback throughout delivery.',
      'Successfully launched a mobile-friendly website that improved patient engagement and overall user experience.',
    ],
  },
];

function TimelineItem({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const ref = useReveal<HTMLDivElement>(0.1);
  const Icon = exp.icon;

  return (
    <div
      ref={ref}
      className="reveal timeline-item relative pl-10"
      style={{ transitionDelay: `${index * 0.15}s` }}
    >
      {/* Glowing dot */}
      <div className="timeline-dot">
        <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-20" />
      </div>

      <div className="cyber-card rounded-lg p-5 transition-all duration-300 hover:border-neon-green/40">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center flex-shrink-0">
              <Icon size={18} className="text-neon-green" />
            </div>
            <div>
              <h3 className="text-white font-mono text-sm leading-snug">{exp.role}</h3>
              <p className="text-neon-cyan font-mono text-xs mt-1">{exp.company}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
            <span className="text-[10px] text-gray-500 font-mono">{exp.dates}</span>
            <span className="text-[10px] bg-neon-green/10 border border-neon-green/30 text-neon-green px-2 py-0.5 rounded font-mono">
              [{exp.type}]
            </span>
          </div>
        </div>
        <ul className="space-y-2">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-gray-400 text-sm leading-relaxed">
              <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-green" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="experience" className="section-pad bg-cyber-darker relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
              <span className="text-neon-green text-sm font-mono">02</span>
            </div>
            <p className="text-neon-green text-sm font-mono tracking-widest uppercase">Experience_</p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            <span className="text-gray-500">&gt;</span>{' '}
            Operation History
            <span className="text-neon-green animate-blink">_</span>
          </h2>
        </div>

        <div className="relative flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.role} exp={exp} index={i} />
          ))}

          {/* Placeholder */}
          <div className="reveal timeline-item relative pl-10" style={{ transitionDelay: '0.3s' }}>
            <div className="timeline-dot inactive" />
            <div className="cyber-card rounded-lg p-6 text-center border-dashed border-gray-700">
              <Briefcase size={20} className="text-gray-600 mx-auto mb-2" />
              <p className="text-gray-600 text-sm font-mono">
                [ Add internship or work experience here ]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
