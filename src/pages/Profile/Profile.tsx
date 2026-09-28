
import { useContext } from "react";
import { userContext } from "../../Context/UserContext";
import MyProfile from "./MyProfile";

function Profile() {
  const { userData } = useContext(userContext)!;

  return (
    <main className="min-h-screen bg-[#f0f2f5]">
      {!userData ? (
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
                      <div className="h-6 w-32 bg-gray-200 rounded-full mt-1" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 md:flex md:gap-4">
                    <div className="w-full md:w-32 h-20 bg-gray-100 border border-gray-100 rounded-xl" />
                    <div className="w-full md:w-32 h-20 bg-gray-100 border border-gray-100 rounded-xl" />
                    <div className="w-full md:w-32 h-20 bg-gray-100 border border-gray-100 rounded-xl" />
                  </div>
                </div>

                {/* Second row: About + My Posts/Saved Posts */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-4 mt-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="h-4 w-16 bg-gray-200 rounded mb-4" />
                    <div className="h-4 w-48 bg-gray-200 rounded mb-2" />
                    <div className="h-4 w-40 bg-gray-200 rounded" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 h-20" />
                    <div className="bg-gray-50 rounded-xl p-4 h-20" />
                  </div>
                </div>
              </div>
            </div>

            {/* ---------- Tabs skeleton ---------- */}
            <div className="flex items-center justify-between bg-gray-100 rounded-2xl p-1.5 mt-6 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="h-9 w-28 bg-gray-200 rounded-xl" />
                <div className="h-9 w-24 bg-gray-200 rounded-xl" />
              </div>
              <div className="w-7 h-7 bg-gray-200 rounded-full mr-2" />
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
        <MyProfile/>
      )}
    </main>
  );
}

export default Profile;
