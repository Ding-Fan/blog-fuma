# Build and Fix Errors

## TL;DR

> **Quick Summary**: Run `pnpm build` and fix all compilation errors until the build succeeds.
> 
> **Deliverables**:
> - Clean `pnpm build` with zero errors
> - All build-breaking issues resolved
> 
> **Estimated Effort**: Quick
> **Parallel Execution**: NO - sequential (iterative fix loop)
> **Critical Path**: Run build → Identify errors → Fix → Re-run build

---

## Context

### Original Request
"build and fix" - User wants to run the build and fix any errors.

### Project Info
- **Package Manager**: pnpm
- **Build Command**: `pnpm build`
- **Framework**: Next.js 15 with Fumadocs

---

## Work Objectives

### Core Objective
Run the production build and fix all errors until the build succeeds.

### Concrete Deliverables
- Successful `pnpm build` execution with exit code 0
- All source files fixed to pass TypeScript/ESLint checks

### Definition of Done
- [x] `pnpm build` completes without errors

### Must Have
- Zero build errors
- All TypeScript errors resolved
- All ESLint blocking errors fixed

### Must NOT Have (Guardrails)
- DO NOT change business logic unless required to fix errors
- DO NOT refactor code beyond what's needed for the fix
- DO NOT add new features
- DO NOT modify unrelated files

---

## Verification Strategy

### Agent-Executed QA Scenarios (MANDATORY)

```
Scenario: Build completes successfully
  Tool: Bash
  Preconditions: All dependencies installed
  Steps:
    1. Run: pnpm build
    2. Assert: Exit code is 0
    3. Assert: No "error" in output (case-insensitive for build errors)
    4. Assert: Output contains "✓ Compiled" or similar success message
  Expected Result: Build succeeds with no errors
  Evidence: Build output captured
```

---

## TODOs

- [x] 1. Run build and analyze errors

  **What to do**:
  - Run `pnpm build` to identify all current errors
  - Capture and analyze the error output
  - Categorize errors by type (TypeScript, ESLint, import, etc.)

  **Must NOT do**:
  - Do not attempt fixes in this step - just diagnosis

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple diagnostic task
  - **Skills**: []
    - No special skills needed for running build

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Step 1)
  - **Blocks**: Task 2
  - **Blocked By**: None

  **References**:
  - `package.json` - Build script definition
  - `CLAUDE.md` - Project uses pnpm, not npm

  **Acceptance Criteria**:
  - [ ] `pnpm build` executed
  - [ ] All errors documented for next step

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Capture build errors
    Tool: Bash
    Steps:
      1. Run: pnpm build 2>&1
      2. Capture: Full output including errors
    Expected Result: Build output captured (may contain errors)
    Evidence: Build output saved
  ```

  **Commit**: NO (diagnostic step)

---

- [x] 2. Fix all build errors iteratively

  **What to do**:
  - For each error identified:
    1. Read the file mentioned in the error
    2. Understand the error cause
    3. Apply minimal fix
    4. Re-run build to verify fix
  - Continue until all errors are resolved
  - Common error types to expect:
    - TypeScript type errors
    - Missing imports
    - ESLint errors (unused variables, etc.)
    - MDX/content issues

  **Must NOT do**:
  - Do not refactor beyond the minimal fix
  - Do not change working code
  - Do not add features

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused bug fixes, minimal scope
  - **Skills**: []
    - Standard TypeScript/Next.js knowledge sufficient

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Step 2)
  - **Blocks**: None
  - **Blocked By**: Task 1

  **References**:
  - Error output from Task 1
  - Source files mentioned in errors
  - `tsconfig.json` - TypeScript configuration
  - `next.config.mjs` - Next.js configuration

  **Acceptance Criteria**:
  - [ ] All TypeScript errors fixed
  - [ ] All ESLint blocking errors fixed
  - [ ] `pnpm build` exits with code 0

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: Build succeeds after fixes
    Tool: Bash
    Preconditions: Errors from Task 1 have been fixed
    Steps:
      1. Run: pnpm build
      2. Assert: Exit code is 0
      3. Assert: Output shows successful compilation
    Expected Result: Clean build with no errors
    Evidence: Build success output captured
  ```

  **Commit**: YES
  - Message: `fix: resolve build errors`
  - Files: All modified source files
  - Pre-commit: `pnpm build`

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 2 | `fix: resolve build errors` | All fixed source files | `pnpm build` succeeds |

---

## Success Criteria

### Verification Commands
```bash
pnpm build  # Expected: Exit 0, no errors
```

### Final Checklist
- [x] `pnpm build` succeeds
- [x] No TypeScript errors
- [x] No blocking ESLint errors
- [x] Changes committed with descriptive message
