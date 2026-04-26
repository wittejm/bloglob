import type { Plugin } from "vite";

interface Project {
  name: string;
  repo: string;
  url: string;
  github: string;
  description: string;
}

const projects: Project[] = [
  {
    name: "BookSharePDX",
    repo: "wittejm/booksharepdx",
    url: "https://booksharepdx.com",
    github: "https://github.com/wittejm/booksharepdx",
    description:
      "A social platform I built for sharing books with neighbors",
  },
  {
    name: "Typogenetics",
    repo: "wittejm/typogenetics",
    url: "https://wittejm.github.io/typogenetics",
    github: "https://github.com/wittejm/typogenetics",
    description:
      "Douglas Hofstadter's toy genetics game with self-referential patterns and stuff",
  },
  {
    name: "EcologySim",
    repo: "wittejm/ecologysim",
    url: "https://wittejm.github.io/ecologysim",
    github: "https://github.com/wittejm/ecologysim",
    description:
      "Plants, deer, and wolves running around eating each other and exhibiting population dynamics",
  },
  {
    name: "Artificial Life",
    repo: "wittejm/alife",
    url: "https://wittejm.github.io/alife",
    github: "https://github.com/wittejm/alife",
    description:
      "A series of methods from the Artificial Life literature",
  },
];

async function fetchLastCommitDate(repo: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=1`
    );
    if (!res.ok) return null;
    const commits = await res.json();
    if (commits.length > 0) {
      return commits[0].commit.committer.date;
    }
  } catch {
    // fall through
  }
  return null;
}

const VIRTUAL_ID = "virtual:projects";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

export default function githubProjects(): Plugin {
  return {
    name: "github-projects",
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },
    async load(id) {
      if (id !== RESOLVED_ID) return;

      const results = await Promise.all(
        projects.map(async (p) => {
          const lastCommit = await fetchLastCommitDate(p.repo);
          return { ...p, lastCommit };
        })
      );

      return `export default ${JSON.stringify(results)};`;
    },
  };
}
