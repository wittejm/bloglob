import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPost } from "../posts";

const formatDate = (date: string) =>
  new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default function Post() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  useEffect(() => {
    document.title = post ? `${post.title} - Bloglob` : "Bloglob";
  }, [post]);

  if (!post) {
    return <p className="text-gray-400">Post not found.</p>;
  }

  return (
    <article className="max-w-2xl">
      <Link to="/" className="text-sm text-gray-500 hover:text-gray-300 mb-4 inline-block">
        &larr; All posts
      </Link>
      <h2 className="text-3xl font-bold text-white mb-2">{post.title}</h2>
      <time className="text-sm text-gray-500 block mb-8">
        {formatDate(post.date)}
      </time>
      <div
        className="prose prose-invert prose-indigo max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
