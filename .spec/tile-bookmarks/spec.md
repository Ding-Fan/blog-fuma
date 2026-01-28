---
feature: "tile-bookmarks"
status: "mvp-complete"
created: "2024-10-26"
updated: "2024-12-12"
mvp_effort_hours: 12
mvp_effort_days: 1.5
priority: "high"
tags: ["component", "ui", "navigation", "metro-design"]
scope: "package-specific"
package: "blog-fuma"
current_tier: "mvp"
---

# TileBookmarks Component Specification

## TL;DR (30-Second Scan)

**Problem**: Homepage needs an engaging, visual way to display frequently accessed links with visual hierarchy
**Solution**: Windows Phone Metro-style tile grid with emoji icons, hex colors, and responsive layout
**Status**: MVP Complete - All acceptance criteria met
**Effort**: MVP 1.5 days | +Robust 2 days | +Advanced 3 days
**Next Action**: Feature complete - See backlog.md for future enhancements

---

<details>
<summary>📋 Full Specification (click to expand)</summary>

## Problem & Solution

**Problem**: Homepage needs an engaging, visual way to display frequently accessed links. Plain link lists lack visual hierarchy and personality.

**Solution**: Windows Phone Metro-style tile grid with multiple sizes, flat colors, and emoji icons. Tiles provide visual interest and quick access to bookmarks.

**Returns**: Interactive tile grid component reading from JSON configuration file.

## Component API

```typescript
interface BookmarkTile {
  id: string;
  title: string;
  url: string;
  size: 'small' | 'medium' | 'large'; // 1x1, 2x1, 2x2
  color: string; // Hex color code (#RRGGBB)
  icon?: string; // Emoji character
}

interface TileBookmarksProps {
  bookmarks?: BookmarkTile[];
  className?: string;
}
```

## Usage Example

```typescript
import { TileBookmarks } from '@/components/tile-bookmarks';
import bookmarksData from '@/data/bookmarks.json';

// Validate at runtime with Zod
const validatedData = bookmarksDataSchema.parse(bookmarksData);

<TileBookmarks bookmarks={validatedData.tiles} />
```

## Core Flow

```
Page loads
  ↓
Read bookmarks.json
  ↓
Validate with Zod schema
  ↓
Render grid layout (CSS Grid)
  ↓
Map tiles with sizes/colors
  ↓
User hovers → scale animation
  ↓
User clicks → navigate to URL (new tab)
```

## User Stories

**US-1: Quick Navigation**
User sees colorful tile grid on homepage. Clicks GitHub tile (large, dark) and navigates to GitHub in new tab. Tiles provide instant visual recognition through color and emoji icon.

**US-2: Visual Hierarchy**
User scans homepage and immediately identifies important bookmarks by tile size. Large tiles (2x2) for frequent sites like GitHub and Netflix, medium tiles (2x1) for regular sites, small tiles (1x1) for occasional links. Size indicates priority.

**US-3: Responsive Layout**
User visits on mobile device. Tile grid adapts to smaller screen with 2-column stacked layout. All tiles remain accessible and readable without horizontal scroll. Desktop shows 4-6 columns with proper spacing.

## MVP Scope

**Included**:
- TileBookmarks component with CSS Grid layout
- Tile sub-component with 3 size variants (small/medium/large)
- JSON data file with bookmark configuration (15 tiles)
- Hover animations (scale 1.05 + shadow)
- Emoji icon display with XSS validation
- Hex color backgrounds per tile
- Click navigation to URLs (new tab with noopener)
- Responsive grid (desktop 4-6 columns, mobile 2 columns)
- TypeScript interfaces with Zod validation
- Runtime data validation with error handling
- Accessibility (ARIA labels, keyboard navigation)
- Visual grouping via reordering, color harmony, and spacers

**NOT Included** (Future):
- Schema-based categories with section headers → 🔧 Robust
- Live tile content updates → 🔧 Robust
- Drag-and-drop reordering → 🔧 Robust
- Custom color picker → 🔧 Robust
- Tile flip animations → 🚀 Advanced
- Add/edit/remove tiles UI → 🚀 Advanced
- localStorage persistence → 🚀 Advanced

## Data Schema

**File**: `data/bookmarks.json`

