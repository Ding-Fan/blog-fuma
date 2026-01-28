import { z } from 'zod';

// Zod schema for runtime validation
export const bookmarkTileSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  // Allow empty string for spacer tiles
  title: z.string(),
  // Allow "#" for spacer tiles, otherwise validate HTTP/HTTPS
  url: z.string().refine(
    (url) => url === '#' || (url.startsWith('http://') || url.startsWith('https://')),
    { message: 'URL must be "#" or a valid HTTP/HTTPS URL' }
  ),
  size: z.enum(['small', 'medium', 'large']),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color must be a valid hex code'),
  icon: z.string().optional(),
});

export const bookmarksDataSchema = z.object({
  tiles: z.array(bookmarkTileSchema),
});

// TypeScript types inferred from schemas
export type BookmarkTile = z.infer<typeof bookmarkTileSchema>;
export type BookmarksData = z.infer<typeof bookmarksDataSchema>;

export interface TileBookmarksProps {
  bookmarks?: BookmarkTile[];
  className?: string;
}

export interface TileProps {
  tile: BookmarkTile;
}

// Emoji validation utility
export function isValidEmoji(str: string): boolean {
  // Matches common emoji ranges including surrogate pairs
  return /^[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]$/u.test(str);
}
