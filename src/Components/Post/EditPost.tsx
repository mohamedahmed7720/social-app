import { useState } from "react";
import type { PostCardI } from "../../types/postCard";
import { updatePost } from "../../services/Posts.services";
import { Spinner } from "@heroui/react";

function EditPost({
  post,
  setShowEditPost,
  refetchPosts,
}: {
  post: PostCardI;
  setShowEditPost: (value: boolean) => void;
  refetchPosts: () => void;
}) {
  const [body, setBody] = useState(post?.body || "");
  const [isLoading, setIsLoading] = useState(false);
  const isEmpty = body.trim().length === 0;

  async function editPost() {
    const formData = new FormData();
    if (body) {
      formData.append("body", body);
    }
    try {
      setIsLoading(true);
      const data = await updatePost(post._id, formData);
      console.log(data);
      refetchPosts();
      setBody("");
      setShowEditPost(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-white shadow-sm overflow-hidden">
      {/* ---------- Body ---------- */}
      <div className="p-4">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[16px] leading-relaxed text-slate-800 outline-none resize-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* ---------- Footer ---------- */}
      <div className="flex items-center justify-end gap-2 px-4 pb-4">
        <button
          onClick={() => setShowEditPost(false)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={editPost}
          disabled={isEmpty}
          className={`px-4 py-2 rounded-lg text-sm font-semibold text-white transition-colors
            ${
              isEmpty
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
        >
          {isLoading ? <Spinner className="text-white" /> : "Save"}
        </button>
      </div>
    </div>
  );
}

export default EditPost;
