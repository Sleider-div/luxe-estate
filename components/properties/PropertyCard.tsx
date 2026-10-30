"use client";

import Image from "next/image";
import { Property } from "@/types/property";
import { Icon } from "@/components/common/Icon";

interface PropertyCardProps {
  property: Property;
  className?: string;
  onToggleFavorite?: (id: string) => void;
  onClick?: (property: Property) => void;
}

export function PropertyCard({
  property,
  className = "",
  onToggleFavorite,
  onClick,
}: PropertyCardProps) {
  const isRent = property.listingType === "rent";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <article
      onClick={() => onClick?.(property)}
      className={`bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col ${className}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.imageUrl}
          alt={property.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <button
          type="button"
          onClick={handleFavoriteClick}
          aria-label={property.isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-colors z-10 ${
            property.isFavorite
              ? "bg-mosque text-white"
              : "bg-white/90 text-nordic-dark hover:bg-mosque hover:text-white"
          }`}
        >
          <Icon
            name={property.isFavorite ? "favorite" : "favorite_border"}
            className="text-lg"
          />
        </button>

        <div
          className={`absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded ${
            isRent ? "bg-mosque/90" : "bg-nordic-dark/90"
          }`}
        >
          {isRent ? "FOR RENT" : "FOR SALE"}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-lg text-nordic-dark">
            {property.priceFormatted}
            {isRent && (
              <span className="text-sm font-normal text-nordic-muted">
                /{property.rentPeriod || "mo"}
              </span>
            )}
          </h3>
        </div>

        <h4 className="text-nordic-dark font-medium truncate mb-1">
          {property.title}
        </h4>

        <p className="text-nordic-muted text-xs mb-4">{property.location}</p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <Icon name="king_bed" className="text-sm text-mosque/80" />
            <span>{property.bedrooms}</span>
          </div>

          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <Icon name="bathtub" className="text-sm text-mosque/80" />
            <span>{property.bathrooms}</span>
          </div>

          <div className="flex items-center gap-1 text-nordic-muted text-xs">
            <Icon name="square_foot" className="text-sm text-mosque/80" />
            <span>{property.areaSqM}m²</span>
          </div>
        </div>
      </div>
    </article>
  );
}

