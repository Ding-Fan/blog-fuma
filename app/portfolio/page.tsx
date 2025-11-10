import { PortfolioCard, portfolioDataSchema } from '@/components/portfolio-card';
import portfolioData from '@/data/portfolio.json';

export default function PortfolioPage() {
  // Validate JSON data at runtime using Zod schema
  const validatedData = portfolioDataSchema.parse(portfolioData);

  return (
    <main className="flex flex-1 flex-col">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-fd-foreground mb-4">Portfolio</h1>
          <p className="text-lg text-fd-muted-foreground">
            A collection of my projects and work
          </p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validatedData.projects.map((project) => (
            <PortfolioCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
