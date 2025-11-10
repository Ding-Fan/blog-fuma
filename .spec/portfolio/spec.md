# Portfolio Specification

## Problem & Solution

**Problem**: No dedicated page to showcase personal projects and work examples. Visitors cannot easily explore portfolio pieces or access live demos and source code.

**Solution**: Create a standalone `/portfolio` route with a responsive grid of project cards featuring realistic minimal design. Each card displays project details with smooth anime.js hover animations.

**Returns**: Rendered portfolio page with validated project data from JSON source.

## Component API

```typescript
interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  date?: string;
}

interface ProjectCardProps {
  project: ProjectData;
}

interface PortfolioData {
  projects: ProjectData[];
}
```

## Usage Example

```typescript
import { PortfolioCard } from '@/components/portfolio-card';

<PortfolioCard
  project={{
    id: "project-1",
    title: "Project Name",
    description: "Brief description",
    image: "/images/portfolio/project-1.png",
    tags: ["Next.js", "TypeScript"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/user/repo"
  }}
/>
```

## Core Flow

```
User visits /portfolio
  ↓
Load portfolio.json data
  ↓
Validate with Zod schema
  ↓
Render responsive grid of cards
  ↓
User hovers card → anime.js animation triggers
  ↓
User clicks card → opens demo/GitHub link
```

## User Stories

**US-1: View Portfolio Grid**
User navigates to `/portfolio` and sees a responsive grid of project cards (1 column mobile, 2 tablet, 3 desktop). Each card displays thumbnail, title, description, and technology tags.

**US-2: Interactive Hover Effects**
User hovers over a project card and sees smooth animation (subtle lift, shadow enhancement) powered by anime.js. Animation reverses on mouse leave, providing tactile feedback.

**US-3: Access Project Links**
User clicks demo button to open live project in new tab, or clicks GitHub icon to view source code. Links open with proper security attributes (noopener noreferrer).

## MVP Scope

**Included**:
- Standalone `/portfolio` route
- Responsive card grid layout (auto-responsive)
- Project data from JSON with Zod validation
- Card component with thumbnail, title, description, tags
- anime.js hover animations (lift + shadow)
- Action links (demo, GitHub) with icons
- Dark theme matching existing site
- Type-safe component props

**NOT Included** (Future):
- Technology filter functionality → 🔧 Robust
- Featured projects section → 🔧 Robust
- Project detail modal → 🔧 Robust
- MDX-based project pages → 🚀 Advanced
- Live demo embeds → 🚀 Advanced
- Analytics tracking → 🚀 Advanced

## Data Structure

**File**: `data/portfolio.json`

```json
{
  "projects": [
    {
      "id": "project-1",
      "title": "Example Project",
      "description": "Brief description of the project (2-3 lines max)",
      "image": "/images/portfolio/project-1.png",
      "tags": ["React", "TypeScript", "Tailwind CSS"],
      "demoUrl": "https://example.com",
      "githubUrl": "https://github.com/username/repo",
      "featured": true,
      "date": "2025-01"
    }
  ]
}
```

## Acceptance Criteria (MVP)

**Functional**:
- [ ] `/portfolio` route renders without errors
- [ ] JSON data validated with Zod schema at runtime
- [ ] All project cards display correct data
- [ ] Demo links open in new tab with security attributes
- [ ] GitHub links open repository in new tab
- [ ] Invalid JSON throws validation error with details

**UI/UX**:
- [ ] Grid responsive: 1 col (mobile), 2 col (tablet), 3 col (desktop)
- [ ] Cards have consistent spacing and alignment
- [ ] Hover animation smooth with anime.js (lift + shadow)
- [ ] Animation reverses on mouse leave
- [ ] Dark theme matches `app/global.css` colors
- [ ] Technology tags styled as pill badges
- [ ] Project thumbnails maintain 16:9 aspect ratio

**Code Quality**:
- [ ] TypeScript interfaces defined and exported
- [ ] Zod schemas validate all required fields
- [ ] Component follows modular structure pattern
- [ ] anime.js cleanup in useEffect return
- [ ] No console errors or warnings
- [ ] Follows existing code conventions (CVA, Tailwind)

## Future Tiers

**🔧 Robust** (+2 days): Technology filter dropdown with multi-select, featured projects hero section at top, lightbox modal for project details with expanded description and gallery, sort by date/alphabetical, smooth filter transitions with anime.js.

**🚀 Advanced** (+2 days): MDX-based individual project pages with case studies, embedded live demos via iframe sandbox, view/click analytics with event tracking, RSS feed for projects, OpenGraph metadata per project, search functionality.

---

**Status**: Ready for Implementation | **MVP Effort**: 1.5 days
