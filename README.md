# Hassan Karasu - Artistic Portfolio

> "Walking through a quiet art exhibition"

A contemplative portfolio website for a visual artist and photographer. Built with Next.js, featuring bilingual support (Arabic RTL / English LTR), immersive micro-interactions, and a dark minimal aesthetic.

## 🎨 Design Philosophy

- **Minimal text, maximum breathing space**
- **Dark backgrounds** (black / charcoal)
- **Soft off-white text**
- **Single warm gold accent** (#c9a566)
- **Calm transitions and slow pacing**
- **Interaction based on discovery**

## ✨ Micro-interactions & UX

### Navigation
- Underline slides in left-to-right (220ms ease-out)
- Color shift to warm gold on hover

### Hero Button ("Enter the Gallery")
- Subtle upward movement (3px)
- Letter spacing increases (+1.5px)
- Soft glow behind text
- 200ms ease-out transition

### Project Thumbnails
- Slight dark overlay on hover (opacity +0.08)
- Title fades in from bottom (8px, 240ms)
- Custom cursor (soft circle, 22px)
- Project brief text appears on hover

### Filter Buttons (Mood Map)
- Selected button gets horizontal underline
- Unselected buttons fade to 60% opacity
- Gentle scale on hover (1.05x)

### CV Page Profile Photo
- Initial state: 90% opacity, 1.5px blur
- On load: blur fades to 0, opacity to 100% (500-700ms)
- On hover: contrast +5%, shadow softens

### Accordion Panels
- On expand: slides down (+12px), text fades in (300ms)
- On collapse: text fades out first, then height closes

### Download CV Button
- Press shrink (-2px) feedback
- Icon rotates 12° on hover
- Pulse shadow burst on click

### Form Fields
- Placeholder fades out on focus
- Border transitions to warm gold (280ms)

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (custom properties)
- **Fonts**: IBM Plex Sans (Latin) + Noto Kufi Arabic (Arabic)
- **Images**: Automatic WebP/AVIF optimization

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── artworks/              # Artwork images
│   ├── profile.jpg            # CV profile photo
│   ├── sounds/                # Ambient audio (optional)
│   └── cv.pdf                 # CV download
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with fonts & SEO
│   │   ├── page.tsx           # Redirects to /en
│   │   ├── not-found.tsx      # 404 page
│   │   └── [locale]/          # AR/EN routes
│   │       ├── layout.tsx     # RTL/LTR layout
│   │       ├── page.tsx       # Home (hero + enter gallery)
│   │       ├── work/          # Series grid + mood filters
│   │       ├── series/[slug]/ # Passage mode & book view
│   │       ├── art/[id]/      # Artwork detail + fullscreen
│   │       ├── cv/            # Photo + about + accordion CV
│   │       └── contact/       # Email + LinkedIn + form
│   ├── components/
│   │   ├── SpotlightCursor    # Soft light following mouse
│   │   ├── Navigation         # Header with language toggle
│   │   ├── PassageMode        # Vertical scroll gallery
│   │   ├── BookView           # Page-by-page navigation
│   │   ├── LightRevealImage   # Mouse-responsive overlay
│   │   ├── FullscreenView     # ESC to exit fullscreen
│   │   ├── Accordion          # Enhanced CV sections
│   │   ├── SoundToggle        # Optional ambient sound
│   │   └── PageTransition     # Fade animations
│   ├── data/
│   │   ├── artworks.ts        # Art metadata, series briefs & CV
│   │   └── translations.ts    # AR/EN translations
│   ├── lib/
│   │   └── i18n.ts            # RTL/LTR utilities
│   └── styles/
│       └── globals.css        # Complete design system
└── README.md
```

## 🌐 Routes

| English | Arabic |
|---------|--------|
| `/en` | `/ar` |
| `/en/work` | `/ar/work` |
| `/en/series/[slug]` | `/ar/series/[slug]` |
| `/en/art/[id]` | `/ar/art/[id]` |
| `/en/cv` | `/ar/cv` |
| `/en/contact` | `/ar/contact` |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd portfolio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📝 Content Management

### Adding Artworks

1. Add image to `public/artworks/`
2. Update `src/data/artworks.ts`

### Adding Series

Update the `series` array in `src/data/artworks.ts` with:
- `slug`, `title`, `description`, `brief`, `cover`

### Updating CV

Edit `cvData` in `src/data/artworks.ts`:
- `experience`, `skills`, `languages`, `education`

### Profile Photo

Place your photo as `public/profile.jpg`
- Aspect ratio: 3:4 or 4:5
- Max width: 260-300px
- No rounded corners or frames

## 📄 Required Assets

| File | Location | Purpose |
|------|----------|---------|
| `profile.jpg` | `public/` | CV profile photo |
| `cv.pdf` | `public/` | Downloadable CV |
| `ambient.mp3` | `public/sounds/` | Optional ambient audio |

## 🌍 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

## ♿ Accessibility

- Semantic HTML structure
- Keyboard navigation (Arrow keys)
- Focus states with accent color
- `prefers-reduced-motion` support
- ARIA attributes on interactive elements

## 📱 Responsive Design

- Mobile-first approach
- Adaptive navigation (hamburger menu)
- Touch-friendly interactions
- Custom cursor disabled on mobile
- Profile photo centers on mobile

---

*This website is not a temporary project, but a long-term artistic space.*
