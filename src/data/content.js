export const personal = {
  name: 'Suresh T',
  wordmark: 'SURESH',
  title: 'Software Engineer',
  roleLine: 'Full Stack Developer',
  tagline: 'AI • Cloud • Software',
  headline: 'Building intelligent systems, beautiful experiences, and meaningful technology.',
  location: 'Chennai, India',
  email: 'suresh140105@gmail.com',
  github: 'https://github.com/SURESH-T-14',
  linkedin: 'https://www.linkedin.com/in/suresh-t-/',
  resume: '/media/sureshresume.pdf'
};

export const backgrounds = {
  hero: '/backgrounds/hero-standing.png',
  journey: '/backgrounds/journey-seated.png',
  experience: '/backgrounds/experience-back.png',
  skills: '/backgrounds/skills-board.png',
  projects: '/backgrounds/projects-room.png',
  certifications: '/backgrounds/certifications.png',
  contact: '/backgrounds/contact.png'
};

export const journeyYears = [
  {
    year: '2021',
    key: 'Beginning',
    lines: ['New city', 'New chapter', 'Bigger dreams'],
    image: '/media/scene-1.png'
  },
  {
    year: '2022',
    key: 'Learn',
    lines: ['Core CS', 'Java foundations', 'Problem solving'],
    image: '/media/scene-2.png'
  },
  {
    year: '2023',
    key: 'Practice',
    lines: ['Built skills', 'Made projects', 'Kept going'],
    image: '/media/scene-3.png'
  },
  {
    year: '2024',
    key: 'Build',
    lines: ['Real applications', 'Debugging systems', 'Full-stack craft'],
    image: '/media/scene-4.png'
  },
  {
    year: '2025',
    key: 'Opportunities',
    lines: ['Internships', 'AI experiments', 'Shipped work'],
    image: '/media/scene-5.png'
  },
  {
    year: '2026',
    key: 'Next chapter',
    lines: ['Bigger goals', 'More impact', 'Still building'],
    image: '/backgrounds/hero-standing.png'
  }
];

export const experience = [
  {
    year: '2025',
    role: 'Full Stack Java Developer',
    company: 'Vaishnav Technologies',
    description: 'Developed and maintained application workflows with a focus on scalable backend logic and user-facing functionality.',
    technologies: ['JAVA', 'SPRING BOOT', 'MYSQL', 'REST APIS']
  },
  {
    year: '2025',
    role: 'Web Development Intern',
    company: '8Queens Software Technologies',
    description: 'Built web solutions and improved understanding of practical development workflows, UI implementation, and deployable systems.',
    technologies: ['JAVASCRIPT', 'WEB', 'UI', 'FULL STACK']
  },
  {
    year: '2025',
    role: 'MERN Stack Developer',
    company: 'Web Stack Academy',
    description: 'Expanded into integrated frontend and backend development with modern JavaScript tooling and feature delivery.',
    technologies: ['REACT', 'NODE.JS', 'MONGODB', 'EXPRESS']
  }
];

