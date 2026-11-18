import { useState, useEffect, useCallback } from 'react';
import { ExternalLink, Github, Cpu, Globe, Plus, Pencil, Trash2, X, Loader2, Code2, Star, GitFork, RefreshCw, FileText, Shield, type LucideIcon } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useAuth } from '../context/AuthContext';
import { supabase, type Project, type GitHubRepo } from '../lib/supabase';
import ProjectDetailModal from './ProjectDetailModal';

// ── Static (hardcoded) projects ──────────────────────────────────────────────

const staticProjects = [
  {
    title: 'Smart Groundwater Level Tracking System',
    description:
      'An Arduino-based IoT solution that monitors groundwater levels in real time using integrated sensors. Includes automated alerts, sensor calibration, firmware implementation, and full technical documentation.',
    tags: ['Arduino', 'C/C++', 'Embedded Systems', 'IoT', 'Sensors'],
    icon: Cpu,
    period: 'Oct 2024 – Dec 2024',
    github: 'https://github.com/nithin482006',
    live: null,
    impact: 'Delivered functional prototype for real-time water management',
    status: 'DEPLOYED',
  },
  {
    title: 'Bangalore Smiles Dental Care Website',
    description:
      'A fully responsive, production-deployed website for a dental care clinic. Built with a focus on performance optimisation, accessibility, and mobile-first design with iterative stakeholder feedback.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Accessibility'],
    icon: Globe,
    period: 'Mar 2026',
    github: 'https://github.com/nithin482006',
    live: null,
    impact: 'Improved patient engagement and mobile user experience',
    status: 'LIVE',
  },
];

const ACCENT_OPTIONS = [
  { label: 'Green', value: 'neon-green' },
  { label: 'Cyan', value: 'neon-cyan' },
  { label: 'Blue', value: 'neon-blue' },
];

const EMPTY_FORM = { title: '', description: '', period: '', tags: '', impact: '', github_url: '', live_url: '', accent: ACCENT_OPTIONS[0].value };

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

// ── Case File Card Component ───────────────────────────────────────────────

