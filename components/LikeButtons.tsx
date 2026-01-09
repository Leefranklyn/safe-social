/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "@/lib/api";

export default function LikeButtons({ id, type }: any) {
  const like = () => api.post(`/${type}/${id}/like`);
  const dislike = () => api.post(`/${type}/${id}/dislike`);

  return (
    <div className="flex gap-2">
      <button onClick={like}>👍</button>
      <button onClick={dislike}>👎</button>
    </div>
  );
}
