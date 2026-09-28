import { useState } from "react";
import type { postCommentI } from "../../types/postComment";
import { updateComments } from "../../services/comment.services";
import toast from "react-hot-toast";

function EditComment({
  comment,
  setShowEditComment,
  id,
  commentId,
  refetchComment,
}: {
  comment: postCommentI;
  setShowEditComment: (value: boolean) => void;
  id: string;
  commentId: string;
  refetchComment: () => void;
}) {
  const [content, setContent] = useState(comment?.content || "");
  const isEmpty = content.trim().length === 0;
  const [isLoading, setIsLoading] = useState(false);

  async function updateComment(id: string) {
    const formData = new FormData();
    formData.append("content", content);

    try {
      setIsLoading(true);
      const { data } = await updateComments(id, commentId, formData);
      setShowEditComment(false);
      setContent(data);
      refetchComment();
    } catch (error) {
      toast.error("Error", error!);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex gap-2">
      <div className="flex-1">
        {/* Pill input + Save/Cancel */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
            className="flex-1 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-300"
          />
          {isLoading ? (
            <>
              <button className="px-5 py-2 rounded-full text-xs font-semibold text-white transition-colors bg-blue-300 cursor-not-allowed">
                saving...
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  updateComment(id);
                }}
                disabled={isEmpty}
                className={`px-5 py-2 rounded-full text-xs font-semibold text-white transition-colors
              ${isEmpty ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                Save
              </button>
            </>
          )}

          <button
            onClick={() => {
              setShowEditComment(false);
            }}
            className="px-5 py-2 rounded-full text-xs font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditComment;
