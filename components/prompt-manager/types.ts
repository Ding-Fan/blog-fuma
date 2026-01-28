import { z } from 'zod';

// Categories based on ai.prompt.mdx analysis
export const categorySchema = z.enum([
  'agent',      // vMAS, Consultant, Nihongo_Sensei, Agent_Architect
  'language',   // Japanese refinement prompts
  'music',      // Music generation, recommendation
  'utility',    // Refine for tech, concept combination
  'system',     // Code permission systems, discussion command
  'character',  // Akane, Yukari personas
  'education',  // Study guide, job extraction
]);

export const platformSchema = z.enum([
  'chatgpt',
  'gemini',
  'claude',
]);

export const promptSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  description: z.string().optional(),
  category: categorySchema,
  platforms: z.array(platformSchema).min(1),
  keywords: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type Platform = z.infer<typeof platformSchema>;
export type Prompt = z.infer<typeof promptSchema>;
