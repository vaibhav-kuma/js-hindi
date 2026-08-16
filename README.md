# Vaibhav Kumar — Digital Engineering Lab Portfolio

An interactive, visually stunning portfolio website showcasing backend engineering, cybersecurity, and AI capabilities. Built with Next.js, Three.js, and cutting-edge web technologies.

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.172-white?style=flat-square&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

This is a full-stack portfolio application featuring:

- **Interactive 3D Visualizations** — Dynamic Three.js scenes showcasing architecture, data flows, and security systems
- **Project Universe** — An immersive 3D visualization of all projects and repositories
- **Smooth Animations** — Framer Motion and Lenis scroll interactions for fluid UI
- **Responsive Design** — Optimized for desktop, tablet, and mobile with adaptive quality
- **TypeScript-First** — Fully typed codebase with strict type checking
- **Performance Optimized** — Next.js App Router, code splitting, and quality-tiered 3D rendering

## Key Features

### 🎨 Visual Components
- **Hero Section** — Animated hero with 3D particle field effects
- **Skills Constellation** — Interactive visualization of technical skills and technologies
- **Projects Universe** — 3D repository visualization with dynamic node relationships
- **Architecture Section** — Detailed engineering diagrams and system architecture
- **Security Sphere** — Cybersecurity expertise visualized in 3D
- **Threat Radar** — Animated threat landscape visualization
- **Activity Stream** — Real-time engineering activity and updates
- **Contact Section** — Interactive contact interface with smooth animations

### ⚡ Performance Features
- **Adaptive Quality Tier System** — Automatically scales 3D quality based on device capability
- **WebGL Support Detection** — Graceful fallbacks for devices without WebGL support
- **Smooth Scroll** — Lenis scroll manager for smooth, frame-perfect scrolling
- **Reduced Motion Support** — Respects `prefers-reduced-motion` for accessibility

### 🔧 Technical Stack
- **Framework** — Next.js 15.1 with App Router
- **Language** — TypeScript with strict type checking
- **Styling** — Tailwind CSS + PostCSS
- **3D Graphics** — Three.js + React Three Fiber + Drei
- **Animations** — Framer Motion
- **UI Components** — Custom Reveal, Stagger, and Animation utilities
- **Development** — ESLint configuration with Next.js support

## Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── globals.css         # Global styles
│   │   └── projects/           # Dynamic project pages
│   ├── components/
│   │   ├── layout/             # Header, Footer, Providers
│   │   ├── sections/           # Page sections (Hero, About, Skills, etc.)
│   │   ├── projects/           # Project-specific components
│   │   ├── three/              # Three.js 3D components
│   │   ├── ui/                 # Reusable UI components
│   │   └── case-study/         # Case study components
│   ├── data/                   # Static data & configuration
│   │   ├── site.ts             # Global site configuration
│   │   ├── projects.ts         # Project registry & metadata
│   │   ├── skills.ts           # Technical skills data
│   │   ├── experience.ts       # Work experience
│   │   ├── architecture.ts     # System architecture data
│   │   └── activity.ts         # Activity feed data
│   ├── hooks/                  # Custom React hooks
│   │   ├── useDeviceTier.ts    # Device capability detection
│   │   ├── useInViewOnce.ts    # Intersection observer hook
│   │   ├── useMediaQuery.ts    # Media query hook
│   │   ├── usePrefersReducedMotion.ts  # Accessibility hook
│   │   └── useWebgl.ts         # WebGL support detection
│   ├── lib/                    # Utilities & helpers
│   │   ├── types.ts            # TypeScript type definitions
│   │   ├── animations.ts       # Animation utilities
│   │   ├── github.ts           # GitHub integration
│   │   ├── utils.ts            # General utilities
│   │   └── three/
│   │       └── quality.ts      # 3D quality settings
│   └── public/                 # Static assets
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.mjs           # ESLint configuration
└── package.json                # Dependencies & scripts
```

## Getting Started

### Prerequisites
- **Node.js** 18+ or 20+
- **npm**, **yarn**, **pnpm**, or **bun**
- A modern web browser with WebGL support (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vaibhav-kuma/js-hindi.git
   cd js-hindi
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   pnpm install
   bun install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   
   Update contact details in [src/data/site.ts](src/data/site.ts):
   - Replace `email` with your contact email
   - Replace `linkedinUrl` with your LinkedIn profile
   - Replace `resumeUrl` with your resume URL

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

The development server automatically:
- Hot-reloads changes
- Provides TypeScript error checking
- Includes ESLint integration

### Type Checking

Run TypeScript type checking without building:
```bash
npm run typecheck
```

### Linting

Check code for linting issues:
```bash
npm run lint
```

## Building & Deployment

### Production Build

Build the application for production:
```bash
npm run build
```

This optimizes:
- JavaScript bundles
- CSS
- Images and static assets
- 3D scene generation

### Running Production Build

After building, start the production server:
```bash
npm start
```

## Configuration

### Site Configuration
Edit [src/data/site.ts](src/data/site.ts) to customize:
- **Name & Brand** — Your name and branding
- **Role & Positioning** — Professional titles and positioning
- **Contact Information** — Email, LinkedIn, resume links
- **Navigation** — Main navigation menu items
- **Site URL** — Public URL for metadata and canonical links

### Project Registry
Edit [src/data/projects.ts](src/data/projects.ts) to:
- Add new projects
- Modify project metadata
- Update GitHub URLs and statistics
- Define project tiers and priority

### Skills & Experience
Configure professional background in:
- [src/data/skills.ts](src/data/skills.ts) — Technical skills and competencies
- [src/data/experience.ts](src/data/experience.ts) — Work experience and timeline

### 3D Quality Settings
Adjust 3D rendering quality in [src/lib/three/quality.ts](src/lib/three/quality.ts):
- Device tier detection thresholds
- Polygon counts
- Particle system densities
- Animation frame rates

## 3D Components

### Key Three.js Components

- **HeroScene** — Main hero section with particle field
- **ProjectUniverseScene** — 3D visualization of all projects
- **AITransformationEngine** — AI capabilities visualization
- **DataStream** — Real-time data flow visualization
- **SecuritySphere** — Cybersecurity expertise sphere
- **ThreatRadar** — Threat landscape radar
- **MonitoringGrid** — System monitoring visualization
- **RepositoryNode** — Individual repository visualization

### Device Tier System

The application automatically detects device capabilities and applies appropriate quality settings:

- **High Tier** — Full effects, high polygon counts, smooth animations
- **Medium Tier** — Reduced effects, optimized polygons
- **Low Tier** — Minimal effects, essential visuals only
- **Fallback** — Canvas/2D fallbacks for devices without WebGL

## Hooks & Utilities

### Custom Hooks

- `useDeviceTier()` — Detect device capability level (high/medium/low)
- `useInViewOnce()` — Trigger animations when elements enter viewport
- `useMediaQuery()` — Responsive media queries
- `usePrefersReducedMotion()` — Respect accessibility preferences
- `useWebgl()` — Detect WebGL support

### Animation Utilities

- Stagger animations for sequential element reveal
- Reveal components for fade-in effects
- Spring animations and transitions
- Scroll-triggered animations

## Performance Considerations

- **Code Splitting** — Automatic route-based code splitting with Next.js
- **Image Optimization** — Next.js Image component for optimized images
- **3D Optimization** — Adaptive quality based on device tier
- **Bundle Size** — Tree-shaking and dead code elimination
- **Caching** — Static generation and incremental static regeneration

## Accessibility

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles where appropriate
- ✅ Keyboard navigation support
- ✅ Reduced motion support via `prefers-reduced-motion`
- ✅ Color contrast compliance
- ✅ Screen reader friendly

## Browser Support

- **Chrome** 90+ (recommended)
- **Firefox** 88+
- **Safari** 15+
- **Edge** 90+

For best experience with 3D features, use a modern browser with:
- WebGL 2.0 support
- ES2020+ JavaScript support
- Hardware-accelerated graphics

## Technologies Used

| Category | Technologies |
|----------|---|
| **Framework** | Next.js 15.1, React 19.0 |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS 3.4, PostCSS |
| **3D Graphics** | Three.js 0.172, React Three Fiber 9.0, Drei 10.0 |
| **Animations** | Framer Motion 12.4, Lenis 1.3 |
| **Icons** | Lucide React 0.469 |
| **Utilities** | clsx, tailwind-merge |
| **Development** | ESLint, TypeScript, Autoprefixer |

## Scripts

```bash
# Development
npm run dev              # Start development server

# Building & Deployment
npm run build           # Create production build
npm start               # Run production server

# Code Quality
npm run lint            # Run ESLint
npm run typecheck       # Run TypeScript type checking
```

## License

This project is private and for personal use. All rights reserved.

## Contact

- **GitHub** — [@vaibhav-kuma](https://github.com/vaibhav-kuma)
- **Blog** — [zs-shop.space-z.ai](https://zs-shop.space-z.ai/)
- **Location** — Dehradun, India

---

Built with ❤️ by Vaibhav Kumar

