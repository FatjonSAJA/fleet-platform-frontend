import { useMatches } from "@tanstack/react-router";

export function HeaderTitle() {
  const matches = useMatches();

  return (
    <div className="hidden md:block text-white text-lg font-light min-h-7 text-[25px]">
      {matches[matches.length - 1]?.context?.header ||
        matches[matches.length - 1]?.context?.title}
    </div>
  );
}
