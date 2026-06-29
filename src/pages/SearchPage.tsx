import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useSearchStore } from "@/store/searchStore";

export function SearchPage() {
  const { platform, searchQuery, setPlatform, setSearchQuery } = useSearchStore();

  // Memoize so extractProfiles (which reads from static JSON) only reruns on platform change
  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);

  // Memoize filtered results so search doesn't recompute on every unrelated render
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Influencers</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse top creators across social platforms and build your shortlist
        </p>
      </div>

      <PlatformFilter
        selected={platform}
        onChange={setPlatform}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <p className="text-xs text-gray-400 mb-3" aria-live="polite">
        {searchQuery
          ? `${filtered.length} of ${allProfiles.length} creators match "${searchQuery}"`
          : `${allProfiles.length} creators on ${platform}`}
      </p>

      <ProfileList
        profiles={filtered}
        platform={platform}
        searchQuery={searchQuery}
      />
    </Layout>
  );
}
