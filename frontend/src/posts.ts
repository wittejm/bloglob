const postModules = import.meta.glob("./posts/*.md", { eager: true }) as Record<
  string,
  { attributes: Record<string, unknown>; html: string }
>;

const DATE_PREFIX = /^(\d{4}-\d{2}-\d{2})-/;

export interface Post {
  slug: string;
  date: string;
  title: string;
  html: string;
}

function parsePost(path: string, mod: { attributes: Record<string, unknown>; html: string }): Post {
  const filename = path.replace("./posts/", "").replace(".md", "");
  const dateMatch = filename.match(DATE_PREFIX);
  const date = (mod.attributes.date as string | undefined) ?? dateMatch?.[1] ?? "";
  const slug = dateMatch ? filename.replace(DATE_PREFIX, "") : filename;

  return {
    slug,
    date,
    title: mod.attributes.title as string,
    html: mod.html,
  };
}

export const posts: Post[] = Object.entries(postModules)
  .map(([path, mod]) => parsePost(path, mod))
  .sort((a, b) => (a.date > b.date ? -1 : 1));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
