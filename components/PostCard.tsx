/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useState } from "react";

interface PostCardProps {
  post: any;
}

export default function PostCard({ post }: PostCardProps) {
  const router = useRouter();
  const [likes, setLikes] = useState(post.likes || 0);
  const [dislikes, setDislikes] = useState(post.dislikes || 0);

  const handleLike = async () => {
    try {
      const res = await api.post(`/posts/${post.id}/like`);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await api.post(`/posts/${post.id}/dislike`);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
          {post.author_name?.[0]?.toUpperCase() || "U"}
        </div>

        {/* Post Content & Info */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <p className="font-semibold text-lg text-white">
              {post.author_name || "Anonymous"}
            </p>
            <span className="text-gray-500">•</span>
            <p className="text-sm text-gray-400">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Post Content */}
          <p className="text-gray-100 text-lg leading-relaxed mb-6">
            {post.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-8">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
            >
              👍 <span className="font-medium text-lg">{likes}</span>
            </button>

            <button
              onClick={handleDislike}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
            >
              👎 <span className="font-medium text-lg">{dislikes}</span>
            </button>

            <button
              onClick={() => router.push(`/post/${post.id}`)}
              className="ml-auto flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-medium"
            >
              💬 <span className="text-lg">{post.comments?.length || 0} Comments</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}