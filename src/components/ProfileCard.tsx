import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookmarkPlus, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { useShortlistStore } from "@/store/shortlistStore";
import { cn } from "@/utils/cn";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isInShortlist } = useShortlistStore();
  const inShortlist = isInShortlist(profile.user_id);

  const handleCardClick = useCallback(() => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  }, [navigate, profile.username, platform]);

  const handleShortlistToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inShortlist) {
        removeProfile(profile.user_id);
        toast("Removed from shortlist", { icon: "🗑️" });
      } else {
        const added = addProfile({
          user_id: profile.user_id,
          username: profile.username,
          fullname: profile.fullname,
          picture: profile.picture,
          is_verified: profile.is_verified,
          followers: profile.followers,
          platform,
          engagement_rate: profile.engagement_rate,
        });
        if (added) {
          toast.success(`@${profile.username} added to shortlist`);
        } else {
          toast("Already in shortlist", { icon: "ℹ️" });
        }
      }
    },
    [inShortlist, addProfile, removeProfile, profile, platform]
  );

  return (
    <article
      className="group bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 cursor-pointer hover:border-violet-200 hover:shadow-md transition-all duration-150 focus-within:ring-2 focus-within:ring-violet-500"
      onClick={handleCardClick}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src={profile.picture}
          alt={profile.fullname}
          className="w-12 h-12 rounded-full object-cover bg-gray-100"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname)}&background=7c3aed&color=fff&size=48`;
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="font-semibold text-gray-900 text-sm truncate">
            @{profile.username}
          </span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 truncate">{profile.fullname}</div>
        <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
          <span>{formatFollowers(profile.followers)} followers</span>
          {profile.engagement_rate !== undefined && (
            <>
              <span aria-hidden>·</span>
              <span>{formatEngagementRate(profile.engagement_rate)} ER</span>
            </>
          )}
        </div>
      </div>

      {/* Shortlist button */}
      <button
        onClick={handleShortlistToggle}
        aria-label={
          inShortlist
            ? `Remove @${profile.username} from shortlist`
            : `Add @${profile.username} to shortlist`
        }
        className={cn(
          "flex-shrink-0 p-2 rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
          inShortlist
            ? "bg-violet-100 text-violet-600 hover:bg-violet-200"
            : "bg-gray-50 text-gray-400 hover:bg-violet-50 hover:text-violet-500 opacity-0 group-hover:opacity-100"
        )}
      >
        {inShortlist ? (
          <BookmarkCheck className="w-4 h-4" aria-hidden />
        ) : (
          <BookmarkPlus className="w-4 h-4" aria-hidden />
        )}
      </button>
    </article>
  );
});
