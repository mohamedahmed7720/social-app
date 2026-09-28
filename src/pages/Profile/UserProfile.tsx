import {
  Repeat,
  MessageCircle,
  Clock,
  ArrowLeft,
  Check,
  UserPlus,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";

import { getUserProfile } from "../../services/profile.services";
import { Link, useParams } from "react-router";
import type { IUserData } from "../../types/profileData";
import { followAndUnfollowUser } from "../../services/newsfeed.services";
import { getUserPosts } from "../../services/Posts.services";
import type { PostCardI } from "../../types/postCard";
import toast from "react-hot-toast";

export default function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [follow, setfollow] = useState<string | null>(null);
  const [userPost, setUserPost] = useState<PostCardI[]>([]);

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

  async function userPosts(id: string) {
    try {
      const { data } = await getUserPosts(id);
      const posts = data.data.posts;
      setUserPost(posts);
    } catch (error) {
      toast.error("Error", error!)
    }
  }

  async function followUser(id: string) {
    try {
      setIsLoading(true);
      const { data } = await followAndUnfollowUser(id);
      setfollow(data.data.following);
    } catch (error) {
      toast.error("Error", error!)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function userProfile(id: string) {
      try {
        const { data } = await getUserProfile(id);
        const details = data.data.user;
        setProfile(details);
      } catch (error) {
        toast.error("Error", error!)
      }
    }
    if (userId) {
      userProfile(userId);
      userPosts(userId);
    }
  }, [userId]);

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      {!profile ? (
        <>
          <div className="max-w-7xl mx-auto px-4 py-18 lg:py-21">
            {/* ---------- Cover + Profile card ---------- */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
              {/* Cover photo */}
              <div className="h-32 md:h-44 bg-gray-200" />

              {/* White card overlapping the cover */}
              <div className="relative -mt-16 mx-4 rounded-2xl bg-white shadow-sm px-4 md:px-8 pt-6 pb-8">
                {/* Top row: avatar + name/info + stats */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col items-center md:flex-row gap-4">
                    {/* Avatar */}
                    <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-200 shrink-0" />

                    {/* Name/info */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                      <div className="h-6 w-40 bg-gray-200 rounded" />
                      <div className="h-4 w-24 bg-gray-200 rounded" />
                    </div>
                  </div>
                  <div className="h-6 w-50 mx-auto bg-gray-200 rounded mt-3" />
                </div>
              </div>
            </div>

            {/* ---------- Post card skeleton ---------- */}
            <div className="bg-white rounded-2xl shadow-sm p-4 mt-4 animate-pulse">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-28 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mt-4" />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 py-18 lg:py-21 ">
            {/* ---------- Cover + Profile card ---------- */}
            <Link
              to={"/feed"}
              className="flex w-fit items-center gap-2 mb-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-white py-1.5 px-3 rounded-lg"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </Link>
            <div>
              {/* ---------- Cover + Profile card ---------- */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-sm mb-6">
                {/* Cover photo */}
                <div className="group/cover relative h-44 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)] sm:h-52 lg:h-60" />

                {/* ---------- White card overlapping the cover ---------- */}
                <div className="relative -mt-12 lg:-mt-16 mx-3 lg:mx-8 rounded-3xl bg-white/99 px-8 pt-6 pb-8">
                  {/* ---------- Top row: avatar (own div) + name/info (own div) + stats (own div) ---------- */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                    <div className="flex lg:items-center gap-4 ">
                      {/* Avatar - its own div */}
                      <div className="-mt-3 lg:mt-0">
                        <img
                          src={profile?.photo}
                          alt={profile?.name}
                          className="h-20 w-20 sm:h-28 sm:w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                        />
                      </div>

                      {/* Name/info - a separate div next to the avatar */}
                      <div>
                        <h2 className="truncate text-xl font-black tracking-tight text-slate-900 sm:text-3xl">
                          {profile?.name}
                        </h2>
                        <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-lg">
                          @{profile?.username}
                        </p>
                      </div>
                    </div>

                    {follow ? (
                      <>
                        {isLoading ? (
                          <>
                            <button
                              onClick={() => {
                                followUser(profile._id);
                              }}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            >
                              <Check size={16} />
                              Updating...
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                followUser(profile._id);
                              }}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                            >
                              <Check size={16} />
                              following
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        {isLoading ? (
                          <>
                            <button
                              onClick={() => {
                                followUser(profile._id);
                              }}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto bg-[#1877f2] text-white hover:bg-[#166fe5]"
                            >
                              <UserPlus size={16} />
                              Updating...
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => {
                                followUser(profile._id);
                              }}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-extrabold transition sm:w-auto bg-[#1877f2] text-white hover:bg-[#166fe5]"
                            >
                              <UserPlus size={16} />
                              follow
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Post card (reusing PostCard shape) ---------- */}
            {userPost && userPost.length > 0 ? (
              userPost.map((post) => (
                <>
                  <div
                    key={post._id}
                    className="bg-white rounded-2xl shadow-sm p-4 pb-0 mb-3"
                  >
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
                          className="w-full max-h-150 object-cover"
                        />
                      </>
                    )}

                    <div className="flex flex-col gap-2 border-t border-slate-200 py-3 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                      <div className="flex gap-3 lg:gap-6">
                        <span className="flex gap-1.5 items-center font-semibold">
                          <BiLike className="text-[#1877f2]" />{" "}
                          {post.likesCount} likes
                        </span>
                        <span className="flex gap-1.5 items-center font-semibold">
                          <Repeat className="text-[#1877f2]" size={13} />{" "}
                          {post.sharesCount}
                          shares
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
        </>
      )}
    </main>
  );
}
