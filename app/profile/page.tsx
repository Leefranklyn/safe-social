/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import PostCard from "@/components/PostCard";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          api.get("/users/profile"),
          api.get("/posts"),
        ]);

        setUser(profileRes.data);

        const userPosts = postsRes.data.filter(
          (post: any) => post.author === profileRes.data.id || post.author_name === profileRes.data.username
        );
        setPosts(userPosts);
      } catch (err) {
        console.error("Failed to load profile or posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-2xl text-gray-400 animate-pulse">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <p className="text-2xl text-red-400">Unable to load profile</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-950/70 backdrop-blur-md sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    <h1
      onClick={() => router.push("/feed")}
      className="cursor-pointer text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
    >
      SafeSocial
    </h1>

    <div className="flex items-center gap-8">
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
      <div className="pt-20" />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-10 shadow-2xl mb-12 flex items-center gap-8">
          <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-5xl shadow-2xl">
            {user.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <h1 className="text-4xl font-extrabold text-white mb-2">
              {user.username}
            </h1>
            <p className="text-lg text-gray-400">User ID: {user.id}</p>
            <p className="mt-4 text-xl text-gray-300">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-10 text-gray-100">
            Your Posts
          </h2>

          {posts.length > 0 ? (
            <div className="space-y-10">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-800/40 rounded-2xl border border-gray-700">
              <p className="text-2xl text-gray-500 mb-4">
                No posts yet
              </p>
              <p className="text-lg text-gray-400">
                Share your first thought on the feed!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}