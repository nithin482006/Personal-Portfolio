import { Shield, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { href: 'https://github.com/nithin482006', icon: Github, label: 'GitHub' },
  { href: 'https://linkedin.com/in/nithin-reddy-m-151122305', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:nithinreddy482006@gmail.com', icon: Mail, label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-cyber-darker border-t border-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
            <Shield size={12} className="text-neon-green" />
          </div>
          <p className="text-gray-500 text-sm font-mono">
            <span className="text-neon-green/50">&copy;</span> {new Date().getFullYear()} <span className="text-gray-300">Nithin Reddy M</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="w-11 h-11 flex items-center justify-center border border-gray-800 rounded text-gray-500 hover:border-neon-green/50 hover:text-neon-green hover:bg-neon-green/5 transition-colors active:scale-95 touch-target"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-gray-600 text-[10px] font-mono">
          <span className="text-neon-green/50">&gt;</span> Built with React <span className="text-neon-cyan">|</span> Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
