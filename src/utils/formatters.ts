export function formatFollowers(count: number): string {
  if (count >= 1_000_000) return (count / 1_000_000).toFixed(1) + "M";
  if (count >= 1_000) return (count / 1_000).toFixed(1) + "K";
  return count.toString();
}

// BUG FIX: The original multiplied by 10000 on the detail page and 100 in the formatter
// but called the formatter with raw rate on the engagements row.
// Standard: engagement_rate from API is already a decimal (e.g. 0.034 = 3.4%)
// We normalise here once and never multiply elsewhere.
export function formatEngagementRate(rate: number | undefined): string {
  if (rate === undefined || rate === null) return "N/A";
  // rate is stored as decimal e.g. 0.034 → display as "3.40%"
  return (rate * 100).toFixed(2) + "%";
}

export function formatNumber(n: number): string {
  return n.toLocaleString();
}
