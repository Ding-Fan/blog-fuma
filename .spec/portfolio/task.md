# Portfolio Implementation Tasks

**Status**: Not Started | **MVP Effort**: 12 hours | **Priority**: Medium

---

## T-1: Project Setup & Dependencies

**Effort**: 0.5h | **Dependencies**: None

- [ ] Install animejs package
  ```bash
  npm install animejs
  npm install --save-dev @types/animejs
  ```
- [ ] Create directory structure
  ```bash
  mkdir -p components/portfolio-card
  mkdir -p data
  mkdir -p public/images/portfolio
  ```
- [ ] Verify package.json updated with animejs dependency

**Acceptance**:
- ✅ animejs installed and in package.json dependencies
- ✅ Directory structure created without errors
- ✅ TypeScript types for animejs available

---

## T-2: Type Definitions & Zod Schemas

**Effort**: 1h | **Dependencies**: T-1

- [ ] Create `components/portfolio-card/types.ts`
- [ ] Define ProjectData interface with all fields
- [ ] Create Zod schema `projectSchema` with validation rules:
  - id: non-empty string
  - title: non-empty string (min 1 char)
  - description: non-empty string
  - image: string (path validation)
  - tags: array of strings (min 1 tag)
  - demoUrl: optional valid URL (https only)
  - githubUrl: optional valid URL (https only)
  - featured: optional boolean
  - date: optional string
- [ ] Create `portfolioDataSchema` with projects array
- [ ] Export TypeScript types inferred from schemas
- [ ] Define ProjectCardProps interface

**Acceptance**:
- ✅ All schemas validate correct data
- ✅ Schemas reject invalid data with clear error messages
- ✅ TypeScript types properly inferred
- ✅ No TypeScript compilation errors

---

## T-3: Sample Portfolio Data

**Effort**: 0.5h | **Dependencies**: T-2

- [ ] Create `data/portfolio.json` with 3-5 sample projects
- [ ] Include variety of project types (featured/non-featured)
- [ ] Use placeholder image paths `/images/portfolio/project-X.png`
- [ ] Add diverse technology tags
- [ ] Include projects with and without demo/GitHub URLs
- [ ] Validate JSON format is correct

**Acceptance**:
- ✅ JSON file parses without syntax errors
- ✅ Data matches portfolioDataSchema structure
- ✅ Sample data represents realistic portfolio content

---

## T-4: Portfolio Card Component

**Effort**: 3h | **Dependencies**: T-2

- [ ] Create `components/portfolio-card/card.tsx`
- [ ] Import anime from 'animejs' and useRef from React
- [ ] Create PortfolioCard component with ProjectCardProps
- [ ] Implement card structure:
  - Card wrapper with ref for animation
  - Image section (16:9 aspect ratio with object-cover)
  - Content section (title, description, tags)
  - Actions section (demo link, GitHub icon)
- [ ] Style with Tailwind classes:
  - Rounded corners, dark background
  - Hover-ready transitions
  - Responsive text sizes
- [ ] Add technology tags as pill badges
- [ ] Implement action links with lucide-react icons
  - ExternalLink icon for demo
  - Github icon for repository
- [ ] Add proper accessibility attributes (aria-label, title)
- [ ] Ensure links have `rel="noopener noreferrer" target="_blank"`

**Acceptance**:
- ✅ Card renders all project data correctly
- ✅ Images maintain 16:9 aspect ratio
- ✅ Technology tags styled as pills
- ✅ Links open in new tab with security attributes
- ✅ Component is accessible (keyboard navigation works)
- ✅ Dark theme colors match global.css

---

## T-5: anime.js Hover Animations

**Effort**: 2h | **Dependencies**: T-4

- [ ] Create useRef for card element in PortfolioCard
- [ ] Implement onMouseEnter handler:
  ```typescript
  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      translateY: -8,
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      duration: 300,
      easing: 'easeOutCubic'
    });
  };
  ```
- [ ] Implement onMouseLeave handler to reverse animation:
  ```typescript
  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      translateY: 0,
      scale: 1,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      duration: 200,
      easing: 'easeInCubic'
    });
  };
  ```
- [ ] Attach handlers to card wrapper div
- [ ] Test animation smoothness on different browsers
- [ ] Ensure no animation on mobile touch devices

**Test Cases**:
- [ ] Hover triggers lift + scale animation
- [ ] Mouse leave reverses animation smoothly
- [ ] No lag or jank during animation
- [ ] Animation works across Chrome, Firefox, Safari

**Acceptance**:
- ✅ Hover animation runs smoothly at 60fps
- ✅ Animation reverses correctly on mouse leave
- ✅ No console errors from anime.js
- ✅ Works on desktop browsers, graceful on mobile

---

## T-6: Component Exports & Index

**Effort**: 0.5h | **Dependencies**: T-4, T-5

- [ ] Create `components/portfolio-card/index.tsx`
- [ ] Export PortfolioCard as default
- [ ] Export types: ProjectData, ProjectCardProps, PortfolioData
- [ ] Export Zod schemas: projectSchema, portfolioDataSchema
- [ ] Ensure clean import paths from other files

