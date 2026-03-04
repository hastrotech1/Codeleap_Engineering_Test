import { useState, useMemo } from "react";
import type { Post } from "../types";

export type SortOrder = "newest" | "oldest";

/** Hook that filters and sorts the post list based on the current search text and sort order */
export function usePostFilters(posts: Post[]) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOrder>("newest");

  const filtered = useMemo(() => {
    let result = [...posts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.username.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q),
      );
    }

    if (sort === "oldest") {
      result.sort(
        (a, b) =>
          new Date(a.created_datetime).getTime() -
          new Date(b.created_datetime).getTime(),
      );
    }

    return result;
  }, [posts, search, sort]);

  return { search, setSearch, sort, setSort, filtered };
}
