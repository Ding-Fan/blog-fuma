# TileBookmarks Ideas Backlog

A pool of feature ideas, improvements, and technical debt items for future consideration.

---

## 🎯 High Priority Ideas

**Live Tile Content Updates**
- Real-time RSS feed integration for news/blog tiles
- WebSocket updates for dynamic content
- Unread count badges (e.g., email, notifications)
- Status: 🔧 Robust tier

**Drag-and-Drop Reordering**
- Intuitive tile rearrangement with @dnd-kit
- Position persistence via localStorage
- Visual feedback during drag operations
- Status: 🔧 Robust tier

---

## 💡 Feature Ideas

**Tile Categories/Groups**
- Organize tiles by category (Work, Personal, Social, etc.)
- Collapsible sections with category headers
- Filter/search within categories
- Custom category colors

**Quick Add Bookmark**
- Floating action button for adding new tiles
- Auto-fetch favicon and title from URL
- Color suggestion based on site branding
- One-click add from current tab

**Tile Templates**
- Predefined tile layouts (Developer, Designer, Student, etc.)
- One-click import of popular service packs
- Community-shared tile configurations

**Custom Tile Sizes**
- Support for extra-large (2x3) tiles
- Wide tiles (3x1) for banner-style content
- Flexible grid system with custom dimensions

**Keyboard Shortcuts**
- Number keys (1-9) to open first 9 tiles
- Ctrl+K for quick search/filter
- Arrow keys for navigation
- Enter to open selected tile

---

## 🔧 Technical Improvements

**Performance Optimization**
- Lazy load tile icons for large bookmark sets
- Virtual scrolling for 100+ tiles
- Image optimization for custom tile backgrounds
- Debounce drag-and-drop updates

**Dark Mode Support**
- Automatic color adjustment for dark theme
- Custom dark mode color palette
- User preference persistence
- Tailwind dark: classes integration

**Icon System Upgrade**
- Support for custom image icons (not just emojis)
- Favicon fetching from bookmark URLs
- SVG icon library integration
- Icon upload functionality

**Color System Enhancement**
- Tailwind color class support alongside hex
- Color palette picker UI
- Automatic contrast checking
- Suggested colors based on site branding

**Data Storage Options**
- Export/import bookmarks as JSON
- Cloud sync with user accounts
- Browser bookmark import
- CSV/Excel export for backup

**Validation Improvements**
- More comprehensive emoji validation (extended Unicode ranges)
- URL reachability checking
- Duplicate bookmark detection
- Invalid URL warnings

---

## 🐛 Known Issues

**Emoji Validation Edge Cases**
- Some newer emojis (Unicode 15.0+) not supported by regex
- Multi-character emojis (e.g., 👨‍💻) fail validation
- Flag emojis (🇺🇸) not recognized

**Layout Quirks**
- Grid gap inconsistent at certain viewport widths
- Large tiles can cause uneven row heights on mobile

---

## 🤔 Research Needed

**Progressive Web App (PWA) Integration**
- Install as standalone app
- Offline bookmark access
- Push notifications for live tiles
- Status: Research required for feasibility

**Browser Extension**
- Replace new tab page with tile bookmarks
- Sync with web app configuration
- One-click bookmark from any page
- Status: Investigate Chrome/Firefox APIs

**AI-Powered Features**
- Smart tile suggestions based on browsing history
- Automatic category assignment
- Intelligent tile sizing based on usage frequency
- Status: Explore AI/ML integration options

**Analytics & Insights**
- Most-clicked tiles dashboard
- Time-based usage patterns
- A/B testing for tile layouts
- Status: Privacy-first analytics research

---

## 📦 Backlog (Unprioritized)

**Tile Animations**
- Flip animation with back-side content (🚀 Advanced tier)
- Slide-in animations on page load
- Parallax effects on scroll
- Micro-interactions on hover

**Social Features**
- Share tile configurations with friends
- Public tile gallery/marketplace
- Rate and review popular tile sets
- Collaborative bookmark collections

**Accessibility Enhancements**
- High contrast mode
- Screen reader optimizations
- Reduced motion preferences
- Font size customization

**Multi-Language Support**
- i18n for UI labels
- RTL layout support
- Localized bookmark suggestions

**Mobile App**
- React Native port
- Native gestures (swipe, long-press)
- Widget for home screen
- App shortcuts for top tiles

---

## ✅ Implemented

**Emoji Icon System** (2024-10-26)
- Unicode emoji support with validation
- XSS protection via regex pattern matching
- Lightweight (zero dependencies)

**Hex Color Support** (2024-10-26)
- Precise brand color matching
- Inline style application
- Zod validation for #RRGGBB format

**Zod Runtime Validation** (2024-10-26)
- Type-safe JSON data loading
- Error handling for invalid data
- Schema-driven validation

**CVA Variant System** (2024-10-26)
- Three tile sizes (small, medium, large)
- Consistent variant styling
- Type-safe size props

**Responsive Grid Layout** (2024-10-26)
- 2 columns on mobile
- 4 columns on tablet
- 6 columns on desktop

**Accessibility Features** (2024-10-26)
- ARIA labels for screen readers
- Keyboard navigation support
- Focus visible indicators
- Semantic HTML structure

---

## ❌ Rejected

**Lucide React Icons** (2024-10-26)
- Reason: Adds 50KB+ to bundle, emojis are lighter and universally supported
- Alternative: Emoji characters with validation

**Tailwind Color Classes** (2024-10-26)
- Reason: Limited palette, requires config extension for brand colors
- Alternative: Hex codes for precise color matching

**Database Storage** (2024-10-26)
- Reason: Overkill for static bookmark data, adds complexity
- Alternative: JSON file with version control

**External Icon API** (2024-10-26)
- Reason: Network dependency, potential privacy concerns, rate limits
- Alternative: Local emoji validation
