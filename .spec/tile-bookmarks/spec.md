# TileBookmarks Component Specification

## Problem & Solution

**Problem**: Homepage needs an engaging, visual way to display frequently accessed links. Plain link lists lack visual hierarchy and personality.

**Solution**: Windows Phone Metro-style tile grid with multiple sizes, flat colors, and favicons. Tiles provide visual interest and quick access to bookmarks.

**Returns**: Interactive tile grid component reading from JSON configuration file.

## Component API

```typescript
interface BookmarkTile {
  id: string;
  title: string;
  url: string;
  size: 'small' | 'medium' | 'large'; // 1x1, 2x1, 2x2
  color: string; // Tailwind color class
  icon?: string; // lucide-react icon name or favicon URL
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

<TileBookmarks bookmarks={bookmarksData.tiles} />
```

## Core Flow

```
Page loads
  ↓
Read bookmarks.json
  ↓
Render grid layout (CSS Grid)
  ↓
Map tiles with sizes/colors
  ↓
User hovers → scale animation
  ↓
User clicks → navigate to URL
```

## User Stories

**US-1: Quick Navigation**
User sees colorful tile grid on homepage. Clicks GitHub tile (large, blue) and navigates to GitHub. Tiles provide instant visual recognition through color and icon.

**US-2: Visual Hierarchy**
User scans homepage and immediately identifies important bookmarks by tile size. Large tiles (2x2) for frequent sites, small tiles (1x1) for occasional links. Size indicates priority.

**US-3: Responsive Layout**
User visits on mobile device. Tile grid adapts to smaller screen with stacked layout. All tiles remain accessible and readable without horizontal scroll.

## MVP Scope

**Included**:
- TileBookmarks component with CSS Grid layout
- Tile sub-component with 3 size variants (small/medium/large)
- JSON data file with bookmark configuration
- Hover animations (scale + shadow)
- Favicon/icon display (lucide-react icons or image URLs)
- Flat background colors per tile
- Click navigation to URLs
- Responsive grid (desktop 4-6 columns, mobile 2 columns)
- TypeScript interfaces for type safety

**NOT Included** (Future):
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
      "color": "bg-blue-500",
      "icon": "github"
    },
    {
      "id": "gmail",
      "title": "Gmail",
      "url": "https://mail.google.com",
      "size": "medium",
      "color": "bg-red-500",
      "icon": "mail"
    }
  ]
}
```

## Acceptance Criteria (MVP)

**Functional**:
- [ ] Renders tile grid from JSON data
- [ ] Supports 3 tile sizes: small (1x1), medium (2x1), large (2x2)
- [ ] Clicking tile navigates to URL in new tab
- [ ] Icons display correctly (lucide-react icons)
- [ ] Grid adapts to screen size (responsive)

**UI/UX**:
- [ ] Tiles have flat background colors
- [ ] Hover effect: scale(1.05) + shadow
- [ ] Smooth transitions (200ms)
- [ ] Grid gap matches Metro design (12px base unit)
- [ ] Tiles maintain aspect ratio
- [ ] Text remains readable on all background colors
- [ ] Mobile layout stacks tiles appropriately

**Code Quality**:
- [ ] TypeScript interfaces defined
- [ ] Component uses CVA for variants (like button.tsx)
- [ ] No console errors or warnings
- [ ] Follows existing component structure

## Future Tiers

**🔧 Robust** (+2 days): Live tile content (RSS/API updates), drag-and-drop reordering with position persistence, custom color picker UI, tile groups/categories.

**🚀 Advanced** (+3 days): Flip animations with back-side content, full CRUD UI for managing tiles, localStorage + cloud sync, tile templates library, analytics tracking.

---

**Status**: Ready for Implementation | **MVP Effort**: 1.5 days
