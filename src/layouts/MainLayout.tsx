import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";

export default function MainLayout() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200/90 bg-white backdrop-blur">
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}
