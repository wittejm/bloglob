import { useState } from "react";
import { HashRouter, Routes, Route, NavLink } from "react-router-dom";
import Projects from "./pages/Projects";
import Blog from "./pages/Blog";
import Post from "./pages/Post";

const navItems = [
  { to: "/", label: "Blog" },
  { to: "/projects", label: "Projects" },
];

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      <nav
        className={`${
          collapsed ? "w-12" : "w-48"
        } bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-200`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-3 text-gray-400 hover:text-white text-left"
          aria-label={collapsed ? "Expand nav" : "Collapse nav"}
        >
          {collapsed ? "»" : "«"}
        </button>

        {!collapsed && (
          <div className="flex flex-col gap-1 px-3">
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-6">
            Blog<span className="text-indigo-400">lob</span>
          </h1>
          <Routes>
            <Route path="/" element={<Blog />} />
            <Route path="/post/:slug" element={<Post />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>

        <footer className="px-8 py-6 text-sm text-gray-600 border-t border-gray-800">
          Jordan &middot; <a href="https://github.com/wittejm" className="hover:text-gray-400">GitHub</a>
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Layout />
    </HashRouter>
  );
}
