import { CreateProjectInput } from '../src/domain/entities/Project';
import { CreatePostInput } from '../src/domain/entities/Post';
import { CreateGuestbookInput } from '../src/domain/entities/GuestbookEntry';

export const SEED_PROJECTS: (CreateProjectInput & { initialLikes: number })[] = [
  {
    slug: 'aura-crisis-network',
    title: 'Aura Crisis Network',
    subtitle: 'Real-Time Crisis Management & Emergency Response Command Platform',
    category: 'fullstack',
    summary:
      'A real-time command center platform unifying automated seismic data ingestion, incident reporting, and PostGIS geospatial nearest-unit matching with sub-100ms SignalR telemetry.',
    overview:
      'Aura Crisis Network is a real-time emergency response and command platform designed to coordinate field units, seismic alerts, and incident reports on a live operational map. Built with ASP.NET Core, CQRS/MediatR, SignalR, PostGIS, and a typed React client.',
    problem:
      'During emergencies, incident reports, sensor feeds, and field unit locations arrive asynchronously across disconnected channels, making nearest-unit dispatch slow and error-prone.',
    goal:
      'Unify automated seismic ingestion, geospatial proximity matching, and real-time telemetry streaming into a single command center capable of 60fps map rendering and deterministic dispatch.',
    solution:
      'Engineered an ASP.NET Core backend structured with CQRS and MediatR, leveraging PostgreSQL/PostGIS spatial indexing for nearest-unit queries and SignalR WebSockets for live vehicle telemetry.',
    techStack: [
      'C#',
      '.NET Core',
      'ASP.NET Core',
      'CQRS & MediatR',
      'SignalR',
      'PostGIS',
      'PostgreSQL',
      'React',
      'TypeScript',
      'Docker',
    ],
    highlights: [
      'Real-time SignalR telemetry (<100ms latency)',
      'PostGIS geospatial nearest-unit matching',
      '83 automated tests (61 unit + 22 Testcontainers integration)',
      'CQRS & MediatR clean command/query pipeline',
    ],
    architecture: {
      layers: [
        { name: 'Presentation (API & SignalR Hubs)', text: 'REST endpoints and real-time WebSocket hubs for live telemetry and alerts.' },
        { name: 'Application (CQRS & MediatR)', text: 'Isolated Commands, Queries, and validation handlers.' },
        { name: 'Domain', text: 'Core emergency response entities, geospatial value objects, and dispatch rules.' },
        { name: 'Infrastructure (EF Core & PostGIS)', text: 'Spatial queries, background seismic ingestion workers, and Dockerized persistence.' },
      ],
      note: 'Strict inward dependency flow verified with 83 unit and Testcontainers integration tests.',
    },
    features: [
      { label: 'Geospatial Dispatch', text: 'Matches incidents to the closest available response unit using PostGIS spatial indexing.' },
      { label: 'Live Telemetry Stream', text: 'Streams vehicle coordinates via SignalR with client-side throttled 60fps rendering.' },
      { label: 'Automated Seismic Ingestion', text: 'Background workers ingest and normalize earthquake feeds in real time.' },
    ],
    challenges: [
      { label: 'High-frequency WebSocket backpressure', text: 'Solved by batching SignalR broadcasts and applying requestAnimationFrame throttling on the React map layer.' },
      { label: 'Deterministic spatial integration tests', text: 'Used Testcontainers with a real PostGIS container to test spatial queries end-to-end.' },
    ],
    learned: [
      'Spatial indexing in PostGIS outperforms in-memory distance calculations by an order of magnitude under load.',
      'Real-time UI smoothness depends as much on client render throttling as on backend socket throughput.',
    ],
    imageUrl: '/assets/projects/aura-command-center.png',
    secondaryImageUrl: null,
    liveUrl: null,
    repoUrl: 'https://github.com/Aygen5/Aura-Crisis-Network',
    sortOrder: 1,
    initialLikes: 42,
  },
  {
    slug: 'financefocus',
    title: 'FinanceFocus',
    subtitle: 'Personal Finance Management & Deterministic Forecast Platform',
    category: 'fullstack',
    summary:
      'An end-to-end personal finance platform featuring income-expense tracking, automated recurring payment instructions, net worth analytics, and a rule-driven financial forecast engine.',
    overview:
      'FinanceFocus gives users a single, honest picture of their money: what comes in, what goes out, what is scheduled, what is invested, and where balances are heading over the coming months.',
    problem:
      'Most budgeting tools only log past transactions. They answer "what did I spend?" but fail to project future balances when recurring obligations and investments interact.',
    goal:
      'Combine daily transaction tracking, automatic payment instructions, investment tracking, and forward-looking cash-flow forecasting in a modular full-stack architecture.',
    solution:
      'Built a structured ASP.NET Core REST API backed by indexed PostgreSQL queries and EF Core, paired with a React + TypeScript + Redux Toolkit client reading from a normalized state store.',
    techStack: [
      'C#',
      '.NET / ASP.NET Core',
      'EF Core',
      'PostgreSQL',
      'React',
      'TypeScript',
      'Redux Toolkit',
      'Tailwind CSS',
      'Docker',
    ],
    highlights: [
      'Rule-driven deterministic financial forecast engine',
      'Automated recurring payment instructions',
      'Investment & net worth analytics dashboard',
      'Normalized Redux Toolkit state architecture',
    ],
    architecture: {
      layers: [
        { name: 'React + Redux Toolkit Client', text: 'Typed API client and normalized slices shared across dashboard, reports, and forecast views.' },
        { name: 'ASP.NET Core Web API', text: 'Domain-aligned controllers for accounts, transactions, payment instructions, and reports.' },
        { name: 'Application & Forecast Engine', text: 'Deterministic projection rules calculating future balances from history and recurring schedules.' },
        { name: 'EF Core & PostgreSQL', text: 'Relational schema with composite indexes for fast date-range aggregations.' },
      ],
      note: 'Designed so new financial modules plug into existing account and transaction contracts.',
    },
    features: [
      { label: 'Deterministic Forecast Engine', text: 'Projects upcoming monthly balances from historical trends and scheduled instructions without black-box guesses.' },
      { label: 'Recurring Payment Automation', text: 'Defines recurring obligations once and factors them automatically into cash-flow views.' },
      { label: 'Net Worth & Investment Tracking', text: 'Consolidates liquid accounts and asset holdings into a unified visual breakdown.' },
    ],
    challenges: [
      { label: 'Keeping dashboard and forecast in sync', text: 'Normalized Redux state so a single transaction edit updates balances, charts, and projections simultaneously.' },
      { label: 'Fast multi-month aggregations', text: 'Moved heavy grouping logic into indexed PostgreSQL queries via EF Core projections.' },
    ],
    learned: [
      'Deterministic domain rules are far easier to trust, debug, and unit-test in financial software than opaque heuristics.',
      'A typed contract between ASP.NET Core DTOs and TypeScript slices eliminates an entire class of UI bugs.',
    ],
    imageUrl: '/assets/projects/financefocus-dashboard.png',
    secondaryImageUrl: null,
    liveUrl: null,
    repoUrl: 'https://github.com/Aygen5/financefocus',
    sortOrder: 2,
    initialLikes: 38,
  },
  {
    slug: 'nestora',
    title: 'NESTORA',
    subtitle: 'Clean Architecture Smart Home Management Platform',
    category: 'mobile',
    summary:
      'A sleek, responsive Flutter smart home platform for managing rooms, connected devices, and one-tap daily routines — backed by Clean Architecture, BLoC/Cubit, and 428 passing tests.',
    overview:
      'NESTORA simplifies smart home management by replacing cluttered device menus with intuitive room views, climate/lighting controls, and instant life scenarios.',
    problem:
      'Many smart home apps bury everyday actions under deep navigation trees and suffer from inconsistent state when toggling multiple room devices rapidly.',
    goal:
      'Deliver a fluid cross-platform Flutter application with rock-solid reactive state management, offline resilience, and 100% verified test coverage across core flows.',
    solution:
      'Architected with Clean Architecture and BLoC/Cubit state management in Flutter & Dart, separating UI widgets from device domain logic and validating quality with 428 automated tests.',
    techStack: [
      'Flutter',
      'Dart',
      'BLoC / Cubit',
      'Clean Architecture',
      'Automated Testing (428 Tests)',
      'Custom UI & Micro-interactions',
    ],
    highlights: [
      '428 automated tests passing (100% pass rate, 0 analyzer issues)',
      'Reactive device & room state via BLoC / Cubit',
      'One-tap smart home scenarios & climate controls',
      'Strict Clean Architecture layer separation',
    ],
    architecture: {
      layers: [
        { name: 'Presentation (Flutter UI & BLoC/Cubit)', text: 'Reactive screens for dashboard, room details, and device controls.' },
        { name: 'Domain (Entities & Use Cases)', text: 'Pure Dart models for rooms, smart devices, and automation routines.' },
        { name: 'Data (Repositories & Local Storage)', text: 'State persistence and device state synchronization adapters.' },
      ],
      note: 'Zero lint/analysis issues with comprehensive unit, widget, and BLoC state tests.',
    },
    features: [
      { label: 'Room & Device Orchestration', text: 'Granular control over lighting, AC temperature, smart plugs, and appliances per room.' },
      { label: 'One-Tap Scenarios', text: 'Configure whole-home states for arriving home, working, or going to sleep.' },
      { label: 'Enterprise Test Suite', text: '428 passing tests covering BLoC transitions, domain use cases, and UI components.' },
    ],
    challenges: [
      { label: 'Synchronizing multi-device room summaries', text: 'Modeled immutable room states in Cubit so toggling a single lamp immediately recalculates active device counters.' },
    ],
    learned: [
      'Pairing BLoC/Cubit with Clean Architecture makes writing 400+ fast, deterministic tests genuinely enjoyable.',
    ],
    imageUrl: '/assets/projects/nestora-showcase.png',
    secondaryImageUrl: '/assets/projects/nestora-welcome-showcase.png',
    liveUrl: null,
    repoUrl: 'https://github.com/Aygen5/NESTORA',
    sortOrder: 3,
    initialLikes: 35,
  },
  {
    slug: 'productiq',
    title: 'ProductIQ',
    subtitle: 'AI-Powered Product Intelligence, Duplicate Detection & Search Relevance Platform',
    category: 'fullstack',
    summary:
      'A catalog intelligence platform that detects duplicate product listings, evaluates search query relevance, and scores catalog quality with an interactive live dashboard.',
    overview:
      'ProductIQ helps e-commerce and catalog teams identify near-duplicate products, audit search ranking relevance, and clean up noisy product metadata through explainable scoring.',
    problem:
      'Growing product catalogs accumulate duplicate listings with slightly different titles or attributes, degrading search relevance and confusing shoppers.',
    goal:
      'Provide a transparent, interactive workspace to detect duplicate candidates, compare similarity signals side-by-side, and measure search relevance.',
    solution:
      'Combined structured C# / .NET catalog analysis logic with a responsive React + TypeScript analytics interface deployed live on Vercel.',
    techStack: [
      'C#',
      '.NET',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Search Relevance & Similarity',
      'Vercel',
    ],
    highlights: [
      'Explainable duplicate detection with similarity breakdown',
      'Search query relevance auditing dashboard',
      'Side-by-side product attribute comparison',
      'Live interactive deployment on Vercel',
    ],
    architecture: {
      layers: [
        { name: 'Interactive Analytics UI', text: 'Dashboard, duplicate comparison views, and search relevance inspector.' },
        { name: 'Catalog Intelligence Engine', text: 'Tokenization, attribute similarity scoring, and duplicate clustering rules.' },
      ],
      note: 'Built for explainability so operators see exactly why two products were flagged as duplicates.',
    },
    features: [
      { label: 'Duplicate Detection Inspector', text: 'Flags near-duplicate SKUs and highlights matching vs. diverging attributes.' },
      { label: 'Search Relevance Scoring', text: 'Evaluates how well catalog items match target user queries.' },
      { label: 'Catalog Health Overview', text: 'Visualizes data completeness, duplicate ratios, and priority cleanup queues.' },
    ],
    challenges: [
      { label: 'Avoiding false-positive duplicate flags', text: 'Weighted model numbers, brand tokens, and key specs separately from generic marketing adjectives.' },
    ],
    learned: [
      'Users trust automated data-cleaning tools much more when every score is paired with a clear human-readable explanation.',
    ],
    imageUrl: '/assets/projects/productiq-dashboard.png',
    secondaryImageUrl: '/assets/projects/productiq-duplicate.png',
    liveUrl: 'https://product-iq-henna.vercel.app/',
    repoUrl: 'https://github.com/Aygen5/ProductIQ',
    sortOrder: 4,
    initialLikes: 31,
  },
  {
    slug: 'projectgym',
    title: 'ProjectGym',
    subtitle: 'Clean Architecture Gym Management Backend REST API',
    category: 'backend',
    summary:
      'A four-layer Clean Architecture REST API in ASP.NET Core for gym membership lifecycles, trainer scheduling, and server-side capacity enforcement with 100% application use-case test coverage.',
    overview:
      'ProjectGym is a backend engineering project focused on strict Clean Architecture boundaries: keeping core domain rules completely independent of EF Core, HTTP controllers, and infrastructure.',
    problem:
      'In many backend services, business rules leak into controllers or EF Core entities, making unit testing impossible without spinning up a database.',
    goal:
      'Build an authenticated, containerized .NET REST API where every business rule lives in a framework-free Domain/Application core with 100% unit test coverage over use cases.',
    solution:
      'Split the solution into Domain, Application, Infrastructure, and API layers using Repository + Unit of Work patterns, ASP.NET Core Identity, PostgreSQL, xUnit, and Docker.',
    techStack: [
      'C#',
      '.NET Core',
      'ASP.NET Core Web API',
      'Clean Architecture',
      'EF Core',
      'PostgreSQL',
      'Unit of Work',
      'xUnit',
      'Docker',
    ],
    highlights: [
      '100% xUnit test coverage across application use cases',
      'Framework-free Domain layer with strict inward dependencies',
      'Repository & Unit of Work transactional consistency',
      'Role-based authorization with ASP.NET Core Identity',
    ],
    architecture: {
      layers: [
        { name: 'API Layer', text: 'Thin controllers, request/response DTOs, and authentication middleware.' },
        { name: 'Application Layer', text: 'Use cases, service abstractions, and business rule orchestration.' },
        { name: 'Domain Layer', text: 'Pure C# entities and invariants with zero external package references.' },
        { name: 'Infrastructure Layer', text: 'EF Core, PostgreSQL migrations, Identity, and Unit of Work implementation.' },
      ],
      note: 'Dependencies point strictly inward: Infrastructure and API depend on Application and Domain — never the reverse.',
    },
    features: [
      { label: 'Membership Lifecycle Rules', text: 'Enforces active membership validity and tier rules before allowing bookings.' },
      { label: 'Class Capacity Enforcement', text: 'Prevents overbooking and trainer scheduling conflicts inside transactional use cases.' },
      { label: 'Containerized Parity', text: 'Docker Compose setup running ASP.NET Core and PostgreSQL with automated migrations.' },
    ],
    challenges: [
      { label: 'Keeping EF Core out of Domain', text: 'Enforced clean persistence interfaces so domain invariants run in milliseconds inside xUnit without a database.' },
      { label: 'Explicit multi-repository transactions', text: 'Used Unit of Work so booking creation and capacity decrement commit atomically.' },
    ],
    learned: [
      'Architecture is a decision about where change is allowed to hurt — layers only pay off when the dependency rule is strictly enforced.',
    ],
    imageUrl: '/assets/projects/projectgym.jpg',
    secondaryImageUrl: null,
    liveUrl: null,
    repoUrl: 'https://github.com/Aygen5/ProjectGym',
    sortOrder: 5,
    initialLikes: 29,
  },
  {
    slug: 'pawcare',
    title: 'PawCare',
    subtitle: 'Pet Care, Dog Hotel & Digital Health Passport Mobile Platform',
    category: 'mobile',
    summary:
      'A dual-sided Flutter mobile platform connecting dog owners with verified pet hotels, daycares, and walkers — featuring a digital vaccination passport, offline-first Hive NoSQL storage, and BLoC state management.',
    overview:
      'Developed during the SoftITO Mobile App Developer program, PawCare brings peace of mind to pet parents with transparent booking, verified caregiver profiles, and digital health records.',
    problem:
      'Pet owners struggle with fragmented booking channels, paper vaccination cards, and lack of real-time transparency when leaving their dogs with sitters or hotels.',
    goal:
      'Create a warm, trustworthy cross-platform mobile experience uniting pet profiles, digital health passports, and booking workflows in a modular Feature-First Clean Architecture.',
    solution:
      'Built with Flutter, Dart, BLoC/Cubit, and Hive NoSQL local persistence, enabling responsive offline-capable access to pet health records and reservations.',
    techStack: [
      'Flutter',
      'Dart',
      'BLoC / Cubit',
      'Clean + Feature-First Architecture',
      'Hive NoSQL',
      'Collaborative Agile Workflow',
    ],
    highlights: [
      'Feature-First + Clean Architecture modular codebase',
      'Digital Pet Health & Vaccination Passport',
      'Offline-first local persistence with Hive NoSQL',
      'Dual-sided flow for Dog Owners & Care Providers',
    ],
    architecture: {
      layers: [
        { name: 'Feature Presentation (BLoC / Cubit)', text: 'Modular screens for hotel discovery, booking flows, and pet health profiles.' },
        { name: 'Domain Layer', text: 'Core booking rules, pet passport models, and repository contracts.' },
        { name: 'Data Layer (Hive NoSQL)', text: 'Fast local NoSQL caching and persistence for offline reliability.' },
      ],
      note: 'Built in a collaborative team workflow with strict Git branching, code reviews, and modular feature ownership.',
    },
    features: [
      { label: 'Digital Health Passport', text: 'Stores vaccination history, allergies, and vet notes in the owner’s pocket.' },
      { label: 'Verified Hotel & Walker Booking', text: 'Transparent pricing, facility photos, and instant reservation flows.' },
      { label: 'Offline-First Hive Storage', text: 'Ensures critical pet medical info and active bookings remain accessible without connectivity.' },
    ],
    challenges: [
      { label: 'Coordinating parallel feature development', text: 'Adopted a strict Feature-First + Clean Architecture layout so team members could build modules without merge conflicts.' },
    ],
    learned: [
      'Clear upfront architecture and sprint planning multiply a team’s velocity far more than rushing straight into code.',
    ],
    imageUrl: '/assets/projects/pawcare-showcase.png',
    secondaryImageUrl: '/assets/projects/pawcare-detail-showcase.png',
    liveUrl: null,
    repoUrl: 'https://github.com/Aygen5/PawCare',
    sortOrder: 6,
    initialLikes: 27,
  },
];

export const SEED_POSTS: (CreatePostInput & { initialLikes: number })[] = [
  {
    mood: '🏗️',
    content:
      'I don’t just learn. I build. Every technology on this page exists here because I used it to ship something — not because I watched a course about it.',
    initialLikes: 54,
  },
  {
    mood: '🎨',
    content:
      'I care about how an application looks, but I care just as much about how it works underneath. Clean Architecture on the backend + warm micro-interactions on the frontend is my favorite combination.',
    initialLikes: 39,
  },
  {
    mood: '🚀',
    content:
      'Currently diving deeper into enterprise business processes with SAP technologies while sharpening my .NET Core, Node.js, and Flutter architecture skills.',
    initialLikes: 33,
  },
];

export const SEED_GUESTBOOK: CreateGuestbookInput[] = [
  {
    authorName: 'Studio Visitor',
    emoji: '☕',
    message: 'Love the warm editorial vibe and the Twitter-style project feed. The desk illustration feels so alive!',
  },
];

