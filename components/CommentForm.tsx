/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import api from "@/lib/api";

interface CommentFormProps {
  postId: string;
  parentId?: string | null;
  onNewComment: (comment: any) => void;
}

export default function CommentForm({ postId, parentId, onNewComment }: CommentFormProps) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/comments", {
        content: content.trim(),
        post_id: postId,
        parent_comment_id: parentId || null,
      });

      onNewComment(res.data);
      setContent("");
    } catch (err: any) {
      const reason =
        err.response?.data?.detail?.reason ||
        err.response?.data?.detail?.message ||
        "Comment rejected – please review your content";
      setError(reason);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-6 shadow-lg">
      <textarea
        className="w-full bg-gray-700/70 border border-gray-600 rounded-xl px-5 py-4 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
        rows={4}
        placeholder={parentId ? "Write a reply..." : "Share your thoughts..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />

      {error && (
        <div className="mt-4 p-4 bg-red-900/40 border border-red-800 rounded-lg text-red-300 text-sm">
          <span className="font-medium">Blocked:</span> {error}
        </div>
      )}

      <div className="mt-5 flex justify-end">
        <button
          onClick={submit}
          disabled={loading || !content.trim()}
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-60 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-300"
        >
          {loading ? "Posting..." : parentId ? "Reply" : "Comment"}
        </button>
      </div>
    </div>
  );
}