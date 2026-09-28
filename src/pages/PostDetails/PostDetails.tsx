import {
  ThumbsUp,
  MessageCircle,
  Share2,
  ArrowLeft,
  Globe,
  Pen,
} from "lucide-react";
import { Link, useParams } from "react-router";
import { deletePost, getSinglePost, likeAndUnlike } from "../../services/Posts.services";
import { useContext, useEffect, useState } from "react";
import type { PostCardI } from "../../types/postCard";
import PostSkeleton from "../../Components/Post/PostSkeleton";
import {
  deleteComments,
  getPostComments,
} from "../../services/comment.services";
import type { postCommentI } from "../../types/postComment";
import PostComment from "../../Components/Post/PostComment";
import { BsThreeDots } from "react-icons/bs";
import { AlertDialog, Dropdown, I18nProvider, Label } from "@heroui/react";
import { Button } from "react-aria-components";
import { BiTrash } from "react-icons/bi";
import { userContext } from "../../Context/UserContext";
import EditComment from "../../Components/Post/EditComment";
import { useNavigate } from "react-router";
import EditPost from "../../Components/Post/EditPost";

export default function PostDetails({
  refetchPosts,
}: {
  refetchPosts: () => void;
}) {
  const [postDetails, setPostDetails] = useState<PostCardI | null>(null);
  const [postComment, setpostComment] = useState<postCommentI[] | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [deleteCommentId, setdeleteCommentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] = useState<boolean>(false);
  const [showEditPost, setShowEditPost] = useState<boolean>(false);

  const navigate = useNavigate();

  async function deleteUserPost() {
    try {
      setIsLoading(true);
      if (!postDetails?._id) return;
      const { data } = await deletePost(postDetails?._id as string);
      console.log(data);
      setShowAlertDialog(false);
      navigate("/feed");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


    async function likePost() {
    try {
      setIsLoading(true);
      const { data } = await likeAndUnlike(postDetails?._id as string);
      console.log(data);
      setShowAlertDialog(false);
      getPostDetails(postId!)
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }


  const { postId } = useParams<{ postId: string }>();
  console.log(postId);

  const { userData } = useContext(userContext)!;

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

  async function getComments(postId: string | void) {
    const { data } = await getPostComments(postId!);
    const comments: postCommentI[] = data.data.comments;
    setpostComment(comments);
    console.log(comments);
  }

  async function deleteComment(postId: string, commentId: string) {
    try {
      setIsLoading(true);
      const { data } = await deleteComments(postId, commentId);
      setdeleteCommentId(null);
      console.log(data);

      getComments(postId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getPostDetails(id: string) {
    try {
      const { data } = await getSinglePost(id);
      const details: PostCardI = data.data.post;
      setShowAlertDialog(false);
      setPostDetails(details);
      refetchPosts();
      console.log(details);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (postId) {
      getPostDetails(postId);
      getComments(postId);
    }
  }, [postId]);

  return (
    <>
      <main className="py-20 min-h-screen bg-[#f0f2f5]">
        {postDetails ? (
          <div className="w-full max-w-6xl mx-auto px-3">
            {/* ---------- Back button (outside the card) ---------- */}
            <Link
              to={"/feed"}
              className="flex w-fit items-center gap-2 mb-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 bg-white py-1.5 px-3 rounded-lg"
            >
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back</span>
            </Link>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* ---------- Header (same as PostCard) ---------- */}
              <div className="flex items-start justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-3">
                  <img
                    src={postDetails.user.photo}
                    alt={postDetails.user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900 leading-tight">
                      {postDetails.user.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs lg:text-sm text-gray-500 leading-tight">
                        @{postDetails.user.username}
                      </p>
                      <p className="text-xs text-slate-500 leading-tight">
                        {timeAgo(postDetails.createdAt)}
                      </p>
                      <span className="text-[10px] lg:text-xs text-slate-500 leading-tight">
                        •
                      </span>
                      <span className="text-[10px] lg:text-xs text-slate-500 leading-tight flex gap-1 items-center">
                        <Globe className="w-3" />
                        {postDetails.privacy}
                      </span>
                    </div>
                  </div>
                </div>

                {userData?._id == postDetails.user._id && (
                  <>
                    <I18nProvider locale="en-US">
                      <Dropdown>
                        <Button
                          aria-label="Menu"
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
                                This post will be permanently removed from your
                                profile and feed.
                              </p>
                            </AlertDialog.Body>
                            <AlertDialog.Footer>
                              <Button
                                onClick={() => {
                                  setShowAlertDialog(false);
                                }}
                                slot="close"
                                className={
                                  "rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold bg-white text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                }
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={deleteUserPost}
                                slot="close"
                                className={
                                  "rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
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

              {/* ---------- Post text ---------- */}
              {showEditPost ? (
                <>
                  <EditPost
                    post={postDetails}
                    setShowEditPost={setShowEditPost}
                    refetchPosts={() => {
                      getPostDetails(postId!);
                    }}
                  />
                </>
              ) : (
                <>
                  <p className="px-4 pb-3 text-gray-800">{postDetails?.body}</p>
                  {/* ---------- Image ---------- */}
                  {postDetails.image && (
                    <>
                      <img
                        src={postDetails.image}
                        alt={postDetails.body}
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
                  <span>{postDetails.likesCount} likes</span>
                </div>

                <div className="flex items-center gap-3">
                  <span>{postDetails.sharesCount} shares</span>
                  <span>{postDetails.commentsCount} comments</span>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* ---------- Action bar ---------- */}
              <div className="flex items-center justify-around py-1">
                <button onClick={likePost} className={`flex items-center gap-2 flex-1 justify-center py-2 rounded-md transition-colors text-blue-600 ${postDetails.likes.includes(userData?._id as string) ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : "hover:bg-gray-100 text-gray-600"}`}>
                  <ThumbsUp size={18} />
                  <span className="font-medium text-sm">Like</span>
                </button>

                <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600">
                  <MessageCircle size={18} />
                  <span className="font-medium text-sm">Comment</span>
                </button>

                <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded-md hover:bg-gray-100 transition-colors text-gray-600">
                  <Share2 size={18} />
                  <span className="font-medium text-sm">Share</span>
                </button>
              </div>

              <hr className="border-gray-200" />

              {/* ---------- Comments list (same shape as TopComment) ---------- */}
              <div className="flex flex-col gap-3 border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
                {postComment && postComment?.length ? (
                  postComment?.map((comment) => (
                    <div key={comment._id} className="flex gap-2 px-4">
                      <img
                        src={comment.commentCreator.photo}
                        alt={comment.commentCreator.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <div className="bg-[#f0f2f5] rounded-2xl px-4 py-3 inline-block ">
                            <p className="font-bold text-xs text-gray-900 leading-tight">
                              {comment.commentCreator.name}
                            </p>
                            <p className="text-[10px] text-gray-500 leading-tight">
                              @{comment.commentCreator.username}
                            </p>

                            {editingCommentId === comment._id ? (
                              <EditComment
                                comment={comment}
                                setShowEditComment={() => {
                                  setEditingCommentId(null);
                                }}
                                id={postId!}
                                commentId={comment._id}
                                refetchComment={() => getComments(postId)}
                              />
                            ) : (
                              <>
                                <p className="text-sm text-gray-800 mt-1">
                                  {comment.content}
                                </p>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 px-3 text-xs text-gray-500">
                            <span>
                              {new Date(comment.createdAt).toLocaleString(
                                "en-un",
                                {
                                  timeStyle: "short",
                                  dateStyle: "short",
                                },
                              )}
                            </span>
                            <button className="font-semibold hover:underline">
                              Like
                            </button>
                            <button className="font-semibold hover:underline">
                              Reply
                            </button>
                            {comment.likes.length > 0 && (
                              <>
                                <span className="flex items-center gap-1 ml-auto">
                                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white">
                                    <ThumbsUp size={9} fill="white" />
                                  </span>
                                  {comment.likes.length}
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        {userData?._id == comment.commentCreator._id && (
                          <>
                            <I18nProvider locale="en-US">
                              <Dropdown>
                                <Button
                                  aria-label="Menu"
                                  className="rounded-full p-3 hover:bg-gray-50"
                                >
                                  <BsThreeDots className="text-black cursor-pointer" />
                                </Button>
                                <Dropdown.Popover
                                  className="rounded-xl min-w-40 absolute right-0 z-20 mt-2 w-44 overflow-hidden border border-slate-200 bg-white py-1 shadow-lg"
                                  placement="bottom end"
                                >
                                  <Dropdown.Menu>
                                    <Dropdown.Item
                                      id="edit-comment"
                                      textValue="edit comment"
                                      className="rounded-xl hover:bg-gray-50"
                                      onClick={() => {
                                        setEditingCommentId(comment._id);
                                      }}
                                    >
                                      <Pen className="size-4 -me-1" />
                                      <Label className="text-xs">Edit</Label>
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                      id="delete-comment"
                                      textValue="Delete comment"
                                      variant="danger"
                                      className="rounded-xl hover:bg-red-50 flex items-center"
                                      onClick={() => {
                                        setdeleteCommentId(comment._id);
                                      }}
                                    >
                                      <BiTrash className="size-4 -me-1 text-red-500" />
                                      <Label className="text-xs">Delete</Label>
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown.Popover>
                              </Dropdown>
                            </I18nProvider>

                            {deleteCommentId === comment._id && (
                              <>
                                <AlertDialog isOpen>
                                  <AlertDialog.Backdrop className="bg-black/50 backdrop-blur-xs">
                                    <AlertDialog.Container>
                                      <AlertDialog.Dialog
                                        data-placement="center"
                                        className="sm:max-w-100 rounded-2xl"
                                      >
                                        <AlertDialog.CloseTrigger
                                          onClick={() => {
                                            setdeleteCommentId(null);
                                          }}
                                        />
                                        <AlertDialog.Header>
                                          <AlertDialog.Icon status="danger" />
                                          <AlertDialog.Heading className="font-bold">
                                            Delete this comment?
                                          </AlertDialog.Heading>
                                        </AlertDialog.Header>
                                        <AlertDialog.Body>
                                          <p className="-mt-2 text-gray-700">
                                            This comment will be permanently
                                            removed.
                                          </p>
                                        </AlertDialog.Body>
                                        <AlertDialog.Footer>
                                          <Button
                                            onClick={() => {
                                              setdeleteCommentId(null);
                                            }}
                                            slot="close"
                                            className={
                                              "rounded-lg border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                            }
                                          >
                                            Cancel
                                          </Button>
                                          <Button
                                            onClick={() => {
                                              deleteComment(
                                                postId!,
                                                comment._id,
                                              );
                                            }}
                                            isDisabled={isLoading}
                                            slot="close"
                                            className={
                                              "rounded-lg bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                                            }
                                          >
                                            {isLoading
                                              ? "Deleting comment..."
                                              : "Delete Comment"}
                                          </Button>
                                        </AlertDialog.Footer>
                                      </AlertDialog.Dialog>
                                    </AlertDialog.Container>
                                  </AlertDialog.Backdrop>
                                </AlertDialog>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center">
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#eef3ff] text-[#1877f2]">
                      <MessageCircle size={22} />
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      No comments yet
                    </p>
                    <p className="text-xs text-gray-400">
                      Be the first to comment on this post
                    </p>
                  </div>
                )}
                {/* ---------- Comment Input ---------- */}
                <PostComment
                  postId={postId!}
                  refetchPosts={() => {
                    getComments(postId);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <PostSkeleton />
        )}
      </main>
    </>
  );
}
