import { z } from 'zod';

// Zod schema for runtime validation
export const projectSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'Image path is required'),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  demoUrl: z.string().url('Invalid demo URL').startsWith('https://', 'Only HTTPS URLs allowed').optional(),
  githubUrl: z.string().url('Invalid GitHub URL').startsWith('https://', 'Only HTTPS URLs allowed').optional(),
  featured: z.boolean().optional(),
  date: z.string().optional(),
});

export const portfolioDataSchema = z.object({
  projects: z.array(projectSchema),
});

// TypeScript types inferred from schemas
export type ProjectData = z.infer<typeof projectSchema>;
export type PortfolioData = z.infer<typeof portfolioDataSchema>;

export interface ProjectCardProps {
  project: ProjectData;
}
