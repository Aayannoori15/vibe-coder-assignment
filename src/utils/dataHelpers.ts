import instagramData from "@/assets/data/search/instagram.json";
import youtubeData from "@/assets/data/search/youtube.json";
import tiktokData from "@/assets/data/search/tiktok.json";
import type { Platform, SearchData, UserProfileSummary } from "@/types";

const platformData: Record<Platform, SearchData> = {
  instagram: instagramData as unknown as SearchData,
  youtube: youtubeData as unknown as SearchData,
  tiktok: tiktokData as unknown as SearchData,
};

export function getSearchData(platform: Platform): SearchData {
  return platformData[platform];
}

export function extractProfiles(platform: Platform): UserProfileSummary[] {
  const data = getSearchData(platform);
  return data.accounts.map((item) => item.account.user_profile);
}

// BUG FIX: original filterProfiles did case-sensitive username match.
// Both username and fullname should be lowercased for consistent matching.
export function filterProfiles(
  profiles: UserProfileSummary[],
  query: string
): UserProfileSummary[] {
  if (!query.trim()) return profiles;
  const q = query.toLowerCase();
  return profiles.filter((p) => {
    const matchUsername = p.username.toLowerCase().includes(q);
    const matchFullname = p.fullname.toLowerCase().includes(q);
    return matchUsername || matchFullname;
  });
}

export const PLATFORMS: Platform[] = ["instagram", "youtube", "tiktok"];

export const PLATFORM_LABELS: Record<Platform, string> = {
  instagram: "Instagram",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export function getPlatformLabel(platform: Platform): string {
  return PLATFORM_LABELS[platform];
}

export const PLATFORM_COLORS: Record<Platform, { bg: string; text: string; border: string }> = {
  instagram: {
    bg: "bg-gradient-to-r from-purple-500 to-pink-500",
    text: "text-pink-600",
    border: "border-pink-200",
  },
  youtube: {
    bg: "bg-red-500",
    text: "text-red-600",
    border: "border-red-200",
  },
  tiktok: {
    bg: "bg-gray-900",
    text: "text-gray-900",
    border: "border-gray-200",
  },
};
