"use client";

import { Property, ListingType } from "@/types/property";
import { PropertyCard } from "@/components/properties/PropertyCard";

interface NewInMarketSectionProps {
  properties: Property[];
  activeFilter: "all" | ListingType;
  onFilterChange: (filter: "all" | ListingType) => void;
  onToggleFavorite?: (id: string) => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onSelectProperty?: (property: Property) => void;
}

export function NewInMarketSection({
  properties,
  activeFilter,
  onFilterChange,
  onToggleFavorite,
  onLoadMore,
  hasMore = true,
  isLoadingMore = false,
  onSelectProperty,
}: NewInMarketSectionProps) {
  const filterTabs: Array<{ id: "all" | ListingType; label: string }> = [
    { id: "all", label: "All" },
    { id: "sale", label: "Buy" },
    { id: "rent", label: "Rent" },
  ];

  return (
    <section>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            New in Market
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Fresh opportunities added this week.
          </p>
        </div>

        {/* Tab Filters: All, Buy, Rent */}
        <div className="flex bg-white p-1 rounded-lg border border-nordic-dark/5 shadow-xs">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onFilterChange(tab.id)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-nordic-dark text-white shadow-sm"
                    : "text-nordic-muted hover:text-nordic-dark"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-nordic-dark/5">
          <p className="text-nordic-muted text-base">
            No properties found matching your criteria.
          </p>
          <button
            type="button"
            onClick={() => onFilterChange("all")}
            className="mt-4 px-4 py-2 text-sm font-medium text-mosque hover:underline cursor-pointer"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onToggleFavorite={onToggleFavorite}
              onClick={onSelectProperty}
            />
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="px-8 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md cursor-pointer disabled:opacity-50"
          >
            {isLoadingMore ? "Loading..." : "Load more properties"}
          </button>
        </div>
      )}
    </section>
  );
}

