# AI Prompt Bookmarklet Manager Ideas Backlog

A pool of feature ideas, improvements, and technical debt items for future consideration.

---

## 🎯 High Priority Ideas

**Offline Support with Service Worker**
- Cache prompts for offline access
- Background sync when connection restored
- Status indicator for offline mode

**Prompt Versioning and History**
- Track prompt changes over time
- Restore previous versions
- View edit history

---

## 💡 Feature Ideas

**Prompt Templates with Variables**
- Define variables in prompts (e.g., `{language}`, `{topic}`)
- Prompt user to fill variables before insertion
- Save variable presets for quick reuse

**Prompt Sharing and Import**
- Export prompts as JSON
- Import prompts from other users
- Community prompt library

**AI Platform Auto-Suggestions**
- Suggest relevant prompts based on conversation context
- AI-powered prompt recommendations
- Smart prompt completion

**Prompt Collections**
- Group related prompts into collections
- Quick switch between collections
- Share entire collections

**Custom Keyboard Shortcuts**
- User-defined hotkeys for top 10 prompts
- Global keyboard shortcuts (Ctrl+Shift+1, etc.)
- Hotkey customization UI

---

## 🔧 Technical Improvements

**Performance Optimization**
- Lazy load prompts (load on scroll)
- Virtual scrolling for 100+ prompts
- Debounce search input (reduce re-renders)

**Better Error Handling**
- Retry logic for failed fetches
- Detailed error messages with troubleshooting steps
- Error logging to localStorage for debugging

**Code Quality**
- Refactor into modules (fetch, parse, UI, platform)
- Add JSDoc comments
- Unit tests for core functions

**Accessibility Enhancements**
- Screen reader support (ARIA labels)
- High contrast mode
- Font size customization

**Improved Platform Detection**
- Support for more AI platforms (Perplexity, Bing Chat, etc.)
- Auto-detect new AI platforms via ML
- User-configurable platform rules

**Smart Caching Strategy**
- Detect MDX file changes (ETag/Last-Modified headers)
- Cache invalidation on file update
- Background refresh while showing cached data

---

## 🐛 Known Issues

**Potential Issues to Monitor**:
- AI platforms may update UI and break textarea selectors
- CSP policies becoming stricter over time
- MDX parsing regex may fail on complex code blocks
- Large prompt files (>1MB) may cause performance issues

---

## 🤔 Research Needed

**Browser Extension Manifest V3**
- Investigate Manifest V3 requirements for extension version
- Service worker vs background scripts
- Permissions needed for cross-origin fetch

**AI Platform APIs**
- Check if ChatGPT/Gemini/Claude offer official APIs for prompt injection
- Evaluate API rate limits and costs
- Determine if API approach is more reliable than DOM manipulation

**Alternative Data Sources**
- Support for Google Sheets as prompt source
- Notion database integration
- Airtable as prompt CMS

**Mobile App Version**
- React Native or Flutter implementation
- iOS/Android share extensions
- Mobile-optimized UI

---

## 📦 Backlog (Unprioritized)

**Prompt Statistics Dashboard**
- Most used prompts chart
- Usage trends over time
- Platform-specific analytics

**Collaborative Prompt Editing**
- Real-time editing with team members
- Comments and suggestions on prompts
- Approval workflow for shared prompts

**Internationalization (i18n)**
- Multi-language UI support
- Translated prompts for different languages
- Locale-based prompt suggestions

**Prompt Quality Scoring**
- AI-powered prompt effectiveness analysis
- Suggestions for improving prompts
- Best practices recommendations

**Integration with Other Tools**
- Raycast extension
- Alfred workflow
- VS Code extension

---

## ✅ Implemented

*(None yet - MVP in progress)*

---

## ❌ Rejected

**Server-Side Prompt Storage**
- Reason: Adds complexity, privacy concerns, requires backend infrastructure
- Alternative: Client-side fetch from user's own blog (implemented in MVP)

**Heavy JavaScript Framework (React/Vue)**
- Reason: Massive bundle size, slow load time for bookmarklet
- Alternative: Vanilla JavaScript with minimal DOM manipulation (implemented in MVP)

**Automatic Prompt Sending**
- Reason: Security and privacy concerns, could be abused
- Alternative: User must explicitly select and insert prompts (implemented in MVP)

**Chrome-Only Extension**
- Reason: Limits user base, bookmarklet works across all browsers
- Alternative: Cross-browser bookmarklet as MVP, extension as future tier
