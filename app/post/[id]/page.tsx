/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Comment from "@/components/Comment";
import CommentForm from "@/components/CommentForm";
import { useParams } from "next/navigation";
import { ArrowLeft, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function PostPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const { id } = useParams() as { id: string };
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Failed to load post:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const addNewComment = (newComment: any) => {
    setPost((prev: any) => ({
      ...prev,
      comments: [...(prev.comments || []), newComment],
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-2xl text-gray-400 animate-pulse">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-2xl text-red-400">Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            SafeSocial
          </h1>

          <div className="flex items-center gap-8">
            <button
              onClick={() => router.push("/profile")}
              className="flex items-center gap-3 text-gray-300 hover:text-white transition"
            >
              <User size={22} />
              <span className="hidden md:inline font-medium text-lg">
                {"Profile"}
              </span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-gray-300 hover:text-red-400 transition"
            >
              <LogOut size={22} />
              <span className="hidden md:inline font-medium text-lg">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Back Button */}
        <button
          onClick={() => router.push("/feed")}
          className="flex items-center gap-3 mb-10 text-gray-400 hover:text-white transition group"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-lg">Back to Feed</span>
        </button>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl mb-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
              {post.author_name?.[0]?.toUpperCase() || "U"}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <p className="text-2xl font-bold text-white">{post.author_name}</p>
                <span className="text-gray-500">•</span>
                <p className="text-gray-400">
                  {new Date(post.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-8">
                {post.content}
              </h1>

              <div className="flex items-center gap-8 text-lg">
                <div className="flex items-center gap-3 bg-gray-700/50 px-5 py-3 rounded-xl">
                  <span className="text-2xl">👍</span>
                  <span className="font-bold text-green-400">{post.likes || 0}</span>
                </div>
                <div className="flex items-center gap-3 bg-gray-700/50 px-5 py-3 rounded-xl">
                  <span className="text-2xl">👎</span>
                  <span className="font-bold text-red-400">{post.dislikes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-gray-100">Add a Comment</h2>
          <CommentForm postId={post.id} onNewComment={addNewComment} />
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-3xl font-bold mb-10 text-gray-100">
            Comments ({post.comments?.length || 0})
          </h2>

          {post.comments && post.comments.length > 0 ? (
            <div className="space-y-10">
              {post.comments.map((c: any) => (
                <Comment key={c.id} comment={c} depth={0} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/40 rounded-2xl border border-gray-700">
              <p className="text-2xl text-gray-500 mb-4">
                No comments yet
              </p>
              <p className="text-lg text-gray-400">
                Be the first to join the conversation!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}