"use client";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-8 text-center text-gray-100">
      <div className="max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Welcome to SafeSocial
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300 leading-relaxed">
          SafeSocial is a community platform where you can share your thoughts safely.
          All content is moderated by advanced AI to keep the space positive, respectful, and free from toxicity.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Login
          </button>
          <button
            onClick={() => router.push("/register")}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:from-purple-700 hover:to-pink-700 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Register
          </button>
        </div>
        <p className="mt-12 text-sm text-gray-500">
          Powered by ALBERT — Efficient & Intelligent Moderation
        </p>
      </div>
    </div>
  );
}