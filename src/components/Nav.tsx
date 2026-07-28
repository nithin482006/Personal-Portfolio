import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cyber-dark/90 backdrop-blur-lg border-b border-neon-green/20 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 font-display font-bold text-lg tracking-wider transition-colors"
        >
          <div className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${
            scrolled ? 'border-neon-green/50 bg-neon-green/10' : 'border-white/20 bg-white/5'
          }`}>
            <Shield size={16} className={`transition-colors ${scrolled ? 'text-neon-green' : 'text-white'}`} />
          </div>
          <span className={`${scrolled ? 'text-white' : 'text-white'}`}>
            NRM<span className="text-neon-green">_</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`relative px-4 py-2 text-sm font-mono tracking-wide transition-colors hover:text-neon-green ${
                  scrolled ? 'text-gray-400' : 'text-gray-300'
                }`}
              >
                <span className="opacity-50 mr-1">&gt;</span>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
          className={`md:hidden p-2 rounded border transition-colors ${
            scrolled
              ? 'border-neon-green/30 text-neon-green hover:bg-neon-green/10'
              : 'border-white/20 text-white hover:bg-white/10'
          }`}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-out bg-cyber-dark/98 backdrop-blur-lg border-t border-neon-green/20 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={close}
                className="flex items-center px-4 py-3 font-mono text-gray-300 hover:text-neon-green hover:bg-neon-green/5 rounded transition-colors active:scale-[0.98] touch-target"
              >
                <span className="text-neon-green/50 mr-2">&gt;</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
