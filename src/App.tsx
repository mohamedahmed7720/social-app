
import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { RouterProvider } from "react-router/dom";
import NewsFeed from "./pages/NewsFeed/NewsFeed";
import Profile from "./pages/Profile/Profile";
import Notification from "./pages/Notification/Notification";
import Notfound from "./pages/Notfound/Notfound";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import { Toaster } from "react-hot-toast";
import AppProtectedRoutes from "./Components/ProtectedRoutes/AppProtectedRoutes";
import AuthProtectedRoutes from "./Components/ProtectedRoutes/AuthProtectedRoutes";
import PostDetails from "./pages/PostDetails/PostDetails";
import UserProfile from "./pages/Profile/UserProfile";
import { getSinglePost } from "./services/Posts.services";

export default function App() {

  const router = createBrowserRouter([

    {path: "/auth" , element: <AuthProtectedRoutes><AuthLayout/></AuthProtectedRoutes> , children: [
      {index: true , element: <Navigate to={"login"}/>},
      {path: "login" , element: <Login/>},
      {path: "register" , element: <Register/>},
    ]},
    {path: "" , element: <AppProtectedRoutes><MainLayout/></AppProtectedRoutes> , children: [
      {index: true , element: <Navigate to={"/feed"}/>},
      {path: "/feed" , element: <NewsFeed/>},
      {path: "/profile" , element: <Profile/>},
      {path: `/profile/:userId` , element: <UserProfile/>},
      {path: "/notification" , element: <Notification/>},
      {path: "/postdetails/:postId" , element: <PostDetails refetchPosts={() => {getSinglePost}}/>},
    ]},
    {path: "*" , element: <Notfound/>},
  ])

  return (
    <>
    <Toaster />
    <RouterProvider router={router}/>
    </>
  )
}
