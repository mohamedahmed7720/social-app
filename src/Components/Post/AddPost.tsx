import { Lock, Image, Smile, Send } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { CloseButton } from "@heroui/react";
import { createPost } from "../../services/Posts.services";
import { userContext } from "../../Context/UserContext";
import toast from "react-hot-toast";

export default function AddPost({
  refetchPosts,
}: {
  refetchPosts: () => void;
}) {
  const [postText, setPostText] = useState("");
  const [userPostImg, setUserPostImg] = useState<File | null>(null);
  const imgInput = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const isEmpty = postText!.trim().length === 0;

  const { userData } = useContext(userContext)!;

  useEffect(() => {
    console.log(imgInput.current);

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
    setPostText((prev) => prev + emojiData.emoji);
  }

  function chooseFile() {
    imgInput.current?.click();
  }

  function getImgUrl() {
    const file = imgInput.current?.files![0];
    setUserPostImg(file!);
    console.log(file);
  }

  async function addPost() {
    const formData = new FormData();
    if (postText) {
      formData.append("body", postText);
    }
    if (userPostImg) {
      formData.append("image", userPostImg);
    }
    try {
      setIsLoading(true);
      const data = await createPost(formData);
      console.log(data);
      refetchPosts();
      setPostText("");
      setUserPostImg(null);
    } catch (error) {
      toast.error("Error", error!)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm mb-3"
      ref={pickerRef}
    >
      {/* Header */}
      <div className="flex items-start gap-3 pb-3">
        <img
          src={userData?.photo}
          alt={userData?.name}
          className="h-10 w-10 shrink-0 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <p className="text-base font-extrabold text-slate-900">
            {userData?.name}
          </p>

          {/* Privacy */}
          <div className="mt-1 w-fit flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-200">
            <Lock size={12} />
            <select className="cursor-pointer">
              <option value="">Puplic</option>
              <option value="">Followers</option>
              <option value="">Only me</option>
            </select>
          </div>
        </div>
      </div>

      {/* Composer */}
      <div className="pb-3">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder={`What's on your mind, ${userData?.name}?`}
          rows={4}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base lg:text-[17px] leading-relaxed text-slate-800 outline-none transition focus:border-[#1877f2] focus:bg-white"
        />

        {userPostImg && (
          <>
            <div className="w-full rounded-xl mt-2 relative ">
              <CloseButton
                onClick={() => {
                  setUserPostImg(null);
                }}
                className="absolute top-2 right-2 bg-black text-white"
              />
              <img
                src={URL.createObjectURL(userPostImg!)}
                alt=""
                className="w-full rounded-xl h-55 object-cover"
              />
            </div>
          </>
        )}
      </div>

      <div className="border-t border-black" />

      {/* Actions */}
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center">
          <button
            onClick={chooseFile}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <input onChange={getImgUrl} ref={imgInput} type="file" hidden />
            <Image size={18} className="text-green-500" />
            <span className="hidden md:inline">Photo/video</span>
          </button>

          <button
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <Smile size={18} className="text-amber-400" />
            <span className="hidden md:inline">Feeling/activity</span>
          </button>
        </div>

        <button
          onClick={addPost}
          disabled={isEmpty}
          className={`flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-semibold justify-center text-white transition-colors
            ${
              isEmpty
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
            }`}
        >
          Post
          {isLoading ? "ing..." : <Send size={16} />}
        </button>
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
