import { Outlet } from "react-router";
import AuthIntro from "../Components/AuthIntro/AuthIntro";


export default function AuthLayout() {
  return (
    <>
      <main className="bg-[#F0F2F5] min-h-screen flex justify-around items-center">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 w-full max-w-6xl m-4 items-center">
          <div className="lg:col-span-3 order-2 lg:order-1">
            <AuthIntro />
          </div>
          <div className="lg:col-span-2 order-1 lg:order-2">
            <Outlet/>
          </div>
        </div>
      </main>
    </>
  )
}
