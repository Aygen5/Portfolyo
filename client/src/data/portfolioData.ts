import { EducationItem, FocusArea, TechCategory } from '../domain/models';

export const PROFILE_DATA = {
  name: 'Aygen Yıldırım',
  handle: '@aygenyildirim',
  headline: 'Building thoughtful things with code & creativity.',
  heroIntro:
    'I am a Software Engineering student growing across Full-Stack development (.NET, Node.js, React) and cross-platform Mobile engineering (Flutter). I love creative UI/UX design, actively explore enterprise SAP technologies, and enjoy architecting systems, planning roadmaps, and managing projects just as much as writing code — constantly evolving across disciplines.',
  statusBadge: 'Open to internships & engineering roles',
  currentActivity: '✨ Currently: Building .NET / Node.js backends & exploring SAP',
  pillars: [
    { label: 'Backend', value: '.NET Core · Node.js · Clean Arch' },
    { label: 'Frontend', value: 'React · TypeScript · JavaScript · CSS' },
    { label: 'Mobile', value: 'Flutter · Dart · BLoC / Cubit' },
    { label: 'Data', value: 'PostgreSQL · MongoDB · PostGIS' },
    { label: 'Enterprise', value: 'SAP Technologies' },
    { label: 'Leadership', value: 'UI/UX · System Planning & PM' },
  ],
  location: 'Istanbul, Turkey',
  avatarUrl: '/assets/avatar.jpg',
  cvUrl: '/assets/docs/cv.pdf',
  socials: {
    github: 'https://github.com/Aygen5',
    linkedin: 'https://www.linkedin.com/in/aygenyildirim',
    email: 'mailto:aygenyildirim27@gmail.com',
    emailAddress: 'aygenyildirim27@gmail.com',
  },
  signatureQuotes: [
    {
      title: 'I don’t just learn. I build.',
      body: 'Every technology on this page exists here because I used it to ship something — not because I watched a course about it.',
    },
    {
      title: 'Architecture & Aesthetics',
      body: 'I care about how an application looks, but I care just as much about how it works underneath.',
    },
  ],
};

