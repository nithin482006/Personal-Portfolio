import { useState, useEffect } from 'react';
import { GraduationCap, BookOpen, Plus, Trash2, X, Loader2, Pencil, Award } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { useAuth } from '../context/AuthContext';
import { supabase, type Certificate } from '../lib/supabase';

const education = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Presidency University, Rajanukunte, Bangalore',
    dates: 'Aug 2024 – Expected 2028',
    detail: 'Relevant Coursework: Data Structures, Operating Systems, Cryptography, Network Security',
    current: true,
  },
  {
    degree: 'PUC (Pre-University Course)',
    institution: 'SDC PU College, Bangarpet',
    dates: 'Aug 2022 – May 2024',
    detail: null,
    current: false,
  },
  {
    degree: 'Secondary Education (10th Standard)',
    institution: "St. Joseph's Convent High School, KGF, Kolar",
    dates: 'Aug 2020 – Apr 2022',
    detail: null,
    current: false,
  },
];

const staticCourses = [
  { name: 'Aptitude Training', org: 'Presidency University', period: 'Aug 2025 – Dec 2025' },
  { name: 'Enhancing Personality Through Soft Skills', org: 'Presidency University', period: 'Jan 2025 – May 2025' },
  { name: 'Introduction to Soft Skills', org: 'Presidency University', period: 'Aug 2024' },
];

// ── Education timeline item ────────────────────────────────────────────────

type EduItem = typeof education[0];

function EduCard({ ed, index }: { ed: EduItem; index: number }) {
  const ref = useReveal<HTMLDivElement>(0.1);
  return (
    <div ref={ref} className="reveal timeline-item relative pl-10" style={{ transitionDelay: `${index * 0.1}s` }}>
      <div className={`timeline-dot ${ed.current ? '' : 'inactive'}`}>
        {ed.current && <div className="absolute inset-0 rounded-full bg-neon-green animate-ping opacity-30" />}
      </div>
      <div className="cyber-card rounded-lg p-5 transition-all duration-300 hover:border-neon-green/40">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={14} className={ed.current ? 'text-neon-green' : 'text-gray-500'} />
              <h3 className="font-mono font-semibold text-sm text-white">{ed.degree}</h3>
              {ed.current && (
                <span className="text-[10px] bg-neon-green/20 border border-neon-green/30 text-neon-green px-2 py-0.5 rounded font-mono">
                  [ACTIVE]
                </span>
              )}
            </div>
            <p className="text-neon-cyan text-xs font-mono">{ed.institution}</p>
            {ed.detail && (
              <p className="text-gray-500 text-[11px] mt-2 leading-relaxed font-mono">{ed.detail}</p>
            )}
          </div>
          <span className="text-[10px] text-gray-500 font-mono whitespace-nowrap">{ed.dates}</span>
        </div>
      </div>
    </div>
  );
}

// ── Certificate modal ─────────────────────────────────────────────────────────

type CertForm = { name: string; org: string; period: string };
const EMPTY: CertForm = { name: '', org: '', period: '' };

