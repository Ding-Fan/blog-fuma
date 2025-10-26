import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import type { TileProps } from './types';
import { isValidEmoji } from './types';

const tileVariants = cva(
  'flex flex-col items-center justify-center rounded-md transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer text-white p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring active:scale-95 overflow-hidden',
  {
    variants: {
      size: {
        small: 'col-span-1 row-span-1',
        medium: 'col-span-2 row-span-1',
        large: 'col-span-2 row-span-2',
      },
    },
  }
);

export type TileVariantProps = VariantProps<typeof tileVariants>;

export function Tile({ tile }: TileProps) {
  // XSS Protection: Only render icon if it's a valid emoji
  const safeIcon = tile.icon && isValidEmoji(tile.icon) ? tile.icon : null;

  return (
    <Link
      href={tile.url}
      target="_blank"
      rel="noopener noreferrer"
      className={tileVariants({ size: tile.size })}
      style={{ backgroundColor: tile.color }}
      aria-label={`Open ${tile.title}`}
      title={tile.title}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        {safeIcon && (
          <div className="text-2xl sm:text-3xl" aria-hidden="true">
            {safeIcon}
          </div>
        )}
        <span className="text-sm sm:text-base font-semibold line-clamp-2">
          {tile.title}
        </span>
      </div>
    </Link>
  );
}
