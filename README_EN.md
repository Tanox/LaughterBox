# LaughterBox

[English](README_EN.md) | [简体中文](README.md)

A minimalist joke collection application designed for a clean reading experience.

## Features
- **Minimalist Design**: Focused on content with a clean UI.
- **Responsive**: Fully optimized for Mobile, Tablet, and Desktop.
- **Dark Mode**: Seamless transition between light and dark themes.
- **Navigation**: Supports random navigation, previous/next switching, and swipe gestures.
- **Favorites**: Save your favorite jokes with persistent storage (localStorage versioned management), dedicated favorites page.
- **Auto Play**: Automatically switch to the next joke every 30 seconds.
- **Sharing**: Copy joke content and share to social media.
- **Keyboard Shortcuts**: Arrow keys for navigation, space for random, F for favorite, C for copy.
- **PWA Support**: Installable as a Progressive Web App.
- **High Robustness**: Comprehensive empty data handling and hydration error prevention.
- **Accessibility**: Semantic HTML, ARIA attributes, keyboard accessibility.

## Keyboard Shortcuts
| Shortcut | Function |
|----------|----------|
| `←` / `→` | Previous / Next joke |
| `Space` / `R` | Random joke |
| `F` | Favorite / Unfavorite |
| `C` | Copy current joke to clipboard |

## Prototype
The project includes a standalone high-fidelity HTML prototype that can be opened directly in a browser:
- Open [prototype/prototype.html](prototype/prototype.html) to view the prototype
- Includes all interactive features: joke switching, favorites, sharing, auto-play, etc.
- Supports dark/light mode toggle
- Responsive design for all devices

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS 4
- React 19
- TypeScript 5.9
- Motion (Framer Motion)
- Lucide React
- next-themes
- shadcn/ui style components

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the development server: `npm run dev`.
4. Build for production: `npm run build`.

## Project Structure
```
/workspace/
├── app/                          # Next.js App Router directory
│   ├── layout.tsx                # Root layout component
│   ├── page.tsx                  # Main page component
│   ├── globals.css               # Global styles and design tokens
│   ├── components/               # React components
│   │   ├── joke-card.tsx             # Joke card component
│   │   ├── navigation-controls.tsx   # Navigation controls component
│   │   ├── page-decorations.tsx      # Page decorations (Logo, skeleton)
│   │   ├── theme-provider.tsx        # Theme provider
│   │   ├── theme-toggle.tsx          # Theme toggle button
│   │   └── ui/                       # shadcn/ui base components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── toast.tsx
│   ├── hooks/                    # Custom React Hooks
│   │   ├── use-favorites.ts          # Favorites hook
│   │   └── use-clipboard.ts          # Clipboard copy hook
│   └── lib/                      # Utility functions and data
│       ├── jokes-data.ts             # Joke data aggregation
│       ├── jokes/                    # Joke data batch files
│       │   ├── jokes-batch-1.ts
│       │   ├── jokes-batch-2.ts
│       │   ├── jokes-batch-3.ts
│       │   ├── jokes-batch-4.ts
│       │   └── jokes-batch-5.ts
│       ├── clipboard.ts              # Clipboard utility functions
│       ├── types.ts                  # Type definitions
│       └── utils.ts                  # cn() class name merge utility
├── openspec/                     # OpenSpec specification documents
│   ├── spec.md                   # Main specification document
│   ├── ARCHITECTURE.md           # Architecture design document
│   ├── COMPONENT.md              # Component specification document
│   ├── DEVELOPMENT.md            # Development guide
│   └── DEPLOYMENT.md             # Deployment guide
├── prototype/                    # Prototype design directory
│   ├── prototype.html            # High-fidelity prototype
│   ├── DESIGN_SYSTEM.md          # Design system specification
│   └── DESIGN_REVIEW.md          # Design review report
├── public/                       # Static assets
│   ├── manifest.json             # PWA manifest
│   ├── icon-192x192.svg          # PWA icon
│   └── icon-512x512.svg          # PWA icon
├── CHANGELOG.md                  # Version changelog
├── README.md                     # Project README (Chinese)
├── README_EN.md                  # Project README (English)
├── eslint.config.mjs             # ESLint config
├── next.config.ts                # Next.js config
├── package.json                  # Dependency management
├── postcss.config.mjs            # PostCSS config
└── tsconfig.json                 # TypeScript config
```

## Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint check
npm run clean    # Clean .next directory
```

## Version Info
- Current version: v6.2.0
- Joke count: 150

## License
MIT License
