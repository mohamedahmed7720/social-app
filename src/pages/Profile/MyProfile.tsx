import {
  Mail,
  Users,
  FileText,
  Bookmark,
  Repeat,
  MessageCircle,
  Clock,
  Camera,
  Expand,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BiLike } from "react-icons/bi";
import {
  getMyProfile,
  uploadProfilePhoto,
} from "../../services/profile.services";
import type { IUserData } from "../../types/profileData";
import { getUserPosts } from "../../services/Posts.services";
import type { PostCardI } from "../../types/postCard";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function MyProfile() {
  const [userProfile, setuserProfile] = useState<IUserData | null>(null);
  const [myPosts, setMyPosts] = useState<PostCardI[]>([]);
  const imgInput = useRef<HTMLInputElement | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  function timeAgo(date: string) {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000,
    );
    const intervals: [number, string][] = [
      [31536000, "year"],
      [2592000, "month"],
      [86400, "day"],
      [3600, "hour"],
      [60, "minute"],
    ];

    for (const [secondsInUnit, name] of intervals) {
      const count = Math.floor(seconds / secondsInUnit);
      if (count >= 1) return `${count} ${name}${count > 1 ? "s" : ""} ago`;
    }
    return "just now";
  }

  function chooseFile() {
    imgInput.current?.click();
  }

  async function myProfile() {
    try {
      const { data } = await getMyProfile();
      const user = data.data.user;
      setuserProfile(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }

  async function UploadPhoto(formData: FormData) {
    try {
      const { data } = await uploadProfilePhoto(formData);
      console.log(data);
      myProfile();
    } catch (error) {
      console.log(error);
    }
  }

  async function getImgUrl() {
    const file = imgInput.current?.files![0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    await UploadPhoto(formData);
  }

  useEffect(() => {
    async function getMyPosts(id: string) {
      try {
        const { data } = await getUserPosts(id);
        const posts = data.data.posts;
        setMyPosts(posts);
      } catch (error) {
        toast.error("Error", error!)
      }
    }
    myProfile();
    if (userProfile?._id) {
      getMyPosts(userProfile._id);
    }
  }, [userProfile?._id]);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-18 lg:py-21 ">
        {/* ---------- Cover + Profile card ---------- */}
        <div>
          {/* ---------- Cover + Profile card ---------- */}
          <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm mb-6">
            {/* Cover photo */}
            <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60" />

            {/* ---------- White card overlapping the cover ---------- */}
            <div className="relative -mt-12 lg:-mt-16 mx-3 lg:mx-8 rounded-3xl bg-white/99 px-8 pt-6 pb-8">
              {/* ---------- Top row: avatar (own div) + name/info (own div) + stats (own div) ---------- */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex items-center gap-4">
                  {/* Avatar - its own div */}
                  <div className="relative group">
                    <img
                    onClick={()=> {setIsPreviewOpen(true)}}
                      src={userProfile?.photo}
                      alt={userProfile?.name}
                      className="h-28 w-28 rounded-full border-4 cursor-pointer border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                    />
                   <div className="lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span
                      onClick={chooseFile}
                      className="bg-blue-600 p-2 rounded-full absolute right-2 bottom-0 text-white cursor-pointer"
                    >
                      <Camera size={16} />
                      <input
                        onChange={getImgUrl}
                        ref={imgInput}
                        type="file"
                        hidden
                      />
                    </span>
                    <span
                      onClick={() => {
                        setIsPreviewOpen(true);
                      }}
                      className="bg-white text-blue-600 p-2 rounded-full absolute left-2 bottom-0 cursor-pointer"
                    >
                      <Expand size={16} />
                    </span>
                   </div>
                  </div>



                  {/* مودال عرض الصورة بشاشة كاملة */}
                  {isPreviewOpen && (
                    <div
                      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
                      onClick={() => setIsPreviewOpen(false)} // يغلق المودال عند الضغط في أي مكان
                    >
                      {/* زر القفل X */}
                      <button
                        onClick={() => setIsPreviewOpen(false)}
                        className="absolute top-5 right-5 text-white cursor-pointer bg-gray-800/60 p-2 rounded-full hover:bg-gray-700 transition-all"
                      >
                        ✕
                      </button>

                      {/* الصورة الشخصية مكبرة */}
                      <img
                        src={userProfile?.photo}
                        alt={userProfile?.name || "Profile Picture"}
                        className="max-w-[90vw] max-h-[85vh] rounded-2xl object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()} // يمنع إغلاق المودال عند الضغط على الصورة نفسها
                      />
                    </div>
                  )}



                  {/* Name/info - a separate div next to the avatar */}
                  <div>
                    <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">
                      {userProfile?.name}
                    </h2>
                    <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">
                      @{userProfile?.username}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                      <Users size={12} />
                      Route Posts member
                    </span>
                  </div>
                </div>

                {/* Stats - own div, top right */}
                <div className="grid w-full grid-cols-3 gap-2 lg:w-130">
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Followers
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      {userProfile?.followersCount}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Following
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      {userProfile?.followingCount}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">
                      Bookmarks
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
                      {userProfile?.bookmarksCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* ---------- Second row: About (wide) + My Posts/Saved Posts (narrow) ---------- */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-4 mt-6">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-bold text-gray-900 mb-3">About</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Mail size={16} />
                    {userProfile?.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} />
                    Active on Route Posts
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      My Posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">
                      {myPosts.length}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">
                      Saved Posts
                    </p>
                    <p className="mt-1 text-2xl font-black text-slate-900">0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Tabs (separate card below, with a gap) ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm mb-4">
          <div className="grid w-full grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5 sm:inline-flex sm:w-auto sm:gap-0">
            <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition bg-white text-[#1877f2] shadow-sm">
              <FileText size={16} />
              My Posts
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition text-slate-600 hover:text-slate-900">
              <Bookmark size={16} />
              Saved
            </button>
          </div>
          <span className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-xs font-semibold">
            {myPosts.length}
          </span>
        </div>

        {/* ---------- Post card (reusing PostCard shape) ---------- */}
        {myPosts && myPosts.length > 0 ? (
          myPosts.map((post) => (
            <>
              <div className="bg-white rounded-2xl shadow-sm p-4 pb-0 mb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.user.photo}
                      alt="mohamed rabie"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="truncate text-sm font-extrabold text-slate-900">
                        {post.user.name}
                      </p>
                      <p className="truncate text-xs font-semibold text-slate-500">
                        @{post.user.username}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/postdetails/${post._id}`}
                    className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] transition hover:bg-[#e7f3ff]"
                  >
                    View details
                  </Link>
                </div>

                <p className="my-3 text-gray-800">{post.body}</p>
                {post.image && (
                  <>
                    <img
                      src={post.image}
                      alt={post.body}
                      className="max-h-105 w-full object-contain"
                    />
                  </>
                )}

                <div className="flex flex-col gap-2 border-t border-slate-200 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                  <div className="flex gap-3 lg:gap-6">
                    <span className="flex gap-1.5 items-center font-semibold">
                      <BiLike className="text-[#1877f2]" /> {post.likesCount}{" "}
                      likes
                    </span>
                    <span className="flex gap-1.5 items-center font-semibold">
                      <Repeat className="text-[#1877f2]" size={13} />{" "}
                      {post.sharesCount} shares
                    </span>
                    <span className="flex gap-1.5 items-center font-semibold">
                      <MessageCircle className="text-[#1877f2]" size={13} />{" "}
                      {post.commentsCount} comments
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
                      <Clock size={13} /> {timeAgo(post.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-12 text-center">
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
                <FileText size={26} />
              </div>
              <p className="text-base font-semibold text-gray-800">
                No posts yet
              </p>
              <p className="text-sm text-gray-400">
                Posts shared here will show up on this page
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
