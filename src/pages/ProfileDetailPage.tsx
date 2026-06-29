import { useEffect, useState, useCallback } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, BookmarkPlus, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { SkeletonList } from "@/components/SkeletonCard";
import type { FullUserProfile, ProfileDetailResponse, Platform } from "@/types";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/shortlistStore";

interface StatCardProps { label: string; value: string }
function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="font-semibold text-gray-900 text-lg">{value}</div>
    </div>
  );
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") || "instagram") as Platform;
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const { addProfile, removeProfile, isInShortlist } = useShortlistStore();

  useEffect(() => {
    if (!username) return;
    setLoaded(false);
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  const handleShortlist = useCallback(() => {
    if (!profileData || !username) return;
    const user = profileData.data.user_profile;
    if (isInShortlist(user.user_id)) {
      removeProfile(user.user_id);
      toast("Removed from shortlist", { icon: "🗑️" });
    } else {
      addProfile({
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        picture: user.picture,
        is_verified: user.is_verified,
        followers: user.followers,
        platform,
        engagement_rate: user.engagement_rate,
      });
      toast.success(`@${user.username} added to shortlist`);
    }
  }, [profileData, username, platform, isInShortlist, addProfile, removeProfile]);

  if (!username) {
    return <Layout><p className="text-red-500">Invalid profile URL.</p><Link to="/" className="text-violet-600 text-sm mt-2 inline-block">← Back</Link></Layout>;
  }

  if (!loaded) {
    return <Layout><div className="mt-4"><SkeletonList count={3} /></div></Layout>;
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="py-16 text-center">
          <p className="text-gray-900 font-medium mb-2">Profile not found</p>
          <p className="text-sm text-gray-500 mb-4">No data available for @{username}</p>
          <Link to="/" className="text-violet-600 text-sm font-medium hover:underline">← Back to search</Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;
  const inShortlist = isInShortlist(user.user_id);

  return (
    <Layout>
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to search
      </Link>

      <div className="max-w-2xl">
        {/* Profile header */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <div className="flex items-start gap-5">
            <img
              src={user.picture}
              alt={user.fullname}
              className="w-20 h-20 rounded-full object-cover bg-gray-100 flex-shrink-0 ring-4 ring-gray-50"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname)}&background=7c3aed&color=fff&size=80`;
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900 flex items-center gap-1">
                  @{user.username}<VerifiedBadge verified={user.is_verified} />
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 capitalize">{platform}</span>
              </div>
              <p className="text-gray-500 text-sm mt-0.5">{user.fullname}</p>
              {user.description && (
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">{user.description}</p>
              )}
              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={handleShortlist}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                    inShortlist
                      ? "bg-violet-100 text-violet-700 hover:bg-violet-200"
                      : "bg-violet-600 text-white hover:bg-violet-700"
                  }`}
                >
                  {inShortlist ? <BookmarkCheck className="w-4 h-4" /> : <BookmarkPlus className="w-4 h-4" />}
                  {inShortlist ? "In Shortlist" : "Add to Shortlist"}
                </button>
                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> View profile
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard label="Followers" value={formatFollowers(user.followers)} />
          <StatCard label="Engagement Rate" value={formatEngagementRate(user.engagement_rate)} />
          {user.posts_count !== undefined && <StatCard label="Posts" value={user.posts_count.toLocaleString()} />}
          {user.avg_likes !== undefined && <StatCard label="Avg Likes" value={formatFollowers(user.avg_likes)} />}
          {user.avg_comments !== undefined && <StatCard label="Avg Comments" value={formatFollowers(user.avg_comments)} />}
          {user.avg_views !== undefined && user.avg_views > 0 && <StatCard label="Avg Views" value={formatFollowers(user.avg_views)} />}
          {user.engagements !== undefined && <StatCard label="Total Engagements" value={formatFollowers(user.engagements)} />}
        </div>
      </div>
    </Layout>
  );
}
