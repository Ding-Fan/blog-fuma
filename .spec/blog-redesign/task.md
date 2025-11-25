# Blog Listing Page Redesign Implementation Tasks

**Status**: Not Started | **MVP Effort**: 12-16 hours | **Priority**: High

---

## T-1: Update Frontmatter Schema

**Effort**: 0.5h | **Dependencies**: None

- [ ] Open `source.config.ts`
- [ ] Extend `blogPosts` schema with optional fields:
  ```typescript
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.iso.date().or(z.date()),
    image: z.string().optional(),
    category: z.string().optional(),
  })
  ```
- [ ] Save and verify TypeScript compilation

**Acceptance**:
- ✅ Schema extends without errors
- ✅ Existing posts still load correctly
- ✅ Optional fields don't break validation

---

## T-2: Create ImageWithFallback Component

**Effort**: 1h | **Dependencies**: T-1

- [ ] Create directory `app/(home)/blog/components/`
- [ ] Create `ImageWithFallback.tsx`
- [ ] Implement component:
  ```typescript
  'use client';
  import { useState } from 'react';

  export function ImageWithFallback({ src, alt, className }: Props) {
    const [failed, setFailed] = useState(false);
    if (failed) return null;
    return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
  }
  ```
- [ ] Add TypeScript interface for props
- [ ] Test error handling (provide broken URL)

**Acceptance**:
- ✅ Component renders image when src is valid
- ✅ Component returns null on error without console warnings
- ✅ No layout shift when image fails

---

## T-3: Create ArticleCard Component

**Effort**: 2-3h | **Dependencies**: T-2

- [ ] Create `app/(home)/blog/components/ArticleCard.tsx`
- [ ] Define TypeScript interface for props
- [ ] Implement card layout:
  - Category badge (if present)
  - Title with hover effects
  - ImageWithFallback (if image exists)
  - Description text
  - Metadata row (author, date)
- [ ] Add Tailwind styles:
  - Border separators between cards
  - Grayscale images: `grayscale hover:grayscale-0 transition-all duration-500`
  - Title hover: color change + underline animation
- [ ] Handle missing image: text-only layout without image section

**Test Cases**:
- [ ] Card with all fields (image, category, full metadata)
- [ ] Card without image (text-only)
- [ ] Card without category
- [ ] Hover interactions work smoothly

**Acceptance**:
- ✅ All props render correctly
- ✅ Layout adapts when image is missing
- ✅ Hover effects smooth and visually appealing
- ✅ Responsive on mobile, tablet, desktop

---

## T-4: Refactor Blog Page Layout

**Effort**: 1-2h | **Dependencies**: T-3

- [ ] Open `app/(home)/blog/page.tsx`
- [ ] Import ArticleCard component
- [ ] Replace current list layout with ArticleCard mapping:
  ```typescript
  {posts.map((post) => (
    <Link key={post.url} href={post.url}>
      <ArticleCard
        title={post.data.title}
        date={new Date(post.data.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        description={post.data.description}
        author={post.data.author}
        href={post.url}
        image={post.data.image}
        category={post.data.category}
      />
    </Link>
  ))}
  ```
- [ ] Update container styles for proper spacing
- [ ] Test with dev server

**Acceptance**:
- ✅ All posts render as ArticleCards
- ✅ Links navigate correctly
- ✅ Dates format properly
- ✅ No TypeScript errors

---

## T-5: Extract Git Dates for All Posts

**Effort**: 1-2h | **Dependencies**: T-1

- [ ] Create bash script to extract first commit dates:
  ```bash
  for file in content/blog/**/*.mdx; do
    date=$(git log --follow --format=%aI --reverse "$file" | head -1)
    echo "$file: $date"
  done
  ```
- [ ] Review output for missing/invalid dates
- [ ] Identify posts that need manual date assignment
- [ ] Save date mapping to temporary file

**Acceptance**:
- ✅ All 48 files have extracted dates
- ✅ Dates are in ISO format (YYYY-MM-DDTHH:MM:SS)
- ✅ No missing or invalid dates

---

## T-6: Update All MDX Frontmatter - Batch 1

**Effort**: 2-3h | **Dependencies**: T-5

- [ ] Update first 24 posts with:
  - `author: "Ding"`
  - `date: YYYY-MM-DD` (from git extraction)
- [ ] Verify frontmatter YAML syntax
- [ ] Run dev server to check schema validation
- [ ] Fix any parsing errors

