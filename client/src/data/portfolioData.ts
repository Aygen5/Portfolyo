import { EducationItem, FocusArea, TechCategory } from '../domain/models';

export const PROFILE_DATA = {
  name: 'Aygen Yıldırım',
  handle: '@aygenyildirim',
  headline: 'Building thoughtful things with code & creativity.',
  heroIntro:
    'Software Engineering student (3rd Year), Full-Stack & Backend-Focused Developer, and someone who enjoys turning complex ideas into clean, meaningful digital experiences.',
  statusBadge: 'Open to internships & engineering roles',
  currentActivity: '✨ Currently: Architecting .NET / Node.js backends & exploring SAP technologies',
  bio: '3rd-year Software Engineering student (100% English) focused on Full-Stack & Backend engineering (.NET Core, Node.js), cross-platform mobile apps (Flutter), and enterprise SAP technologies — guided by Clean Architecture, thoughtful UI/UX, and disciplined project planning.',
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
  aboutParagraphs: [
    'As a 3rd-year Software Engineering student (100% English curriculum), I focus on Full-Stack Development with a strong emphasis on backend architecture. I build resilient, scalable systems using ASP.NET Core (.NET) and Node.js / Express on the backend, paired with intuitive, responsive React and TypeScript interfaces on the frontend.',
    'Beyond core web engineering, I develop production-ready cross-platform mobile applications with Flutter & Dart (BLoC / Cubit) and actively expand my expertise in enterprise business solutions integrated with SAP technologies. With a strong sensitivity for UI/UX design, I ensure visual hierarchy and micro-interactions directly elevate software utility.',
    'I firmly believe that great software starts with Clean Architecture, clear planning, and disciplined project management long before writing the first line of code. Throughout my daily workflow, I purposefully leverage AI developer tools to accelerate debugging, testing, and iteration while keeping domain logic and system design strictly human-crafted.',
  ],
};

export const KEY_FOCUS_AREAS: FocusArea[] = [
  {
    icon: '🌐',
    title: 'Full-Stack & Backend System Design',
    bullets: [
      'Developing RESTful Web APIs with ASP.NET Core (.NET) and Node.js / Express.',
      'Database modeling, spatial/indexed queries, and ORM pipelines with PostgreSQL, EF Core & Prisma.',
      'State handling with Redux Toolkit and modular component architecture in React & TypeScript.',
      'Translating warm, accessible UI/UX systems into responsive Tailwind CSS interfaces.',
    ],
  },
  {
    icon: '📱',
    title: 'Mobile & Cross-Platform Engineering',
    bullets: [
      'Building high-performance cross-platform mobile apps with Flutter & Dart.',
      'Managing reactive data flows with BLoC, Cubit, and Riverpod state architectures.',
      'Integrating Firebase cloud services and offline-first local storage (Hive NoSQL).',
      'Applying comprehensive Unit, Widget, and BLoC automated test suites.',
    ],
  },
  {
    icon: '📐',
    title: 'Clean Architecture & Project Management',
    bullets: [
      'Applying Clean Architecture, CQRS/MediatR, N-Tier separation, and SOLID principles.',
      'Structuring project milestones, roadmaps, and sprint backlogs before coding.',
      'Enforcing code readability, data isolation, and maintainability across team repositories.',
      'Aligning business requirements with realistic technical execution plans.',
    ],
  },
  {
    icon: '⚡',
    title: 'Enterprise SAP & Modern Multipliers',
    bullets: [
      'Exploring enterprise business process flows and system integrations with SAP technologies.',
      'Containerizing runtimes and orchestrating consistent environments with Docker.',
      'Accelerating debugging, refactoring, and automated testing with AI-assisted workflows.',
      'Managing version control with structured Git branching strategies and GitHub Actions CI/CD.',
    ],
  },
];

