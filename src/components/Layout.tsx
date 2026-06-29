import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Zap, BookmarkCheck } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useShortlistStore } from "@/store/shortlistStore";
import { ShortlistDrawer } from "./ShortlistDrawer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const { profiles, toggleDrawer } = useShortlistStore();
  const count = profiles.length;

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#18181b",
            color: "#fafafa",
            fontSize: "14px",
          },
        }}
      />

      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-gray-900 hover:opacity-80 transition-opacity"
          >
            <Zap className="w-5 h-5 text-violet-600" aria-hidden />
            <span>Wobb</span>
            <span className="text-gray-400 font-normal text-sm hidden sm:inline">
              / Influencer Search
            </span>
          </Link>

          <button
            onClick={toggleDrawer}
            aria-label={`Open shortlist, ${count} profile${count !== 1 ? "s" : ""} selected`}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-700 font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
          >
            <BookmarkCheck className="w-4 h-4" aria-hidden />
            <span className="hidden sm:inline">Shortlist</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center font-bold">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {title && (
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        )}
        {children}
      </main>

      <ShortlistDrawer />
    </div>
  );
}
