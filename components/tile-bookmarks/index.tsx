import { Tile } from './tile';
import type { TileBookmarksProps } from './types';

export function TileBookmarks({ bookmarks = [], className = '' }: TileBookmarksProps) {
  if (!bookmarks || bookmarks.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 auto-rows-[120px] p-4 ${className}`}>
      {bookmarks.map((tile) => (
        <Tile key={tile.id} tile={tile} />
      ))}
    </div>
  );
}

export type { BookmarkTile, TileBookmarksProps, BookmarksData } from './types';
export { bookmarkTileSchema, bookmarksDataSchema } from './types';
