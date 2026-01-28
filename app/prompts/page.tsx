import { PromptManager } from '@/components/prompt-manager';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Prompts | 又不是不能写博客',
  description: 'Browse and generate bookmarklets for AI prompts. Works on ChatGPT, Gemini, and Claude.',
};

export default function PromptsPage() {
  return <PromptManager />;
}
