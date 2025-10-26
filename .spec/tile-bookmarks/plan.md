# TileBookmarks Implementation Plan

## Architecture Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Styling Pattern** | CVA (class-variance-authority) | Matches existing button.tsx pattern, type-safe variants |
| **Grid System** | CSS Grid | Native responsive support, clean Metro-style layout control |
| **Component Structure** | Modular (TileBookmarks + Tile) | Separation of concerns, easier testing |
| **Data Source** | Static JSON file | Simple MVP, no backend needed, easy to edit |
| **Icon Strategy** | lucide-react icons | Already in dependencies, consistent with existing components |
| **Color System** | Tailwind background classes | Leverages existing theme, type-safe via string literals |
| **Navigation** | Next.js Link component | Client-side routing for internal links, maintains Next.js features |

## Codebase Integration Strategy

**Component Location**: `components/tile-bookmarks/`
- `components/tile-bookmarks/index.tsx` - Main TileBookmarks component
- `components/tile-bookmarks/tile.tsx` - Individual Tile sub-component
- `components/tile-bookmarks/types.ts` - TypeScript interfaces
- Follows existing modular organization pattern

**Data Location**: `data/bookmarks.json`
- Create new `data/` directory at project root
- JSON schema matches BookmarkTile interface
- Easy for non-developers to edit

**Styling Approach**:
- Use CVA for tile size variants (like `buttonVariants` in button.tsx)
- Tailwind classes for colors, spacing, animations
- Follow existing color token pattern (fd-* custom properties)

**Homepage Integration**:
- Import into `app/(home)/page.tsx`
- Replace existing placeholder content
- Pass bookmarks data from JSON import

## Technical Approach

**Existing Patterns to Follow**:
1. **CVA Variants**: Study `components/ui/button.tsx` for variant pattern
2. **Component Export**: Follow existing component structure in `components/`
3. **TypeScript**: Use interface exports like other components
4. **Tailwind Classes**: Use existing color system from `app/global.css`

**Component Composition**:
```
<TileBookmarks>
  └── CSS Grid Container
      └── {bookmarks.map()}
          └── <Tile size={tile.size} color={tile.color}>
              ├── Icon (lucide-react)
              └── Title text
```

**Tile Size Grid Logic**:
- Small (1x1): `grid-column: span 1; grid-row: span 1`
- Medium (2x1): `grid-column: span 2; grid-row: span 1`
- Large (2x2): `grid-column: span 2; grid-row: span 2`
- Base unit: 120px per grid cell (matches Metro 12px × 10 ratio)

**Responsive Behavior**:
- Desktop (≥768px): 4-6 column grid
- Mobile (<768px): 2 column grid, tiles scale proportionally

## Risk Assessment

| Risk | Mitigation |
|------|-----------|
| **Icon name typos** | TypeScript literal types for lucide-react icon names |
| **Color contrast** | Test common background colors, add text shadow if needed |
| **Grid overflow** | Set max-width on container, auto-fit columns |
| **Slow JSON parsing** | Static import at build time, negligible performance impact |

## Integration Points

**Homepage**: `app/(home)/page.tsx`
**Data**: `data/bookmarks.json` (new file)
**Styling**: Uses existing Tailwind v4 config from `app/global.css`
**Icons**: `lucide-react` (already in package.json)

## Success Criteria

**Technical**:
- Component renders without errors
- TypeScript compilation passes
- Grid layout adapts to screen sizes
- Animations perform smoothly (60fps)

**User**:
- Tiles visually engaging and colorful
- Click targets large enough (min 44px)
- Navigation works on all tiles
- Mobile experience feels native

**Business**:
- Homepage loads in <2s
- Component reusable for other pages if needed
- Easy for user to update bookmarks via JSON

## Robust Product (+2 days)

Live tile updates (RSS/API polling), drag-and-drop with position save, color picker UI, tile categories/grouping, keyboard navigation support.

## Advanced Product (+3 days)

Flip animations with back-side widgets, full bookmark CRUD UI, localStorage + cloud sync, tile template gallery, usage analytics, share bookmark sets.

---

**Total MVP Effort**: 12 hours (1.5 days) | **Dependencies**: None
