import { TileBookmarks, bookmarksDataSchema } from '@/components/tile-bookmarks';
import bookmarksData from '@/data/bookmarks.json';

export default function HomePage() {
  // Validate JSON data at runtime using Zod schema
  const validatedData = bookmarksDataSchema.parse(bookmarksData);

  return (
    <main className="flex flex-1 flex-col justify-center items-center">
      <TileBookmarks bookmarks={validatedData.tiles} />
    </main>
  );
}
