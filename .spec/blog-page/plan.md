# Blog Post Links Page Implementation Plan

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Component Type** | Server Component (default Next.js 15) | Blog posts are static MDX content - no need for client interactivity, better SEO and performance |
| **Styling Approach** | Tailwind utility classes with group hover | Follows existing project pattern (see `app/global.css`), no additional CSS files needed |
| **Animation Method** | CSS transitions (300ms ease-out) | Smooth, performant animations without JavaScript, works with SSR |
| **Layout Pattern** | Minimal, no cards/borders | Content-first design matching user preference, reduces visual clutter |
| **Accent Color** | Violet (violet-400/300) | Complements warm background (`rgb(255, 252, 240)`), provides sufficient contrast |
| **Metadata Handling** | Conditional rendering with optional chaining | Gracefully handles missing author/date without breaking layout |

## Codebase Integration Strategy

**Page Location**: `app/(home)/blog/page.tsx`
- Follows Next.js App Router conventions
- Uses `(home)` route group with `HomeLayout` from fumadocs-ui
- Server Component by default (no 'use client' directive needed)

**Data Fetching Pattern**:
- Import `blog` loader from `@/lib/source.ts`
- Call `blog.getPages()` directly in component (server-side only)
- No useState/useEffect needed - data available at render time

**Styling Integration**:
- Uses existing Tailwind v4 setup from `app/global.css`
- Follows fumadocs-ui color system (neutral preset)
- Dark mode via `.dark` class (handled by fumadocs layout)

**Typography Scale**:
- Page title: `text-4xl` (H1)
- Post title: `text-2xl` (H2)
- Metadata: `text-sm`
- Description: default `text-base`

## Technical Approach

**Existing Patterns to Follow**:
1. **Server Components**: Study `app/(home)/layout.tsx` for fumadocs layout usage
2. **Data Loading**: Study `lib/source.ts` for fumadocs loader API
3. **Tailwind Styling**: Use utility classes only, no custom CSS (matches `app/global.css` approach)
4. **Route Groups**: Follow `(home)` pattern for non-docs pages

**Hover Effect Implementation**:
- Use `group` class on parent `<Link>` element
- Apply `group-hover:` modifiers to child elements
- Animated underline: absolute positioned span with `w-0 → w-full` transition
- Color transition: `group-hover:text-violet-400` with `transition-colors duration-300`

**Post Link Flow**:
```
<Link className="group"> ← Enables group hover
  <div> ← Metadata (date, author)
    <time> ← Semantic HTML for dates
  </div>
  <h2 className="group-hover:text-violet-400"> ← Title with color transition
    <span className="relative"> ← Wrapper for underline positioning
      Title
      <span className="absolute...w-0 group-hover:w-full"> ← Animated underline
  </h2>
  <p> ← Description
</Link>
```

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| **Layout shift on hover** | Use absolute positioned underline (no height added), inline-block wrapper prevents text reflow |
| **Missing metadata breaks UI** | Conditional rendering with `post.data.date &&` and `post.data.author &&` checks |
| **Date format issues** | Use safe `.toString()` conversion before formatting, handle both ISO strings and Date objects |
| **Dark mode contrast** | Test violet-300 against dark background (`rgb(15, 23, 42)`), ensure WCAG AA compliance |

## Integration Points

**Layout**: `app/(home)/layout.tsx`
- Uses `HomeLayout` from fumadocs-ui
- Inherits shared options from `lib/layout.shared.tsx`

**Data Source**: `lib/source.ts`
- `blog.getPages()` returns array of MDX page objects
- Each post has `url`, `data.title`, `data.description`, `data.author`, `data.date`

**Content**: `content/blog/*.mdx`
- Frontmatter schema defined in `source.config.ts`
- Author and date are required fields per schema

## Success Criteria

**Technical**:
- Server-rendered page with no hydration errors
- Smooth 300ms transitions without jank
- No layout shift on hover (underline uses absolute positioning)

**User**:
- Blog posts are discoverable and scannable
- Hover feedback is immediate and smooth
- Metadata (date/author) provides context at a glance

**Business**:
- Blog content is indexed by search engines (SSR)
- Page loads quickly with minimal JavaScript
- Maintainable with no custom CSS files

## Robust Product (+2 days)

Tag filtering sidebar with multi-select, search input with live filtering (client component), pagination (10 posts/page with URL query params), sort by date/title toggle, category organization with icon badges

## Advanced Product (+3 days)

Featured posts carousel at top, RSS feed generation at `/blog/rss.xml`, reading time estimation based on word count, related posts suggestions via tag matching, newsletter signup integration with email validation

---

**Total MVP Effort**: 4 hours (0.5 days) | **Dependencies**: None
