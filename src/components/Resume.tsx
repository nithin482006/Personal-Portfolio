import { forwardRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

// Portfolio data - synced with existing components
const resumeData = {
  name: 'Nithin Reddy M',
  title: 'Computer Science Student & Full-Stack Developer',
  email: 'nithinreddy482006@gmail.com',
  phone: '+91 9632603139',
  linkedin: 'linkedin.com/in/nithin-reddy-m-151122305',
  github: 'github.com/nithin482006',
  location: 'Bangalore, Karnataka, India',

  summary: `Multidisciplinary Computer Science student at Presidency University, Bangalore, with hands-on experience in embedded systems, web development, and software engineering. Skilled in React.js, Node.js, Python, Java, and SQL with a strong foundation in data structures and algorithms. Led end-to-end projects from IoT prototypes to production web applications, demonstrating ability to own problems and deliver results.`,

  education: [
    {
      degree: 'B.Tech — Computer Science & Engineering',
      institution: 'Presidency University, Rajanukunte, Bangalore',
      dates: 'Aug 2024 – Expected 2028',
      details: 'Relevant Coursework: Data Structures, Operating Systems, Cryptography, Network Security',
    },
    {
      degree: 'PUC (Pre-University Course)',
      institution: 'SDC PU College, Bangarpet',
      dates: 'Aug 2022 – May 2024',
      details: null,
    },
    {
      degree: 'Secondary Education (10th Standard)',
      institution: "St. Joseph's Convent High School, KGF, Kolar",
      dates: 'Aug 2020 – Apr 2022',
      details: null,
    },
  ],

  experience: [
    {
      role: 'Project Lead — Smart Groundwater Level Tracking System',
      company: 'Presidency University, Bangalore',
      dates: 'Oct 2024 – Dec 2024',
      type: 'Academic Project',
      bullets: [
        'Designed and developed an Arduino-based IoT monitoring solution integrating real-time groundwater level sensors with automated alert systems.',
        'Created schematics, implemented embedded firmware in C/C++, and led end-to-end project execution including sensor calibration.',
        'Delivered functional prototype enabling real-time monitoring for sustainable water management.',
      ],
    },
    {
      role: 'Front-End Web Developer — Bangalore Smiles Dental Care',
      company: 'Freelance / Academic Project',
      dates: 'Mar 2026',
      type: 'Freelance',
      bullets: [
        'Developed and deployed a fully responsive website for a dental care clinic using HTML, CSS, and JavaScript.',
        'Optimized performance and accessibility standards with mobile-first design approach.',
        'Successfully launched production website improving patient engagement and mobile user experience.',
      ],
    },
  ],

  skills: {
    'Programming Languages': ['Python', 'Java', 'JavaScript', 'PHP', 'SQL', 'C/C++'],
    'Web Development': ['React.js', 'Node.js', 'HTML5', 'CSS3', 'Responsive Design', 'Accessibility'],
    'Databases & Tools': ['MySQL', 'Database Management', 'Git', 'Linux', 'Advanced Excel'],
    'Core CS': ['Data Structures & Algorithms', 'Operating Systems', 'Network Security', 'Cryptography', 'Data Analytics'],
    'Methodologies': ['Agile Development', 'Project Management', 'Technical Documentation'],
    'Soft Skills': ['Leadership', 'Problem Solving', 'Communication', 'Teamwork', 'Adaptability'],
  },

  courses: [
    { name: 'Aptitude Training', org: 'Presidency University', period: 'Aug 2025 – Dec 2025' },
    { name: 'Enhancing Personality Through Soft Skills', org: 'Presidency University', period: 'Jan 2025 – May 2025' },
    { name: 'Introduction to Soft Skills', org: 'Presidency University', period: 'Aug 2024' },
  ],
};

// ATS-optimized resume layout
const Resume = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white text-slate-900 font-sans"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '12mm 14mm',
        fontSize: '10pt',
        lineHeight: '1.35',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '6mm', borderBottom: '2px solid #0a0a0f', paddingBottom: '5mm' }}>
        <h1 style={{ fontSize: '18pt', fontWeight: 700, color: '#0a0a0f', marginBottom: '1mm', letterSpacing: '0.5pt' }}>
          {resumeData.name}
        </h1>
        <p style={{ fontSize: '10.5pt', color: '#00aa77', fontWeight: 600, marginBottom: '3mm' }}>
          {resumeData.title}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4mm', fontSize: '8.5pt', color: '#475569' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
            <Mail size={10} /> {resumeData.email}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
            <Phone size={10} /> {resumeData.phone}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '1mm' }}>
            <MapPin size={10} /> {resumeData.location}
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '5mm', fontSize: '8.5pt', color: '#475569', marginTop: '2mm' }}>
          <span>{resumeData.linkedin}</span>
          <span>{resumeData.github}</span>
        </div>
      </header>

      {/* Summary */}
      <section style={{ marginBottom: '5mm' }}>
        <SectionTitle>PROFESSIONAL SUMMARY</SectionTitle>
        <p style={{ textAlign: 'justify', color: '#334155' }}>{resumeData.summary}</p>
      </section>

      {/* Education */}
      <section style={{ marginBottom: '5mm' }}>
        <SectionTitle>EDUCATION</SectionTitle>
        {resumeData.education.map((edu, i) => (
          <div key={i} style={{ marginBottom: '3mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ color: '#0a0a0f', fontSize: '10pt' }}>{edu.degree}</strong>
              <span style={{ fontSize: '8.5pt', color: '#64748b' }}>{edu.dates}</span>
            </div>
            <p style={{ color: '#00aa77', fontSize: '9pt' }}>{edu.institution}</p>
            {edu.details && <p style={{ color: '#64748b', fontSize: '8.5pt', fontStyle: 'italic' }}>{edu.details}</p>}
          </div>
        ))}
      </section>

      {/* Experience / Projects */}
      <section style={{ marginBottom: '5mm' }}>
        <SectionTitle>PROJECT EXPERIENCE</SectionTitle>
        {resumeData.experience.map((exp, i) => (
          <div key={i} style={{ marginBottom: '4mm' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <strong style={{ color: '#0a0a0f', fontSize: '10pt' }}>{exp.role}</strong>
              <span style={{ fontSize: '8.5pt', color: '#64748b' }}>{exp.dates}</span>
            </div>
            <p style={{ color: '#00aa77', fontSize: '9pt' }}>
              {exp.company}
              <span style={{ display: 'inline-block', marginLeft: '2mm', fontSize: '8pt', color: '#64748b', border: '0.5px solid #00aa77', padding: '0 2mm', borderRadius: '2pt' }}>
                {exp.type}
              </span>
            </p>
            <ul style={{ margin: '1.5mm 0 0 4mm', paddingLeft: '3mm', color: '#334155' }}>
              {exp.bullets.map((b, j) => (
                <li key={j} style={{ marginBottom: '1mm' }}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section style={{ marginBottom: '5mm' }}>
        <SectionTitle>TECHNICAL SKILLS</SectionTitle>
        {Object.entries(resumeData.skills).map(([category, skills]) => (
          <div key={category} style={{ marginBottom: '1.5mm' }}>
            <span style={{ fontWeight: 600, color: '#0a0a0f' }}>{category}:</span>
            <span style={{ color: '#334155' }}> {skills.join(' • ')}</span>
          </div>
        ))}
      </section>

      {/* Courses & Training */}
      <section style={{ marginBottom: '3mm' }}>
        <SectionTitle>COURSES & TRAINING</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2mm' }}>
          {resumeData.courses.map((c, i) => (
            <div key={i}>
              <span style={{ fontWeight: 500, color: '#0a0a0f' }}>{c.name}</span>
              <span style={{ color: '#64748b', fontSize: '8.5pt' }}> — {c.org}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
});

Resume.displayName = 'Resume';

// Section title component (ATS-friendly)
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: '10.5pt',
        fontWeight: 700,
        color: '#0a0a0f',
        textTransform: 'uppercase',
        letterSpacing: '1pt',
        borderBottom: '1px solid #00aa77',
        paddingBottom: '1mm',
        marginBottom: '3mm',
        marginTop: '1mm',
      }}
    >
      {children}
    </h2>
  );
}

export default Resume;
export { resumeData };