function CertModal({ initial, onClose, onSaved }: {
  initial: Certificate | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<CertForm>(
    initial ? { name: initial.name, org: initial.org, period: initial.period } : { ...EMPTY }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof CertForm, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);

    const payload = { name: form.name.trim(), org: form.org.trim(), period: form.period.trim() };
    const query = initial
      ? supabase.from('certificates').update(payload).eq('id', initial.id)
      : supabase.from('certificates').insert(payload);

    const { error: err } = await query;
    setSaving(false);
    if (err) { setError(err.message); return; }
    onSaved();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-cyber-dark/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-cyber-card border border-neon-green/20 rounded-lg shadow-2xl w-full max-w-md z-10">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-neon-green" />
            <h2 className="font-mono font-semibold text-white">{initial ? 'Edit_Cert' : 'New_Cert'}</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {error && <div className="bg-neon-red/10 border border-neon-red/30 text-neon-red text-sm rounded px-4 py-3 font-mono">{error}</div>}
          {[
            { key: 'name' as const, label: 'Certificate Name *' },
            { key: 'org' as const, label: 'Organization' },
            { key: 'period' as const, label: 'Period' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-[10px] text-neon-green font-mono uppercase tracking-wider mb-1.5">{label}</label>
              <input required={key === 'name'} value={form[key]} onChange={e => set(key, e.target.value)}
                className="w-full bg-cyber-surface border border-gray-700 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-neon-green/50 transition font-mono" />
            </div>
          ))}
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 border border-gray-700 text-gray-400 font-mono py-2.5 rounded hover:bg-gray-800 transition-colors text-sm">Cancel</button>
            <button type="submit" disabled={saving} className="flex-1 bg-neon-green/20 border border-neon-green/30 text-neon-green font-mono py-2.5 rounded transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-50">
              {saving && <Loader2 size={14} className="animate-spin" />}
              {saving ? 'Processing...' : initial ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────

export default function Education() {
  const headRef = useReveal<HTMLDivElement>();
  const coursesRef = useReveal<HTMLDivElement>(0.1);
  const { isAdmin } = useAuth();

  const [dbCerts, setDbCerts] = useState<Certificate[]>([]);
  const [certModal, setCertModal] = useState<Certificate | null | 'new'>(null);

  const fetchCerts = async () => {
    const { data } = await supabase.from('certificates').select('*').order('sort_order').order('created_at');
    if (data) setDbCerts(data as Certificate[]);
  };

  useEffect(() => { fetchCerts(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this certificate?')) return;
    await supabase.from('certificates').delete().eq('id', id);
    await fetchCerts();
  };

  return (
    <section id="education" className="section-pad bg-cyber-darker relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded border border-neon-green/30 bg-neon-green/10 flex items-center justify-center">
              <span className="text-neon-green text-sm font-mono">05</span>
            </div>
            <p className="text-neon-green text-sm font-mono tracking-widest uppercase">Education_</p>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
            <span className="text-gray-500">&gt;</span>{' '}
            Academic Protocol
            <span className="text-neon-green animate-blink">_</span>
          </h2>
        </div>

        <div className="relative flex flex-col gap-5 mb-16">
          {education.map((ed, i) => <EduCard key={ed.institution} ed={ed} index={i} />)}
        </div>

        <div ref={coursesRef} className="reveal">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-neon-cyan" />
              <h3 className="font-mono text-sm text-white uppercase tracking-wider">Courses & Certificates</h3>
            </div>
            {isAdmin && (
              <button
                onClick={() => setCertModal('new')}
                className="inline-flex items-center gap-1.5 text-[10px] font-mono bg-neon-green/10 border border-neon-green/30 text-neon-green px-3 py-2 rounded transition-colors"
              >
                <Plus size={12} />
                Add_Cert
              </button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {staticCourses.map(c => (
              <div key={c.name} className="cyber-card rounded-lg p-4 hover:border-neon-cyan/40 transition-colors">
                <p className="font-mono text-xs text-white mb-1">{c.name}</p>
                <p className="text-neon-cyan text-[10px]">{c.org}</p>
                <p className="text-gray-500 text-[10px] mt-1 font-mono">{c.period}</p>
              </div>
            ))}
            {dbCerts.map(c => (
              <div key={c.id} className="cyber-card rounded-lg p-4 hover:border-neon-cyan/40 transition-colors group relative">
                <p className="font-mono text-xs text-white mb-1 pr-14">{c.name}</p>
                <p className="text-neon-cyan text-[10px]">{c.org}</p>
                <p className="text-gray-500 text-[10px] mt-1 font-mono">{c.period}</p>
                {isAdmin && (
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setCertModal(c)} className="p-1 text-gray-500 hover:text-white transition-colors"><Pencil size={12} /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-1 text-gray-500 hover:text-neon-red transition-colors"><Trash2 size={12} /></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {certModal && (
        <CertModal
          initial={certModal === 'new' ? null : certModal}
          onClose={() => setCertModal(null)}
          onSaved={fetchCerts}
        />
      )}
    </section>
  );
}
