import { Plugin, ResolvedConfig } from "vite";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const SITE_URL = "https://wittejm.github.io/bloglob";

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeAttr(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

interface Route {
  filePath: string;
  title: string;
  description: string;
  ogType: string;
  canonicalUrl: string;
}

export default function seo(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "seo",
    configResolved(resolved) {
      config = resolved;
    },
    closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const postsDir = path.resolve(config.root, "src/posts");
      const indexHtml = fs.readFileSync(
        path.join(outDir, "index.html"),
        "utf-8"
      );

      const routes: Route[] = [
        {
          filePath: "index.html",
          title: "Bloglob",
          description:
            "Blog posts about software, ideas, and projects by Jordan.",
          ogType: "website",
          canonicalUrl: SITE_URL + "/",
        },
        {
          filePath: "projects/index.html",
          title: "Projects - Bloglob",
          description: "Software projects by Jordan.",
          ogType: "website",
          canonicalUrl: SITE_URL + "/projects/",
        },
      ];

      if (fs.existsSync(postsDir)) {
        const postFiles = fs
          .readdirSync(postsDir)
          .filter((f) => f.endsWith(".md"));

        for (const file of postFiles) {
          const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
          const { data, content } = matter(raw);
          const html = marked.parse(content, { async: false }) as string;
          const slug = file
            .replace(/^\d{4}-\d{2}-\d{2}-/, "")
            .replace(".md", "");
          const plainText = stripHtml(html);
          const description =
            (data.description as string | undefined) ??
            (plainText.length > 155
              ? plainText.slice(0, 152) + "…"
              : plainText);

          routes.push({
            filePath: `post/${slug}/index.html`,
            title: `${data.title} - Bloglob`,
            description,
            ogType: "article",
            canonicalUrl: `${SITE_URL}/post/${slug}/`,
          });
        }
      }

      for (const route of routes) {
        const metaTags = [
          `<meta property="og:title" content="${escapeAttr(route.title)}">`,
          `<meta property="og:description" content="${escapeAttr(route.description)}">`,
          `<meta property="og:type" content="${route.ogType}">`,
          `<meta property="og:url" content="${route.canonicalUrl}">`,
          `<meta name="twitter:card" content="summary">`,
          `<meta name="twitter:title" content="${escapeAttr(route.title)}">`,
          `<meta name="twitter:description" content="${escapeAttr(route.description)}">`,
          `<link rel="canonical" href="${route.canonicalUrl}">`,
        ].join("\n    ");

        let html = indexHtml;
        html = html.replace(
          "<title>Bloglob</title>",
          `<title>${route.title}</title>`
        );
        html = html.replace(
          /<meta name="description" content="[^"]*">/,
          `<meta name="description" content="${escapeAttr(route.description)}">`
        );
        html = html.replace("</head>", `    ${metaTags}\n  </head>`);

        const outPath = path.join(outDir, route.filePath);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);
      }

      // 404.html fallback so GitHub Pages serves the SPA shell for unknown routes
      fs.copyFileSync(
        path.join(outDir, "index.html"),
        path.join(outDir, "404.html")
      );

      console.log(`  ✓ Generated ${routes.length} SEO pages + 404.html`);
    },
  };
}
