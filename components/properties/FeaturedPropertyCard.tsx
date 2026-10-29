"use client";

import Image from "next/image";
import { Property } from "@/types/property";
import { Icon } from "@/components/common/Icon";

interface FeaturedPropertyCardProps {
  property: Property;
  onToggleFavorite?: (id: string) => void;
  onClick?: (property: Property) => void;
}

export function FeaturedPropertyCard({
  property,
  onToggleFavorite,
  onClick,
}: FeaturedPropertyCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <div
      onClick={() => onClick?.(property)}
      className="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer transition-all duration-300"
    >
      <div className="aspect-[4/3] w-full overflow-hidden relative">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {property.featuredBadge && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic-dark z-10">
            {property.featuredBadge}
          </div>
        )}

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={property.isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center transition-all z-10 ${
            property.isFavorite
              ? "bg-mosque text-white"
              : "bg-white/90 text-nordic-dark hover:bg-mosque hover:text-white"
          }`}
        >
          <Icon
            name={property.isFavorite ? "favorite" : "favorite_border"}
            className="text-xl"
          />
        </button>

        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none" />
      </div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-medium text-nordic-dark group-hover:text-mosque transition-colors">
              {property.title}
            </h3>
            <p className="text-nordic-muted text-sm flex items-center gap-1 mt-1">
              <Icon name="place" className="text-sm" />
              <span>{property.location}</span>
            </p>
          </div>
          <span className="text-xl font-semibold text-mosque whitespace-nowrap">
            {property.priceFormatted}
          </span>
        </div>

        <div className="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
          <div className="flex items-center gap-2 text-nordic-muted text-sm">
            <Icon name="king_bed" className="text-lg" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-2 text-nordic-muted text-sm">
            <Icon name="bathtub" className="text-lg" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-2 text-nordic-muted text-sm">
            <Icon name="square_foot" className="text-lg" />
            <span>{property.areaSqM.toLocaleString()} m²</span>
          </div>
        </div>
      </div>
    </div>
  );
}

