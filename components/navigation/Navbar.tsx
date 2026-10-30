"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/common/Icon";
import { USER_PROFILE } from "@/data/mockProperties";

interface NavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  savedCount?: number;
}

export function Navbar({ activeTab = "Buy", onTabChange, savedCount = 0 }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Buy", href: "#buy" },
    { name: "Rent", href: "#rent" },
    { name: "Sell", href: "#sell" },
    { name: "Saved Homes", href: "#saved", badge: savedCount > 0 ? savedCount : null },
  ];

  const handleTabClick = (e: React.MouseEvent, tabName: string) => {
    e.preventDefault();
    if (onTabChange) {
      onTabChange(tabName);
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background-light/95 backdrop-blur-md border-b border-nordic-dark/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-nordic-dark flex items-center justify-center">
              <Icon name="apartment" className="text-white text-lg" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-nordic-dark">
              LuxeEstate
            </span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab.toLowerCase() === item.name.toLowerCase();
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleTabClick(e, item.name)}
                  className={
                    isActive
                      ? "text-mosque font-medium text-sm border-b-2 border-mosque px-1 py-1"
                      : "text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all"
                  }
                >
                  {item.name}
                  {item.badge && (
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs bg-mosque/15 text-mosque rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button
              type="button"
              aria-label="Search"
              className="text-nordic-dark hover:text-mosque transition-colors"
            >
              <Icon name="search" className="text-2xl" />
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="text-nordic-dark hover:text-mosque transition-colors relative"
            >
              <Icon name="notifications_none" className="text-2xl" />
              {USER_PROFILE.unreadNotifications && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light" />
              )}
            </button>

            <button
              type="button"
              aria-label="User profile"
              className="flex items-center gap-2 pl-2 border-l border-nordic-dark/10 ml-2"
            >
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all relative">
                <Image
                  src={USER_PROFILE.avatarUrl}
                  alt={USER_PROFILE.name}
                  width={36}
                  height={36}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-nordic-dark hover:bg-nordic-dark/5 transition-colors"
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? "close" : "menu"} className="text-2xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <div
        className={`md:hidden border-t border-nordic-dark/5 bg-background-light overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-64 py-2" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab.toLowerCase() === item.name.toLowerCase();
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleTabClick(e, item.name)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "text-mosque bg-mosque/10"
                    : "text-nordic-dark hover:bg-black/5"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

