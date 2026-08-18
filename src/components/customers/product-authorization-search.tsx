"use client";

import { useRef } from "react";

import { SearchField } from "@/components/shared/search-field";

type ProductAuthorizationSearchProps = {
  children: React.ReactNode;
};

// Filters the product authorization grid purely by toggling a `hidden`
// class on cards that don't match — cards (and their checkbox/price inputs)
// are never removed from the DOM, so nothing is lost from the form
// submission regardless of what the search box currently shows.
export function ProductAuthorizationSearch({
  children,
}: ProductAuthorizationSearchProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  function handleChange(value: string) {
    const query = value.trim().toLowerCase();
    const cards =
      containerRef.current?.querySelectorAll<HTMLElement>("[data-product-name]");

    cards?.forEach((card) => {
      const name = card.dataset.productName?.toLowerCase() ?? "";
      card.classList.toggle("hidden", query !== "" && !name.includes(query));
    });
  }

  return (
    <div>
      <div className="mb-4">
        <SearchField
          placeholder="Listede ürün ara..."
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>

      <div ref={containerRef}>{children}</div>
    </div>
  );
}
