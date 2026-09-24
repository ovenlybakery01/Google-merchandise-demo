import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, Camera, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, productId?: string, query?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenSearch }) => {
  const { itemCount, openMiniCart } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'home', label: 'Home' },
    { id: 'gear-drop', label: 'Gear Drop', highlight: true },
    { id: 'shop', label: 'All Gear' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: '1998-retro', label: '1998 Retro Collection' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'lookbook', label: 'Lookbook & Portfolio', icon: Camera }
  ];

  const handleNavClick = (viewId: string) => {
    setMobileMenuOpen(false);
    onNavigate(viewId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E8EAED] transition-shadow">
      {/* Top Banner: Free US Shipping & Analytics Trust Signal */}
      <div className="bg-[#202124] text-white text-[11px] py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-3">
        <span>Free US Standard Shipping on orders over $50</span>
        <span className="text-[#80868B] hidden sm:inline">•</span>
        <span className="text-[#FBBC05] hidden sm:inline">The 1998 Retro Drop is Live</span>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Mobile Hamburger Menu button */}
        <div className="flex items-center lg:hidden">
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 -ml-2 text-[#5F6368] hover:text-[#202124] rounded-[4px]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          {/* Authentic Google 4-Color Accent Dots */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-lg sm:text-xl tracking-tight text-[#202124]">
                Google
              </span>
              <span className="font-normal text-xs sm:text-sm text-[#5F6368] tracking-normal">
                Merchandise Store
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Primary Nav */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Primary Navigation">
          <button
            onClick={() => handleNavClick('gear-drop')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
              currentView === 'gear-drop'
                ? 'bg-[#E8F0FE] text-[#1967D2]'
                : 'text-[#4285F4] hover:bg-[#F8F9FA]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
            <span>GEAR DROP</span>
          </button>

          <button
            onClick={() => handleNavClick('shop')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              currentView === 'shop'
                ? 'text-[#202124] font-semibold bg-[#F1F3F4]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Shop All
          </button>

          <button
            onClick={() => handleNavClick('apparel')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              currentView === 'apparel'
                ? 'text-[#202124] font-semibold bg-[#F1F3F4]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Apparel
          </button>

          <button
            onClick={() => handleNavClick('accessories')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              currentView === 'accessories'
                ? 'text-[#202124] font-semibold bg-[#F1F3F4]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            Accessories
          </button>

          <button
            onClick={() => handleNavClick('1998-retro')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              currentView === '1998-retro'
                ? 'text-[#202124] font-semibold bg-[#F1F3F4]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            1998 Retro
          </button>

          <button
            onClick={() => handleNavClick('lookbook')}
            className={`px-3 py-1.5 rounded-[4px] text-xs font-medium transition-colors flex items-center gap-1 ${
              currentView === 'lookbook'
                ? 'text-[#202124] font-semibold bg-[#F1F3F4]'
                : 'text-[#5F6368] hover:text-[#202124]'
            }`}
          >
            <Camera className="w-3.5 h-3.5 text-[#5F6368]" />
            <span>Lookbook & Portfolio</span>
          </button>
        </nav>

        {/* Right Header Actions: Search & Cart */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Trigger Button */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            aria-label="Open Search"
            className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs text-[#5F6368] hover:text-[#202124] bg-[#F8F9FA] hover:bg-[#F1F3F4] border border-[#DADCE0] transition-colors"
          >
            <Search className="w-4 h-4 text-[#5F6368]" />
            <span className="hidden md:inline">Search gear...</span>
          </button>

          {/* Cart Trigger */}
          <button
            id="header-cart-btn"
            onClick={openMiniCart}
            aria-label={`Shopping cart with ${itemCount} items`}
            className="relative p-2 rounded-[4px] text-[#5F6368] hover:text-[#202124] hover:bg-[#F8F9FA] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span
                id="cart-badge-count"
                className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#4285F4] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs"
              >
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>



      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8EAED] bg-white p-4 space-y-2 shadow-lg">
          <div className="font-semibold text-xs text-[#5F6368] uppercase tracking-wider mb-2">
            Navigation
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleNavClick(cat.id)}
              className={`w-full text-left px-3 py-2.5 rounded-[4px] text-sm flex items-center justify-between ${
                currentView === cat.id
                  ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
                  : 'text-[#202124] hover:bg-[#F8F9FA]'
              }`}
            >
              <span>{cat.label}</span>
              {cat.highlight && (
                <span className="text-[10px] bg-[#4285F4] text-white px-2 py-0.5 rounded-[3px]">
                  FEATURED
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-[#F1F3F4] text-xs text-[#5F6368] flex justify-between">
            <span>Customer Care: Mon-Fri 9AM-6PM PT</span>
            <button onClick={() => handleNavClick('faq')} className="text-[#4285F4] hover:underline">
              FAQs & Help
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