```json
{
  "tiles": [
    {
      "id": "github",
      "title": "GitHub",
      "url": "https://github.com",
      "size": "large",
      "color": "#24292e",
      "icon": "💻"
    },
    {
      "id": "gmail",
      "title": "Gmail",
      "url": "https://mail.google.com",
      "size": "medium",
      "color": "#EA4335",
      "icon": "📧"
    }
  ]
}
```

**Validation**: Zod schema enforces:
- Required fields (id, size, color)
- Valid URL format (HTTP/HTTPS or "#" for spacers)
- Valid hex color format (#RRGGBB)
- Valid size enum (small/medium/large)
- Optional emoji icon
- Optional title (can be empty for spacers)

**Spacer Tile Support**:
The schema allows empty/minimal values for spacer tiles:
- `title`: Can be empty string for spacers
- `url`: Can be "#" for non-navigable spacers
- `color`: Dark color (#0a0a0a) recommended for subtle visual breaks
- Spacers enable visual grouping without schema categories

## Security

**XSS Protection**:
- Emoji validation with regex pattern matching
- Only renders validated emoji characters
- URL validation (HTTP/HTTPS protocols only)
- External links with `rel="noopener noreferrer"`

## Visual Grouping (MVP Enhancement)

**Approach**: Design-based grouping using Gestalt principles (no schema changes)

**Techniques**:
- **Proximity**: Related bookmarks ordered consecutively
- **Color Harmony**: AI tools use unified purple gradient palette (#7B68EE, #8E44AD, #9B59B6)
- **Spacing**: Subtle spacer tiles (small, #0a0a0a, title: "", url: "#") create visual breaks
  - Schema validates "#" as acceptable URL for spacers
  - Empty title allowed for non-interactive tiles

**Groups**:
- AI Tools (3) - Purple family colors
- Development (3) - Mixed colors
- Productivity (4) - Blue family
- Entertainment (6) - Mixed vibrant colors
- Utilities (2) - Orange/red family

**Benefits**:
- No schema/component changes required
- Maintains simple flat data structure
- Compatible with future category implementation
- Immediate visual organization

**Future**: Will migrate to category-based grouping in Robust tier

## Acceptance Criteria (MVP)

**Functional**:
- [x] Renders tile grid from JSON data
- [x] Supports 3 tile sizes: small (1x1), medium (2x1), large (2x2)
- [x] Clicking tile navigates to URL in new tab
- [x] Icons display correctly (emoji with validation)
- [x] Grid adapts to screen size (responsive)
- [x] Runtime validation with Zod schema
- [x] Error handling for invalid data

**UI/UX**:
- [x] Tiles have flat background colors (hex codes)
- [x] Hover effect: scale(1.05) + shadow
- [x] Smooth transitions (200ms)
- [x] Grid gap matches Metro design (12px base unit)
- [x] Tiles maintain aspect ratio
- [x] Text remains readable on all background colors
- [x] Mobile layout stacks tiles appropriately (2 cols)
- [x] Active state animation (scale 0.95)

**Code Quality**:
- [x] TypeScript interfaces defined
- [x] Component uses CVA for variants
- [x] No console errors or warnings
- [x] Follows existing component structure
- [x] Zod schemas for runtime validation
- [x] Emoji validation utility function

**Accessibility**:
- [x] ARIA labels for screen readers
- [x] Keyboard navigation support
- [x] Focus visible ring on focus
- [x] Icons marked aria-hidden

## Implementation Details

**Component Structure**:
```
components/tile-bookmarks/
├── index.tsx          # Main grid container
├── tile.tsx           # Individual tile with CVA variants
└── types.ts           # Zod schemas + TypeScript types
```

**Data Location**:
```
data/bookmarks.json    # 15 configured tiles
```

**Page Integration**:
```
app/(home)/page.tsx    # Homepage using TileBookmarks
```

## Future Tiers

**🔧 Robust** (+2 days): Live tile content (RSS/API updates), drag-and-drop reordering with position persistence, custom color picker UI, schema-based categories with section headers (migrate from visual grouping).

**🚀 Advanced** (+3 days): Flip animations with back-side content, full CRUD UI for managing tiles, localStorage + cloud sync, tile templates library, analytics tracking.

</details>

---

**Quick Links**: [dev-log.md](./dev-log.md) | [tasks.md](./tasks.md) | [backlog.md](./backlog.md)
