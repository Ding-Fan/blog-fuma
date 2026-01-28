---
feature: "bookmarklet-installation-pattern"
status: "complete"
created: "2026-01-03"
updated: "2026-01-03"
mvp_effort_hours: 4
mvp_effort_days: 0.5
priority: "medium"
tags: ["ui-pattern", "bookmarklet", "drag-drop", "clipboard", "universal"]
scope: "universal"
package: "none"
current_tier: "mvp"
---

# Bookmarklet Installation UI Pattern

## TL;DR (30-Second Scan)

**Problem**: Users need to install JavaScript bookmarklets but the process is confusing and error-prone
**Solution**: Drag-and-drop link with visual affordance + manual copy fallback with step-by-step instructions
**Status**: Complete - universal pattern ready for implementation
**Effort**: MVP 4 hours | +Robust 4 hours | +Advanced 8 hours
**Next Action**: Copy pattern to your project and adapt to your framework

---

<details>
<summary>📋 Full Specification (click to expand)</summary>

## Problem & Solution

**Problem**: Installing a bookmarklet requires users to either drag a link to their bookmarks bar (not intuitive) or manually create a bookmark and paste JavaScript code (error-prone). Most users don't know how to do either.

**Solution**: A two-method UI component that provides: (1) a prominently styled, draggable link with clear "drag me" affordance, and (2) a fallback "copy code" button with step-by-step instructions for manual installation.

**Returns**: User successfully installs bookmarklet to their browser's bookmarks bar.

## Component Interface

```typescript
interface BookmarkletInstallerProps {
  /** The JavaScript code to execute (will be encoded) */
  code: string;
  /** Display title for the bookmarklet */
  title: string;
  /** Optional description shown in UI */
  description?: string;
  /** Callback when code is copied to clipboard */
  onCopy?: () => void;
  /** Custom styling class */
  className?: string;
}

interface BookmarkletState {
  copySuccess: boolean;
  copyError: string | null;
}
```

## Usage Example

```tsx
// React implementation
<BookmarkletInstaller
  code={`(function(){alert('Hello!')})();`}
  title="My Bookmarklet"
  description="Click to say hello"
  onCopy={() => console.log('Copied!')}
/>

// Vanilla JS - see implementation section
```

## Core Architecture

```
┌─────────────────────────────────────────────────────┐
│           Bookmarklet Installer Component           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────┐   ┌─────────────────────────┐  │
│  │  Copy Buttons   │   │   Draggable Link        │  │
│  │                 │   │                         │  │
│  │ [📋 Copy Text]  │   │  ┌───────────────────┐  │  │
│  │ [📝 Copy Code]  │   │  │ 📌 Drag to Bar    │  │  │
│  │                 │   │  │   (green button)  │  │  │
│  └─────────────────┘   │  └───────────────────┘  │  │
│                        │                         │  │
│                        │  Instructions:          │  │
│                        │  1. Drag link above     │  │
│                        │  2. Drop on bookmarks   │  │
│                        │  3. Click to use        │  │
│                        └─────────────────────────┘  │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │  Manual Installation Instructions           │    │
│  │  1. Click "Copy Bookmarklet"               │    │
│  │  2. Create new bookmark in browser         │    │
│  │  3. Paste code as URL                      │    │
│  │  4. Name it "[title]"                      │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Core Flow

```
User wants to install bookmarklet
  │
  ├─► Method 1: Drag & Drop (Primary)
  │     │
  │     ├─ User sees green draggable button
  │     ├─ Cursor changes to "grab" on hover
  │     ├─ User drags to bookmarks bar
  │     └─ Done ✓
  │
  └─► Method 2: Manual Copy (Fallback)
        │
        ├─ User clicks "Copy Bookmarklet"
        ├─ Code copied to clipboard
        ├─ Success feedback shown (2s)
        ├─ User follows step-by-step instructions
        └─ Done ✓
```

## User Stories

**US-1: Power User Drag Install**
Developer sees the green "📌 Drag to Bar" button, immediately recognizes the pattern, drags it to their bookmarks bar in under 2 seconds. They've done this before with other tools.

**US-2: First-Time Manual Install**
Non-technical user doesn't understand drag-and-drop. They click "Copy Bookmarklet", see step-by-step instructions, create a new bookmark manually, paste the code, and successfully install in under 60 seconds.

**US-3: Mobile User Fallback**
Mobile user (where drag-drop doesn't work) uses "Copy Text" to copy the raw content, then manually pastes it where needed. They understand bookmarklets don't work on mobile browsers.

## MVP Scope

**Included**:
- Draggable `<a>` element with `javascript:` href
- Base64 encoding for content (avoids escaping issues)
- Copy to clipboard functionality (Clipboard API)
- Visual feedback for copy success/error
- Step-by-step manual installation instructions
- Cursor affordance (`cursor: grab/move`)
- Works on Chrome, Firefox, Safari, Edge (desktop)

**NOT Included** (Future):
- Mobile-specific alternatives → 🔧 Robust
- Keyboard-only installation flow → 🔧 Robust
- Screen reader optimization → 🔧 Robust
- Browser extension version → 🚀 Advanced
- Installation analytics → 🚀 Advanced

## Bookmarklet Encoding Strategy

**Why Base64?**
- Avoids complex string escaping for quotes, newlines, special characters
- Works with any content (including YAML, JSON, markdown)
- Decodes reliably across browsers

**Encoding Function**:
```typescript
function encodeBookmarklet(code: string): string {
  // Encode content to Base64 (handles Unicode)
  const base64 = btoa(unescape(encodeURIComponent(code)));

  // Wrap in self-executing function with decoder
  return `javascript:(function(){
    try{
      const code=decodeURIComponent(escape(atob('${base64}')));
      // Execute or use the decoded content
      eval(code);
    }catch(e){
      alert('Bookmarklet error: '+e.message);
    }
  })();`;
}
```

**Security Note**: Base64 is NOT encryption. It's encoding for transport. Never use for sensitive data protection.

## UI/UX Requirements

**Draggable Link Styling**:
```css
.bookmarklet-drag-link {
  display: inline-block;
  padding: 12px 20px;
  background: #16a34a; /* green-600 */
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: grab;
  user-select: none;
  transition: background-color 0.2s;
}

