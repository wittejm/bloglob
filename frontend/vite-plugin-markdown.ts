import { Plugin } from "vite";
import matter from "gray-matter";
import { marked } from "marked";

export default function markdown(): Plugin {
  return {
    name: "markdown",
    transform(src, id) {
      if (!id.endsWith(".md")) return;
      const { data, content } = matter(src);
      const html = marked.parse(content, { async: false }) as string;
      return {
        code: `export const attributes = ${JSON.stringify(data)};\nexport const html = ${JSON.stringify(html)};`,
        map: null,
      };
    },
  };
}
