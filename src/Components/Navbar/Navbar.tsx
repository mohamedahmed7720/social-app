import { Button, Dropdown, I18nProvider, Label } from "@heroui/react";
import routeSVG from "../../assets/route.svg";
import { LuHouse, LuList, LuMessageCircle, LuUser } from "react-icons/lu";
import { NavLink } from "react-router";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { userContext } from "../../Context/UserContext";
import { getUnreadCount } from "../../services/notifications.services";

export default function Navbar() {
  const { userData } = useContext(userContext)!;

  const { setToken } = useContext(AuthContext)!;

  const [Count, setCount] = useState<number | null>(null)

  function logoutUser() {
    localStorage.removeItem("Usertoken");
    setToken(null);
  }


  
  
  useEffect(() => {
    async function unreadCount() {
    try {
      const { data } = await getUnreadCount();
      setCount(data.data.unreadCount)
    } catch (error) {
      console.log(error);
    }
  }
    unreadCount()
  }, [])

  return (
    <>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-1.5 sm:gap-3 sm:px-3">
        <img src={routeSVG} alt="" className="w-17 lg:w-21" />

        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
          <NavLink
            to="/feed"
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900 active:bg-white active:text-[#1f6fe5]"
          >
            <LuHouse className="w-5 h-5" />
            <span className="hidden md:inline">Feed</span>
          </NavLink>
          <NavLink
            to="/profile"
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900 active:bg-white active:text-[#1f6fe5]"
          >
            <LuUser className="w-5 h-5" />
            <span className="hidden md:inline">Profile</span>
          </NavLink>
          <NavLink
            to="/notification"
            className="relative flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-extrabold transition sm:gap-2 sm:px-3.5 text-slate-600 hover:bg-white/90 hover:text-slate-900 active:bg-white active:text-[#1f6fe5]"
          >
            <div className="relative">
              <LuMessageCircle className="w-5 h-5" />
              {Count! > 0 && <>
              <span className="absolute -right-2 -top-2 inline-flex min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-black leading-4 text-white">
                {Count}
              </span>
              </>}

            </div>
            <span className="hidden md:inline">Notifications</span>
          </NavLink>
        </nav>

        <div className="nav-action">
          <I18nProvider locale="en-US">
            <Dropdown>
              {!userData ? (
                <>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 animate-pulse">
                    {/* avatar placeholder */}
                    <div className="w-7 h-7 rounded-full bg-gray-200" />

                    {/* name placeholder - hidden on small screens, same as the real button */}
                    <div className="hidden md:block h-4 w-16 bg-gray-200 rounded ms-1" />

                    {/* icon placeholder (stands in for LuList) */}
                    <div className="w-4 h-4 bg-gray-200 rounded ms-2" />
                  </div>
                </>
              ) : (
                <>
                  <Button
                    aria-label="Menu"
                    variant="secondary"
                    className={
                      "flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-5 transition hover:bg-slate-100 text-black"
                    }
                  >
                    <img
                      src={userData?.photo}
                      alt={userData?.name}
                      className="w-7 h-7 object-cover rounded-full"
                    />
                    <span className="hidden md:inline">{userData?.name}</span>
                    <LuList className="ms-2" />
                  </Button>
                </>
              )}
              <Dropdown.Popover placement="bottom end" className="rounded-xl">
                <Dropdown.Menu
                  onAction={(key) => console.log(`Selected: ${key}`)}
                >
                  <Dropdown.Item
                    href="/profile"
                    id="profile"
                    textValue="New file"
                    className="rounded-xl hover:bg-gray-50"
                  >
                    <Label>Profile</Label>
                  </Dropdown.Item>
                  <Dropdown.Item
                    id="setting"
                    textValue="Copy link"
                    className="rounded-xl hover:bg-gray-50"
                  >
                    <Label>Setting</Label>
                  </Dropdown.Item>

                  <Dropdown.Item
                    onClick={logoutUser}
                    id="logout"
                    textValue="Delete file"
                    variant="danger"
                    className="rounded-xl hover:bg-red-50"
                  >
                    <Label>Log out</Label>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          </I18nProvider>
        </div>
      </div>
    </>
  );
}