export const skillGroups = [
  {
    number: '01',
    title: 'Build & Stack',
    tagline: 'Code into products',
    items: [
      { name: 'Java', mark: 'Ja', color: '#f89820' },
      { name: 'Spring Boot', mark: 'SB', color: '#6db33f' },
      { name: 'React', mark: 'Re', color: '#61dafb' },
      { name: 'JavaScript', mark: 'JS', color: '#f7df1e' },
      { name: 'Node.js', mark: 'No', color: '#75bd49' }
    ]
  },
  {
    number: '02',
    title: 'Backend',
    tagline: 'Build. Integrate. Scale.',
    items: [
      { name: 'Python', mark: 'Py', color: '#ffd34b' },
      { name: 'REST APIs', mark: 'API', color: '#9ebad8' },
      { name: 'MySQL', mark: 'SQL', color: '#4479a1' },
      { name: 'MongoDB', mark: 'Mg', color: '#4db33d' },
      { name: 'PostgreSQL', mark: 'PG', color: '#6599ca' }
    ]
  },
  {
    number: '03',
    title: 'Frontend',
    tagline: 'Pixels to products',
    items: [
      { name: 'React', mark: 'Re', color: '#61dafb' },
      { name: 'HTML5', mark: 'H5', color: '#e34f26' },
      { name: 'CSS3', mark: 'C3', color: '#1572b6' },
      { name: 'JavaScript', mark: 'JS', color: '#f7df1e' },
      { name: 'TypeScript', mark: 'TS', color: '#3178c6' }
    ]
  },
  {
    number: '04',
    title: 'AI & Cloud',
    tagline: 'Think. Build. Automate.',
    items: [
      { name: 'Gemini', mark: 'G', color: '#8ab4f8' },
      { name: 'OpenCV', mark: 'CV', color: '#5c9fd6' },
      { name: 'AWS', mark: 'AWS', color: '#ff9900' },
      { name: 'Docker', mark: 'Dk', color: '#2496ed' },
      { name: 'GitHub Actions', mark: 'GA', color: '#2088ff' }
    ]
  },
  {
    number: '05',
    title: 'Tools & Others',
    tagline: 'Plan. Collaborate. Ship.',
    items: [
      { name: 'Git', mark: 'Git', color: '#f05032' },
      { name: 'GitHub', mark: 'GH', color: '#e8e8e8' },
      { name: 'VS Code', mark: 'VS', color: '#007acc' },
      { name: 'Linux', mark: 'Lx', color: '#fcc624' },
      { name: 'Postman', mark: 'Pm', color: '#ff6c37' }
    ]
  },
  {
    number: '06',
    title: 'Soft Skills',
    tagline: 'People. Ideas. Impact.',
    items: [
      { name: 'Problem Solving', mark: 'PS', color: '#edc891' },
      { name: 'Communication', mark: 'Cm', color: '#edc891' },
      { name: 'Creativity', mark: 'Cr', color: '#edc891' },
      { name: 'Teamwork', mark: 'Tw', color: '#edc891' },
      { name: 'Adaptability', mark: 'Ad', color: '#edc891' }
    ]
  }
];

export const projects = [
  {
    id: 1,
    name: 'AI Money Mentor',
    year: '2025',
    category: 'AI Finance / Full Stack',
    description: 'A full-stack financial advisory platform for budgeting, planning, and intelligent recommendations.',
    problem: 'People need financial guidance that feels personal, contextual, and easy to trust.',
    solution: 'Built a finance workspace using a structured AI layer, contextual prompts, authentication, and real application workflows for budgeting and investment-oriented assistance.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Gemini', 'RAG', 'Docker'],
    features: ['Personalized financial guidance', 'AI-driven recommendations', 'Secure authentication', 'Realtime chat flows', 'Deployment-ready architecture'],
    repo: 'https://github.com/SURESH-T-14/ai-money-mentor',
    image: '/projects/ai-money-mentor.png',
    accent: '185, 75, 51',
    pos: { left: '36.5%', top: '5.3%', width: '24.9%', height: '24.8%', turn: '6deg' }
  },
  {
    id: 2,
    name: 'Access AI Bot',
    year: '2025',
    category: 'Accessibility / Multimodal AI',
    description: 'A multimodal assistant combining conversation, gesture recognition, translation, and emergency tools.',
    problem: 'Assistive interfaces should feel natural and proactive, not limited to text input alone.',
    solution: 'Created an AI assistant using multimodal interaction patterns, gesture-driven cues, and cloud-connected services for practical accessibility workflows.',
    stack: ['React', 'Python', 'MediaPipe', 'OpenCV', 'Firebase', 'Gemini'],
    features: ['Gesture recognition', 'Real-time translation', 'Emergency assistance flow', 'Authentication', 'AI interaction layer'],
    repo: 'https://github.com/SURESH-T-14/AccessAI',
    image: '/projects/access-ai.png',
    accent: '198, 163, 116',
    pos: { left: '15.1%', top: '6%', width: '19.5%', height: '33%', turn: '-6deg' }
  },
  {
    id: 3,
    name: 'Jarvis OS',
    year: '2026',
    category: 'AI Systems / Desktop Assistant',
    description: 'A conceptual desktop AI assistant with voice, vision, automation, memory, and a holographic interface.',
    problem: 'Assistant systems need better orchestration between interaction, context, and software control.',
    solution: 'Designed a layered assistant architecture combining voice feedback, streaming data, local memory, system telemetry, and vision-based behavior in a single product concept.',
    stack: ['FastAPI', 'React', 'Electron', 'SQLite', 'WebSockets'],
    features: ['Voice-driven interaction', 'Vision layer', 'Local memory', 'Telemetry dashboard', 'Holographic UI concept'],
    repo: 'https://github.com/SURESH-T-14/Jarvis',
    image: '/projects/jarvis.png',
    accent: '198, 163, 116',
    pos: { left: '62.8%', top: '8.2%', width: '19.4%', height: '30.8%', turn: '6deg' }
  },
  {
    id: 4,
    name: 'Student Management System',
    year: '2025',
    category: 'Java Full Stack',
    description: 'A role-based student administration system for records, attendance, marks, and secure access.',
    problem: 'Educational institutions need a clean, role-aware workflow for managing student data and administrative actions.',
    solution: 'Built a Java-based system with distinct admin, faculty, and student flows using secure authentication, CRUD workflows, and structured records.',
    stack: ['Java', 'Spring Boot', 'MySQL', 'JDBC', 'JWT'],
    features: ['Role-based access', 'Attendance tracking', 'Academic records', 'JWT security', 'Faculty and admin workflows'],
    repo: 'https://github.com/SURESH-T-14/Student-Management-System-java',
    image: '/projects/student-management.png',
    accent: '208, 183, 117',
    pos: { left: '4.2%', top: '42%', width: '22%', height: '28%', turn: '-4deg' }
  },
  {
    id: 5,
    name: 'BookMyShow Replica',
    year: '2025',
    category: 'Booking Platform',
    description: 'A responsive cinema discovery and booking experience inspired by modern entertainment platforms.',
    problem: 'Digital booking experiences need strong interaction design and an intuitive flow from discovery to booking.',
    solution: 'Developed a responsive booking interface focusing on cinematic surfaces, product usability, and a polished experience for browsing and selecting shows.',
    stack: ['React', 'TypeScript', 'Node.js', 'CSS', 'Stripe'],
    features: ['Movie discovery flow', 'Seat and booking interactions', 'Responsive UI', 'Polished product design'],
    repo: 'https://github.com/SURESH-T-14/social-media',
    image: '/projects/book-my-show.png',
    accent: '216, 160, 161',
    pos: { left: '73%', top: '42%', width: '22%', height: '29%', turn: '5deg' }
  },
  {
    id: 6,
    name: 'Electron Workspace',
    year: '2025',
    category: 'Desktop Product',
    description: 'A desktop-first workspace experiment focused on native-feeling interaction and local productivity flows.',
    problem: 'Some tools work better as focused desktop software than as another browser tab.',
    solution: 'Explored Electron packaging, local windows, and a tighter loop between interface and system-level workflows.',
    stack: ['Electron', 'React', 'Node.js'],
    features: ['Desktop shell', 'Local-first interaction', 'Product-minded UI'],
    repo: 'https://github.com/SURESH-T-14',
    image: '/projects/electron-app.png',
    accent: '158, 186, 216',
    pos: { left: '38%', top: '62%', width: '24%', height: '26%', turn: '3deg' }
  }
];

