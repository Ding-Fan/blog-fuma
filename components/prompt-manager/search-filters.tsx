'use client';

import { type Category, type Platform } from './types';

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category | 'all';
  onCategoryChange: (category: Category | 'all') => void;
  selectedPlatform: Platform | 'all';
  onPlatformChange: (platform: Platform | 'all') => void;
}

export function SearchFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPlatform,
  onPlatformChange,
}: Props) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search prompts by title, description, or keywords..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-3 rounded-md border border-fd-border bg-fd-background text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="category-filter" className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value as Category | 'all')}
            className="w-full px-3 py-2 rounded-md border border-fd-border bg-fd-background text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
          >
            <option value="all">All Categories</option>
            <option value="agent">Agent</option>
            <option value="language">Language</option>
            <option value="music">Music</option>
            <option value="utility">Utility</option>
            <option value="system">System</option>
            <option value="character">Character</option>
            <option value="education">Education</option>
          </select>
        </div>

        {/* Platform Filter */}
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="platform-filter" className="block text-sm font-medium mb-2">
            Platform
          </label>
          <select
            id="platform-filter"
            value={selectedPlatform}
            onChange={(e) => onPlatformChange(e.target.value as Platform | 'all')}
            className="w-full px-3 py-2 rounded-md border border-fd-border bg-fd-background text-fd-foreground focus:outline-none focus:ring-2 focus:ring-fd-ring"
          >
            <option value="all">All Platforms</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="gemini">Gemini</option>
            <option value="claude">Claude</option>
          </select>
        </div>
      </div>
    </div>
  );
}
