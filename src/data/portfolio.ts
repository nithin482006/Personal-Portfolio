// Centralized portfolio data - single source of truth for all features
// Update this file to automatically update terminal, chatbot, resume, hero stats

export const PERSONAL = {
  name: 'Nithin Reddy M',
  title: 'Computer Science Student & Full-Stack Developer',
  email: 'nithinreddy482006@gmail.com',
  phone: '+91 9632603139',
  location: 'Bangalore, Karnataka, India',
  linkedin: 'https://linkedin.com/in/nithin-reddy-m-151122305',
  linkedinHandle: 'nithin-reddy-m-151122305',
  github: 'https://github.com/nithin482006',
  githubHandle: 'nithin482006',
  university: 'Presidency University, Bangalore',
  graduationYear: 2028,
  degree: 'B.Tech — Computer Science & Engineering',
  summary: `Multidisciplinary Computer Science student at Presidency University, Bangalore, with hands-on experience in embedded systems, web development, and software engineering. Skilled in React.js, Node.js, Python, Java, and SQL with a strong foundation in data structures and algorithms.`,
};

export const SKILLS = {
  'Programming Languages': ['Python', 'Java', 'JavaScript', 'PHP', 'SQL', 'C/C++'],
  'Web Development': ['React.js', 'Node.js', 'HTML5', 'CSS3', 'Responsive Design', 'Accessibility'],
  'Databases & Tools': ['MySQL', 'Database Management', 'Git', 'Linux', 'Advanced Excel'],
  'Core CS': ['Data Structures & Algorithms', 'Operating Systems', 'Network Security', 'Cryptography', 'Data Analytics'],
  'Methodologies': ['Agile Development', 'Project Management', 'Technical Documentation'],
  'Soft Skills': ['Leadership', 'Problem Solving', 'Communication', 'Teamwork', 'Adaptability'],
};

export const PROJECTS = [
  {
    id: 'groundwater',
    title: 'Smart Groundwater Level Tracking System',
    description: 'An Arduino-based IoT solution that monitors groundwater levels in real time using integrated sensors. Includes automated alerts, sensor calibration, firmware implementation, and full technical documentation.',
    overview: 'A real-time groundwater monitoring system designed to address water management challenges using affordable IoT hardware. The system uses ultrasonic sensors and Arduino microcontrollers to track groundwater levels and trigger automated alerts.',
    problem: 'Groundwater depletion is a critical issue in many regions. Manual monitoring is time-consuming and unreliable. This system provides automated, continuous monitoring with instant alerts.',
    tech: ['Arduino', 'C/C++', 'Embedded Systems', 'IoT', 'Sensors', 'Firmware'],
    period: 'Oct 2024 – Dec 2024',
    type: 'Academic Project',
    github: 'https://github.com/nithin482006',
    impact: 'Delivered functional prototype for real-time water management',
    status: 'DEPLOYED',
    challenges: [
      'Sensor calibration in varying water densities',
      'Power consumption optimization for field deployment',
      'Reliable wireless data transmission',
    ],
    lessons: [
      'Hands-on embedded systems firmware development',
      'Importance of thorough sensor calibration',
      'IoT data pipeline architecture',
    ],
    features: [
      'Real-time groundwater level monitoring',
      'Automated SMS/email alerts when levels drop below threshold',
      'Data logging and historical analysis',
      'Low-power optimized firmware',
      'Waterproof enclosure design',
    ],
    category: 'IoT',
  },
  {
    id: 'dental',
    title: 'Bangalore Smiles Dental Care Website',
    description: 'A fully responsive, production-deployed website for a dental care clinic. Built with a focus on performance optimisation, accessibility, and mobile-first design with iterative stakeholder feedback.',
    overview: 'A production-ready website for a dental clinic in Bangalore, designed to improve patient engagement and online presence. Built with modern web standards and optimized for performance and accessibility.',
    problem: 'The clinic had no online presence, making it difficult for patients to find information, book appointments, or get in touch. A professional website was needed to modernize their patient acquisition.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Accessibility', 'SEO'],
    period: 'Mar 2026',
    type: 'Freelance',
    github: 'https://github.com/nithin482006',
    impact: 'Improved patient engagement and mobile user experience',
    status: 'LIVE',
    challenges: [
      'Coordinating feedback from non-technical stakeholders',
      'Ensuring WCAG accessibility compliance',
      'Optimizing page load performance',
    ],
    lessons: [
      'Client communication and requirement gathering',
      'Performance optimization techniques',
      'Accessibility-first design principles',
    ],
    features: [
      'Mobile-first responsive design',
      'Service showcase with rich imagery',
      'Patient testimonials section',
      'Google Maps integration',
      'Contact form with validation',
      'Optimized Core Web Vitals',
    ],
    category: 'Web',
  },
];

