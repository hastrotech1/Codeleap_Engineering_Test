import { useState } from "react";
import { getStoredLikes, storeLikes } from "../lib/utils";

/** Hook that tracks which posts the user has liked, persisted to localStorage */
export function useLikes() {
  const [likes, setLikes] = useState<Record<number, boolean>>(getStoredLikes);

  /** Toggles the like state for a post and saves the updated map to localStorage */
  const toggle = (id: number) => {
    setLikes((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      storeLikes(next);
      return next;
    });
  };

  /** Returns true if the post with the given ID has been liked */
  const isLiked = (id: number) => !!likes[id];

  return { isLiked, toggle };
}
