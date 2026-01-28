---
feature: "bookmarklet-installation-pattern"
status: "complete"
progress_mvp: 100
progress_robust: 0
progress_advanced: 0
total_tasks_mvp: 6
completed_tasks_mvp: 6
started: "2026-01-03"
last_updated: "2026-01-03 17:00"
current_task: null
---

# Bookmarklet Installation Pattern - Implementation Tasks

**Status**: Complete (Pattern Documented) | **Progress**: 6/6 MVP tasks | **Priority**: Medium

**Note**: This is a universal pattern specification. Tasks below are for implementing in YOUR project.

---

## T-1: Component Structure Setup

**Effort**: 0.5h | **Dependencies**: None | **Status**: Template Ready

- [x] Create component file (e.g., `BookmarkletInstaller.tsx`)
- [x] Define TypeScript interfaces
- [x] Set up basic component skeleton

**Acceptance**:
- ✅ Component renders without errors
- ✅ TypeScript types defined for props

---

## T-2: Bookmarklet Encoding Function

**Effort**: 0.5h | **Dependencies**: T-1 | **Status**: Template Ready

- [x] Implement Base64 encoding with Unicode support
- [x] Wrap in self-executing function with error handling
- [x] Test with special characters (quotes, newlines, emoji)

**Code Template**:
```typescript
function encodeBookmarklet(code: string): string {
  const base64 = btoa(unescape(encodeURIComponent(code)));
  return `javascript:(function(){try{eval(decodeURIComponent(escape(atob('${base64}'))))}catch(e){alert('Error: '+e.message)}})();`;
}
```

**Test Cases**:
- [ ] Simple code: `alert('hello')`
- [ ] With quotes: `alert("it's working")`
- [ ] With newlines: Multi-line code
- [ ] With Unicode: `alert('日本語 emoji 🎉')`

**Acceptance**:
- ✅ Encoding function works with all test cases
- ✅ Decoded bookmarklet executes correctly

---

## T-3: Draggable Link Implementation

**Effort**: 1h | **Dependencies**: T-2 | **Status**: Template Ready

- [x] Create `<a>` element with proper attributes
- [x] Use `useRef` to set href after mount (React) or direct assignment (vanilla)
- [x] Add `draggable="true"` attribute
- [x] Prevent default click behavior
- [x] Style with grab cursor and distinct color

**Attributes Checklist**:
```tsx
<a
  ref={linkRef}
  href="#"                    // Set via ref after mount
  title={title}               // Shows on hover
  onClick={(e) => e.preventDefault()}
  draggable="true"
  className="..."             // Green, grab cursor
>
  📌 {title}
</a>
```

**Acceptance**:
- ✅ Link is draggable to bookmarks bar
- ✅ Clicking link doesn't navigate
- ✅ Cursor shows grab/grabbing states

---

## T-4: Copy to Clipboard Functionality

**Effort**: 0.5h | **Dependencies**: T-2 | **Status**: Template Ready

- [x] Implement copy using Clipboard API
- [x] Add success state with 2-second timeout
- [x] Handle copy errors gracefully
- [x] Show visual feedback (button text change)

**Code Template**:
```typescript
const [copySuccess, setCopySuccess] = useState(false);

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(generateBookmarklet());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  } catch (err) {
    console.error('Copy failed:', err);
    // Show error to user
  }
};
```

**Acceptance**:
- ✅ Click copies bookmarklet code
- ✅ Success feedback shows "✓ Copied!"
- ✅ Feedback clears after 2 seconds

---

## T-5: Installation Instructions UI

**Effort**: 0.5h | **Dependencies**: T-3, T-4 | **Status**: Template Ready

- [x] Add instructions container with muted styling
- [x] Write numbered steps (not bullets)
- [x] Include dynamic title in step 4
- [x] Mention bookmark bar visibility toggle

**Instructions Template**:
```
Option 1: Drag the green button above to your bookmarks bar

Option 2: Manual installation
1. Click "Copy Bookmarklet" above
2. Create a new bookmark in your browser
3. Paste the copied code as the URL
4. Name it "{title}"

Tip: Press Ctrl/Cmd+Shift+B to show bookmarks bar
```

**Acceptance**:
- ✅ Instructions are clear and numbered
- ✅ Both methods explained
- ✅ Bookmarklet title appears in instructions

---

## T-6: Styling and Polish

**Effort**: 1h | **Dependencies**: T-5 | **Status**: Template Ready

- [x] Style draggable link (green, rounded, padding)
- [x] Style copy buttons with consistent design
- [x] Add hover/active states
- [x] Ensure responsive layout
- [x] Test color contrast for accessibility

**CSS Template**:
```css
.bookmarklet-drag-link {
  display: inline-block;
  padding: 12px 20px;
  background: #16a34a;
  color: white;
  border-radius: 6px;
  font-weight: 600;
  cursor: grab;
  user-select: none;
}

.bookmarklet-drag-link:hover {
  background: #15803d;
}

.bookmarklet-drag-link:active {
  cursor: grabbing;
}
```

**Acceptance**:
- ✅ Visual design is polished
- ✅ Hover states provide feedback
- ✅ Works on different screen sizes

---

## Final Verification (MVP)

**Functional**:
- [ ] Drag-and-drop installs bookmarklet in Chrome
- [ ] Drag-and-drop installs bookmarklet in Firefox
- [ ] Drag-and-drop installs bookmarklet in Safari
- [ ] Copy button copies valid bookmarklet code
- [ ] Pasted bookmarklet works when manually installed
- [ ] Unicode content encodes/decodes correctly

**UI/UX**:
- [ ] Drag link has clear visual affordance
- [ ] Copy feedback appears and clears
- [ ] Instructions are easy to follow
- [ ] Responsive on different screen sizes

**Accessibility**:
- [ ] Link has title attribute
- [ ] Buttons have descriptive text
- [ ] Color contrast passes WCAG AA

---

## Robust Product Tasks

**T-7: Mobile Detection & Messaging** (+1h) | **Status**: ⏸️ Future
- Detect mobile/touch devices
- Show alternative messaging ("Bookmarklets not supported on mobile")
- Suggest desktop alternatives

**T-8: Keyboard-Only Installation Guide** (+1h) | **Status**: ⏸️ Future
- Add keyboard shortcuts documentation
- Provide alternative copy method via keyboard
- Test with screen readers

**T-9: Bookmarks Bar Visibility Helper** (+1h) | **Status**: ⏸️ Future
- Detect if likely first-time user
- Show tooltip about Ctrl/Cmd+Shift+B
- Add expandable help section

**T-10: Screen Reader Optimization** (+1h) | **Status**: ⏸️ Future
- Add ARIA labels and live regions
- Announce copy success to screen readers
- Test with VoiceOver/NVDA

---

## Advanced Product Tasks

**T-11: Browser Extension Alternative** (+4h) | **Status**: ⏸️ Future
- Create simple browser extension wrapper
- One-click installation from extension store
- Sync bookmarklets across devices

**T-12: Installation Analytics** (+2h) | **Status**: ⏸️ Future
- Track drag vs copy method usage
- Track installation success (if detectable)
- A/B test UI variations

**T-13: Multi-Bookmarklet Batch Install** (+2h) | **Status**: ⏸️ Future
- Allow selecting multiple bookmarklets
- Generate combined installation page
- Export as HTML file for sharing

---

**Task Legend**: ⏸️ Future | 🚧 In Progress | ✅ Complete

**Total**: T-1 through T-6 (4 hours MVP) | **Current**: Pattern complete, ready for implementation
