export default function PostSkeleton() {
  return (
    <>
      {[0, 1, 2].map((id) => {
        return (
            <div key={id} className="bg-white max-w-5xl mx-auto rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse mb-3">
              {/* ---------- Header ---------- */}
              <div className="flex items-start justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex flex-col gap-2">
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>

              {/* ---------- Post text ---------- */}
              <div className="px-4 pb-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
              </div>

              {/* ---------- Image ---------- */}
              <div className="w-full h-72 bg-gray-200" />

              {/* ---------- Stats row ---------- */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="flex items-center gap-3">
                  <div className="h-4 w-12 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                  <div className="h-4 w-16 bg-gray-200 rounded" />
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* ---------- Action bar ---------- */}
              <div className="flex items-center justify-around py-3">
                <div className="h-4 w-14 bg-gray-200 rounded" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-4 w-14 bg-gray-200 rounded" />
              </div>
            </div>
        );
      })}
    </>
  );
}
