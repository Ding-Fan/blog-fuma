---
feature: "bookmarklet-installation-pattern"
log_started: "2026-01-03"
last_updated: "2026-01-03 17:00"
participants: ["User", "Claude"]
---

# Bookmarklet Installation Pattern - Development Log

**Meeting Memo Style**: Records architectural decisions, research findings, and implementation context.

---

## 2026-01-03 17:00 - Initial Pattern Documentation

**Participants**: User, Claude

### Research Summary

**Sources Consulted**:
- [How to Install and Use Accessibility Bookmarklets](https://www.digitala11y.com/definitive-guide-to-accessibility-bookmarklets/)
- [Creating a Drag and Drop Bookmarklet](https://joeldare.com/creating_a_drag_and_drop_bookmarklet.html)
- [Installing Bookmarklets](https://mreidsma.github.io/bookmarklets/installing.html)
- [Base64 Security Best Practices](https://www.base64.sh/blog/base64-security-considerations/)
- [15 Drag and Drop UI Design Tips](https://bricxlabs.com/blogs/drag-and-drop-ui)

### Architecture Decisions

| Decision | Choice | Rationale | Alternatives Considered |
|----------|--------|-----------|------------------------|
| **Primary Install Method** | Drag-and-drop | Industry standard, fastest for users who know it | Copy-paste only (rejected: slower), Browser extension (rejected: overkill for simple tools) |
| **Fallback Method** | Manual copy + instructions | Covers users unfamiliar with drag-drop | None (rejected: alienates non-technical users) |
| **Content Encoding** | Base64 | Avoids escaping issues with quotes, newlines, special chars | URL encoding (rejected: more complex), Raw string (rejected: breaks with special chars) |
| **Link Element** | `<a>` with `javascript:` href | Native browser support, no JS required for drag | Button + data attribute (rejected: requires more JS), Custom drag handler (rejected: complexity) |
| **Href Assignment** | Set via ref after mount | Avoids React security warnings about `javascript:` | Inline href (rejected: React warning), dangerouslySetInnerHTML (rejected: security risk) |
| **Clipboard API** | `navigator.clipboard.writeText` | Modern, promise-based, widely supported | `document.execCommand('copy')` (rejected: deprecated) |

### Key Technical Insights

**Base64 Encoding Pattern**:
```javascript
// Handles Unicode characters correctly
const base64 = btoa(unescape(encodeURIComponent(content)));

// Decoding (in bookmarklet)
const decoded = decodeURIComponent(escape(atob(base64)));
```

**Why This Works**:
1. `encodeURIComponent` converts Unicode to UTF-8 percent-encoded
2. `unescape` converts percent-encoding to ISO-8859-1 bytes
3. `btoa` encodes ISO-8859-1 to Base64
4. Reverse process decodes correctly in any browser

**React Href Security**:
- React warns about `javascript:` URLs as potential XSS vector
- Solution: Use `useRef` + `useEffect` to set href after mount
- This bypasses React's href validation while maintaining security

### UX Research Findings

**Drag-and-Drop Affordances**:
- Cursor should change to `grab` on hover, `grabbing` when dragging
- Button should have distinct color (green = action/success)
- Minimum touch target: 44x44px (Apple HIG) or 48x48px (Material)
- Add subtle shadow/lift on hover for depth cue

**Installation Success Factors**:
- Users often don't have bookmarks bar visible (Ctrl/Cmd+Shift+B to toggle)
- Step-by-step numbered instructions outperform bullet lists
- "Drag to bookmarks bar" is more specific than "drag to browser"

### Browser Compatibility Notes

**Desktop Support**:
- Chrome, Firefox, Safari, Edge: Full support for both methods
- IE11: Works but deprecated, not worth testing

**Mobile Limitations**:
- No bookmarks bar on mobile browsers
- Drag-and-drop doesn't work with touch
- Bookmarklets have limited functionality on iOS Safari
- Recommendation: Show mobile-specific messaging

### Security Considerations

**Base64 is NOT Encryption**:
- Anyone can decode Base64 instantly
- Never use for protecting sensitive data
- Purpose is only to avoid string escaping issues

**XSS Prevention**:
- Never insert user-provided content directly into bookmarklet
- Sanitize any dynamic content before encoding
- Use CSP headers if bookmarklet runs on your site

### Reference Implementation

**Analyzed**: `components/prompt-manager/bookmarklet-generator.tsx`

**Key Patterns Extracted**:
1. `useRef` for link element to set href after mount
2. `useState` for copy success feedback with timeout
3. Base64 encoding with Unicode support
4. Platform-agnostic textarea selector pattern
5. Error boundary with try-catch in bookmarklet code

---

## Template for New Entries

```markdown
## YYYY-MM-DD HH:MM - [Decision/Discovery Title]

**Context**: [What prompted this?]
**Decision/Finding**: [What was decided/discovered?]
**Rationale/Impact**: [Why/how does this affect the project?]
**Status**: ✅ | 🚧 | ⏸️
```

---

**Log Summary**:
- Total sessions: 1
- Major decisions: 6
- Status: Pattern documented, ready for implementation
