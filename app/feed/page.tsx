"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import PostForm from "@/components/PostForm";
import { useAuth } from "@/context/AuthContext";
import { LogOut, User } from "lucide-react";

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true); 
  const { token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token, router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
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
              <span className="hidden md:inline font-medium text-lg">Profile</span>
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

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <PostForm onPostCreated={(newPost: Post) => setPosts([newPost, ...posts])} />
            </div>
          </aside>

          <main className="lg:col-span-3">
            {loading ? (
              // Loading Skeleton Cards
              <div className="space-y-12">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-gray-800/70 border border-gray-700 rounded-2xl p-8 shadow-xl animate-pulse"
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 bg-gray-700 rounded-full" />
                      <div className="flex-1">
                        <div className="h-6 bg-gray-700 rounded w-48 mb-4" />
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-700 rounded w-full" />
                          <div className="h-4 bg-gray-700 rounded w-5/6" />
                          <div className="h-4 bg-gray-700 rounded w-3/4" />
                        </div>
                        <div className="mt-6 flex gap-6">
                          <div className="h-8 bg-gray-700 rounded w-20" />
                          <div className="h-8 bg-gray-700 rounded w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : posts.length === 0 ? (
              // Empty State
              <div className="text-center py-32 bg-gray-800/40 rounded-2xl border border-gray-700">
                <p className="text-3xl text-gray-500 mb-6">
                  No posts yet.
                </p>
                <p className="text-xl text-gray-400">
                  Be the first to share something positive!
                </p>
                <p className="mt-4 text-gray-500">
                  Your thoughts will appear here once posted.
                </p>
              </div>
            ) : (
              // Real Posts
              <div className="space-y-12">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    // onUpdate={refreshPosts} // Uncomment if you add like/dislike refresh
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}