**Acceptance**:
- ✅ Import works: `import { PortfolioCard } from '@/components/portfolio-card'`
- ✅ Types and schemas exportable from index
- ✅ No circular dependency issues

---

## T-7: Portfolio Page Component

**Effort**: 2h | **Dependencies**: T-6, T-3

- [ ] Create `app/portfolio/page.tsx`
- [ ] Import portfolio data from `@/data/portfolio.json`
- [ ] Import portfolioDataSchema from component types
- [ ] Validate data with Zod parse in component:
  ```typescript
  const validatedData = portfolioDataSchema.parse(portfolioData);
  ```
- [ ] Implement responsive grid layout:
  ```typescript
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
  ```
- [ ] Map over validated projects array
- [ ] Render PortfolioCard for each project
- [ ] Add page title/heading
- [ ] Handle potential validation errors with try/catch

**Acceptance**:
- ✅ Page renders at `/portfolio` route
- ✅ Grid responsive across breakpoints
- ✅ All project cards display correctly
- ✅ Data validation errors shown clearly
- ✅ Page title displays above grid

---

## T-8: Styling & Theme Integration

**Effort**: 1.5h | **Dependencies**: T-7

- [ ] Review `app/global.css` for theme variables
- [ ] Apply dark theme background to portfolio page
- [ ] Ensure card backgrounds match dark theme
- [ ] Test contrast ratios for accessibility
- [ ] Add consistent spacing (padding, margins, gaps)
- [ ] Verify responsive behavior:
  - Mobile (375px): 1 column, readable text
  - Tablet (768px): 2 columns, balanced layout
  - Desktop (1024px+): 3 columns, optimal spacing
- [ ] Test in both light and dark modes (if applicable)

**Acceptance**:
- ✅ Colors match existing site theme
- ✅ Text readable with sufficient contrast
- ✅ Layout responsive without overflow
- ✅ Spacing consistent across breakpoints
- ✅ Dark mode works correctly

---

## T-9: Testing & Quality Assurance

**Effort**: 1h | **Dependencies**: T-8

- [ ] Test all project card links (demo, GitHub)
- [ ] Verify images load correctly (or show fallback)
- [ ] Test Zod validation with invalid data
- [ ] Check console for errors/warnings
- [ ] Test keyboard navigation (tab through links)
- [ ] Test screen reader accessibility
- [ ] Verify hover animations perform well
- [ ] Test on mobile devices (iOS/Android)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

**Acceptance**:
- ✅ No console errors or warnings
- ✅ All functionality works as expected
- ✅ Accessible via keyboard and screen readers
- ✅ Animations smooth on tested devices
- ✅ Links open correctly with security

---

## Final Verification (MVP)

**Functional**:
- [ ] `/portfolio` route accessible and renders
- [ ] JSON data validated at runtime
- [ ] All cards display correct project information
- [ ] Demo and GitHub links work correctly
- [ ] Hover animations trigger smoothly
- [ ] Invalid JSON throws validation errors

**UI/UX**:
- [ ] Grid responsive: 1 col mobile, 2 tablet, 3 desktop
- [ ] Cards aligned and spaced consistently
- [ ] Hover animation smooth with lift + shadow
- [ ] Animation reverses on mouse leave
- [ ] Dark theme matches site colors
- [ ] Technology tags styled as pills
- [ ] Images maintain 16:9 aspect ratio

**Code Quality**:
- [ ] TypeScript compilation successful
- [ ] No linting errors
- [ ] Follows existing code conventions
- [ ] Modular component structure
- [ ] Zod schemas validate properly
- [ ] anime.js imported and used correctly

---

## Robust Product Tasks

**T-10: Technology Filter** (+4h)
- Add filter dropdown component with multi-select
- Filter logic to show/hide cards based on selected tags
- Smooth filter animation with anime.js timeline
- URL query params for shareable filter state

**T-11: Featured Projects Section** (+2h)
- Hero section at top for featured projects
- Larger card design for featured items
- Auto-rotate featured projects every 5 seconds

**T-12: Project Detail Modal** (+3h)
- Lightbox modal component with expanded details
- Gallery view for multiple project images
- Close on ESC key and outside click
- Accessibility focus trap

**T-13: Sorting Options** (+1h)
- Sort by date (newest/oldest)
- Sort alphabetically (A-Z, Z-A)
- Dropdown selector for sort options

---

## Advanced Product Tasks

**T-14: MDX Project Pages** (+6h)
- Dynamic route `/portfolio/[slug]`
- MDX processing for case study content
- Template with images, code blocks, demos
- Navigation between projects

**T-15: Live Demo Embeds** (+3h)
- iframe sandbox for safe embedding
- Loading states and error handling
- Responsive iframe sizing
- Toggle between demo view and screenshot

**T-16: Analytics Integration** (+2h)
- Event tracking for card views
- Click tracking for demo/GitHub links
- Aggregate view counts per project
- Privacy-friendly analytics (no PII)

**T-17: Advanced Features** (+5h)
- RSS feed generation for projects
- OpenGraph metadata per project
- Search with fuzzy matching (Fuse.js)
- Export portfolio as PDF

---

**Total MVP Tasks**: T-1 through T-9 | **Effort**: 12 hours
