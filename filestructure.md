# Project File Structure

This file structure represents a Next.js project with various components, utilities, and assets organized for easy access and maintainability.

```plaintext
.
├── public/
│   ├── fonts/
│   │   ├── AtkinsonHyperlegible-Bold.woff2
│   │   ├── AtkinsonHyperlegible-Regular.woff2
│   │   ├── GeistMonoVF.woff
│   │   └── GeistVF.woff
│   └── grid.png
│
├── src/
│   ├── app/
│   │   ├── 3dalt/
│   │   │   └── page.tsx
│   │   ├── agent/
│   │   │   └── page.tsx
│   │   ├── leaderline/
│   │   │   └── page.tsx
│   │   ├── scribbles/
│   │   │   ├── page.tsx
│   │   │   ├── favicon.ico
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   └── components/
│       ├── ui/
│       │   ├── DynamicPath.tsx
│       │   ├── OverlayInfo.tsx
│       │   ├── ScatterPlot3D.tsx
│       │   ├── ScatterPlot3DOriginal.tsx
│       │   ├── ScatterPlot3DwithLeaders.tsx
│       │   ├── Scene.tsx
│       │   └── ScribblePlot.tsx
│       └── data/
│           └── processed_map_results.json
│
├── lib/
│   ├── utils.ts
│   ├── types/
│   │   └── types.ts
│
├── utils/
│   └── loadData.ts
│
├── .eslintrc.json
├── .gitignore
├── components.json
├── filestructure.md
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
