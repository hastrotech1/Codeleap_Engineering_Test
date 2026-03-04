import React from "react";
import { Search, X } from "lucide-react";
import type { SortOrder } from "../../../hooks/usePostFilters";

interface FilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  sort: SortOrder;
  onSortChange: (v: SortOrder) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
}) => (
  <div className="filter-bar">
    <div className="search-wrap">
      <Search size={15} className="search-icon" />
      <input
        className="search-input"
        placeholder="Search posts or users…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {search && (
        <button
          className="search-clear"
          type="button"
          title="Clear search"
          onClick={() => onSearchChange("")}
        >
          <X size={13} />
        </button>
      )}
    </div>

    <select
      className="sort-select"
      value={sort}
      title="Sort posts"
      onChange={(e) => onSortChange(e.target.value as SortOrder)}
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
    </select>
  </div>
);
