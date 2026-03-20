import { useEffect } from "react";
import { Link } from "react-router-dom";
import { posts } from "../posts";

const formatDate = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Blog() {
  useEffect(() => { document.title = "Bloglob"; }, []);

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">Posts</h2>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/post/${post.slug}`} className="block group">
              <span className="text-lg text-indigo-400 group-hover:text-indigo-300">
                {post.title}
              </span>
              <span className="block text-sm text-gray-500 mt-1">
                {formatDate(post.date)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
