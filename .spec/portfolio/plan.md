# Portfolio Implementation Plan

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Animation Library** | anime.js | Lightweight (6KB), flexible timeline control, better performance for complex animations than CSS transitions, user's explicit preference |
| **Data Management** | JSON + Zod validation | Matches existing `bookmarks.json` pattern, runtime validation ensures data integrity, easy to maintain without database |
| **Component Structure** | Modular `components/portfolio-card/` | Follows existing `tile-bookmarks/` pattern with index/component/types separation for maintainability |
| **Styling Approach** | Tailwind + CVA | Matches existing component patterns (`tile.tsx` uses CVA), consistent with project's styling conventions |
| **Grid System** | Tailwind responsive grid | Native responsive breakpoints (grid-cols-1 md:grid-cols-2 lg:grid-cols-3), no additional dependencies |
| **Route Type** | App Router page | Simple standalone page under `/app/portfolio/page.tsx`, no route groups needed for MVP |

## Codebase Integration Strategy

**Component Location**: `components/portfolio-card/`
- Follows modular pattern like `tile-bookmarks/` directory
- Files: `index.tsx` (exports), `card.tsx` (component), `types.ts` (schemas/interfaces)
- Enables tree-shaking and clean imports

**Page Location**: `app/portfolio/page.tsx`
- Standalone route (not in `(home)` or `docs` groups)
- Similar structure to `app/(home)/page.tsx` pattern
- JSON import + Zod validation at component level

**Data Location**: `data/portfolio.json`
- Matches existing `data/bookmarks.json` convention
- Zod schema validates at runtime in page component
- Images stored in `public/images/portfolio/`

**Styling Integration**:
- Uses `app/global.css` theme variables (`--color-fd-background`)
- Dark mode class from `.dark` selector
- Tailwind utilities matching existing components

**Animation Integration**:
- Install `animejs` via npm (new dependency)
- useRef + useEffect pattern for animation instances
- Cleanup in useEffect return to prevent memory leaks

## Technical Approach

**Existing Patterns to Follow**:
1. **JSON + Zod Validation**: Study `app/(home)/page.tsx` + `data/bookmarks.json` for data loading pattern
2. **Component Structure**: Study `components/tile-bookmarks/` for modular organization (index/component/types)
3. **Styling with CVA**: Study `components/tile-bookmarks/tile.tsx` for class-variance-authority usage
4. **Link Components**: Use Next.js `Link` with security attributes (rel="noopener noreferrer")

**Component Composition**:
```
PortfolioPage
  └─ PortfolioCard (maps over projects array)
       ├─ Image (thumbnail)
       ├─ Content (title, description, tags)
       └─ Actions (demo link, GitHub link)
```

**anime.js Integration Flow**:
1. Import anime from 'animejs'
2. Create ref for card element: `const cardRef = useRef(null)`
3. Define hover handlers with anime() calls
4. onMouseEnter: animate translateY, scale, boxShadow
5. onMouseLeave: reverse animation to original state
6. No useEffect needed for hover (event-driven)

**Data Flow**:
```
portfolio.json (static)
  ↓
Import in page.tsx
  ↓
Zod validation (portfolioDataSchema.parse())
  ↓
Pass validated data to map function
  ↓
Render PortfolioCard components
  ↓
User interaction triggers anime.js animations
```

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| **anime.js bundle size impact** | Library is only 6KB gzipped, minimal impact; lazy load if needed in future |
| **Animation performance on mobile** | Use transform properties (translateY, scale) for GPU acceleration; test on lower-end devices |
| **Invalid image paths in JSON** | Zod schema validates string format; runtime checks for 404s can be added in Robust tier |
| **Hover animations on touch devices** | CSS fallback with `:active` state; consider `@media (hover: hover)` in Robust tier |

## Integration Points

**Page**: `app/portfolio/page.tsx`
**Component**: `components/portfolio-card/index.tsx`, `components/portfolio-card/card.tsx`, `components/portfolio-card/types.ts`
**Data**: `data/portfolio.json`
**Images**: `public/images/portfolio/` (create directory)
**Dependencies**: Add `animejs` to `package.json`

## Success Criteria

**Technical**:
- All TypeScript types properly inferred from Zod schemas
- anime.js animations run at 60fps on desktop
- No memory leaks from animation instances
- Bundle size increase < 10KB

**User**:
- Portfolio loads in < 2 seconds on 3G connection
- Hover animations feel smooth and responsive
- Project cards clearly communicate project info
- Links work correctly with proper security

**Business**:
- Showcases projects professionally
- Easy to add new projects (just edit JSON)
- Maintainable codebase following conventions
- Scalable foundation for Robust/Advanced features

## Robust Product (+2 days)

Technology filter with multi-select dropdown, featured projects hero section, lightbox modal for expanded details, date/alphabetical sorting, smooth filter transitions using anime.js timeline sequences.

## Advanced Product (+2 days)

MDX-based case study pages (`/portfolio/[slug]`), iframe embedded live demos with sandbox security, analytics event tracking (view/click), project RSS feed generation, dynamic OpenGraph images, search with fuzzy matching.

---

**Total MVP Effort**: 12 hours (1.5 days) | **Dependencies**: animejs package
