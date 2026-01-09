/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function PostForm({ onPostCreated }: any) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/posts", { content });
      onPostCreated(res.data);
      setContent("");
    } catch (err: any) {
      const reason = err.response?.data?.detail?.reason || err.response?.data?.message || "Post rejected";
      setError(reason);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <textarea
        className="w-full bg-gray-800 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-lg transition"
        rows={4}
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={loading}
      />

      {error && (
        <div className="mt-3 p-3 bg-red-900/40 border border-red-800 rounded-lg text-red-300 text-sm">
          {error}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={submit}
          disabled={loading || !content.trim()}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-300"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}