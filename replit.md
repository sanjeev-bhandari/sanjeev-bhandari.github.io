# Portfolio - Sanjeev Bhandari (realsanjeev)

## Project Overview
A personal portfolio website for Sanjeev Bhandari, a Machine Learning Engineer. Showcases professional experience, projects, blog posts, and research publications.

## Tech Stack
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** Tailwind CSS 4 + Shadcn UI components
- **Routing:** React Router 7
- **Data Fetching:** TanStack Query (React Query)
- **Contact Form:** EmailJS
- **Package Manager:** npm

## Project Structure
- `src/components/` - React components (About, Hero, Navigation, etc.)
- `src/components/ui/` - Reusable Shadcn UI primitives
- `src/data/` - Static portfolio content (`portfolio.ts`)
- `src/pages/` - Main page components
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions
- `public/` - Static assets (images, CNAME)

## Development
- Dev server runs on port 5000 (configured for Replit proxy)
- `npm run dev` - Start development server
- `npm run build` - Build for production (outputs to `dist/`)

## Environment Variables
See `.env.example` for required EmailJS configuration:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Deployment
Configured as a static site deployment:
- Build command: `npm run build`
- Public directory: `dist`
