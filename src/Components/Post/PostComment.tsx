import { Image, Smile, Send } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { CloseButton, Spinner } from "@heroui/react";
import { createComments } from "../../services/comment.services";
import { userContext } from "../../Context/UserContext";

export default function PostComment({
  postId,
  refetchPosts,
}: {
  postId: string;
  refetchPosts: () => void;
}) {
  const [commentText, setCommentText] = useState("");
  const [userImg, setUserImg] = useState<File | null>(null);
  const isEmpty = commentText.trim().length === 0;
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const imgInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { userData } = useContext(userContext)!;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleEmojiClick(emojiData: EmojiClickData) {
    setCommentText((prev) => prev + emojiData.emoji);
  }

  async function addComment() {
    const formData = new FormData();
    if (commentText) {
      formData.append("content", commentText);
    }
    if (userImg) {
      formData.append("image", userImg!);
    }
    try {
      setIsLoading(true);
      const data = await createComments(postId, formData);
      console.log(data);
      refetchPosts();
      setCommentText("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function chooseFile() {
    imgInput.current?.click();
  }

  function getImgUrl() {
    const file = imgInput.current?.files![0];
    setUserImg(file!);
    console.log(file);
  }

  return (
    <div className="rounded-3xl bg-white shadow-sm mt-1" ref={pickerRef}>
      <div className="flex items-start gap-3 p-4">
        {/* Avatar */}
        <img
          src={userData?.photo}
          alt={userData?.name}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm"
        />

        {/* Comment box */}
        <div className="min-w-0 flex-1 rounded-2xl bg-slate-100 px-3 py-2">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={`Comment as ${userData?.name}...`}
            rows={2}
            className="w-full resize-none bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />

          {/* Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 ">
              <button
                onClick={() => {
                  chooseFile();
                }}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-200"
              >
                <input onChange={getImgUrl} ref={imgInput} type="file" hidden />
                <Image size={18} />
              </button>
              <button
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className="rounded-full p-2 text-slate-500 hover:bg-slate-200"
              >
                <Smile size={18} />
              </button>
            </div>

            <button
              onClick={addComment}
              disabled={isEmpty}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors
            ${
              isEmpty
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
            >
              {isLoading ? (
                <Spinner className="text-white" />
              ) : (
                <Send size={16} />
              )}
            </button>
          </div>
          {userImg && (
            <>
              <div className="w-37 mt-3 p-3 relative">
                <CloseButton
                  onClick={() => {
                    setUserImg(null);
                  }}
                  className="absolute -top-1 -right-1"
                />
                <img
                  src={URL.createObjectURL(userImg)}
                  alt=""
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>
      {showEmojiPicker && (
        <div className=" top-full ms-17 mb-2 -mt-3 z-50">
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            height={400}
            width={300}
          />
        </div>
      )}
    </div>
  );
}