function CaseFileCard({
  title,
  description,
  tags,
  period,
  github,
  live,
  impact,
  status,
  icon: Icon,
  children,
  onEdit,
  onDelete,
  isAdmin,
  onClick,
}: {
  title: string;
  description: string;
  tags: string[];
  period: string;
  github?: string | null;
  live?: string | null;
  impact: string;
  status?: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
  isAdmin?: boolean;
  onClick?: () => void;
}) {
  const ref = useReveal<HTMLDivElement>(0.1);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`reveal case-file rounded-lg overflow-hidden transition-all duration-300 hover:border-neon-green/40 scan-effect ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Case file header */}
      <div className="case-file-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={12} className="text-neon-green" />
          <span>CASE FILE</span>
        </div>
        {status && (
          <span className="text-[10px] bg-neon-green/20 text-neon-green border border-neon-green/30 px-2 py-0.5 rounded">
            [{status}]
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center flex-shrink-0">
            <Icon size={18} className="text-neon-green" />
          </div>
          <div className="flex gap-2 items-center">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-neon-green transition-colors">
                <Github size={16} />
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-neon-cyan transition-colors">
                <ExternalLink size={16} />
              </a>
            )}
            {isAdmin && onEdit && (
              <button onClick={onEdit} className="text-gray-600 hover:text-white transition-colors ml-1">
                <Pencil size={14} />
              </button>
            )}
            {isAdmin && onDelete && (
              <button onClick={onDelete} className="text-gray-600 hover:text-neon-red transition-colors">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        </div>

        <h3 className="font-mono font-semibold text-sm text-white leading-snug mb-1">{title}</h3>
        <p className="text-[10px] text-gray-500 font-mono mb-3">{period}</p>
        <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{description}</p>

        {impact && (
          <div className="mb-4 p-2 bg-cyber-surface rounded border border-gray-800">
            <p className="text-[10px] text-neon-cyan font-mono flex items-center gap-1.5">
              <Shield size={10} className="text-neon-green" />
              {impact}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5">
          {tags.map(t => (
            <span key={t} className="skill-badge text-[10px]">
              {t}
            </span>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}

function StaticCard({ p, onClick }: { p: typeof staticProjects[0]; onClick?: () => void }) {
  return (
    <CaseFileCard
      title={p.title}
      description={p.description}
      tags={p.tags}
      period={p.period}
      github={p.github}
      live={p.live}
      impact={p.impact}
      status={p.status}
      icon={p.icon}
      onClick={onClick}
    />
  );
}

function DynamicCard({ p, isAdmin, onEdit, onDelete }: { p: Project; isAdmin: boolean; onEdit: (p: Project) => void; onDelete: (id: string) => void }) {
  return (
    <CaseFileCard
      title={p.title}
      description={p.description}
      tags={p.tags}
      period={p.period}
      github={p.github_url}
      live={p.live_url}
      impact={p.impact || ''}
      status="ACTIVE"
      icon={Globe}
      isAdmin={isAdmin}
      onEdit={() => onEdit(p)}
      onDelete={() => onDelete(p.id)}
    />
  );
}

// ── GitHub Card ─────────────────────────────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3776ab',
  Java: '#ed8b00',
  HTML: '#e34f26',
  CSS: '#1572b6',
  PHP: '#777bb3',
  'C++': '#00599c',
  C: '#a8b9cc',
  Go: '#00add8',
  Rust: '#dea584',
  Ruby: '#cc342d',
  Shell: '#89e051',
};

function timeAgo(iso: string | null): string {
  if (!iso) return 'Unknown';
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(months / 12);
  return `${years}y ago`;
}

function GitHubCard({ repo, index }: { repo: GitHubRepo; index: number }) {
  const ref = useReveal<HTMLDivElement>(0.08);
  const displayLangs = Object.keys(repo.languages).slice(0, 2).length
    ? Object.keys(repo.languages).slice(0, 2)
    : repo.language
    ? [repo.language]
    : [];

  return (
    <div
      ref={ref}
      className="reveal case-file rounded-lg overflow-hidden transition-all duration-300 hover:border-neon-cyan/40"
      style={{ transitionDelay: `${(index % 6) * 0.05}s` }}
    >
      <div className="case-file-header flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 size={12} className="text-neon-cyan" />
          <span className="text-neon-cyan/80">REPO</span>
        </div>
        <div className="flex items-center gap-2">
          {repo.fork && (
            <span className="text-[10px] bg-gray-800 text-gray-400 border border-gray-700 px-1.5 py-0.5 rounded font-mono">
              FORK
            </span>
          )}
          <span className="text-[10px] text-gray-500 font-mono">{timeAgo(repo.pushed_at)}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-mono font-semibold text-sm text-white leading-snug">{repo.name}</h3>
          <div className="flex gap-2">
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-neon-green transition-colors">
                <ExternalLink size={14} />
              </a>
            )}
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Github size={14} />
            </a>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">{repo.description || 'No description'}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {repo.topics.slice(0, 3).map(t => (
            <span key={t} className="skill-badge text-[10px] bg-neon-cyan/5 border-neon-cyan/20 text-neon-cyan">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <div className="flex items-center gap-3">
            {displayLangs[0] && (
              <span className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: LANG_COLORS[displayLangs[0]] ?? '#64748b' }} />
                {displayLangs[0]}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[10px] text-gray-500">
            {repo.stars > 0 && (
              <span className="flex items-center gap-1 font-mono"><Star size={10} className="text-neon-yellow" />{repo.stars}</span>
            )}
            {repo.forks > 0 && (
              <span className="flex items-center gap-1 font-mono"><GitFork size={10} />{repo.forks}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Project modal form ────────────────────────────────────────────────────────

type FormState = typeof EMPTY_FORM;

function ProjectModal({ initial, onClose, onSaved }: {
  initial: (Project & { _isEdit?: boolean }) | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormState>(
    initial
      ? { title: initial.title, description: initial.description, period: initial.period, tags: initial.tags.join(', '), impact: initial.impact, github_url: initial.github_url ?? '', live_url: initial.live_url ?? '', accent: initial.accent }
      : { ...EMPTY_FORM }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof FormState, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSaving(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      period: form.period.trim(),
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      impact: form.impact.trim(),
      github_url: form.github_url.trim() || null,
      live_url: form.live_url.trim() || null,
      accent: form.accent,
    };

    const query = initial?._isEdit
      ? supabase.from('projects').update(payload).eq('id', initial.id)
      : supabase.from('projects').insert(payload);

    const { error: err } = await query;
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cyber-card border border-neon-green/20 rounded-lg shadow-2xl w-full max-w-lg my-4 z-10">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-neon-green" />
            <h2 className="font-mono font-semibold text-white">{initial?._isEdit ? 'Edit_Case' : 'New_Case'}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {error && <div className="bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm rounded px-4 py-3 font-mono">{error}</div>}
          {(['title', 'period', 'impact'] as const).map(k => (
            <div key={k}>
              <label className="block text-[10px] text-neon-green font-mono uppercase tracking-wider mb-1.5">{k.replace('_', ' ')}{k === 'title' && ' *'}</label>
              <input required={k === 'title'} value={form[k]} onChange={e => set(k, e.target.value)}
                className="w-full bg-cyber-surface border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green/50 transition font-mono" />
            </div>
          ))}
          <div>
            <label className="block text-[10px] text-neon-green font-mono uppercase tracking-wider mb-1.5">Description</label>
            <textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)}
              className="w-full bg-cyber-surface border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green/50 resize-none transition font-mono" />
          </div>
          <div>
            <label className="block text-[10px] text-neon-green font-mono uppercase tracking-wider mb-1.5">Tags <span className="text-gray-500 normal-case">(comma-separated)</span></label>
            <input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="React, Node.js, Python"
              className="w-full bg-cyber-surface border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green/50 transition font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {(['github_url', 'live_url'] as const).map(k => (
              <div key={k}>
                <label className="block text-[10px] text-neon-green font-mono uppercase tracking-wider mb-1.5">{k === 'github_url' ? 'GitHub' : 'Live URL'}</label>
                <input value={form[k]} onChange={e => set(k, e.target.value)}
                  className="w-full bg-cyber-surface border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green/50 transition font-mono" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-700 text-gray-400 font-mono py-2.5 rounded hover:bg-gray-800 transition-colors text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-neon-green/20 border border-neon-green/30 text-neon-green font-mono py-2.5 rounded transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? 'Processing...' : initial?._isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Projects() {
  const headRef = useReveal<HTMLDivElement>();
  const { isAdmin } = useAuth();
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const [modalTarget, setModalTarget] = useState<(Project & { _isEdit?: boolean }) | null | 'new'>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [showForks, setShowForks] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('sort_order').order('created_at');
    if (data) setDbProjects(data as Project[]);
  };

  const fetchGithubRepos = async () => {
    const { data } = await supabase.from('github_repos').select('*').eq('archived', false).order('pushed_at', { ascending: false });
    return data as GitHubRepo[] | null;
  };

  const triggerSync = useCallback(async (force = false) => {
    setSyncing(true);
    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-github${force ? '?force=true' : ''}`;
      await fetch(url, {
        method: 'POST',
        headers: { Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}` },
      });
      const data = await fetchGithubRepos();
      if (data) setGithubRepos(data);
    } catch { /* ignore */ }
    finally { setSyncing(false); }
  }, []);

  useEffect(() => {
    fetchProjects();
    (async () => {
      const data = await fetchGithubRepos();
      if (data) {
        setGithubRepos(data);
        const newest = data.reduce((a, b) => (new Date(a.last_synced) > new Date(b.last_synced) ? a : b));
        if (Date.now() - new Date(newest.last_synced).getTime() > SEVEN_DAYS_MS) triggerSync();
      } else {
        triggerSync();
      }
    })();
  }, [triggerSync]);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    setDeleting(id);
    await supabase.from('projects').delete().eq('id', id);
    await fetchProjects();
    setDeleting(null);
  };

  const displayedRepos = showForks ? githubRepos : githubRepos.filter(r => !r.fork);

  return (
    <section id="projects" className="section-pad bg-cyber-dark relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={headRef} className="reveal text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
              <span className="text-neon-green text-sm font-mono">04</span>
            </div>
            <p className="text-neon-green text-sm font-mono tracking-widest uppercase">Projects_</p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
            <span className="text-gray-500">&gt;</span>{' '}
            Case Files
            <span className="text-neon-green animate-blink">_</span>
          </h2>
          <div className="terminal-window max-w-xl mx-auto">
            <div className="terminal-header">
              <div className="terminal-dot bg-red-500" />
              <div className="terminal-dot bg-yellow-500" />
              <div className="terminal-dot bg-green-500" />
              <span className="ml-4 text-gray-500 text-xs font-mono">projects --list</span>
            </div>
            <div className="terminal-body py-3 text-center text-neon-green text-sm">
              IoT prototypes to production apps + GitHub repos
            </div>
          </div>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-gray-400 text-xs font-mono cursor-pointer select-none">
              <input type="checkbox" checked={showForks} onChange={e => setShowForks(e.target.checked)} className="rounded border-gray-700 bg-cyber-surface text-neon-green focus:ring-neon-green/50" />
              --include-forks
            </label>
            {syncing && <span className="text-[10px] text-neon-green flex items-center gap-1.5 font-mono"><RefreshCw size={12} className="animate-spin" /> Syncing...</span>}
          </div>
          <div className="flex items-center gap-3">
            {isAdmin && (
              <button onClick={() => triggerSync(true)} disabled={syncing} title="Force re-sync from GitHub"
                className="inline-flex items-center gap-2 text-[10px] font-mono border border-gray-700 text-gray-400 px-3 py-2 rounded hover:border-neon-green/50 hover:text-neon-green transition-colors disabled:opacity-50">
                <RefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
                Sync
              </button>
            )}
            {isAdmin && (
              <button onClick={() => setModalTarget('new')} className="inline-flex items-center gap-2 bg-neon-green/10 border border-neon-green/30 text-neon-green font-mono px-4 py-2 rounded transition-all text-xs">
                <Plus size={14} />
                New_Case
              </button>
            )}
          </div>
        </div>

        {/* Unified Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {staticProjects.map((p, i) => {
            const projectId = i === 0 ? 'groundwater' : 'dental';
            return (
              <StaticCard
                key={p.title}
                p={p}
                onClick={() => setSelectedProjectId(projectId)}
              />
            );
          })}
          {dbProjects.map(p => (
            <DynamicCard key={p.id} p={p} isAdmin={isAdmin}
              onEdit={p => setModalTarget({ ...p, _isEdit: true })}
              onDelete={deleting === p.id ? () => {} : handleDelete}
            />
          ))}
          {displayedRepos.map((r, i) => <GitHubCard key={r.id} repo={r} index={i + staticProjects.length + dbProjects.length} />)}
        </div>
      </div>

      {modalTarget && (
        <ProjectModal
          initial={modalTarget === 'new' ? null : modalTarget}
          onClose={() => setModalTarget(null)}
          onSaved={fetchProjects}
        />
      )}

      {/* Project Detail Modal */}
      <ProjectDetailModal
        isOpen={!!selectedProjectId}
        onClose={() => setSelectedProjectId(null)}
        projectId={selectedProjectId}
      />
    </section>
  );
}