export const EDUCATION_TIMELINE: EducationItem[] = [
  {
    period: 'Oct 2023 – Jun 2028 (Expected) · 3rd Year',
    institution: 'Istanbul Nişantaşı University',
    role: 'B.Sc. in Software Engineering (100% English Curriculum)',
    location: 'Istanbul, Turkey',
    description:
      'Pursuing a Bachelor’s degree in Software Engineering with coursework spanning object-oriented programming, data structures, relational databases, software architecture, and project management. Completed a 1-year intensive English Preparatory Program (B2/C1 proficiency) and serve as an active member of the Artificial Intelligence & Data Club.',
    tags: ['Software Engineering', '100% English (C1)', 'OOP & Data Structures', 'AI & Data Club'],
  },
  {
    period: 'Sep 2026 – Nov 2026 · 320 Hours',
    institution: 'SoftITO Software & IT Academy (Istanbul Chamber of Commerce - İTO)',
    role: 'Mobile Application Developer Program (Flutter & Dart)',
    location: 'Istanbul, Turkey · On-site (World Trade Center) & Online',
    description:
      'Successfully completed the intensive 320-hour Mobile Application Development program organized by the Istanbul Chamber of Commerce (İTO). Gained advanced proficiency in Dart, Clean Architecture, reactive state management with BLoC/Cubit and Riverpod, offline-first local persistence, and CI/CD pipelines. Led sprint lifecycles and architectural planning in both individual capstone builds (NESTORA) and enterprise-scale collaborative team projects (PawCare).',
    tags: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC / Cubit', 'Riverpod', 'Offline-First', 'Team Leadership'],
    certificateUrl: '/assets/certificates/softito-mobile.pdf',
    certificateLabel: 'View SoftITO Certificate (PDF)',
  },
  {
    period: 'Aug 17, 2026 – Sep 11, 2026',
    institution: 'TalentCoders TechCamp (4th Year)',
    role: 'TechCamp Software Engineering Participant',
    location: 'Turkey · Verified by Globallycheck',
    description:
      'Selected participant in the 4th annual TalentCoders TechCamp program, collaborating with industry mentors and engineering peers across modern software development practices, architecture workshops, and technical problem solving.',
    tags: ['Software Engineering', 'Industry Mentorship', 'System Design', 'Collaborative Workshops'],
    certificateUrl: '/assets/certificates/talentcoders-techcamp.jpg',
    certificateLabel: 'View TechCamp Certificate',
  },
  {
    period: 'Jan 2026 – Jun 2026 · 96 Hours',
    institution: 'Acun Medya Academy & Istanbul Nişantaşı University SEM',
    role: 'Software Flex Backend Development Training (C# & .NET)',
    location: 'Istanbul, Turkey (Remote)',
    description:
      'Completed 96 hours of hands-on backend engineering training focused on building production-grade RESTful APIs with C# and ASP.NET Core. Applied Clean Architecture and N-Tier patterns, integrated Entity Framework Core with PostgreSQL, implemented JWT authentication and central exception middleware, and containerized services with Docker and xUnit test suites.',
    tags: ['C#', '.NET Core', 'ASP.NET Core', 'EF Core', 'PostgreSQL', 'Clean Architecture', 'Docker', 'xUnit'],
    certificateUrl: '/assets/certificates/acunmedya-backend.pdf',
    certificateLabel: 'View Backend Certificate (PDF)',
  },
];

export const TECH_STACK_CATEGORIES: TechCategory[] = [
  {
    title: 'Backend & System Architecture',
    subtitle: 'My primary focus: clean boundaries, scalable APIs, and domain isolation.',
    items: [
      { name: 'C# & .NET Core', note: 'Primary backend ecosystem for building high-performance enterprise services.' },
      { name: 'ASP.NET Core Web API', note: 'Built RESTful APIs with JWT auth, custom middlewares, and SignalR hubs.' },
      { name: 'Node.js & Express', note: 'Lightweight TypeScript REST backends with Zod validation and Prisma ORM.' },
      { name: 'Clean Architecture', note: 'Strict inward dependency rule separating Domain, Application, and Infrastructure.' },
      { name: 'CQRS & MediatR', note: 'Applied command/query separation in real-time operational platforms.' },
      { name: 'Entity Framework Core', note: 'Code-first migrations, Unit of Work, and indexed LINQ query pipelines.' },
      { name: 'Prisma ORM', note: 'Type-safe database schema modeling and repository mappers in TypeScript.' },
      { name: 'SignalR WebSockets', note: 'Real-time vehicle telemetry and sub-100ms live command streaming.' },
    ],
  },
  {
    title: 'Frontend & Mobile Engineering',
    subtitle: 'Crafting warm, responsive web interfaces and fluid cross-platform apps.',
    items: [
      { name: 'React & TypeScript', note: 'Component-driven SPA architectures with strict end-to-end typing.' },
      { name: 'Flutter & Dart', note: '320+ hours building cross-platform mobile apps with custom UI & animations.' },
      { name: 'BLoC / Cubit & Riverpod', note: 'Predictable, testable reactive state management in Flutter applications.' },
      { name: 'Redux Toolkit', note: 'Normalized client state slices for complex financial dashboards.' },
      { name: 'Tailwind CSS', note: 'Token-based design systems with custom Warm Light & Warm Dark themes.' },
      { name: 'Framer Motion', note: 'Tactile micro-interactions, tab transitions, and accessible motion.' },
    ],
  },
  {
    title: 'Databases, Storage & Enterprise',
    subtitle: 'Relational modeling, geospatial indexing, offline storage, and SAP exploration.',
    items: [
      { name: 'PostgreSQL', note: 'Primary relational database for production .NET and full-stack platforms.' },
      { name: 'PostGIS', note: 'Geospatial indexing and nearest-unit proximity matching in Aura Crisis Network.' },
      { name: 'SQLite', note: 'Zero-config embedded relational persistence for lightweight full-stack apps.' },
      { name: 'Hive NoSQL & Firebase', note: 'Offline-first mobile data caching, cloud sync, and authentication.' },
      { name: 'SAP Technologies', note: 'Actively exploring enterprise business processes and ERP system integrations.' },
    ],
  },
  {
    title: 'DevOps, Testing & Project Planning',
    subtitle: 'Engineering discipline that keeps codebases reliable and teams aligned.',
    items: [
      { name: 'xUnit & Testcontainers', note: '100% use-case unit test coverage and real Dockerized DB integration tests.' },
      { name: 'Flutter Automated Tests', note: 'Authored 428 passing unit, widget, and BLoC tests in NESTORA.' },
      { name: 'Docker & Docker Compose', note: 'Containerizing APIs and databases for reproducible local/cloud parity.' },
      { name: 'Git & GitHub Actions', note: 'Clean commit history, feature branching, and automated CI/CD pipelines.' },
      { name: 'Project Planning & Roadmaps', note: 'Structuring milestones, architecture specs, and sprint backlogs before coding.' },
      { name: 'AI-Augmented Workflow', note: 'Using AI tools as a velocity multiplier while keeping architecture human-crafted.' },
    ],
  },
];
