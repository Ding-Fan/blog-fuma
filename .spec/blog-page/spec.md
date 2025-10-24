# Blog Post Links Page Specification

## Problem & Solution

**Problem**: Blog posts need a discoverable, scannable listing page with clear metadata and visual feedback for user interaction.

**Solution**: Minimal, typography-focused blog listing with hover effects (color transition + animated underline) and metadata display (date/author).

**Returns**: Server-rendered page with list of blog post links from MDX content via fumadocs loader.

## Page Structure

```typescript
// Page receives blog posts from fumadocs loader
import { blog } from '@/lib/source';

const posts = blog.getPages();
// Returns: Array<{
//   url: string;
//   data: {
//     title: string;
//     description?: string;
//     author?: string;
//     date?: Date | string;
//   }
// }>
```

## Usage Example

```tsx
// app/(home)/blog/page.tsx
import Link from 'next/link';
import { blog } from '@/lib/source';

export default function BlogPage() {
  const posts = blog.getPages();

  return (
    <main>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link key={post.url} href={post.url} className="group block">
            {/* Metadata, Title, Description */}
          </Link>
        ))}
      </div>
    </main>
  );
}
```

## Core Flow

```
Page Load
  ↓
Fumadocs loader fetches MDX posts
  ↓
Render post links with metadata
  ↓
User hovers → color + underline animation
  ↓
User clicks → navigate to post
```

## User Stories

**US-1: Browse Blog Posts**
User visits `/blog` and sees a list of all blog posts with titles, descriptions, dates, and authors. Posts are displayed in a clean, scannable format with generous spacing (gap-8).

**US-2: Visual Feedback on Hover**
User hovers over a blog post link and sees the title transition to violet (violet-400) with an animated underline sliding from left to right over 300ms. This provides clear visual feedback that the link is interactive.

**US-3: View Post Metadata**
User sees formatted date ("October 20, 2025") and author name above each post title. If metadata is missing, the layout gracefully handles it without breaking (conditional rendering).

## MVP Scope

**Included**:
- Blog listing page at `/blog` route
- Post link component with group hover states
- Metadata display (date formatted with `toLocaleDateString`, author name)
- Animated underline effect (left-to-right slide, 300ms ease-out)
- Title color transition to violet-400 on hover
- Dark mode support (violet-300 in dark mode)
- Responsive spacing (gap-8 between posts)
- Graceful metadata fallback (conditional rendering)

**NOT Included** (Future):
- Tag/category filtering → 🔧 Robust
- Search functionality → 🔧 Robust
- Pagination → 🔧 Robust
- Featured posts → 🚀 Advanced
- RSS feed → 🚀 Advanced

## Data Integration

**Source**: Fumadocs MDX loader (`lib/source.ts`)

**Schema** (from `source.config.ts`):
```typescript
frontmatterSchema.extend({
  author: z.string(),
  date: z.iso.date().or(z.date()),
})
```

**Access Pattern**:
```typescript
import { blog } from '@/lib/source';
const posts = blog.getPages(); // Server-side only
```

## Acceptance Criteria (MVP)

**Functional**:
- [ ] Blog page renders at `/blog` route
- [ ] All blog posts from `content/blog/` are displayed
- [ ] Clicking a link navigates to the correct blog post
- [ ] Date formats correctly using `toLocaleDateString('en-US')`
- [ ] Author displays when available
- [ ] Missing metadata doesn't break layout

**UI/UX**:
- [ ] Title transitions to violet-400 on hover (300ms)
- [ ] Underline animates from left-to-right on hover (300ms)
- [ ] Posts have gap-8 spacing for readability
- [ ] Dark mode uses violet-300 for accents
- [ ] Typography hierarchy clear (title 2xl, metadata sm, description base)
- [ ] Metadata uses muted gray colors

**Performance**:
- [ ] Server-rendered (no client-side fetching)
- [ ] No layout shift on hover (absolute positioned underline)

## Future Tiers

**🔧 Robust** (+2 days): Tag filtering sidebar, search input with live filtering, pagination (10 posts per page), sort by date/title, category organization

**🚀 Advanced** (+3 days): Featured posts section, RSS feed generation, reading time estimation, related posts suggestions, newsletter signup integration

---

**Status**: Implemented | **MVP Effort**: 0.5 days