export const EXPERIENCE = [
  {
    id: 'groundwater-lead',
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
    id: 'dental-dev',
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
];

export const EDUCATION = [
  {
    degree: 'B.Tech — Computer Science & Engineering',
    institution: 'Presidency University, Rajanukunte, Bangalore',
    dates: 'Aug 2024 – Expected 2028',
    details: 'Relevant Coursework: Data Structures, Operating Systems, Cryptography, Network Security',
    current: true,
  },
  {
    degree: 'PUC (Pre-University Course)',
    institution: 'SDC PU College, Bangarpet',
    dates: 'Aug 2022 – May 2024',
    details: null,
    current: false,
  },
  {
    degree: 'Secondary Education (10th Standard)',
    institution: "St. Joseph's Convent High School, KGF, Kolar",
    dates: 'Aug 2020 – Apr 2022',
    details: null,
    current: false,
  },
];

export const COURSES = [
  { name: 'Aptitude Training', org: 'Presidency University', period: 'Aug 2025 – Dec 2025' },
  { name: 'Enhancing Personality Through Soft Skills', org: 'Presidency University', period: 'Jan 2025 – May 2025' },
  { name: 'Introduction to Soft Skills', org: 'Presidency University', period: 'Aug 2024' },
];

// Stats for hero dashboard
export const STATS = {
  projects: PROJECTS.length,
  skills: Object.values(SKILLS).flat().length,
  courses: COURSES.length,
  experience: EXPERIENCE.length,
  languages: SKILLS['Programming Languages'].length,
  gradYear: PERSONAL.graduationYear,
};

// Role-based resume configurations
export type ResumeRole = 'Software Engineer' | 'Cybersecurity' | 'Full Stack Developer' | 'AI / ML Engineer';

export const RESUME_ROLES: Record<ResumeRole, {
  title: string;
  summaryFocus: string;
  highlightSkills: string[];
  highlightProjects: string[];
  color: string;
}> = {
  'Software Engineer': {
    title: 'Software Engineer',
    summaryFocus: 'software engineering and full-stack development',
    highlightSkills: ['Python', 'Java', 'JavaScript', 'React.js', 'Node.js', 'Data Structures & Algorithms'],
    highlightProjects: ['groundwater', 'dental'],
    color: '#00ff88',
  },
  'Cybersecurity': {
    title: 'Cybersecurity Student',
    summaryFocus: 'cybersecurity, network security, and secure software development',
    highlightSkills: ['Network Security', 'Cryptography', 'Linux', 'Python', 'Operating Systems', 'Data Analytics'],
    highlightProjects: ['groundwater', 'dental'],
    color: '#00fff2',
  },
  'Full Stack Developer': {
    title: 'Full Stack Developer',
    summaryFocus: 'full-stack web development with React, Node.js, and database engineering',
    highlightSkills: ['React.js', 'Node.js', 'JavaScript', 'HTML5', 'CSS3', 'MySQL', 'Responsive Design'],
    highlightProjects: ['dental', 'groundwater'],
    color: '#00b4d8',
  },
  'AI / ML Engineer': {
    title: 'AI / ML Engineering Student',
    summaryFocus: 'data analytics, algorithm design, and AI/ML fundamentals',
    highlightSkills: ['Python', 'Data Analytics', 'Data Structures & Algorithms', 'SQL', 'MySQL'],
    highlightProjects: ['groundwater', 'dental'],
    color: '#b14eff',
  },
};

// AI Assistant knowledge base
export const AI_KNOWLEDGE = {
  greetings: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'howdy'],
  about: {
    triggers: ['who is nithin', 'about nithin', 'tell me about', 'who are you', 'about yourself', 'introduce'],
    response: `Nithin Reddy M is a Computer Science & Engineering student at Presidency University, Bangalore (Expected 2028). He's a full-stack developer and cybersecurity enthusiast with hands-on experience in embedded systems, web development, and software engineering. He's skilled in React.js, Node.js, Python, Java, SQL, and C/C++.`,
  },
  projects: {
    triggers: ['project', 'built', 'created', 'developed', 'portfolio', 'work', 'applications'],
    response: `Nithin has built ${PROJECTS.length} featured projects:\n1. **${PROJECTS[0].title}** (${PROJECTS[0].period}) - ${PROJECTS[0].description}\n2. **${PROJECTS[1].title}** (${PROJECTS[1].period}) - ${PROJECTS[1].description}`,
  },
  skills: {
    triggers: ['skill', 'technolog', 'language', 'stack', 'know', 'familiar', 'proficient', 'expertise'],
    response: `Nithin's technical skills:\n• **Languages:** ${SKILLS['Programming Languages'].join(', ')}\n• **Web:** ${SKILLS['Web Development'].join(', ')}\n• **Databases & Tools:** ${SKILLS['Databases & Tools'].join(', ')}\n• **Core CS:** ${SKILLS['Core CS'].join(', ')}`,
  },
  cybersecurity: {
    triggers: ['security', 'cyber', 'network', 'cryptography', 'hack', 'pentest', 'soc'],
    response: `Nithin focuses on cybersecurity with coursework in **Network Security**, **Cryptography**, and **Operating Systems**. He's building expertise in secure software development and network analysis as part of his CS degree.`,
  },
  education: {
    triggers: ['education', 'study', 'university', 'college', 'degree', 'course', 'graduation', 'academic'],
    response: `Nithin is currently pursuing a **B.Tech in Computer Science & Engineering** at Presidency University, Bangalore (2024–2028). Relevant coursework includes Data Structures, Operating Systems, Cryptography, and Network Security.`,
  },
  contact: {
    triggers: ['contact', 'reach', 'email', 'phone', 'linkedin', 'hire', 'connect', 'message', 'get in touch'],
    response: `You can reach Nithin at:\n• **Email:** ${PERSONAL.email}\n• **Phone:** ${PERSONAL.phone}\n• **LinkedIn:** ${PERSONAL.linkedinHandle}\n• **GitHub:** ${PERSONAL.githubHandle}\n• **Location:** ${PERSONAL.location}`,
  },
  github: {
    triggers: ['github', 'repository', 'repo', 'open source', 'code'],
    response: `Nithin's GitHub is **github.com/nithin482006** — check it out for his public repositories and contributions.`,
  },
  resume: {
    triggers: ['resume', 'cv', 'download', 'pdf'],
    response: `You can download Nithin's resume using the **Download_Resume** button in the hero section, or use the **Resume Generator** for a role-specific version (Software Engineer, Cybersecurity, Full Stack, or AI/ML).`,
  },
  experience: {
    triggers: ['experience', 'internship', 'job', 'work', 'professional', 'freelance'],
    response: `Nithin has ${EXPERIENCE.length} key experiences:\n1. **Project Lead** – Smart Groundwater Level Tracking (Oct–Dec 2024, Presidency University)\n2. **Front-End Developer** – Bangalore Smiles Dental Care Website (Mar 2026, Freelance)`,
  },
  iot: {
    triggers: ['arduino', 'iot', 'embedded', 'sensor', 'firmware', 'hardware', 'groundwater'],
    response: `Nithin built a **Smart Groundwater Level Tracking System** using Arduino, C/C++, and IoT sensors. The project delivers real-time monitoring with automated alerts for sustainable water management.`,
  },
  dental: {
    triggers: ['dental', 'bangalore smiles', 'clinic', 'hospital', 'website'],
    response: `Nithin developed the **Bangalore Smiles Dental Care Website** — a fully responsive, production-deployed website built with HTML, CSS, and JavaScript. It improved patient engagement and mobile user experience.`,
  },
  openToWork: {
    triggers: ['available', 'open to work', 'hiring', 'opportunity', 'looking for'],
    response: `Yes! Nithin is open to **internships**, **collaborative projects**, and **full-time opportunities** starting after his graduation in 2028. Feel free to reach out via email or LinkedIn.`,
  },
};

