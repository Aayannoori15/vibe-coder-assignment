import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <BadgeCheck
      className="inline-block w-4 h-4 ml-1 text-blue-500 flex-shrink-0"
      aria-label="Verified account"
    />
  );
}
