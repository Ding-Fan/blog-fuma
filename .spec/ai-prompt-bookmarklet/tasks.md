---
feature: "ai-prompt-bookmarklet"
status: "not-started"
progress_mvp: 0
progress_robust: 0
progress_advanced: 0
total_tasks_mvp: 10
completed_tasks_mvp: 0
started: null
last_updated: "2025-01-01"
current_task: "T-1"
---

# AI Prompt Bookmarklet Manager Implementation Tasks

**Status**: Not Started | **Progress**: 0/10 MVP tasks | **Priority**: High

---

## T-1: Bookmarklet Core Structure Setup

**Effort**: 2h | **Dependencies**: None | **Status**: ⏸️ Not Started

- [ ] Create IIFE (Immediately Invoked Function Expression) wrapper
- [ ] Add CSP error try-catch wrapper
- [ ] Implement main entry point function
- [ ] Add namespace to avoid global conflicts
  ```javascript
  javascript:(function(){
    'use strict';
    try {
      // Main bookmarklet code
    } catch(e) {
      // CSP fallback
    }
  })();
  ```

**Acceptance**:
- ✅ IIFE executes without global variable pollution
- ✅ CSP errors caught and handled gracefully
- ✅ Code runs on ChatGPT/Gemini/Claude without console errors

---

## T-2: Platform Detection Logic

**Effort**: 2h | **Dependencies**: T-1 | **Status**: ⏸️ Not Started

- [ ] Define platform URL regex patterns
- [ ] Implement platform detection function
- [ ] Map platform to textarea selectors
- [ ] Test detection on all three platforms

**Test Cases**:
- [ ] Detects ChatGPT on `chat.openai.com`
- [ ] Detects Gemini on `gemini.google.com`
- [ ] Detects Claude on `claude.ai`
- [ ] Returns null for unknown platforms

**Acceptance**:
- ✅ Correct platform detected on all three AI sites
- ✅ Null returned on non-AI sites (no errors thrown)
- ✅ Textarea selectors mapped correctly per platform

---

## T-3: MDX Fetch and Parse Functions

**Effort**: 4h | **Dependencies**: T-1 | **Status**: ⏸️ Not Started

- [ ] Implement fetch function for ai.prompt.mdx
- [ ] Add CORS error handling with GitHub fallback
- [ ] Create regex parser for code blocks with `copy` attribute
- [ ] Build prompt list data structure `[{title, content}, ...]`
- [ ] Add sessionStorage caching (30 min TTL)

**Parsing Regex**:
```javascript
const regex = /## (.+?)\n\n````[\w\s]+ copy\n([\s\S]+?)````/g;
```

**Acceptance**:
- ✅ MDX file fetched successfully from blog URL
- ✅ GitHub raw URL fallback works if CORS fails
- ✅ All prompts extracted correctly (title + content)
- ✅ sessionStorage cache reduces redundant fetches
- ✅ Parse errors show user-friendly error message

---

## T-4: Modal UI HTML/CSS Structure

**Effort**: 3h | **Dependencies**: T-1 | **Status**: ⏸️ Not Started

- [ ] Create modal HTML structure with JavaScript
- [ ] Add search input box (autofocused)
- [ ] Add scrollable prompt list container
- [ ] Implement backdrop overlay (semi-transparent)
- [ ] Style with inline CSS (no external files)
  ```css
  /* Modal: white bg, shadow, rounded, centered */
  /* Search: border, padding, full width */
  /* List: scrollable, hover states */
  ```

**Acceptance**:
- ✅ Modal appears centered on screen
- ✅ Search box is focused on modal open
- ✅ Prompt list scrollable if more than 10 items
- ✅ Backdrop overlay dims background
- ✅ Modal responsive on mobile (90% width)

---

## T-5: Search Filter Logic

**Effort**: 2h | **Dependencies**: T-3, T-4 | **Status**: ⏸️ Not Started

- [ ] Implement real-time search on input event
- [ ] Filter prompts by title (case-insensitive)
- [ ] Re-render filtered list dynamically
- [ ] Show "No prompts found" if empty
- [ ] Clear search resets to full list

**Acceptance**:
- ✅ Typing "consultant" filters to matching prompts instantly
- ✅ Search is case-insensitive
- ✅ List updates without lag (<50ms)
- ✅ Empty results show helpful message

---

## T-6: Keyboard Navigation

**Effort**: 3h | **Dependencies**: T-4, T-5 | **Status**: ⏸️ Not Started

- [ ] Track highlighted prompt index
- [ ] Implement ↑ arrow (move up, wrap at top)
- [ ] Implement ↓ arrow (move down, wrap at bottom)
- [ ] Implement Enter (select highlighted prompt)
- [ ] Implement Esc (close modal)
- [ ] Add visual highlight CSS for selected item

**Acceptance**:
- ✅ Arrow keys navigate through prompt list
- ✅ Highlighted prompt visually distinct (background color)
- ✅ Enter key inserts highlighted prompt
- ✅ Esc key closes modal
- ✅ Navigation wraps at top/bottom of list

---

## T-7: Textarea Detection and Insertion

**Effort**: 4h | **Dependencies**: T-2, T-6 | **Status**: ⏸️ Not Started

- [ ] Implement textarea finder for each platform
- [ ] Add fallback selectors (generic `textarea`, `[contenteditable]`)
- [ ] Create insertion function (handle contenteditable vs textarea)
- [ ] Trigger input event after insertion (for React forms)
- [ ] Focus textarea after insertion

