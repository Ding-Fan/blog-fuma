import Link from 'next/link';
import { blog } from '@/lib/source';

export default function Home() {
  const posts = blog.getPages();

  return (
    <main className="grow container mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold mb-4">this is the blog page (but not specific blog page)</h1>
      <div className="flex flex-col gap-8">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="group block"
          >
            {/* Metadata */}
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              {post.data.date && (
                <time dateTime={post.data.date.toString()}>
                  {new Date(post.data.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              {post.data.author && post.data.date && <span className="mx-2">·</span>}
              {post.data.author && <span>{post.data.author}</span>}
            </div>

            {/* Title with animated underline */}
            <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-violet-400 dark:group-hover:text-violet-300 transition-colors duration-300">
              <span className="relative inline-block">
                {post.data.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-400 dark:bg-violet-300 group-hover:w-full transition-all duration-300 ease-out" />
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {post.data.description}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}