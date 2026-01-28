---
feature: "ai-prompt-bookmarklet"
status: "draft"
created: "2025-01-01"
updated: "2025-01-01"
mvp_effort_hours: 28
mvp_effort_days: 3.5
priority: "high"
tags: ["bookmarklet", "ai", "prompts", "productivity", "javascript"]
scope: "standalone"
package: "none"
current_tier: "mvp"
---

# AI Prompt Bookmarklet Manager Specification

## TL;DR (30-Second Scan)

**Problem**: Copying prompts between blog and AI platforms (ChatGPT/Gemini/Claude) is tedious and breaks workflow
**Solution**: Single-click bookmarklet opens searchable modal, inserts selected prompt into AI's textarea in under 3 seconds
**Status**: Draft - ready for implementation
**Effort**: MVP 3.5 days | +Robust 2 days | +Advanced 3-4 days
**Next Action**: Begin implementation with T-1 (bookmarklet core structure)

---

<details>
<summary>📋 Full Specification (click to expand)</summary>

## Problem & Solution

**Problem**: Power users who frequently use AI chatbots with custom prompts must repeatedly copy-paste prompts from their blog to ChatGPT, Gemini, or Claude. This involves: opening blog in new tab → finding prompt → copying → switching back → pasting. This workflow takes 15-30 seconds per prompt and disrupts focus.

**Solution**: A single bookmarklet that detects the current AI platform, fetches prompts from the user's ai.prompt.mdx file, displays them in a searchable modal with keyboard navigation, and inserts the selected prompt directly into the textarea with one click. Fallback to clipboard copy if CSP blocks execution.

**Returns**: Instant prompt insertion or clipboard copy, reducing workflow from 15-30 seconds to under 3 seconds.

## Bookmarklet Structure

```javascript
javascript:(function(){
  // Core bookmarklet entry point
  // 1. Detect platform (ChatGPT/Gemini/Claude)
  // 2. Fetch prompts from blog MDX file
  // 3. Render modal UI with search
  // 4. Handle prompt selection
  // 5. Insert into textarea or copy to clipboard
})();
```

## Usage Example

**User Workflow**:
1. User is on ChatGPT/Gemini/Claude
2. Clicks "🎯 AI Prompts" bookmark in browser
3. Modal appears with searchable prompt list
4. Types "consultant" to filter
5. Clicks "Consultant Agent" or presses Enter
6. Prompt inserted into textarea instantly

**Keyboard Shortcuts**:
- `Ctrl/Cmd+K`: Open modal (optional future enhancement)
- `↑/↓`: Navigate prompt list
- `Enter`: Select highlighted prompt
- `Esc`: Close modal
- `Type to search`: Real-time filter

## Core Flow

```
User clicks bookmarklet
  ↓
Detect AI platform (URL check)
  ↓
Fetch ai.prompt.mdx from blog
  ↓
Parse prompts from code blocks
  ↓
Render modal with search + list
  ↓
User searches/selects prompt
  ↓
Try to insert into textarea
  ↓
If CSP blocks → Copy to clipboard + show notification
  ↓
Modal closes, user continues
```

## User Stories

**US-1: Quick Prompt Insertion**
User is writing a question in ChatGPT and needs their "Consultant Agent" prompt. They click the bookmarklet, type "con" to filter, press Enter, and the full prompt appears in the textarea instantly. Total time: 2 seconds.

**US-2: Cross-Platform Workflow**
User switches from ChatGPT to Claude to test responses. They use the same bookmarklet on both platforms without any configuration. The bookmarklet detects the platform and inserts prompts into the correct textarea automatically.

**US-3: CSP Fallback**
User tries to use the bookmarklet on a site with strict CSP. The bookmarklet detects the error, copies the prompt to clipboard, and shows a notification: "Prompt copied! Paste with Ctrl+V." User pastes manually in 1 second.

## MVP Scope

**Included**:
- Single bookmarklet JavaScript code (minified, ready to bookmark)
- Platform detection for ChatGPT, Gemini, Claude (URL-based)
- Fetch raw MDX content from blog URL (CORS-friendly)
- Parse prompts from code blocks with `copy` attribute
- Modal UI with search filter (real-time)
- Keyboard navigation (↑↓ arrows, Enter, Esc)
- Textarea detection and insertion for each platform
- CSP error detection with clipboard fallback
- Toast notification for success/error states

