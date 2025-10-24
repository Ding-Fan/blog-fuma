# Blog Post Links Page Implementation Tasks

**Status**: Completed | **MVP Effort**: 4 hours | **Priority**: High

---

## T-1: Page Setup and Data Integration

**Effort**: 1h | **Dependencies**: None

- [x] Create blog page at `app/(home)/blog/page.tsx`
- [x] Import blog loader from `@/lib/source`
- [x] Fetch posts using `blog.getPages()`
- [x] Set up basic page structure with container and main element
  ```tsx
  <main className="grow container mx-auto px-4 py-4">
    <div className="flex flex-col gap-8">
      {posts.map((post) => ...)}
    </div>
  </main>
  ```

**Acceptance**:
- ✅ Page renders at `/blog` route
- ✅ All blog posts from `content/blog/` are fetched
- ✅ No console errors or TypeScript errors

---

## T-2: Post Link Component Structure

**Effort**: 1h | **Dependencies**: T-1

- [x] Implement `<Link>` component with `group` class
- [x] Set up post mapping with unique keys (`post.url`)
- [x] Create three-section layout (metadata, title, description)
- [x] Add semantic HTML (`<time>` for dates, `<h2>` for titles)
- [x] Apply base spacing (gap-8 between posts, mb-2 for internal spacing)

**Test Cases**:
- [x] Links navigate to correct post URLs
- [x] All posts render without layout issues
- [x] Spacing is consistent across all posts

**Acceptance**:
- ✅ Post links are clickable and navigate correctly
- ✅ Layout structure matches design (metadata → title → description)
- ✅ Semantic HTML is used for better accessibility

---

## T-3: Metadata Display and Formatting

**Effort**: 0.5h | **Dependencies**: T-2

- [x] Implement conditional rendering for date and author
- [x] Format date with `toLocaleDateString('en-US', { year, month, day })`
- [x] Add separator dot between date and author
- [x] Style metadata with small, muted text
  ```tsx
  <div className="text-sm text-gray-500 dark:text-gray-400">
    {post.data.date && <time>...</time>}
    {post.data.author && post.data.date && <span> · </span>}
    {post.data.author && <span>{post.data.author}</span>}
  </div>
  ```

**Acceptance**:
- ✅ Date formats correctly as "Month Day, Year"
- ✅ Author displays when available
- ✅ Missing metadata doesn't break layout
- ✅ Separator dot only appears when both date and author exist

---

## T-4: Title Hover Effects

**Effort**: 1h | **Dependencies**: T-2

- [x] Add group hover color transition to title
- [x] Implement violet accent colors (violet-400 light, violet-300 dark)
- [x] Add 300ms transition duration
- [x] Create relative wrapper span for underline positioning
- [x] Implement animated underline with absolute positioning
  ```tsx
  <h2 className="group-hover:text-violet-400 dark:group-hover:text-violet-300 transition-colors duration-300">
    <span className="relative inline-block">
      {post.data.title}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 dark:bg-violet-300 group-hover:w-full transition-all duration-300 ease-out" />
    </span>
  </h2>
  ```

**Test Cases**:
- [x] Title color transitions smoothly on hover
- [x] Underline animates from left to right
- [x] No layout shift occurs during animation
- [x] Dark mode colors display correctly

**Acceptance**:
- ✅ Hover effect is smooth (300ms duration)
- ✅ Underline slides from 0 to full width
- ✅ Violet accent colors match design
- ✅ No visual jumps or layout shifts

---

## T-5: Description Styling and Polish

**Effort**: 0.5h | **Dependencies**: T-2

- [x] Style description with muted gray colors
- [x] Add `leading-relaxed` for better readability
- [x] Ensure proper dark mode support
- [x] Test typography hierarchy (title > description)
  ```tsx
  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
    {post.data.description}
  </p>
  ```

**Acceptance**:
- ✅ Description uses muted colors for visual hierarchy
- ✅ Line height provides good readability
- ✅ Dark mode colors are appropriate

---

## Final Verification (MVP)

**Functional**:
- [x] Blog page renders at `/blog` route
- [x] All blog posts are displayed with correct data
- [x] Links navigate to individual posts
- [x] Date formats correctly
- [x] Author displays when present
- [x] Missing metadata handled gracefully

**UI/UX**:
- [x] Title transitions to violet on hover (300ms)
- [x] Underline animates smoothly left-to-right
- [x] Posts have gap-8 spacing
- [x] Dark mode works correctly
- [x] Typography hierarchy is clear
- [x] Metadata uses muted colors

**Performance**:
- [x] Page is server-rendered (SSR)
- [x] No layout shift on hover
- [x] Animations are smooth (60fps)

---

## Robust Product Tasks

**T-6: Tag Filtering** (+8h)
- Add tag display to post metadata
- Create filter sidebar with tag list
- Implement multi-select filtering logic
- Update URL with query params

**T-7: Search Functionality** (+4h)
- Add search input component (client)
- Implement live filtering by title/description
- Debounce search input (300ms)
- Show "no results" state

**T-8: Pagination** (+4h)
- Implement page splitting (10 posts per page)
- Add pagination controls (prev/next, page numbers)
- Update URL with page query param
- Preserve filters/search in pagination

---

## Advanced Product Tasks

**T-9: Featured Posts** (+6h)
- Define featured flag in frontmatter schema
- Create featured posts carousel
- Add visual distinction (border/badge)
- Position above regular posts list

**T-10: RSS Feed** (+8h)
- Create `/blog/rss.xml` route
- Generate RSS XML from blog posts
- Include metadata and description
- Add RSS link in page header

**T-11: Reading Time** (+2h)
- Calculate word count from MDX content
- Estimate reading time (200 words/min)
- Display in metadata section
- Add icon for visual clarity

**T-12: Related Posts** (+6h)
- Implement tag matching algorithm
- Show 3 related posts at bottom
- Add "Related Posts" section
- Link to related post pages

---

**Total MVP Tasks**: T-1 through T-5 | **Effort**: 4 hours
