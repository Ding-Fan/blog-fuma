# Blog Listing Page Redesign Specification

## Problem & Solution

**Problem**: Current blog listing uses basic text layout without visual hierarchy or editorial design, making it difficult to scan and less engaging for readers.

**Solution**: Magazine-style editorial layout with ArticleCard components featuring images, category badges, metadata, and graceful fallback handling for missing content.

**Returns**: Responsive blog listing with uniform card design, grayscale-to-color hover effects, and clean typography hierarchy.

## Component API

```typescript
// ArticleCard Component
interface ArticleCardProps {
  title: string;
  date: string;           // ISO date string
  description: string;    // From frontmatter
  author: string;
  href: string;           // Post URL
  image?: string;         // Optional cover image
  category?: string;      // Optional category badge
}

// ImageWithFallback Component
interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

// Frontmatter Schema Extension
interface BlogPostFrontmatter {
  title: string;
  description: string;
  author: string;
  date: Date | string;
  image?: string;
  category?: string;
}
```

## Usage Example

```typescript
import { ArticleCard } from '@/app/(home)/blog/components/ArticleCard';

<ArticleCard
  title={post.data.title}
  date={post.data.date}
  description={post.data.description}
  author={post.data.author}
  href={post.url}
  image={post.data.image}
  category={post.data.category}
/>
```

## Core Flow

```
Blog page loads
  ↓
Fetch all blog posts via loader
  ↓
Map posts to ArticleCard components
  ↓
Render cards with image fallback handling
  ↓
User hovers: grayscale → color transition
```

## User Stories

**US-1: Browse Blog Posts**
User visits `/blog` and sees magazine-style cards with images, categories, and metadata. Cards feature clean typography hierarchy and visual separation between posts.

**US-2: View Posts Without Images**
When a post lacks an image, the card gracefully shows text-only layout without broken placeholders or layout shifts.

**US-3: Interactive Hover Effects**
User hovers over cards to see visual feedback: title color changes, underline animation, and images transition from grayscale to color.

## MVP Scope

**Included**:
- ArticleCard component with uniform design
- ImageWithFallback component with error handling
- Updated frontmatter schema (`image`, `category`)
- Refactored `/blog` page layout
- All 48 MDX files updated with author + dates
- Responsive grid layout
- Grayscale hover effects
- Clean borders and separators

**NOT Included** (Future):
- Featured post variant → 🔧 Robust
- Category filtering → 🔧 Robust
- Pagination → 🔧 Robust
- Image optimization → 🔧 Robust
- Search integration → 🚀 Advanced
- Tag system → 🚀 Advanced
- RSS feed → 🚀 Advanced

## Acceptance Criteria (MVP)

**Functional**:
- [ ] ArticleCard renders all post data correctly
- [ ] ImageWithFallback hides on error (no broken images)
- [ ] Links navigate to correct post URLs
- [ ] Dates format correctly (Month DD, YYYY)
- [ ] All 48 posts display author "Ding"
- [ ] All 48 posts have valid dates from git history

**UI/UX**:
- [ ] Cards have clean visual hierarchy
- [ ] Images are grayscale by default, color on hover
- [ ] Title has underline animation on hover
- [ ] Cards have border separators
- [ ] Layout is responsive (mobile, tablet, desktop)
- [ ] No layout shift when images are missing
- [ ] Category badges display when present

**Technical**:
- [ ] Schema validation passes for all posts
- [ ] TypeScript types are correct
- [ ] No console errors or warnings
- [ ] Image loading doesn't block rendering

## Future Tiers

**🔧 Robust** (+16-24h): Category filtering system, featured post hero section, pagination (10 posts per page), next/image optimization with blur placeholders, reading time calculation

**🚀 Advanced** (+24-32h): Full-text search with Orama integration, tag system with multi-select filtering, RSS feed generation, reading progress indicators, view count analytics, related posts suggestions

---

**Status**: Ready for Implementation | **MVP Effort**: 12-16 hours
