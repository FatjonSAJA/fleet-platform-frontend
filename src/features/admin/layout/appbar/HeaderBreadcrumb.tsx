import { useMatches } from "@tanstack/react-router";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function HeaderBreadcrumb() {
  const matches = useMatches();

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList
        key={matches.map((match) => match.id).join("-")}
        className="text-white/90"
      >
        {matches.map((match, id) => {
          if (id < 2) return null;
          return (
            <Fragment key={match.id}>
              <BreadcrumbItem>
                <span className="text-white/90">
                  {match.context?.title || match.pathname}
                </span>
              </BreadcrumbItem>
              {id < matches.length - 1 && (
                <BreadcrumbSeparator className="text-white/70" />
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
