import { X, Trash2, ExternalLink, Users } from "lucide-react";
import { useShortlistStore } from "@/store/shortlistStore";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { cn } from "@/utils/cn";

export function ShortlistDrawer() {
  const { profiles, isOpen, closeDrawer, removeProfile, clearAll } =
    useShortlistStore();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/30 z-50 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeDrawer}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-label="Shortlist"
        aria-modal="true"
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-900">Shortlist</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {profiles.length} profile{profiles.length !== 1 ? "s" : ""} selected
            </p>
          </div>
          <div className="flex items-center gap-2">
            {profiles.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                aria-label="Clear all profiles from shortlist"
              >
                Clear all
              </button>
            )}
            <button
              onClick={closeDrawer}
              aria-label="Close shortlist"
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {profiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <div className="w-14 h-14 rounded-full bg-violet-50 flex items-center justify-center mb-4">
                <Users className="w-7 h-7 text-violet-400" />
              </div>
              <p className="font-medium text-gray-900 mb-1">No profiles yet</p>
              <p className="text-sm text-gray-500">
                Hit "Add to Shortlist" on any profile to save them here for later.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-50 px-4 py-2">
              {profiles.map((profile) => (
                <li key={profile.user_id} className="py-3 flex items-center gap-3">
                  <img
                    src={profile.picture}
                    alt={profile.fullname}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 bg-gray-100"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname)}&background=7c3aed&color=fff`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 truncate">
                      <span className="font-medium text-sm text-gray-900 truncate">
                        @{profile.username}
                      </span>
                      <VerifiedBadge verified={profile.is_verified} />
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                      <span className="capitalize">{profile.platform}</span>
                      <span>·</span>
                      <span>{formatFollowers(profile.followers)} followers</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <a
                      href={`/profile/${profile.username}?platform=${profile.platform}`}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                      aria-label={`View ${profile.username}'s profile`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => removeProfile(profile.user_id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${profile.username} from shortlist`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {profiles.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 bg-gray-50">
            <p className="text-xs text-gray-500 text-center">
              Shortlist persists across sessions
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
