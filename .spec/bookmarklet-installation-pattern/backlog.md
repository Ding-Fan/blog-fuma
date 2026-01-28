# Bookmarklet Installation Pattern - Ideas Backlog

A pool of feature ideas, improvements, and enhancements for the bookmarklet installation pattern.

---

## 🎯 High Priority Ideas

Ideas that would significantly improve user experience.

- **Bookmarks bar detection**: Detect if bar is visible, prompt user to show it
- **Installation success callback**: Notify parent when bookmarklet is successfully installed (if possible)
- **Copy raw content option**: Separate button to copy just the content (not the bookmarklet wrapper)

---

## 💡 Feature Ideas

New features or enhancements to consider.

- **QR code generation**: Generate QR code linking to installation page for sharing
- **Bookmarklet preview**: Show what the bookmarklet will do before installation
- **Custom icon/emoji picker**: Let users choose the emoji prefix (📌, ⚡, 🔧, etc.)
- **Dark mode support**: Adjust colors for dark mode compatibility
- **Animation on drag start**: Visual feedback when user starts dragging
- **Confetti on success**: Celebrate successful copy with micro-animation

---

## 🔧 Technical Improvements

Refactoring, optimization, and technical debt items.

- **Code minification**: Minify bookmarklet code before encoding to reduce URL length
- **Compression**: Use LZString or similar to compress large payloads
- **Fallback for older browsers**: Add execCommand fallback for clipboard
- **CSP-safe version**: Alternative that works on sites with strict CSP
- **Test suite**: Unit tests for encoding/decoding functions

---

## 🐛 Known Issues

Bugs or issues to investigate and fix.

- **Long bookmarklets**: Some browsers have URL length limits (~2000 chars)
- **Safari quirks**: Drag-and-drop may behave differently on Safari
- **Firefox private mode**: Clipboard API may be restricted

---

## 🤔 Research Needed

Ideas that need more investigation or proof-of-concept.

- **WebExtension API**: Can we detect if bookmarklet was installed?
- **Bookmark Manager API**: Any browser APIs for programmatic bookmark creation?
- **Touch device alternatives**: What's the best UX for mobile/tablet users?
- **Internationalization**: Should instructions be translatable?

---

## 📦 Backlog (Unprioritized)

Unsorted ideas that haven't been categorized yet.

- Export as browser-specific bookmark file (.html)
- Shareable installation links
- Bookmarklet versioning/updates
- Usage statistics dashboard
- Integration with password managers (for secure bookmarklets)

---

## ✅ Implemented

Ideas that have been completed (for reference).

- Base64 encoding for Unicode support ✓
- Dual installation methods (drag + copy) ✓
- Visual feedback for copy success ✓
- React implementation reference ✓
- Vanilla JS implementation reference ✓

---

## ❌ Rejected

Ideas that were considered but decided against (with reasoning).

- **Auto-install via browser API**: Not possible due to security restrictions
- **Iframe-based installation**: Too complex, browser security blocks it
- **Flash-based clipboard**: Flash is dead, not worth supporting
- **Server-side bookmarklet generation**: Unnecessary complexity, client-side works fine
