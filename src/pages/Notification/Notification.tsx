import { Check, CheckCheck, Heart } from "lucide-react";
import {
  getNotifications,
  getUnreadCount,
  markNotificationAsRead,
} from "../../services/notifications.services";
import { useEffect, useState } from "react";
import type { notificationI } from "../../types/notifications";
import { Link } from "react-router";
import toast from "react-hot-toast";

export default function Notifications() {
  const [userNotification, setuserNotification] = useState<notificationI[]>([]);
  const [Count, setCount] = useState<number | null>(null)


  async function getAllNotifications() {
    try {
      const { data } = await getNotifications();
      setuserNotification(data.data.notifications);
    } catch (error) {
      toast.error("Error", error!)
    }
  }

  async function markNotification(id: string) {
    try {
      const { data } = await markNotificationAsRead(id);
      setuserNotification((prev) =>
        prev.map((notification) =>
          notification._id === id
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function unreadCount() {
    try {
      const { data } = await getUnreadCount();
      setCount(data.data.unreadCount)
    } catch (error) {
      toast.error("Error" , error!)
    }
  }

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

  useEffect(() => {
    getAllNotifications();
    unreadCount();
  }, []);

  return (
    <main className="py-12 min-h-screen bg-[#f0f2f5]">
      <div className=" max-w-7xl mx-auto py-6 px-4 bg-white rounded-2xl shadow-sm my-6 border border-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Notifications
          </h1>
          <button className="flex items-center gap-1.5 text-sm text-slate-900 font-bold bg-slate-50 hover:bg-slate-100 px-3 py-2 rounded-lg border border-slate-200 transition-all">
            <CheckCheck className="w-4 h-4 text-slate-600" />
            Mark all as read
          </button>
        </div>

        <p className="text-sm text-slate-600 mb-6">
          Realtime updates for likes, comments, shares, and follows.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-sm">
            All
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200">
            Unread
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-blue-100 text-blue-600">
              {Count}
            </span>
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {/* Unread Notification Item */}
          {userNotification && userNotification.length > 0 ? (
            userNotification.map((data) => (
              <div
                key={data._id}
                className={`relative p-4 rounded-2xl flex items-start justify-between gap-4 border bg-blue-50/60 border-blue-100/80 ${data.isRead && "bg-white"}`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={data.actor.photo}
                      alt={data.actor.name}
                      className="w-10 h-10 rounded-full bg-slate-200 object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 text-red-500 bg-white rounded-full p-0.5">
                      <Heart className="w-3.5 h-3.5 fill-red-500 stroke-red-500" />
                    </span>
                  </div>

                  {/* Content */}
                  <div className="space-y-1">
                    <p className="text-sm text-slate-800">
                      <Link
                        to={`/profile/${data.actor._id}`}
                        className="font-bold text-slate-900 hover:text-blue-600 hover:underline"
                      >
                        {data.actor.name}
                      </Link>{" "}
                      <span className="text-slate-600">{data.type}</span>
                    </p>
                    <p className="text-xs text-slate-500 font-normal">
                      {data.entity.body}
                    </p>

                    {data.isRead ? (
                     <span className="flex items-center gap-1 text-xs text-green-600">
                      <Check size={14} />
                      Read
                    </span>
                    ) : (
                       <button
                          onClick={() => {
                            markNotification(data._id);
                          }}
                          className={`flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 bg-white px-2.5 py-1 rounded-md border border-blue-200 shadow-2xs mt-2 transition-all hover:bg-blue-50 ${data.isRead && "bg-white"}`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          Mark as read
                        </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400">
                    {timeAgo(data.createdAt)}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-600 text-sm">
              No notifications found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}