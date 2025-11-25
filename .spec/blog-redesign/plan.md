# Blog Listing Page Redesign Implementation Plan

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Component Location** | `app/(home)/blog/components/` | Colocated with blog page, follows Next.js 15 route group pattern |
| **Image Handling** | Custom ImageWithFallback + native img | No next/image needed for external MDX images, simpler error handling |
| **Frontmatter Updates** | Git-based date extraction | Automated approach for 48 files, uses existing git history |
| **Typography** | Keep Inter font (existing) | Defer CJK font decisions until testing with mixed content |
| **Layout Pattern** | Uniform cards (no featured) | Simpler MVP, consistent user experience across all posts |
| **Schema Extension** | Optional image/category fields | Backward compatible with existing posts |

## Codebase Integration Strategy

**Component Location**: `app/(home)/blog/components/`
- Follows existing route group structure `app/(home)/`
- Components colocated with blog page for simplicity
- Easy to extract to shared location in Robust tier

**Frontmatter Integration Pattern**:
- Extends existing `blogPosts` schema in `source.config.ts`
- Uses Zod schema with optional fields for backward compatibility
- Follows fumadocs-mdx convention

**Data Flow**:
- Blog page uses `blog.getPages()` from `lib/source.ts`
- Maps post data to ArticleCard props
- Formats dates using native `toLocaleDateString()`

**Styling**:
- Tailwind CSS v4 (existing in `global.css`)
- Custom background color already defined: `--color-fd-background`
- Grayscale filters and transitions using Tailwind utilities

## Technical Approach

**Existing Patterns to Follow**:
1. **Route Groups**: Study `app/(home)/layout.tsx` for route group structure
2. **MDX Schema**: Study `source.config.ts` for frontmatter extension pattern
3. **Blog Loader**: Use `blog.getPages()` from `lib/source.ts` (already implemented)
4. **Styling**: Use Tailwind v4 syntax from `global.css` (@import, @theme)

**Component Composition**:
- `ArticleCard`: Main card component handling layout, metadata, hover effects
- `ImageWithFallback`: Child component with error state handling
- Blog page: Maps posts array to ArticleCard components

**Image Error Flow**:
- ImageWithFallback attempts to load src
- onError handler sets failed state
- Component conditionally renders null if failed
- Parent card adjusts layout for missing image

**Date Extraction Flow**:
- Bash script iterates through all 48 MDX files
- `git log --follow --format=%aI --reverse <file> | head -1` extracts first commit date
- Updates frontmatter with ISO date format (YYYY-MM-DD)

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| **Git history missing for some files** | Fallback to file modification time, manual review for critical posts |
| **Image URLs broken/external** | ImageWithFallback hides gracefully, no layout shift |
| **CJK font rendering issues** | Defer font decisions, test with Inter first, iterate in Robust tier |
| **48 file bulk updates** | Use git to review all changes before commit, validate schema after update |

## Integration Points

**Schema**: `source.config.ts` (extend blogPosts schema)
**Blog Loader**: `lib/source.ts` (already exports blog loader)
**Blog Page**: `app/(home)/blog/page.tsx` (replace current layout)
**MDX Files**: `content/blog/**/*.mdx` (48 files need frontmatter updates)

## Success Criteria

**Technical**:
- All 48 posts pass Zod schema validation
- No TypeScript errors in components
- Image errors handled gracefully without console warnings
- Date formatting consistent across all posts

**User**:
- Blog listing visually appealing and scannable
- Clear hierarchy between title, metadata, description
- Smooth hover transitions and interactions
- Responsive on mobile, tablet, desktop

**Business**:
- Improved blog engagement metrics (time on page, click-through rate)
- Professional editorial appearance attracts readers
- Foundation for future category/tag filtering features

## Robust Product (+16-24h)

Category filtering with URL params, featured post hero section at top, pagination (10 posts/page), next/image optimization with blur placeholders, auto-calculated reading time

## Advanced Product (+24-32h)

Orama full-text search integration, tag system with multi-select filters, RSS feed generation, reading progress bars, view count analytics via Vercel Analytics, related posts algorithm

---

**Total MVP Effort**: 12-16 hours | **Dependencies**: None
