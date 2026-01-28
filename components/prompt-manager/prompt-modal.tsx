'use client';

import { useEffect } from 'react';
import { type Prompt } from './types';
import { BookmarkletGenerator } from './bookmarklet-generator';

interface Props {
  prompt: Prompt | null;
  onClose: () => void;
}

export function PromptModal({ prompt, onClose }: Props) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (prompt) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [prompt]);

  if (!prompt) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-fd-background border border-fd-border rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-fd-border flex items-start justify-between">
          <div className="flex-1 pr-4">
            <h2 className="text-2xl font-bold">{prompt.title}</h2>
            {prompt.description && (
              <p className="text-fd-muted-foreground mt-1">{prompt.description}</p>
            )}
            {/* Badges */}
            <div className="mt-3 flex flex-wrap gap-2">
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
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <pre className="bg-fd-muted p-4 rounded text-sm font-mono whitespace-pre-wrap break-words">
            {prompt.content}
          </pre>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-fd-border">
          <BookmarkletGenerator
            promptContent={prompt.content}
            promptTitle={prompt.title}
          />
        </div>
      </div>
    </div>
  );
}
