const projects = [
  {
    name: "BookSharePDX",
    url: "https://booksharepdx.com",
    description: "A social platform I built for sharing books with neighbors",
  },
  {
    name: "Typogenetics",
    url: "https://wittejm.github.io/typogenetics",
    description:
      "Douglas Hofstadter's toy genetics game with self-referential patterns and stuff",
  },
  {
    name: "EcologySim",
    url: "https://wittejm.github.io/ecologysim",
    description:
      "Plants, deer, and wolves running around eating each other and exhibiting population dynamics",
  },
];

export default function Projects() {
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
            <p className="text-gray-400 mt-1">{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
