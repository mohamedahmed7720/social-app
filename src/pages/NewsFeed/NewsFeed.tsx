import { useEffect, useState } from "react";
import PostCard from "../../Components/Post/PostCard";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SuggestionsSidebar from "../../Components/SuggestionSidebar/SuggestionSidebar";
import { getNewsFeed } from "../../services/newsfeed.services";
import type { PostCardI } from "../../types/postCard";
import PostSkeleton from "../../Components/Post/PostSkeleton";
import AddPost from "../../Components/Post/AddPost";
import toast from "react-hot-toast";

export default function NewsFeed() {
  const [posts, setPosts] = useState<PostCardI[]>([]);

  async function getPosts() {
    try {
      const { data } = await getNewsFeed();
      const posts: PostCardI[] = data.data.posts;
      setPosts(posts);
    } catch (error) {
      toast.error("Error", error!)
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <main className=" min-h-screen bg-[#f0f2f5]">
      <div className="py-18 lg:py-21 px-3 max-w-7xl mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_300px] gap-4">
          <div className="order-1 lg:sticky top-22 self-start">
            <Sidebar />
          </div>
          <div className="order-3 lg:order-2 lg:-mt-2">
            <AddPost refetchPosts={getPosts}/>
            {posts && posts.length > 0 ? (
              posts.map((post) => <PostCard key={post._id} post={post} refetchPosts={getPosts}/>)
            ) : (
                <PostSkeleton />
            )}
          </div>
          <div className="lg:sticky top-22 self-start order-2 lg:order-3">
            <SuggestionsSidebar/>
          </div>
        </div>
      </div>
    </main>
  );
};