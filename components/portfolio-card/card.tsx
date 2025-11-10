'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { animate } from 'animejs';
import type { ProjectCardProps } from './types';

export function PortfolioCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      translateY: -8,
      scale: 1.02,
      duration: 300,
      ease: 'out(3)',
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    animate(cardRef.current, {
      translateY: 0,
      scale: 1,
      duration: 200,
      ease: 'in(3)',
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col rounded-lg overflow-hidden bg-fd-card border border-fd-border transition-shadow duration-200"
      style={{ boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-video bg-fd-muted">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        {project.featured && (
          <div className="absolute top-2 right-2 bg-fd-primary text-fd-primary-foreground text-xs font-semibold px-2 py-1 rounded">
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-semibold text-fd-foreground mb-2 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-sm text-fd-muted-foreground mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-fd-muted text-fd-muted-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div className="flex gap-3">
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-fd-primary hover:text-fd-primary/80 transition-colors"
              aria-label={`View ${project.title} demo`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Demo</span>
            </Link>
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-fd-primary hover:text-fd-primary/80 transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