export const certificateEntries = [
  { title: 'AWS Cloud Foundations', file: 'AWS_Academy_Graduate___Cloud_Foundations___Training_Badge_Badge20260823-8-y15u4o.pdf', issuer: 'AWS Academy', date: '2026' },
  { title: 'AWS Technical Basics', file: 'Aws Technical basic.pdf', issuer: 'AWS Academy', date: '2026' },
  { title: 'AWS AI', file: 'AWS AI certificate.pdf', issuer: 'AWS Academy', date: '2026' },
  { title: 'GitHub Actions', file: 'CertificateOfCompletion_Practical GitHub Actions.pdf', issuer: 'LinkedIn Learning / GitHub', date: '2026' },
  { title: 'Claude Code 101', file: 'certificate-claude code 101.pdf', issuer: 'Anthropic', date: '2026' },
  { title: 'Claude AI Fluency', file: 'certificate-claude code AI fluncy.pdf', issuer: 'Anthropic', date: '2026' },
  { title: 'Spring Boot', file: 'spring boot 1.pdf', issuer: 'Spring / Learning Platform', date: '2025' },
  { title: 'Spring Data', file: 'spring data 2.pdf', issuer: 'Spring / Learning Platform', date: '2025' },
  { title: 'Spring REST', file: 'spring rest 3.pdf', issuer: 'Spring / Learning Platform', date: '2025' },
  { title: 'Java Programming Internship', file: '-JAVA_PROGRAMMING_INTERNSHIP-suresh_.T.pdf', issuer: 'Internship Program', date: '2025' },
  { title: 'Selenium WebDriver with Java', file: 'Selenium WebDriver with Java & Frameworks.pdf', issuer: 'Learning Platform', date: '2025' },
  { title: 'Unity', file: 'unity.pdf', issuer: 'Unity / Learning Platform', date: '2025' }
];
