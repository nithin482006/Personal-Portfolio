import { useReveal } from '../hooks/useReveal';
import { Terminal, Cpu, Database, Code, GitBranch, Users } from 'lucide-react';

const skillGroups = [
  {
    category: 'programming',
    icon: Code,
    skills: ['Python', 'Java', 'JavaScript', 'PHP', 'SQL', 'C/C++'],
  },
  {
    category: 'web',
    icon: Terminal,
    skills: ['React.js', 'Node.js', 'HTML5', 'CSS3', 'Responsive Design', 'Accessibility'],
  },
  {
    category: 'database',
    icon: Database,
    skills: ['MySQL', 'Database Management', 'Git', 'Linux', 'Advanced Excel'],
  },
  {
    category: 'core',
    icon: Cpu,
    skills: ['Data Structures & Algorithms', 'Operating Systems', 'Network Security', 'Cryptography', 'Data Analytics'],
  },
  {
    category: 'methodology',
    icon: GitBranch,
    skills: ['Agile Development', 'Project Management', 'Technical Documentation'],
  },
  {
    category: 'soft',
    icon: Users,
    skills: ['Leadership', 'Problem Solving', 'Communication', 'Teamwork', 'Adaptability'],
  },
];

function SkillCard({ group, index }: { group: typeof skillGroups[0]; index: number }) {
  const ref = useReveal<HTMLDivElement>(0.1);
  const Icon = group.icon;

  return (
    <div
      ref={ref}
      className="reveal cyber-card rounded-lg p-5 transition-all duration-300 hover:border-neon-green/40 scan-effect"
      style={{ transitionDelay: `${(index % 3) * 0.1}s` }}
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
          <Icon size={12} className="text-neon-green" />
        </div>
        <h3 className="font-mono text-xs text-neon-green uppercase tracking-wider">
          {group.category}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map(skill => (
          <span
            key={skill}
            className="skill-badge"
          >
            <span className="text-neon-green/50 mr-1">&gt;</span>
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const headRef = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className="section-pad bg-cyber-dark relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
              <span className="text-neon-green text-sm font-mono">03</span>
            </div>
            <p className="text-neon-green text-sm font-mono tracking-widest uppercase">Skills_</p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            <span className="text-gray-500">&gt;</span>{' '}
            System Capabilities
            <span className="text-neon-green animate-blink">_</span>
          </h2>
          <div className="terminal-window max-w-lg mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-4 text-gray-500 text-xs font-mono">skills --list</span>
            </div>
            <div className="terminal-body py-3 text-center">
              <span className="text-neon-green">A broad toolkit built through coursework, projects & delivery.</span>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
