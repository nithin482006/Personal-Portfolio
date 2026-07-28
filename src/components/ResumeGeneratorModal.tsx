import { useState, useRef, useEffect } from 'react';
import { X, Download, Eye, Code, Shield, Cpu, Layers, CheckCircle, Github } from 'lucide-react';
import { useResume } from '../hooks/useResume';
import { supabase } from '../lib/supabase';
import { PERSONAL, SKILLS, EXPERIENCE, EDUCATION, COURSES, PROJECTS, RESUME_ROLES, type ResumeRole } from '../data/portfolio';

interface ResumeProject {
  title: string;
  description: string;
  tech: string[];
  period: string;
  github_url: string | null;
  live_url: string | null;
  impact: string;
  source: 'static' | 'github';
}

interface ResumeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const roleIcons: Record<ResumeRole, React.ReactNode> = {
  'Software Engineer': <Code className="w-5 h-5" />,
  'Cybersecurity': <Shield className="w-5 h-5" />,
  'Full Stack Developer': <Layers className="w-5 h-5" />,
  'AI / ML Engineer': <Cpu className="w-5 h-5" />,
};

export default function ResumeGeneratorModal({ isOpen, onClose }: ResumeGeneratorModalProps) {
  const [selectedRole, setSelectedRole] = useState<ResumeRole>('Software Engineer');
  const [generating, setGenerating] = useState(false);
  const [githubProjects, setGithubProjects] = useState<ResumeProject[]>([]);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { downloadResume } = useResume();

  const roleConfig = RESUME_ROLES[selectedRole];

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    (async () => {
      const { data } = await supabase
        .from('projects')
        .select('title, description, tags, period, github_url, live_url, impact, source')
        .eq('source', 'github')
        .order('sort_order');
      if (active && data) {
        setGithubProjects(data as ResumeProject[]);
      }
    })();
    return () => { active = false; };
  }, [isOpen]);

  const handleDownload = async () => {
    if (!resumeRef.current) return;
    setGenerating(true);
    const filename = `Nithin_Reddy_M_Resume_${selectedRole.replace(/[/\s]+/g, '_')}.pdf`;
    await downloadResume(resumeRef.current, filename);
    setGenerating(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyber-darker/90 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-cyber-dark border border-cyber-border rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyber-border bg-cyber-surface">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/30 flex items-center justify-center text-neon-green">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-white">Resume Generator</h2>
              <p className="text-xs text-gray-400">Select role to generate tailored resume</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-cyber-border transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)]">
          {/* Role Selector */}
          <div className="w-full lg:w-72 p-4 border-b lg:border-b-0 lg:border-r border-cyber-border bg-cyber-card/50">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neon-green mb-4">Select Role</h3>
            <div className="space-y-2">
              {(Object.keys(RESUME_ROLES) as ResumeRole[]).map((role) => {
                const config = RESUME_ROLES[role];
                const isSelected = selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-neon-green/10 border-neon-green/50 text-white'
                        : 'bg-cyber-surface/50 border-cyber-border text-gray-400 hover:border-neon-green/30 hover:text-white'
                    }`}
                  >
                    <span style={{ color: config.color }}>{roleIcons[role]}</span>
                    <span className="text-sm font-medium">{role}</span>
                    {isSelected && <CheckCircle className="w-4 h-4 ml-auto text-neon-green" />}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 p-3 rounded-lg bg-cyber-surface border border-cyber-border">
              <p className="text-xs text-gray-400 mb-2">ATS-optimized format</p>
              <div className="flex items-center gap-2 text-xs text-neon-green">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Recruiter friendly</span>
              </div>
            </div>
          </div>

          {/* Preview & Download */}
          <div className="flex-1 flex flex-col">
            {/* Actions */}
            <div className="flex items-center justify-between p-4 border-b border-cyber-border bg-cyber-surface/30">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Role:</span>
                <span className="text-sm font-medium text-white">{selectedRole}</span>
                <span
                  className="px-2 py-0.5 rounded text-xs font-mono"
                  style={{ backgroundColor: `${roleConfig.color}20`, color: roleConfig.color }}
                >
                  {roleConfig.title}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  disabled={generating}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neon-green text-cyber-dark font-medium text-sm hover:bg-neon-green/90 transition-colors disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {generating ? 'Generating...' : 'Download PDF'}
                </button>
              </div>
            </div>

            {/* Resume Preview */}
            <div className="flex-1 overflow-auto p-4 bg-cyber-darker/50">
              <div className="flex justify-center">
                <div ref={resumeRef} className="bg-white text-slate-900 font-sans shadow-xl" style={{ width: '210mm', minHeight: '297mm', padding: '12mm 14mm', fontSize: '10pt', lineHeight: '1.35', boxSizing: 'border-box' }}>
                  {/* Header */}
                  <header style={{ textAlign: 'center', marginBottom: '6mm', borderBottom: '2px solid #0a0a0f', paddingBottom: '5mm' }}>
                    <h1 style={{ fontSize: '18pt', fontWeight: 700, color: '#0a0a0f', marginBottom: '1mm', letterSpacing: '0.5pt' }}>
                      {PERSONAL.name}
                    </h1>
                    <p style={{ fontSize: '10.5pt', color: roleConfig.color, fontWeight: 600, marginBottom: '3mm' }}>
                      {roleConfig.title}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4mm', fontSize: '8.5pt', color: '#475569' }}>
                      <span>{PERSONAL.email}</span>
                      <span>{PERSONAL.phone}</span>
                      <span>{PERSONAL.location}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '5mm', fontSize: '8.5pt', color: '#475569', marginTop: '2mm' }}>
                      <span>{PERSONAL.linkedinHandle}</span>
                      <span>{PERSONAL.githubHandle}</span>
                    </div>
                  </header>

                  {/* Summary */}
                  <section style={{ marginBottom: '5mm' }}>
                    <SectionTitle color={roleConfig.color}>PROFESSIONAL SUMMARY</SectionTitle>
                    <p style={{ textAlign: 'justify', color: '#334155' }}>
                      {PERSONAL.summary.replace('software engineering', roleConfig.summaryFocus)}
                    </p>
                  </section>

                  {/* Education */}
                  <section style={{ marginBottom: '5mm' }}>
                    <SectionTitle color={roleConfig.color}>EDUCATION</SectionTitle>
                    {EDUCATION.map((edu, i) => (
                      <div key={i} style={{ marginBottom: '3mm' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <strong style={{ color: '#0a0a0f', fontSize: '10pt' }}>{edu.degree}</strong>
                          <span style={{ fontSize: '8.5pt', color: '#64748b' }}>{edu.dates}</span>
                        </div>
                        <p style={{ color: roleConfig.color, fontSize: '9pt' }}>{edu.institution}</p>
                        {edu.details && <p style={{ color: '#64748b', fontSize: '8.5pt', fontStyle: 'italic' }}>{edu.details}</p>}
                      </div>
                    ))}
                  </section>

                  {/* Highlighted Projects */}
                  <section style={{ marginBottom: '5mm' }}>
                    <SectionTitle color={roleConfig.color}>PROJECT EXPERIENCE</SectionTitle>
                    {PROJECTS.filter(p => roleConfig.highlightProjects.includes(p.id)).map((project, i) => (
                      <div key={i} style={{ marginBottom: '4mm' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <strong style={{ color: '#0a0a0f', fontSize: '10pt' }}>{project.title}</strong>
                          <span style={{ fontSize: '8.5pt', color: '#64748b' }}>{project.period}</span>
                        </div>
                        <p style={{ color: roleConfig.color, fontSize: '9pt' }}>
                          {project.type}
                          <span style={{ display: 'inline-block', marginLeft: '2mm', fontSize: '8pt', color: '#64748b', border: `0.5px solid ${roleConfig.color}`, padding: '0 2mm', borderRadius: '2pt' }}>
                            {project.status}
                          </span>
                        </p>
                        <p style={{ color: '#334155', fontSize: '9pt', margin: '1.5mm 0' }}>{project.description}</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2mm', marginTop: '1.5mm' }}>
                          {project.tech.slice(0, 6).map((t, j) => (
                            <span key={j} style={{ fontSize: '8pt', color: '#64748b', backgroundColor: '#f1f5f9', padding: '0 2mm', borderRadius: '2pt' }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* GitHub-synced projects */}
                    {githubProjects.length > 0 && (
                      <>
                        <div style={{ height: '2mm' }} />
                        {githubProjects.map((project, i) => (
                          <div key={`gh-${i}`} style={{ marginBottom: '4mm' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5mm' }}>
                                <Github size={9} color="#64748b" />
                                <strong style={{ color: '#0a0a0f', fontSize: '10pt' }}>{project.title}</strong>
                              </div>
                              <span style={{ fontSize: '8.5pt', color: '#64748b' }}>{project.period}</span>
                            </div>
                            <p style={{ color: roleConfig.color, fontSize: '9pt' }}>GitHub Repository</p>
                            <p style={{ color: '#334155', fontSize: '9pt', margin: '1.5mm 0' }}>{project.description}</p>
                            {project.impact && (
                              <p style={{ color: '#475569', fontSize: '8.5pt', fontStyle: 'italic', margin: '1mm 0' }}>{project.impact}</p>
                            )}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2mm', marginTop: '1.5mm' }}>
                              {project.tech.slice(0, 6).map((t, j) => (
                                <span key={j} style={{ fontSize: '8pt', color: '#64748b', backgroundColor: '#f1f5f9', padding: '0 2mm', borderRadius: '2pt' }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </section>

                  {/* Skills */}
                  <section style={{ marginBottom: '5mm' }}>
                    <SectionTitle color={roleConfig.color}>TECHNICAL SKILLS</SectionTitle>
                    {(['Programming Languages', 'Web Development', 'Databases & Tools', 'Core CS', 'Methodologies'] as const).map((category) => {
                      const skills = SKILLS[category];
                      const isHighlighted = skills.some(s => roleConfig.highlightSkills.includes(s));
                      return (
                        <div key={category} style={{ marginBottom: '1.5mm' }}>
                          <span style={{ fontWeight: 600, color: '#0a0a0f' }}>{category}:</span>
                          <span style={{ color: isHighlighted ? roleConfig.color : '#334155' }}> {skills.join(' • ')}</span>
                        </div>
                      );
                    })}
                  </section>

                  {/* Courses */}
                  <section style={{ marginBottom: '3mm' }}>
                    <SectionTitle color={roleConfig.color}>COURSES & TRAINING</SectionTitle>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2mm' }}>
                      {COURSES.map((c, i) => (
                        <div key={i}>
                          <span style={{ fontWeight: 500, color: '#0a0a0f' }}>{c.name}</span>
                          <span style={{ color: '#64748b', fontSize: '8.5pt' }}> — {c.org}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 style={{ fontSize: '10.5pt', fontWeight: 700, color: '#0a0a0f', textTransform: 'uppercase', letterSpacing: '1pt', borderBottom: `1px solid ${color}`, paddingBottom: '1mm', marginBottom: '3mm', marginTop: '1mm' }}>
      {children}
    </h2>
  );
}