**NOT Included** (Future):
- Local storage caching → 🔧 Robust
- Custom CSS themes → 🔧 Robust
- Prompt categories/tags → 🔧 Robust
- Browser extension version → 🚀 Advanced
- Sync across devices → 🚀 Advanced

## Platform Detection Strategy

**Detection Method**: URL pattern matching

```javascript
const platform = {
  chatgpt: /chat\.openai\.com/,
  gemini: /gemini\.google\.com/,
  claude: /claude\.ai/
};

const currentPlatform = Object.keys(platform).find(
  key => platform[key].test(window.location.href)
);
```

**Textarea Selectors** (platform-specific):
- ChatGPT: `textarea[data-id]` or `#prompt-textarea`
- Gemini: `div.ql-editor[contenteditable]` or `textarea`
- Claude: `div[contenteditable="true"]` or `.ProseMirror`

**Note**: Selectors may change; implement fallback search for `textarea` or `[contenteditable]`.

## Prompt Parsing Strategy

**Source File Structure** (ai.prompt.mdx):
```markdown
## vMAS_Core_System

````yaml copy
---
system_boot:
  name: "vMAS_Core_System"
...
````

## Consultant Agent

````yaml copy
---
type: agent_spec
...
````
```

**Parsing Logic**:
1. Fetch raw MDX from `https://blog-domain.com/blog/ai/ai.prompt.mdx` (or local path)
2. Extract sections with regex: `/## (.+?)\n\n````[\w\s]+ copy\n([\s\S]+?)````/g`
3. Build prompt list: `[{ title: "vMAS_Core_System", content: "..." }, ...]`
4. Filter by search query on `title` field

**Fallback**: If regex fails, show error: "Unable to parse prompts. Check MDX format."

## Data Fetching

**Source URL**: User's blog MDX file (configurable)
- Default: `https://[user-blog]/content/blog/(ai)/ai.prompt.mdx`
- Raw GitHub URL as fallback

**CORS Handling**:
- If blog serves MDX with CORS headers → direct fetch
- If CORS blocked → use GitHub raw URL (`raw.githubusercontent.com`)
- Cache response in sessionStorage (30 min TTL)

**Error States**:
- Network error → Show "Unable to fetch prompts. Check internet connection."
- Parse error → Show "Invalid MDX format. Check ai.prompt.mdx structure."

## Acceptance Criteria (MVP)

**Functional**:
- [ ] Bookmarklet code runs on ChatGPT, Gemini, Claude without errors
- [ ] Platform detection correctly identifies current AI site
- [ ] Prompts fetched and parsed from ai.prompt.mdx successfully
- [ ] Modal appears centered on screen with search box focused
- [ ] Search filter updates prompt list in real-time
- [ ] Keyboard navigation (↑↓ Enter Esc) works correctly
- [ ] Selected prompt inserts into textarea on all three platforms
- [ ] CSP error detected and triggers clipboard fallback
- [ ] Toast notification shows success/error messages

**UI/UX**:
- [ ] Modal has clean, minimal design (white background, shadow, rounded corners)
- [ ] Search box placeholder text: "Search prompts..."
- [ ] Prompt list scrollable if more than 10 items
- [ ] Highlighted prompt visually distinct (background color change)
- [ ] Modal closes on backdrop click or Esc key
- [ ] Toast notification auto-dismisses after 3 seconds
- [ ] No layout shift when modal appears

**Performance**:
- [ ] Bookmarklet loads and executes in under 500ms
- [ ] Search filter responds instantly (no lag)
- [ ] Prompt insertion happens in under 100ms

**Security**:
- [ ] No external API calls (privacy-focused)
- [ ] CSP errors handled gracefully
- [ ] No XSS vulnerabilities in prompt rendering

## Future Tiers

**🔧 Robust** (+2 days): Local storage caching (30 min TTL), prompt categories/tags filter, custom CSS themes (dark mode), multi-select prompts (insert multiple at once), prompt preview on hover.

**🚀 Advanced** (+3-4 days): Browser extension version (persistent UI, always-on), sync across devices via cloud storage, inline prompt editor (edit before inserting), usage analytics (most-used prompts), AI platform auto-detection without URL check.

</details>

---

**Quick Links**: [dev-log.md](./dev-log.md) | [tasks.md](./tasks.md) | [backlog.md](./backlog.md)
