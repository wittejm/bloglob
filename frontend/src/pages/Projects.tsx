import { useEffect } from "react";
import projects from "virtual:projects";

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function Projects() {
  useEffect(() => { document.title = "Projects - Bloglob"; }, []);

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
      <ul className="space-y-6">
        {projects.map((project) => (
          <li key={project.name}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-indigo-400 hover:text-indigo-300"
            >
              {project.name}
            </a>
            <span className="text-gray-500 text-sm ml-2">
              (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400"
              >
                github
              </a>
              )
            </span>
            <p className="text-gray-400 mt-1">{project.description}</p>
            {project.lastCommit && (
              <p className="text-gray-500 text-sm mt-1">
                last updated {formatDate(project.lastCommit)}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
