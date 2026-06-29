import { useMemo } from "react";
import { SearchX } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <SearchX className="w-7 h-7 text-gray-400" aria-hidden />
      </div>
      <p className="font-medium text-gray-900 mb-1">No results found</p>
      <p className="text-sm text-gray-500">
        {query ? `No creators match "${query}". Try a different search.` : "No profiles available."}
      </p>
    </div>
  );
}

export function ProfileList({ profiles, platform, searchQuery }: ProfileListProps) {
  // Memoize the card list so it only re-renders when profiles or platform changes
  const cards = useMemo(
    () =>
      profiles.map((profile) => (
        <ProfileCard key={profile.user_id} profile={profile} platform={platform} />
      )),
    [profiles, platform]
  );

  if (profiles.length === 0) {
    return <EmptyState query={searchQuery} />;
  }

  return (
    <div
      role="list"
      aria-label="Creator profiles"
      className="grid grid-cols-1 gap-2"
    >
      {cards}
    </div>
  );
}
