import { Mail, Linkedin, Github, MapPin, Phone } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const contactLinks = [
  {
    icon: Mail,
    label: 'EMAIL',
    value: 'nithinreddy482006@gmail.com',
    href: 'mailto:nithinreddy482006@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LINKEDIN',
    value: 'linkedin.com/in/nithin-reddy-m-151122305',
    href: 'https://linkedin.com/in/nithin-reddy-m-151122305',
  },
  {
    icon: Github,
    label: 'GITHUB',
    value: 'github.com/nithin482006',
    href: 'https://github.com/nithin482006',
  },
  {
    icon: Phone,
    label: 'PHONE',
    value: '+91 9632603139',
    href: 'tel:+919632603139',
  },
];

export default function Contact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" className="section-pad bg-cyber-dark relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-neon-green/5 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-neon-cyan/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center z-10">
        <div ref={ref} className="reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
              <span className="text-neon-green text-sm font-mono">06</span>
            </div>
            <p className="text-neon-green text-sm font-mono tracking-widest uppercase">Contact_</p>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            <span className="text-gray-500">&gt;</span>{' '}
            Establish Connection
            <span className="text-neon-green animate-blink">_</span>
          </h2>

          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-10 font-mono leading-relaxed">
            // Ready to collaborate on projects, internships, or new opportunities.
            <br />
            // All communication channels are open.
          </p>

          {/* Terminal window for contact */}
          <div className="terminal-window max-w-xl mx-auto mb-8">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-4 text-gray-500 text-xs font-mono">contact --init</span>
            </div>
            <div className="terminal-body py-4">
              <div className="text-left space-y-2">
                <div><span className="text-neon-cyan">$</span> <span className="text-gray-300">echo</span> <span className="text-neon-green">"Open for collaborations"</span></div>
                <div className="text-neon-green">Open for collaborations</div>
                <div><span className="text-neon-cyan">$</span> <span className="text-gray-300">cat</span> <span className="text-white">availability.txt</span></div>
                <div className="text-gray-400">Status: Available for internships & projects</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="cyber-card group flex items-center gap-4 rounded-lg p-4 text-left transition-all duration-300 hover:border-neon-green/40 hover:scale-[1.02] active:scale-[0.98] touch-target"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center transition-colors group-hover:bg-neon-green/20">
                  <Icon size={16} className="text-neon-green" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mb-0.5">{label}</p>
                  <p className="text-white text-xs font-mono truncate">{value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-gray-500 text-xs font-mono">
            <MapPin size={12} className="text-neon-green" />
            <span>LOCATION: </span>
            <span className="text-gray-300">Bangalore, Karnataka, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