export const KEY_FOCUS_AREAS: FocusArea[] = [
  {
    icon: '🌐',
    title: 'Full-Stack & Backend Architecture',
    bullets: [
      'RESTful Web APIs with ASP.NET Core (.NET) and Node.js / Express.',
      'Relational & NoSQL modeling with PostgreSQL, MongoDB, and EF Core.',
      'Modular frontend interfaces with React, TypeScript, JavaScript, and Tailwind CSS.',
    ],
  },
  {
    icon: '📱',
    title: 'Mobile & Cross-Platform (Flutter)',
    bullets: [
      'Production-ready cross-platform apps built with Flutter & Dart.',
      'Reactive state management using BLoC, Cubit, and Riverpod.',
      'Firebase integration, Hive offline storage, and 400+ automated tests.',
    ],
  },
  {
    icon: '📐',
    title: 'System Design & Project Planning',
    bullets: [
      'Clean Architecture, CQRS/MediatR, N-Tier isolation, and SOLID principles.',
      'Structuring roadmaps, milestones, and sprint backlogs before coding.',
      'Bridging business goals with clean, maintainable team repositories.',
    ],
  },
  {
    icon: '⚡',
    title: 'SAP, UI/UX & Modern Workflow',
    bullets: [
      'Exploring enterprise business processes and integrations with SAP technologies.',
      'Crafting user-centric UI/UX hierarchies and tactile micro-interactions.',
      'Docker containerization, GitHub Actions CI/CD, and AI-assisted testing.',
    ],
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    period: 'Oct 2023 – Jun 2028 (Expected)',
    institution: 'Istanbul Nişantaşı University',
    role: 'B.Sc. in Software Engineering (100% English Curriculum)',
    location: 'Istanbul, Turkey',
    description:
      'Focusing on software architecture, data structures, relational databases, and project engineering. Completed 1-Year English Prep (C1) and active in the AI & Data Club.',
    tags: ['Software Engineering', '100% English', 'OOP & Architecture', 'AI & Data Club'],
  },
  {
    period: 'Sep 2026 – Nov 2026 · 320 Hours',
    institution: 'SoftITO Software & IT Academy (İTO)',
    role: 'Mobile Application Developer (Flutter & Dart)',
    location: 'Istanbul, Turkey · On-site & Online',
    description:
      'Completed intensive 320-hour Flutter training at World Trade Center Istanbul. Led sprint planning and Clean Architecture in capstone builds (NESTORA & PawCare) with BLoC/Riverpod and CI/CD.',
    tags: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC / Cubit', 'Riverpod', 'Team Lead'],
    certificateUrl: '/assets/certificates/softito-mobile.pdf',
    certificateLabel: 'View Certificate (PDF)',
  },
  {
    period: 'Aug 17 – Sep 11, 2026',
    institution: 'TalentCoders TechCamp (4th Year)',
    role: 'Software Engineering TechCamp Participant',
    location: 'Verified by Globallycheck',
    description:
      'Collaborated with industry mentors across system design, modern architecture workshops, and real-world engineering problem solving.',
    tags: ['System Design', 'Architecture Workshops', 'Industry Mentorship'],
    certificateUrl: '/assets/certificates/talentcoders-techcamp.jpg',
    certificateLabel: 'View Certificate',
  },
  {
    period: 'Jan 2026 – Jun 2026 · 96 Hours',
    institution: 'Acun Medya Academy & Nişantaşı Univ. SEM',
    role: 'Software Flex Backend Development Bootcamp',
    location: 'Istanbul, Turkey (Remote)',
    description:
      'Built production-grade C# and ASP.NET Core REST APIs with Clean Architecture, EF Core, PostgreSQL, JWT auth, Docker, and xUnit automated test suites.',
    tags: ['C#', '.NET Core', 'ASP.NET Core', 'PostgreSQL', 'Clean Architecture', 'Docker'],
    certificateUrl: '/assets/certificates/acunmedya-backend.pdf',
    certificateLabel: 'View Certificate (PDF)',
  },
];

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    title: 'Backend & System Architecture',
    subtitle: 'Clean boundaries, scalable REST APIs, and strict domain isolation.',
    items: [
      { name: 'C# & .NET Core', note: 'Primary backend stack for scalable enterprise services and APIs.' },
      { name: 'ASP.NET Core Web API', note: 'Built REST APIs with JWT auth, custom middlewares, and SignalR hubs.' },
      { name: 'Node.js & Express', note: 'Fast TypeScript REST backends with clean layered architecture.' },
      { name: 'Clean Architecture', note: 'Strict inward dependency rule separating Domain, Application, and Infrastructure.' },
      { name: 'CQRS & MediatR', note: 'Command/query separation in real-time emergency response systems.' },
      { name: 'Entity Framework Core', note: 'Code-first migrations, Unit of Work, and optimized LINQ queries.' },
      { name: 'SignalR WebSockets', note: 'Sub-100ms live vehicle telemetry and real-time event streaming.' },
    ],
  },
  {
    title: 'Frontend & Mobile Engineering',
    subtitle: 'Responsive web interfaces and fluid cross-platform Flutter applications.',
    items: [
      { name: 'React', note: 'Component-driven SPA architectures with reusable design tokens.' },
      { name: 'TypeScript', note: 'End-to-end strict typing across both frontend and backend codebases.' },
      { name: 'JavaScript (ES6+)', note: 'Core language fluency for dynamic UI logic and async data flows.' },
      { name: 'HTML5 & CSS3', note: 'Semantic markup, responsive layouts, custom animations, and accessibility.' },
      { name: 'Tailwind CSS', note: 'Custom token-based design systems with Warm Light & Warm Dark themes.' },
      { name: 'Flutter', note: '320+ hours engineering cross-platform mobile apps with custom UI.' },
      { name: 'Dart', note: 'Strongly-typed reactive mobile programming and clean domain modeling.' },
      { name: 'BLoC / Cubit & Riverpod', note: 'Predictable, highly testable state management for Flutter apps.' },
      { name: 'Redux Toolkit', note: 'Normalized state slices for multi-view financial dashboards.' },
    ],
  },
  {
    title: 'Databases, Storage & Enterprise (SAP)',
    subtitle: 'Relational SQL, document NoSQL, geospatial queries, and enterprise ERP.',
    items: [
      { name: 'PostgreSQL', note: 'Primary relational database for transactional .NET and full-stack systems.' },
      { name: 'MongoDB', note: 'Document-oriented NoSQL database modeling for flexible, high-speed data.' },
      { name: 'PostGIS', note: 'Geospatial indexing and nearest-unit matching in Aura Crisis Network.' },
      { name: 'SQLite & Hive NoSQL', note: 'Embedded relational persistence and offline-first mobile storage.' },
      { name: 'Firebase & Redis', note: 'Cloud authentication, real-time sync, and fast caching layers.' },
      { name: 'SAP Technologies', note: 'Exploring enterprise business process flows and ERP integrations.' },
    ],
  },
  {
    title: 'DevOps, Testing & Project Management',
    subtitle: 'Planning before coding, container parity, and automated quality gates.',
    items: [
      { name: 'Project Planning & PM', note: 'Structuring architecture specs, roadmaps, and sprint backlogs before coding.' },
      { name: 'UI/UX Design & Figma', note: 'Translating user-centric prototypes into warm, intuitive interfaces.' },
      { name: 'xUnit & Testcontainers', note: '100% use-case unit test coverage and Dockerized DB integration tests.' },
      { name: 'Flutter Automated Tests', note: 'Authored 428 passing unit, widget, and BLoC tests in NESTORA.' },
      { name: 'Docker & GitHub Actions', note: 'Containerized local/cloud parity and automated CI/CD pipelines.' },
      { name: 'AI-Augmented Workflow', note: 'Using AI tools for rapid testing and iteration while keeping architecture human-crafted.' },
    ],
  },
];