**Platform Selectors**:
- ChatGPT: `textarea[data-id]` → fallback `textarea`
- Gemini: `.ql-editor[contenteditable]` → fallback `[contenteditable]`
- Claude: `.ProseMirror` → fallback `div[contenteditable]`

**Acceptance**:
- ✅ Prompt inserted into ChatGPT textarea successfully
- ✅ Prompt inserted into Gemini contenteditable div
- ✅ Prompt inserted into Claude ProseMirror editor
- ✅ Input event triggered (React forms detect change)
- ✅ Cursor focused in textarea after insertion

---

## T-8: CSP Error Handling and Clipboard Fallback

**Effort**: 2h | **Dependencies**: T-1, T-7 | **Status**: ⏸️ Not Started

- [ ] Wrap main code in try-catch for CSP errors
- [ ] Implement clipboard copy fallback
- [ ] Show toast notification: "Prompt copied! Paste with Ctrl+V"
- [ ] Auto-dismiss toast after 3 seconds

**Acceptance**:
- ✅ CSP error detected when bookmarklet blocked
- ✅ Prompt copied to clipboard automatically
- ✅ Toast notification appears with clear message
- ✅ Toast auto-dismisses after 3 seconds
- ✅ User can paste prompt manually

---

## T-9: Modal Interactions and Events

**Effort**: 3h | **Dependencies**: T-4, T-6, T-7 | **Status**: ⏸️ Not Started

- [ ] Close modal on backdrop click
- [ ] Close modal on Esc key
- [ ] Close modal after prompt insertion
- [ ] Prevent modal from closing when clicking inside
- [ ] Remove modal from DOM on close

**Acceptance**:
- ✅ Clicking backdrop closes modal
- ✅ Esc key closes modal
- ✅ Modal closes after successful prompt insertion
- ✅ Clicking inside modal does NOT close it
- ✅ Modal DOM element removed (no memory leaks)

---

## T-10: Code Minification and Bookmark Creation

**Effort**: 2h | **Dependencies**: T-1 through T-9 | **Status**: ⏸️ Not Started

- [ ] Minify JavaScript code (remove whitespace, comments)
- [ ] Test minified code on all platforms
- [ ] Create bookmark-ready `javascript:` URL
- [ ] Document installation instructions
- [ ] Provide example bookmarklet links

**Minification**:
- Remove all comments
- Replace long variable names with short ones
- Remove unnecessary whitespace
- Ensure no syntax errors introduced

**Acceptance**:
- ✅ Minified code under 10KB
- ✅ Minified code runs without errors on ChatGPT/Gemini/Claude
- ✅ Bookmark URL starts with `javascript:` and executes correctly
- ✅ Installation instructions clear and tested

---

## Final Verification (MVP)

**Functional**:
- [ ] Bookmarklet executes on ChatGPT without errors
- [ ] Bookmarklet executes on Gemini without errors
- [ ] Bookmarklet executes on Claude without errors
- [ ] Platform detection works correctly
- [ ] Prompts fetched and parsed successfully
- [ ] Modal appears and search works
- [ ] Keyboard navigation functional (↑↓ Enter Esc)
- [ ] Prompt insertion works on all platforms
- [ ] CSP fallback to clipboard tested
- [ ] Toast notifications appear and dismiss

**UI/UX**:
- [ ] Modal centered and styled cleanly
- [ ] Search box autofocused on modal open
- [ ] Prompt list scrollable with hover states
- [ ] Highlighted prompt visually clear
- [ ] Modal closes on backdrop/Esc
- [ ] No layout shift or visual glitches

**Performance**:
- [ ] Bookmarklet loads in under 500ms
- [ ] Search filter responds instantly
- [ ] Prompt insertion under 100ms
- [ ] No console errors or warnings

**Security**:
- [ ] No XSS vulnerabilities (using textContent)
- [ ] No external API calls
- [ ] CSP errors handled gracefully

---

## Robust Product Tasks

**T-11: Local Storage Caching** (+3h) | **Status**: ⏸️ Future
- Implement localStorage with 30-min TTL
- Cache parsed prompts to reduce fetch calls
- Add cache invalidation logic

**T-12: Prompt Categories/Tags** (+4h) | **Status**: ⏸️ Future
- Parse categories from MDX headings
- Add category filter dropdown
- Tag-based search (e.g., "tag:consultant")

**T-13: Custom CSS Themes** (+2h) | **Status**: ⏸️ Future
- Dark mode theme toggle
- User-selectable color schemes
- Persist theme choice in localStorage

**T-14: Multi-Select Prompts** (+3h) | **Status**: ⏸️ Future
- Checkbox selection for multiple prompts
- Insert multiple prompts with separator
- "Select All" button

---

## Advanced Product Tasks

**T-15: Browser Extension Version** (+10h) | **Status**: ⏸️ Future
- Convert bookmarklet to Chrome/Firefox extension
- Persistent UI (sidebar or popup)
- Extension settings page

**T-16: Cloud Sync** (+8h) | **Status**: ⏸️ Future
- Sync prompts across devices via cloud storage
- User authentication
- Conflict resolution

**T-17: Inline Prompt Editor** (+6h) | **Status**: ⏸️ Future
- Edit prompt before inserting
- Preview changes in modal
- Save edited version locally

**T-18: Usage Analytics** (+4h) | **Status**: ⏸️ Future
- Track most-used prompts
- Display usage stats in modal
- Export analytics data

---

**Task Legend**: ⏸️ Not Started | 🚧 In Progress | ✅ Complete

**Total**: T-1 through T-10 (27 hours MVP) | **Current**: T-1