.bookmarklet-drag-link:hover {
  background: #15803d; /* green-700 */
}

.bookmarklet-drag-link:active {
  cursor: grabbing;
}
```

**Copy Button Feedback**:
- Default: "📋 Copy Text" / "📝 Copy Bookmarklet"
- Success: "✓ Copied!" (green text, 2s duration)
- Error: "✗ Failed" (red text, show error message)

**Instructions Box**:
- Muted background (gray/neutral)
- Border for visual separation
- Numbered steps (not bullets)
- Small text size for secondary importance

## Browser Compatibility

| Browser | Drag & Drop | Manual Copy | Notes |
|---------|-------------|-------------|-------|
| Chrome (desktop) | ✅ | ✅ | Full support |
| Firefox (desktop) | ✅ | ✅ | Full support |
| Safari (desktop) | ✅ | ✅ | Full support |
| Edge (desktop) | ✅ | ✅ | Full support |
| Chrome (mobile) | ❌ | ✅ | No bookmarks bar |
| Safari (mobile) | ❌ | ❌ | Bookmarklets limited |

**Important**: Users may need to enable bookmarks bar visibility first (Ctrl/Cmd + Shift + B).

## React Implementation Reference

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface Props {
  code: string;
  title: string;
}

export function BookmarkletInstaller({ code, title }: Props) {
  const [copySuccess, setCopySuccess] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);

  const generateBookmarklet = () => {
    const base64 = btoa(unescape(encodeURIComponent(code)));
    return `javascript:(function(){try{eval(decodeURIComponent(escape(atob('${base64}'))))}catch(e){alert('Error: '+e.message)}})();`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateBookmarklet());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  // Set href after mount (avoids React security warnings)
  useEffect(() => {
    if (linkRef.current) {
      linkRef.current.href = generateBookmarklet();
    }
  }, [code]);

  return (
    <div className="bookmarklet-installer">
      <button onClick={copyToClipboard}>
        {copySuccess ? '✓ Copied!' : '📝 Copy Bookmarklet'}
      </button>

      <div className="drag-section">
        <p>Drag this to your bookmarks bar:</p>
        <a
          ref={linkRef}
          href="#"
          title={title}
          onClick={(e) => e.preventDefault()}
          draggable="true"
          className="bookmarklet-drag-link"
        >
          📌 {title}
        </a>
      </div>

      <div className="instructions">
        <p><strong>Manual install:</strong></p>
        <ol>
          <li>Click "Copy Bookmarklet" above</li>
          <li>Create a new bookmark in your browser</li>
          <li>Paste the copied code as the URL</li>
          <li>Name it "{title}"</li>
        </ol>
      </div>
    </div>
  );
}
```

## Vanilla JS Implementation Reference

```html
<div id="bookmarklet-installer">
  <button id="copy-btn">📝 Copy Bookmarklet</button>
  <div>
    <p>Drag this to your bookmarks bar:</p>
    <a id="drag-link" href="#" draggable="true">📌 My Bookmarklet</a>
  </div>
</div>

<script>
(function() {
  const code = `alert('Hello from bookmarklet!')`;
  const title = 'My Bookmarklet';

  function encode(str) {
    const b64 = btoa(unescape(encodeURIComponent(str)));
    return `javascript:(function(){try{eval(decodeURIComponent(escape(atob('${b64}'))))}catch(e){alert('Error: '+e.message)}})();`;
  }

  const bookmarklet = encode(code);
  const link = document.getElementById('drag-link');
  const btn = document.getElementById('copy-btn');

  link.href = bookmarklet;
  link.title = title;

  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(bookmarklet);
      btn.textContent = '✓ Copied!';
      setTimeout(() => btn.textContent = '📝 Copy Bookmarklet', 2000);
    } catch (e) {
      alert('Copy failed: ' + e.message);
    }
  });
})();
</script>
```

## Acceptance Criteria (MVP)

**Functional**:
- [ ] Draggable link has valid `javascript:` href
- [ ] Base64 encoding works with Unicode content
- [ ] Copy button copies full bookmarklet code
- [ ] Success feedback displays for 2 seconds
- [ ] Link `href` set after component mount (React security)
- [ ] `preventDefault` on link click (avoid navigation)

**UI/UX**:
- [ ] Drag link has grab cursor on hover
- [ ] Drag link has distinct color (green recommended)
- [ ] Copy button shows success/error state
- [ ] Instructions are numbered, not bulleted
- [ ] Instructions mention bookmark name

**Accessibility**:
- [ ] Link has descriptive `title` attribute
- [ ] Buttons have clear labels
- [ ] Color contrast meets WCAG AA

## Future Tiers

**🔧 Robust** (+4h): Keyboard-only installation guide, screen reader announcements for copy success, mobile detection with appropriate messaging, bookmarks bar visibility reminder tooltip.

**🚀 Advanced** (+8h): Browser extension alternative for one-click install, installation success detection via postMessage, usage analytics integration, multi-bookmarklet batch installation.

</details>

---

**Quick Links**: [dev-log.md](./dev-log.md) | [tasks.md](./tasks.md) | [backlog.md](./backlog.md)
