/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import api from "@/lib/api";

interface CommentProps {
  comment: any;
  depth?: number;
}

export default function Comment({ comment, depth = 0 }: CommentProps) {
  const [likes, setLikes] = useState(comment.likes || 0);
  const [dislikes, setDislikes] = useState(comment.dislikes || 0);

  const handleLike = async () => {
    try {
      const res = await api.post(`/comments/${comment.id}/like`);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDislike = async () => {
    try {
      const res = await api.post(`/comments/${comment.id}/dislike`);
      setLikes(res.data.likes);
      setDislikes(res.data.dislikes);
    } catch (err) {
      console.error(err);
    }
  };

  const indentClass = depth > 0 ? `ml-${Math.min(depth * 8, 32)}` : "";

  return (
    <div className={`bg-gray-800/70 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ${indentClass}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {comment.author_name?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <p className="font-semibold text-lg text-white">
              {comment.author_name || "Anonymous"}
            </p>
            <span className="text-gray-500">•</span>
            <p className="text-sm text-gray-400">
              {new Date(comment.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Comment Content */}
          <p className="text-gray-100 text-base leading-relaxed mb-4">
            {comment.content}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-green-400 hover:text-green-300 transition"
            >
              <ThumbsUp size={18} />
              <span className="font-medium">{likes}</span>
            </button>

            <button
              onClick={handleDislike}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
            >
              <ThumbsDown size={18} />
              <span className="font-medium">{dislikes}</span>
            </button>

            <button className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition">
              <MessageSquare size={18} />
              <span className="font-medium">Reply</span>
            </button>
          </div>
        </div>
      </div>

      {/* Future: Nested replies will go here */}
      {/* {comment.replies && comment.replies.length > 0 && (
        <div className="mt-6">
          {comment.replies.map((reply: any) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </div>
      )} */}
    </div>
  );
}