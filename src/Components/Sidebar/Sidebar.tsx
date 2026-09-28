import { useState } from "react";
import { Newspaper, Sparkles, Globe, Bookmark } from "lucide-react";

const items = [
  { label: "Feed", icon: Newspaper },
  { label: "My Posts", icon: Sparkles },
  { label: "Community", icon: Globe },
  { label: "Saved", icon: Bookmark },
];

export default function Sidebar() {
  const [active, setActive] = useState("Feed");

  return (
    <div className="grid grid-cols-2 lg:flex lg:flex-col rounded-2xl gap-1.5 border border-slate-200 bg-white p-3 shadow-sm">
      {items.map((item) => (
        <button
          key={item.label}
          onClick={() => setActive(item.label)}
          className={
            item.label === active
              ? "flex w-full justify-center lg:justify-start items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]"
              : "mt-1 flex w-full justify-center lg:justify-start items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 bg-slate-50 lg:bg-white hover:bg-slate-100"
          }
        >
          <item.icon size={17} />
          {item.label}
        </button>
      ))}
    </div>
  );
}
