---
feature: "ai-prompt-bookmarklet"
log_started: "2025-01-01"
last_updated: "2025-01-01 14:30"
participants: ["User", "Claude"]
---

# AI Prompt Bookmarklet Manager Development Log

**Meeting Memo Style**: Records architectural decisions, technical choices, and their context.

---

## 2025-01-01 14:30 - Initial Planning Session

**Participants**: User, Claude

### Architecture Decisions

| Decision | Choice | Rationale | Alternatives Considered |
|----------|--------|-----------|------------------------|
| **Delivery Method** | Browser bookmarklet | Zero installation, works everywhere, privacy-focused | Browser extension (rejected - requires installation, store approval) |
| **Data Source** | Fetch from blog's ai.prompt.mdx | User controls data, no external dependencies, version-controlled | External API (rejected - privacy concerns, server costs) |
| **Prompt Parsing** | Regex pattern matching | Lightweight, no dependencies, works client-side | remark-frontmatter library (rejected - adds 50KB+ to bookmarklet) |
| **Platform Detection** | URL pattern matching | Simple, reliable, covers all three platforms | DOM inspection (rejected - fragile, changes with UI updates) |
| **Modal UI** | Vanilla JavaScript | No dependencies, fast load, minimal code | React/Vue (rejected - massive bundle size for bookmarklet) |
| **CSP Handling** | Try-catch with clipboard fallback | Graceful degradation, user can still access prompts | Ignore CSP (rejected - fails silently on strict sites) |
| **Search Implementation** | Client-side filter (Array.filter) | Instant results, no network calls | Server-side search (rejected - requires backend) |

### Codebase Integration Strategy

**Component Location**: Standalone (no blog infrastructure changes)
- Bookmarklet code is self-contained JavaScript
- Does not require modifications to blog codebase
- Fetches MDX content as static file via HTTP

**Integration Patterns**:
- **Data Source**: Direct fetch from blog URL (CORS-friendly)
- **Parsing**: Regex extraction from MDX code blocks
- **UI**: Injected modal using vanilla JS DOM manipulation
- **Storage**: sessionStorage for 30-min cache (optional)

### Security Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **CSP Bypass** | Detect and fallback | Some sites block bookmarklets; clipboard fallback ensures usability |
| **XSS Prevention** | textContent instead of innerHTML | Prevents malicious prompts from executing scripts |
| **Data Privacy** | No external API calls | All data fetched from user's own blog, no third-party tracking |
| **CORS Handling** | GitHub raw URL fallback | If blog blocks CORS, use GitHub as trusted alternative source |

**Research Sources**:
- [CSP Bypass Security](https://socradar.io/csp-bypass-unveiled-the-hidden-threat-of-bookmarklets/)
- [Bookmarklets CSP Fix](https://www.homemarks.com/blog/2015-02-17-bookmarklet-fixed-for-sites-with-strict-csp-policies)
- [MDX Frontmatter Parsing](https://mdxjs.com/guides/frontmatter/)

### Risk Assessment

| Risk | Mitigation | Owner |
|------|-----------|-------|
| **CSP blocks execution** | Implement clipboard fallback with user notification | Developer |
| **AI platforms change textarea selectors** | Use multiple fallback selectors, prioritize generic `textarea` | Developer |
| **CORS blocks MDX fetch** | Provide GitHub raw URL as fallback, cache in sessionStorage | User + Developer |
| **Bookmarklet code too large** | Minify code, remove comments, use short variable names | Developer |
| **MDX format changes** | Document expected format, provide error message with format example | User + Developer |

**Next Actions**:
- [ ] Create bookmarklet core structure (IIFE wrapper)
- [ ] Implement platform detection logic
- [ ] Build MDX fetch and parse functions
- [ ] Design modal UI HTML/CSS
- [ ] Implement search filter logic
- [ ] Add keyboard navigation handlers
- [ ] Test on ChatGPT, Gemini, Claude
- [ ] Handle CSP errors with clipboard fallback
- [ ] Minify and create bookmark-ready code

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
- Major decisions: 7 (delivery method, data source, parsing, detection, UI, CSP, search)
- Status: Draft - ready for implementation
