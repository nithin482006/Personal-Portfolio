import { MapPin, Cpu, Users, Shield, Zap, Target } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const highlights = [
  { icon: Cpu, label: 'Full-Stack Dev', sub: 'React · Node · Python' },
  { icon: Shield, label: 'Security Focus', sub: 'Cyber · Networks' },
  { icon: Users, label: 'Team Leader', sub: 'Agile · Mentoring' },
];

const stats = [
  { num: '2+', label: 'Projects Deployed', icon: Target },
  { num: '5+', label: 'Languages', icon: Zap },
  { num: '6+', label: 'Tech Stacks', icon: Cpu },
  { num: '2028', label: 'Graduation', icon: Shield },
];

export default function About() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="about" className="section-pad bg-cyber-darker relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={ref} className="reveal grid lg:grid-cols-5 gap-12 items-start">
          {/* Left column - Text */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
                <span className="text-neon-green text-sm font-mono">01</span>
              </div>
              <p className="text-neon-green text-sm font-mono tracking-widest uppercase">About_Me</p>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6 leading-tight">
              <span className="text-gray-500">&gt;</span>{' '}
              System Profile
              <span className="text-neon-green animate-blink">_</span>
            </h2>

            <div className="space-y-4 text-gray-400 text-base leading-[1.75] font-light">
              <p>
                I'm a multidisciplinary <span className="text-neon-green">Computer Science student</span> at
                Presidency University, Bangalore, with hands-on experience spanning embedded systems,
                web development, and software engineering.
              </p>
              <p>
                Skilled in <span className="text-neon-cyan">React.js, Node.js, Python, Java, and SQL</span>,
                backed by a strong foundation in data structures and algorithms. I've led end-to-end
                projects — from designing Arduino-based IoT solutions to building and deploying
                production-ready web applications.
              </p>
              <p>
                Outside of coding, I enjoy reading books and articles, and I'm always looking to expand
                my knowledge in emerging technologies like <span className="text-neon-green">cybersecurity</span> and
                data analytics.
              </p>
            </div>

            {/* Location */}
            <div className="mt-8 flex items-center gap-2 text-gray-500 text-sm font-mono">
              <MapPin size={14} className="text-neon-green" />
              <span>LOCATION: </span>
              <span className="text-white">Bangalore, Karnataka, India</span>
            </div>
          </div>

          {/* Right column - Cards */}
          <div className="lg:col-span-2 space-y-4">
            {/* Highlight cards */}
            <div className="space-y-3">
              {highlights.map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="cyber-card rounded-lg p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] scan-effect"
                >
                  <div className="w-10 h-10 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={18} className="text-neon-green" />
                  </div>
                  <div>
                    <p className="text-white font-mono text-sm">{label}</p>
                    <p className="text-gray-500 text-xs font-mono mt-0.5">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {stats.map(({ num, label, icon: Icon }) => (
                <div
                  key={label}
                  className="cyber-card rounded-lg p-4 text-center hover:border-neon-green/40 transition-all duration-300"
                >
                  <Icon size={16} className="text-neon-green/50 mx-auto mb-2" />
                  <p className="font-display font-bold text-2xl text-neon-green">{num}</p>
                  <p className="text-gray-500 text-xs font-mono mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
