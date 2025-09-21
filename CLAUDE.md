# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server with Turbo mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Process MDX files (runs automatically after install)
npm run postinstall
```

## Architecture Overview

This is a **Fumadocs-based documentation site** built on Next.js 15 with React 19. The architecture follows Fumadocs conventions:

### Content Management
- **MDX Processing**: Content is written in MDX and processed by `fumadocs-mdx`
- **Source Configuration**: `source.config.ts` defines frontmatter and meta schemas
- **Content Loader**: `lib/source.ts` provides the interface to access content via `loader()` function
- **Base URL**: All documentation is served under `/docs` path

### Layout Structure
- **Shared Configuration**: `lib/layout.shared.tsx` contains shared layout options including site title "又不是不能写博客"
- **Route Groups**:
  - `app/(home)` - Landing page and static pages
  - `app/docs` - Documentation layout using `DocsLayout` from fumadocs-ui
- **Navigation**: Page tree is automatically generated from content structure

### Search Integration
- **Search API**: `app/api/search/route.ts` provides full-text search using Orama engine
- **Language**: Configured for English language search
- **Source Integration**: Search indexes all content from the source loader

### Content Organization
- **Content Directory**: `content/docs/` contains all MDX documentation files
- **Page Tree**: Automatically generated navigation structure
- **Frontmatter**: Uses standard fumadocs frontmatter schema

### Styling
- **Tailwind CSS**: Uses Tailwind CSS v4 with PostCSS
- **Custom Themes**: Global styles in `app/global.css` with custom background colors
- **Fumadocs UI**: Pre-built components from fumadocs-ui package

### Key Files to Understand
- `lib/source.ts` - Content source adapter and loader configuration
- `lib/layout.shared.tsx` - Shared layout options and site branding
- `source.config.ts` - MDX processing configuration and schemas
- `app/docs/layout.tsx` - Documentation layout implementation

### Development Workflow
1. Content is written in MDX files under `content/docs/`
2. MDX files are processed during build via `fumadocs-mdx`
3. Content is accessed through the source loader API
4. Pages are automatically generated with navigation
5. Search indexing happens automatically for all content

## Git Workflow

**Important**: This project commits directly to the main branch. Do not create feature branches unless specifically requested by the user.