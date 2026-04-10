# Portfolio - Sanjeev Bhandari (realsanjeev)

## Project Overview
A personal portfolio website for Sanjeev Bhandari, a Machine Learning Engineer. Showcases professional experience, projects, blog posts, and research publications.

## Tech Stack
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7 with `@vitejs/plugin-react-swc`
- **Styling:** Tailwind CSS 4 + custom glass morphism design system
- **Animations:** Framer Motion 12 (entrance animations, scroll-driven, spring physics)
- **Routing:** React Router 7
- **Data Fetching:** TanStack Query (React Query)
- **Contact Form:** EmailJS
- **Icons:** React Icons (Feather, FontAwesome, Simple Icons)
- **Package Manager:** npm

## Design System
- **Theme:** Light/Dark mode toggle with localStorage persistence
- **Color Palette:** Violet/Indigo/Pink gradients on white (light) and deep navy (dark)
- **Typography:** Space Grotesk (headings) + Inter (body) via Google Fonts
- **Components:** Custom glass cards, gradient text, animated section labels
- **Animations:** Framer Motion staggered children, scroll-triggered reveals, typewriter effect, animated counter

## Project Structure
- `src/components/` - Page section components (Hero, About, Experience, Projects, Blog, Contact, Footer)
- `src/components/ui/` - Reusable UI (BackgroundMesh, CustomCursor, MouseGlow, Magnetic, etc.)
- `src/data/portfolio.ts` - All portfolio content (experiences, projects, blog posts, skills)
- `src/pages/` - Main page and 404
- `src/index.css` - Global styles, design tokens, CSS utilities

## Key Features
- **Dark/Light Mode** - persisted to localStorage
- **Typewriter Effect** - rotating role titles in Hero
- **Particle Background** - animated canvas mesh
- **Custom Cursor** - desktop-only dot+ring cursor
- **Magnetic Buttons** - interactive hover effect
- **Animated Counters** - stats counting up on scroll
- **Scroll Progress Bar** - gradient progress indicator
- **Active Nav Indicator** - highlights current section

## Development
- Dev server: `npm run dev` → port 5000
- `npm run build` - Build for production (outputs to `dist/`)

## Environment Variables
See `.env.example` for required EmailJS configuration:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Deployment
Configured as a static site:
- Build: `npm run build`
- Public dir: `dist`
