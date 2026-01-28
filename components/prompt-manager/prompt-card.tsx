'use client';

import { type Prompt } from './types';
import { cva } from 'class-variance-authority';

const cardVariants = cva(
  'flex flex-col rounded-lg overflow-hidden bg-fd-card border border-fd-border transition-all hover:shadow-lg cursor-pointer',
  {
    variants: {
      expanded: {
        true: 'ring-2 ring-fd-ring',
        false: 'hover:border-fd-primary/50',
      },
    },
  }
);

interface Props {
  prompt: Prompt;
  onExpand: () => void;
}

export function PromptCard({ prompt, onExpand }: Props) {
  const previewLength = 150;
  const preview =
    prompt.content.length > previewLength
      ? prompt.content.slice(0, previewLength) + '...'
      : prompt.content;

  return (
    <div className={cardVariants({ expanded: false })} onClick={onExpand}>
      {/* Header */}
      <div className="p-4 border-b border-fd-border">
        <h3 className="font-semibold text-lg line-clamp-1">{prompt.title}</h3>
        {prompt.description && (
          <p className="text-sm text-fd-muted-foreground mt-1 line-clamp-2">
            {prompt.description}
          </p>
        )}
      </div>

      {/* Badges */}
      <div className="px-4 py-2 flex flex-wrap gap-2">
        <span className="text-xs px-2 py-1 rounded bg-fd-secondary text-fd-secondary-foreground capitalize">
          {prompt.category}
        </span>
        {prompt.platforms.map((platform) => (
          <span
            key={platform}
            className="text-xs px-2 py-1 rounded bg-fd-accent text-fd-accent-foreground capitalize"
          >
            {platform}
          </span>
        ))}
      </div>

      {/* Preview */}
      <div className="px-4 py-3 flex-1">
        <pre className="text-xs font-mono text-fd-muted-foreground overflow-hidden whitespace-pre-wrap line-clamp-4">
          {preview}
        </pre>
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-fd-border">
        <button className="w-full px-3 py-2 text-sm bg-fd-primary text-fd-primary-foreground rounded hover:bg-fd-primary/80 transition-colors">
          View & Generate Bookmarklet
        </button>
      </div>
    </div>
  );
}
