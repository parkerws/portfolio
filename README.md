# Will Parker - Portfolio

Modern portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

🌐 **Live Site:** [willparker.dev](https://willparker.dev)

## Features

- ⚡ **Next.js 14** with App Router and TypeScript
- 🎨 **Tailwind CSS** for modern, utility-first styling
- 🌓 **Dark Mode** with system preference detection
- ✨ **Framer Motion** animations
- 📱 **Fully Responsive** design
- 🎯 **Project Filtering** by category
- 📊 **Skill Visualization** with animated progress bars
- 🔍 **SEO Optimized** with sitemap and meta tags
- 📬 **Contact Form** with Formspree integration

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Theme:** next-themes
- **Icons:** react-icons
- **Deployment:** GitHub Pages

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/parkerws/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build

To create a production build:

```bash
npm run build
```

This generates a static export in the `out/` directory.

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `main` or `master` branch.

### GitHub Pages Setup

1. Go to your repository Settings → Pages
2. Set **Source** to "GitHub Actions"
3. The workflow will automatically build and deploy on push

### Manual Deployment

To manually trigger a deployment:
1. Go to Actions tab in your repository
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"

## Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── page.tsx      # Homepage
│   │   ├── projects/     # Projects page
│   │   ├── about/        # About page
│   │   └── contact/      # Contact page
│   ├── components/       # React components
│   ├── lib/              # Data and utilities
│   └── types/            # TypeScript types
├── public/               # Static assets
└── .github/workflows/    # GitHub Actions

```

## Customization

### Update Projects

Edit `src/lib/data.ts` to add or modify projects:

```typescript
export const projects: Project[] = [
  {
    id: 1,
    title: 'Your Project',
    description: 'Project description',
    image: '/images/project.png',
    github: 'https://github.com/username/repo',
    technologies: ['React', 'TypeScript'],
    category: 'web',
  },
  // ...
];
```

### Update Skills

Edit `src/lib/data.ts` to modify skills:

```typescript
export const skills: Skill[] = [
  { name: 'TypeScript', category: 'frontend', proficiency: 90 },
  // ...
];
```

### Update Personal Info

- Edit `src/lib/data.ts` for social links
- Edit `src/app/layout.tsx` for SEO metadata
- Replace images in `public/images/`

## License

MIT License - feel free to use this portfolio as a template for your own!

## Contact

- **Website:** [willparker.dev](https://willparker.dev)
- **GitHub:** [@parkerws](https://github.com/parkerws)
- **LinkedIn:** [Will Parker](https://www.linkedin.com/in/parkerws/)
