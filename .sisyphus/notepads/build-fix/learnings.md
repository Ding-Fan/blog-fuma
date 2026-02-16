# Learnings - build-fix

Conventions, patterns, and best practices discovered during execution.

---

## [2026-02-05] Task 2: Build Error Fixes - All Errors Resolved

### Summary
Successfully fixed all 4 blocking ESLint errors and 8 unused import/variable warnings. Build now exits with code 0.

### Fixes Applied

#### 1. ESLint Unescaped Quote Errors (4 errors in bookmarklet-generator.tsx)
**File**: `components/prompt-manager/bookmarklet-generator.tsx`
- Line 83:44, 83:61 - Replaced `"Copy Bookmarklet"` with `&quot;Copy Bookmarklet&quot;`
- Line 88:23, 88:37 - Replaced `"{promptTitle}"` with `&quot;{promptTitle}&quot;`

**Pattern**: JSX text content containing literal double quotes must use HTML entity escaping (`&quot;`) instead of raw quotes. This violates React's `no-unescaped-entities` ESLint rule.

**Solution**: Use `&quot;` for HTML entities in JSX text nodes. Alternatively, can use `{"text"}` if extracting quotes into expressions.

#### 2. Unused Imports & Variables (8 warnings)
**Files fixed**:
- `app/(home)/blog/[slug]/page.tsx`: Removed `Link`, `InlineTOC`, `DocsLayout` imports (not used in component, only commented-out code referenced them)
- `components/Particle.tsx`: Removed `exp`, `loadStarsPreset`, `group` imports (unused Node.js/console module imports)
- `components/ui/posts.tsx`: Removed `nav`, `i18n` destructuring and `getLinks` import (component structure changed, no longer needed)

**Pattern**: Dead imports accumulate from refactoring or changing component requirements. Regular cleanup prevents build warnings.

### Result
- **Exit Code**: 0 (Success)
- **Build Time**: ~6.8s
- **Blocking Errors**: 0/4
- **Unused Import Warnings Cleaned**: 8/8
- **Remaining Warnings**: 3 (non-blocking quality improvements in other files)

### Key Learnings
1. **HTML Entities in JSX**: Quote escaping in JSX text uses `&quot;` not backslash escapes
2. **Dead Code Cleanup**: Commented-out code often has associated unused imports worth removing
3. **Incremental Fixing**: Fix blocking errors first, then clean warnings for better DX
4. **Build Verification**: Always re-run full build after each fix batch to catch cascading issues

