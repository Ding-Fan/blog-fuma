'use client';

import { useState, useMemo } from 'react';
import { prompts } from '@/data/prompts';
import { type Category, type Platform, type Prompt } from './types';
import { SearchFilters } from './search-filters';
import { PromptCard } from './prompt-card';
import { PromptModal } from './prompt-modal';

export function PromptManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const filteredPrompts = useMemo(() => {
    let filtered = prompts;

    // Search filter
    if (searchQuery) {
      const lower = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(lower) ||
          p.description?.toLowerCase().includes(lower) ||
          p.keywords?.some((k) => k.toLowerCase().includes(lower))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter((p) => p.platforms.includes(selectedPlatform));
    }

    // Sort alphabetically
    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [searchQuery, selectedCategory, selectedPlatform]);

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Prompt Manager</h1>
        <p className="text-fd-muted-foreground">
          Browse, search, and generate bookmarklets for your AI prompts. Works on ChatGPT, Gemini,
          and Claude.
        </p>
      </div>

      {/* Search and Filters */}
      <SearchFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPlatform={selectedPlatform}
        onPlatformChange={setSelectedPlatform}
      />

      {/* Results Count */}
      <div className="mt-6 text-sm text-fd-muted-foreground">
        Showing {filteredPrompts.length} of {prompts.length} prompts
      </div>

      {/* Prompt Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              onExpand={() => setSelectedPrompt(prompt)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-fd-muted-foreground">
              No prompts found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <PromptModal prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
    </div>
  );
}
