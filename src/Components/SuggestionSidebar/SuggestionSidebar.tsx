import { Users, Search, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { followAndUnfollowUser, getSuggestedFriends } from "../../services/newsfeed.services";
import type { friendsI } from "../../types/suggestedFriends";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function SuggestionsSidebar() {
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [friends, setFriends] = useState<friendsI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingId, setIsLoadingId] = useState<string | null>(null);

  async function followUser(id: string) {
    try {
      setIsLoadingId(id)
      const {data} = await followAndUnfollowUser(id)
      setFriends((prevFriends) => prevFriends.filter((friend) => friend._id !== id))
      console.log(data);

    } catch (error) {
      toast.error("Error", error!)
    } finally {
      setIsLoadingId(null)
    }
  }

  useEffect(() => {
    async function getAllSuggestedFriends() {
      try {
        setIsLoading(true);
        
        const { data } = await getSuggestedFriends();
        const suggestedFriends = data.data.suggestions;
        setFriends(suggestedFriends);
        console.log(suggestedFriends);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  getAllSuggestedFriends();
  }, []);


  return (
    <div className="rounded-2xl bg-white p-3 lg:p-5 shadow-lg">
      {/* header */}
      <div className=" lg:mb-4 flex items-center gap-3">
        <Users size={20} className="text-blue-500" />
        <h2 className="flex-1 text-base font-bold text-slate-900">
          Suggested Friends
        </h2>
        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-600">
          {friends.length}
        </span>
        <span
          className="inline lg:hidden text-xs cursor-pointer font-bold text-[#1877f2]"
          onClick={() => setIsSuggestionOpen(!isSuggestionOpen)}
        >
          {isSuggestionOpen ? "hide" : "show"}
        </span>
      </div>

      {/* search */}
      <div
        className={`relative my-3 ${isSuggestionOpen ? "block" : "hidden"} lg:block`}
      >
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          placeholder="Search friends..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm placeholder:text-slate-400"
        />
      </div>

      {/* list */}
      <div
        className={`space-y-3 relative mb-3 ${isSuggestionOpen ? "block" : "hidden"} lg:block`}
      >
        {isLoading ? (
          <>
            <div className="flex flex-col gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex flex-col gap-3 p-4 border border-slate-200 rounded-xl bg-white animate-pulse"
                >
                  {/* الجزء العلوي: الصورة والمعلومات وزر المتابعة */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* صورة البروفايل */}
                      <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />

                      {/* الاسم والـ Username */}
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-20 bg-slate-200 rounded-md" />
                        <div className="h-3 w-18 bg-slate-200 rounded-md" />
                      </div>
                    </div>

                    {/* زر Follow */}
                    <div className="h-9 w-15 bg-slate-200 rounded-full" />
                  </div>

                  <div className="h-7 w-28 bg-slate-100 rounded-full mt-1" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {friends.map((friend) => (
              <div
                key={friend._id}
                className="rounded-xl border border-slate-200 p-3"
              >
                <Link to={`/profile/${friend._id}`} className="flex items-center gap-3">
                  <img
                    src={friend.photo}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-600"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-slate-900">
                      {friend.name}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      @{friend.username}
                    </p>
                  </div>

                  <button key={friend._id} disabled={isLoadingId === friend._id} onClick={() => {followUser(friend._id)}} className={`flex shrink-0 items-center gap-1 rounded-2xl bg-blue-50 px-2.5 py-1.5 text-xs font-bold text-blue-500 hover:bg-blue-100 cursor-pointer`}>
                    <UserPlus size={13} />
                    {isLoadingId == friend._id ? 'updating...' : 'Follow'}
                  </button>
                </Link>

                <span className="mt-3 inline-block rounded-xl bg-slate-100 px-2 py-1 text-[11px]  font-semibold text-slate-500">
                  {friend.followersCount} followers
                </span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* footer */}
      <button
        className={` w-full rounded-xl border border-slate-200 bg-slate-50 py-2 text-sm font-bold text-slate-800 hover:bg-slate-100  ${isSuggestionOpen ? "block" : "hidden"} lg:block`}
      >
        View more
      </button>
    </div>
  );
}
