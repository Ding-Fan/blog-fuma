import { notFound } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { blog  } from '@/lib/source';
import { DocsPage } from 'fumadocs-ui/page';
import { PostsLayout } from '@/components/ui/posts';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);

  if (!page) notFound();
  const Mdx = page.data.body;

  return (
    <>
      {/* <DocsLayout tree={blog.pageTree}> */}
      <PostsLayout tree={blog.pageTree}>

        <DocsPage toc={page.data.toc} tableOfContent={{

          style: 'clerk',
          enabled: true
        }}>
          <div className="container  py-12 ">
            <h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
            <div className="flex gap-3">
              <p className="mb-1 text-sm text-fd-muted-foreground">
                {new Date(page.data.date).toDateString()}
              </p>
            </div>
            <p className="mb-4 text-fd-muted-foreground">{page.data.description}</p>
            {/* <Link href="/blog">Back</Link> */}
          </div>
          <article className="container flex flex-col px-4 py-8">
            <div className="prose min-w-0">
              {/* <InlineTOC items={page.data.toc} /> */}
              <Mdx components={defaultMdxComponents} />
            </div>
          </article>
        </DocsPage>

      {/* </DocsLayout> */}
      </PostsLayout>
    </>
  );
}

export function generateStaticParams(): { slug: string }[] {
  return blog.getPages().map((page) => ({
    slug: page.slugs[0],
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const page = blog.getPage([params.slug]);
  if (!page) notFound();
  return {
    title: page.data.title,
    description: page.data.description,
  };
}