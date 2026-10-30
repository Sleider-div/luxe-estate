"use client";

import { Property } from "@/types/property";
import { FeaturedPropertyCard } from "@/components/properties/FeaturedPropertyCard";
import { Icon } from "@/components/common/Icon";

interface FeaturedSectionProps {
  properties: Property[];
  onToggleFavorite?: (id: string) => void;
  onViewAll?: () => void;
  onSelectProperty?: (property: Property) => void;
}

export function FeaturedSection({
  properties,
  onToggleFavorite,
  onViewAll,
  onSelectProperty,
}: FeaturedSectionProps) {
  if (properties.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl font-light text-nordic-dark">
            Featured Collections
          </h2>
          <p className="text-nordic-muted mt-1 text-sm">
            Curated properties for the discerning eye.
          </p>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity cursor-pointer"
        >
          <span>View all</span>
          <Icon name="arrow_forward" className="text-sm" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {properties.map((property) => (
          <FeaturedPropertyCard
            key={property.id}
            property={property}
            onToggleFavorite={onToggleFavorite}
            onClick={onSelectProperty}
          />
        ))}
      </div>
    </section>
  );
}