**Posts to Update**: (Sample list)
- content/blog/cloudflare-tunnel.mdx
- content/blog/how-to-create-a-blog-with-ai.mdx
- content/blog/meaning-of-life.mdx
- ... (first 24 files)

**Acceptance**:
- ✅ All 24 posts have author field
- ✅ All 24 posts have valid dates
- ✅ No schema validation errors
- ✅ Posts render correctly on blog page

---

## T-7: Update All MDX Frontmatter - Batch 2

**Effort**: 2-3h | **Dependencies**: T-6

- [ ] Update remaining 24 posts with:
  - `author: "Ding"`
  - `date: YYYY-MM-DD` (from git extraction)
- [ ] Verify frontmatter YAML syntax
- [ ] Run dev server to check schema validation
- [ ] Fix any parsing errors

**Posts to Update**: (Remaining 24 files)
- content/blog/(fedora)/fedora.flatpak-cjk-fonts.mdx
- content/blog/(fedora)/fedora.flatpak.scale-fix.mdx
- ... (remaining 24 files)

**Acceptance**:
- ✅ All 48 posts have author field
- ✅ All 48 posts have valid dates
- ✅ No schema validation errors
- ✅ All posts render correctly

---

## T-8: Visual QA and Refinement

**Effort**: 1-2h | **Dependencies**: T-7

- [ ] Test blog page on multiple devices
- [ ] Verify responsive breakpoints (mobile, tablet, desktop)
- [ ] Check hover interactions on all cards
- [ ] Test posts with/without images
- [ ] Test posts with/without categories
- [ ] Verify date formatting consistency
- [ ] Check dark mode compatibility
- [ ] Test link navigation
- [ ] Verify grayscale transitions are smooth
- [ ] Adjust spacing/typography if needed

**Acceptance**:
- ✅ Layout looks professional on all devices
- ✅ All interactions work smoothly
- ✅ No visual bugs or layout shifts
- ✅ Typography is readable and hierarchical

---

## Final Verification (MVP)

**Functional**:
- [ ] All 48 posts display correctly
- [ ] Author shows "Ding" for all posts
- [ ] Dates are formatted consistently
- [ ] Images load or hide gracefully
- [ ] Categories display when present
- [ ] Links navigate to correct posts

**UI/UX**:
- [ ] Magazine-style editorial appearance achieved
- [ ] Visual hierarchy is clear and scannable
- [ ] Hover effects are smooth and polished
- [ ] Responsive on all device sizes
- [ ] No broken images or placeholders
- [ ] Clean borders and separators

**Technical**:
- [ ] No TypeScript errors
- [ ] No console errors or warnings
- [ ] Schema validation passes for all posts
- [ ] Components are properly typed
- [ ] Code follows existing patterns

---

## Robust Product Tasks

**T-9: Category Filtering System** (+4-6h)
- Add category filter dropdown
- Implement URL params for filter state
- Filter posts by selected category
- Add "All" option to clear filter

**T-10: Featured Post Hero** (+3-4h)
- Create FeaturedPostCard component
- Add `featured: boolean` to schema
- Render hero section at top
- Larger layout with emphasis

**T-11: Pagination** (+4-6h)
- Add pagination controls
- Implement 10 posts per page
- URL params for page number
- Previous/next navigation

**T-12: Image Optimization** (+3-4h)
- Switch to next/image
- Add blur placeholders
- Implement responsive sizes
- Optimize loading performance

**T-13: Reading Time Calculation** (+2-3h)
- Auto-calculate from MDX content
- Display in metadata row
- Add to frontmatter types

---

## Advanced Product Tasks

**T-14: Search Integration** (+6-8h)
- Integrate Orama search
- Create search input component
- Index all blog posts
- Display search results

**T-15: Tag System** (+6-8h)
- Add tags array to schema
- Create tag filter component
- Multi-select tag filtering
- Tag cloud visualization

**T-16: RSS Feed** (+4-6h)
- Generate RSS XML feed
- Include all posts
- Add feed link to layout
- Auto-update on build

**T-17: Reading Progress** (+3-4h)
- Add progress bar component
- Track scroll position
- Display on individual posts
- Smooth animations

**T-18: Analytics Integration** (+3-4h)
- Add Vercel Analytics
- Track post views
- Display view counts
- Popular posts section

**T-19: Related Posts** (+4-6h)
- Build similarity algorithm
- Calculate based on tags/category
- Display 3 related posts
- Add to post layout

---

**Total MVP Tasks**: T-1 through T-8 | **Effort**: 12-16 hours
