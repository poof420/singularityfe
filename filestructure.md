singularity-front-end/
├── .next/
├── node_modules/
├── public/
│   ├── fonts/
│   │   ├── AtkinsonHyperlegible-Regular.woff2
│   │   └── AtkinsonHyperlegible-Bold.woff2
│   ├── images/
│   └── models/  # For 3D models used with Three.js
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── simulation/
│   │   │   └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ... (other shadcn/ui components)
│   │   ├── three/  # Three.js components
│   │   │   ├── agent-view.tsx
│   │   │   ├── user-view.tsx
│   │   │   └── environment.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   └── sidebar.tsx
│   │   └── shared/
│   │       ├── retro-container.tsx
│   │       └── retro-button.tsx
│   ├── hooks/
│   │   ├── use-simulation.ts
│   │   └── use-agent.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── fonts.ts
│   ├── styles/
│   │   └── retro-theme.css
│   └── types/
│       ├── agent.d.ts
│       └── simulation.d.ts
├── .eslintrc.json
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json