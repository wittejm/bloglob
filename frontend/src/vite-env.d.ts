/// <reference types="vite/client" />

declare module "virtual:projects" {
  const projects: Array<{
    name: string;
    repo: string;
    url: string;
    github: string;
    description: string;
    lastCommit: string | null;
  }>;
  export default projects;
}
