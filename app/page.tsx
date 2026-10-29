"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { NewInMarketSection } from "@/components/home/NewInMarketSection";
import {
  FEATURED_PROPERTIES,
  INITIAL_MARKET_PROPERTIES,
  ADDITIONAL_MARKET_PROPERTIES,
} from "@/data/mockProperties";
import { Property, PropertyCategory, ListingType } from "@/types/property";

export default function HomeDiscoverPage() {
  const [activeNavTab, setActiveNavTab] = useState("Buy");
  const [selectedCategory, setSelectedCategory] = useState<PropertyCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [marketFilter, setMarketFilter] = useState<"all" | ListingType>("all");

  const [featuredList, setFeaturedList] = useState<Property[]>(FEATURED_PROPERTIES);
  const [marketList, setMarketList] = useState<Property[]>(INITIAL_MARKET_PROPERTIES);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // Handle nav tab switching
  const handleNavTabChange = (tab: string) => {
    setActiveNavTab(tab);
    if (tab === "Buy") {
      setMarketFilter("sale");
    } else if (tab === "Rent") {
      setMarketFilter("rent");
    } else if (tab === "Saved Homes") {
      // Toggle saved or view
    }
  };

  // Toggle favorite for featured or market properties
  const handleToggleFavorite = (propertyId: string) => {
    setFeaturedList((prev) =>
      prev.map((prop) =>
        prop.id === propertyId ? { ...prop, isFavorite: !prop.isFavorite } : prop
      )
    );
    setMarketList((prev) =>
      prev.map((prop) =>
        prop.id === propertyId ? { ...prop, isFavorite: !prop.isFavorite } : prop
      )
    );
  };

  // Load more properties simulation
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setMarketList((prev) => [...prev, ...ADDITIONAL_MARKET_PROPERTIES]);
      setHasLoadedMore(true);
      setIsLoadingMore(false);
    }, 400);
  };

  // Filter properties based on search, category and listingType
  const filteredFeatured = useMemo(() => {
    return featuredList.filter((prop) => {
      const matchesCategory =
        selectedCategory === "all" || prop.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [featuredList, selectedCategory, searchQuery]);

  const filteredMarket = useMemo(() => {
    return marketList.filter((prop) => {
      const matchesCategory =
        selectedCategory === "all" || prop.category === selectedCategory;
      const matchesType =
        marketFilter === "all" || prop.listingType === marketFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prop.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesType && matchesSearch;
    });
  }, [marketList, selectedCategory, marketFilter, searchQuery]);

  // Total saved favorites count
  const savedCount = useMemo(() => {
    const featuredFavs = featuredList.filter((p) => p.isFavorite).length;
    const marketFavs = marketList.filter((p) => p.isFavorite).length;
    return featuredFavs + marketFavs;
  }, [featuredList, marketList]);

  return (
    <div className="min-h-screen bg-background-light text-nordic-dark font-display antialiased selection:bg-mosque selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        activeTab={activeNavTab}
        onTabChange={handleNavTabChange}
        savedCount={savedCount}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Hero Section */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Featured Collections Section */}
        <FeaturedSection
          properties={filteredFeatured}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* New In Market Section */}
        <NewInMarketSection
          properties={filteredMarket}
          activeFilter={marketFilter}
          onFilterChange={setMarketFilter}
          onToggleFavorite={handleToggleFavorite}
          onLoadMore={handleLoadMore}
          hasMore={!hasLoadedMore}
          isLoadingMore={isLoadingMore}
        />
      </main>
    </div>
  );
}
