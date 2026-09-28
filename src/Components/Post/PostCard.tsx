import { ThumbsUp, MessageCircle, Share2, Globe, Pen } from "lucide-react";
import type { PostCardI } from "../../types/postCard";
import { Link } from "react-router";
import { BsThreeDots } from "react-icons/bs";
import { AlertDialog, Button, Dropdown, Label } from "@heroui/react";
import { useContext, useState } from "react";
import { userContext } from "../../Context/UserContext";
import { I18nProvider } from "@react-aria/i18n";
import { BiTrash } from "react-icons/bi";
import EditPost from "./EditPost";
import { deletePost, likeAndUnlike } from "../../services/Posts.services";
import toast from "react-hot-toast";

export default function PostCard({
  post,
  refetchPosts,
}: {
  post: PostCardI;
  refetchPosts: () => void;
}) {
  const { userData } = useContext(userContext)!;

  const [showEditPost, setShowEditPost] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  async function deleteUserPost() {
    try {
      setIsLoading(true);
      const { data } = await deletePost(post._id);
      console.log(data);
      setShowAlertDialog(false);
      refetchPosts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function likePost() {
    try {
      setIsLoading(true);
      const { data } = await likeAndUnlike(post._id);
      console.log(data);
      setShowAlertDialog(false);
      refetchPosts();
    } catch (error) {
      toast.error("Error", error!)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm mb-3 border border-gray-200 overflow-hidden">
      {/* ---------- Header ---------- */}
      <div className="flex items-start justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.user.photo}
            alt={post.user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <Link
              to={`/profile/${post.user._id}`}
              className="font-semibold text-gray-900 leading-tight hover:underline"
            >
              {post.user.name}
            </Link>
            <div className="flex items-center gap-2">
              <p className="text-xs lg:text-sm text-gray-500 leading-tight truncate max-w-30">
                @{post.user.username}
              </p>
              <p className="text-[10px] lg:text-xs text-slate-500 leading-tight">
                {timeAgo(post.createdAt)}
              </p>
              <span className="text-[10px] lg:text-xs text-slate-500 leading-tight">
                •
              </span>
              <span className="text-[10px] lg:text-xs text-slate-500 leading-tight flex gap-1 items-center">
                <Globe className="w-3" />
                {post.privacy}
              </span>
            </div>
          </div>
        </div>

        {userData?._id == post.user._id && (
          <>
            <I18nProvider locale="en-US">
              <Dropdown>
                <Button
                  aria-label="Menu"
                  variant="ghost"
                  className="rounded-full p-3 hover:bg-gray-50"
                >
                  <BsThreeDots className="text-black cursor-pointer" />
                </Button>
                <Dropdown.Popover
                  className="rounded-xl min-w-43 absolute right-0 z-20 mt-2 w-44 overflow-hidden border border-slate-200 bg-white py-1 shadow-lg"
                  placement="bottom end"
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      id="edit-post"
                      textValue="edit post"
                      className="rounded-xl hover:bg-gray-50"
                      onClick={() => {
                        setShowEditPost(true);
                      }}
                    >
                      <Pen className="size-4 -me-1" />
                      <Label className="text-sm">Edit post</Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="delete-post"
                      textValue="Delete post"
                      variant="danger"
                      className="rounded-xl hover:bg-red-50"
                      onClick={() => {
                        setShowAlertDialog(true);
                      }}
                    >
                      <BiTrash className="size-4 -me-1 text-red-500" />
                      <Label className="text-sm">Delete post</Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            </I18nProvider>

            <AlertDialog isOpen={showAlertDialog}>
              <AlertDialog.Backdrop className="bg-black/50 backdrop-blur-xs">
                <AlertDialog.Container>
                  <AlertDialog.Dialog
                    data-placement="center"
                    className="sm:max-w-100 rounded-2xl"
                  >
                    <AlertDialog.CloseTrigger
                      onClick={() => {
                        setShowAlertDialog(false);
                      }}
                    />
                    <AlertDialog.Header>
                      <AlertDialog.Icon status="danger" />
                      <AlertDialog.Heading className="font-bold">
                        Delete this post?
                      </AlertDialog.Heading>
                    </AlertDialog.Header>
                    <AlertDialog.Body>
                      <p className="text-gray-600 text-sm -mt-2">
                        This post will be permanently removed from your profile
                        and feed.
                      </p>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                      <Button
                        onClick={() => {
                          setShowAlertDialog(false);
                        }}
                        slot="close"
                        variant="tertiary"
                        className={
                          "rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold bg-white text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={deleteUserPost}
                        slot="close"
                        variant="danger"
                        className={
                          "rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70"
                        }
                      >
                        {isLoading ? "Deleting post..." : "Delete Post"}
                      </Button>
                    </AlertDialog.Footer>
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog>
          </>
        )}
      </div>

      {showEditPost ? (
        <EditPost
          post={post}
          setShowEditPost={setShowEditPost}
          refetchPosts={refetchPosts}
        />
      ) : (
        <>
          {/* ---------- Post text ---------- */}
          <p className="px-4 pb-3 text-gray-800">{post.body}</p>

          {/* ---------- Image ---------- */}
          {post.image && (
            <>
              <img
                src={post.image}
                alt={post.body}
                className="w-full max-h-105 object-cover"
              />
            </>
          )}
        </>
      )}

      {/* ---------- Stats row ---------- */}
      <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white">
            <ThumbsUp size={12} fill="white" />
          </span>
          <span>{post.likesCount} likes</span>
        </div>

        <div className="flex items-center gap-3">
          <span>{post.sharesCount} shares</span>
          <span>{post.commentsCount} comments</span>
          <Link
            to={`/postdetails/${post.id}`}
            className="text-blue-600 font-medium hover:underline"
          >
            View details
          </Link>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* ---------- Action bar ---------- */}
      <div className="flex items-center justify-around py-1">
        <button
          onClick={likePost}
          className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-md transition-colors cursor-pointer
          ${post.likes.includes(userData?._id as string) ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "hover:bg-gray-100 text-gray-600"}`}
        >
          <ThumbsUp size={18} />
          <span className="font-medium text-sm">Like</span>
        </button>

        <Link
          to={`/postdetails/${post._id}`}
          className="flex items-center gap-2 flex-1 justify-center py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600"
        >
          <MessageCircle size={18} />
          <span className="font-medium text-sm">Comment</span>
        </Link>

        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600 cursor-pointer">
          <Share2 size={18} />
          <span className="font-medium text-sm">Share</span>
        </button>
      </div>
      {post.topComment && (
        <>
          <div className="mx-4 mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
              top comment
            </p>
            <div className="w-full max-w-xl mx-auto flex gap-2 px-4 py-2">
              {/* ---------- Avatar ---------- */}
              <img
                src={post.topComment.commentCreator.photo}
                alt={post.topComment.commentCreator.name}
                className="w-8 h-8 rounded-full object-cover"
              />

              {/* ---------- Comment bubble + actions ---------- */}
              <div className="flex-1">
                <div className="w-full rounded-2xl px-3 py-2 inline-block min-w-0 flex-1 bg-white ">
                  <p className="font-bold text-xs text-gray-900 leading-tight">
                    {post.topComment.commentCreator.name}
                  </p>
                  <p className="text-[10px] text-gray-500 leading-tight">
                    @{post.topComment.commentCreator.username}
                  </p>
                  <p className="text-sm text-gray-800 mt-2">
                    {post.topComment.content}
                  </p>
                </div>

                {/* ---------- Meta row: time, like, reply, like count ---------- */}
                <div className="flex items-center gap-3 mt-1 px-3 text-xs text-gray-500">
                  <span>
                    {new Date(post.topComment.createdAt).toLocaleString(
                      "en-us",
                      {
                        dateStyle: "short",
                        timeStyle: "short",
                      },
                    )}
                  </span>
                  <button className="font-semibold hover:underline">
                    Like
                  </button>
                  <button className="font-semibold hover:underline">
                    Reply
                  </button>

                  {post.topComment.likes.length > 0 && (
                    <>
                      <span className="flex items-center gap-1 ml-auto">
                        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white">
                          <ThumbsUp size={9} fill="white" />
                        </span>
                        {post.topComment.likes.length}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