// Terminal easter egg responses
export const EASTER_EGGS: Record<string, string | string[]> = {
  'sudo hack nasa': 'bash: sudo: Permission denied.\nAccess level insufficient. Nice try though.',
  'sudo rm -rf /': 'Nice try. This system has integrity checks enabled.\n[SECURITY ALERT: Destructive command blocked]',
  'hack': 'Unauthorized access attempt logged. IP flagged.\nJust kidding — but that is not how hacking works.',
  'whoami': `nithin_reddy_m\nrole: CS_student | developer | security_enthusiast\nstatus: actively_learning`,
  'uname -a': `NRM-OS 2028.04 LTS x86_64\nPresidency University Bangalore\nKernel: education-5.0`,
  'ls': `total 6\ndrwxr-xr-x projects/\ndrwxr-xr-x skills/\ndrwxr-xr-x experience/\ndrwxr-xr-x education/\n-rw-r--r-- resume.pdf\n-rw-r--r-- contact.txt`,
  'pwd': '/home/nithin_reddy_m',
  'cat /etc/passwd': 'nithin_reddy_m:x:1000:1000:Full-Stack Developer:/home/nithin_reddy_m:/bin/bash',
  'ping google.com': 'PING google.com: 64 bytes from 142.250.77.46\nice tt=4ms\nPacket loss: 0%',
  'date': new Date().toString(),
  'echo hello': 'hello',
};
