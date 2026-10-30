export type PropertyCategory = "all" | "house" | "apartment" | "villa" | "penthouse";

export type ListingType = "sale" | "rent";

export interface Property {
  id: string;
  title: string;
  description?: string;
  location: string;
  city: string;
  price: number;
  priceFormatted: string;
  rentPeriod?: "mo" | "yr";
  listingType: ListingType;
  category: "house" | "apartment" | "villa" | "penthouse";
  bedrooms: number;
  bathrooms: number;
  areaSqM: number;
  imageUrl: string;
  imageAlt: string;
  isFeatured?: boolean;
  featuredBadge?: "Exclusive" | "New Arrival" | "Limited" | "Featured";
  isFavorite?: boolean;
}

export interface FilterState {
  category: PropertyCategory;
  listingType: "all" | ListingType;
  searchQuery: string;
}

