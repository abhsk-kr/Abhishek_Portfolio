# Abhishek Kumar — 3D Interactive Portfolio

An immersive, dark-themed 3D portfolio website built with React, Three.js, and Framer Motion. The site visualizes Abhishek's profile as an AI/ML engineer through interactive 3D scenes, neural network backgrounds, and scroll-driven animations.

🔗 **Live demo** → [abhishek-portfolio-hqex.onrender.com](https://abhishek-portfolio-hqex.onrender.com/)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 + TypeScript |
| **Bundler** | Vite 8 |
| **3D Engine** | Three.js + React Three Fiber + Drei |
| **Animations** | Framer Motion + GSAP |
| **Styling** | Tailwind CSS v4 |
| **Smooth Scroll** | Lenis |

## Sections

1. **Hero** — 3D particle sphere assembling into name, animated stat counters, CTA buttons, scroll-down indicator
2. **About** — 3D holographic hexagonal avatar with orbiting skill icons, bio, capability chips
3. **Skills** — 5 floating cards (AI/ML, Programming, Frameworks, Databases & Cloud, Dev Tools) with animated proficiency bars
4. **Experience** — Vertical glowing timeline (GAO Tek Inc., Ethara.AI)
5. **Projects** — 12 project cards in a 3D tilted grid with hover depth effect
6. **Achievements** — 3 floating trophy/medal cards with particle burst animation
7. **Contact** — Terminal-style interface with typing effect and contact form

## Features

- **Neural Network Background** — 600+ floating particles with connecting lines + rotating wireframe torus knot
- **Code Rain** — Matrix-style character rain in the background
- **Custom Cursor** — Glowing cyan dot with trailing ring, changes on hover
- **Easter Egg** — Type "hire me" in any input field for a confetti burst
- **Loading Screen** — Neural network assembly animation with progress counter
- **Glass-morphism Navbar** — Fixed top nav with active section tracking
- **Responsive** — 3D effects gracefully degrade on mobile

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # 3D particle sphere, name, stats, CTAs
│   ├── About.tsx             # Holographic avatar, bio, skill chips
│   ├── Skills.tsx            # Skill category cards with bars
│   ├── Experience.tsx        # Timeline nodes
│   ├── Projects.tsx          # Project cards with 3D hover
│   ├── Achievements.tsx      # Trophy cards
│   ├── Contact.tsx           # Terminal UI + form
│   ├── NeuralBackground.tsx  # R3F particles + code rain canvas
│   ├── LoadingScreen.tsx     # Animated loader
│   ├── Navbar.tsx            # Glass-morphism navigation
│   ├── CustomCursor.tsx      # Cyan dot cursor
│   └── EasterEgg.tsx         # "hire me" confetti
├── App.tsx                   # Root layout
├── index.css                 # Global styles + Tailwind
└── main.tsx                  # Entry point
```

## Deployed Projects Linked

| Project | Link |
|---------|------|
| AI B2B Proposal Generator | [Live](https://ai-b2b-proposal-generator-1.onrender.com/) |
| Taskmanager.ai | [Live](https://taskmanager-ethara.up.railway.app/login) |
| Order Management System | [Live](https://inventory-frontend-woad-mu.vercel.app/) |
| AI Auto Category Tag Generator | [Live](https://ai-auto-category-tag-generator-1.onrender.com/) |

## Color Palette

- **Primary** — `#00d4ff` (electric cyan)
- **Secondary** — `#7c3aed` (AI purple)
- **Highlight** — `#10b981` (terminal green)
- **Background** — `#0a0a0f` (deep space)

## License

MIT
