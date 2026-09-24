import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, BadgeType } from '../types';

interface ShopViewProps {
  initialCategory?: string;
  initialQuery?: string;
  onNavigate: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  initialCategory = 'all',
  initialQuery = '',
  onNavigate,
  onQuickView
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [priceMax, setPriceMax] = useState<number>(150);
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'price-asc' | 'price-desc'>('popularity');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(24);

  useEffect(() => {
    setVisibleCount(24);
  }, [selectedCategory, selectedBadge, selectedSize, priceMax, sortBy, initialQuery]);

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'apparel', label: 'Apparel' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'retro', label: '1998 Retro' },
    { id: 'new-arrivals', label: 'New Arrivals' },
    { id: 'gear-drop', label: 'Gear Drop' }
  ];

  const badges: { id: string; label: string }[] = [
    { id: 'all', label: 'All Badges' },
    { id: 'HERO', label: 'Hero' },
    { id: 'FAN FAVOURITE', label: 'Fan Favourite' },
    { id: 'TRENDING', label: 'Trending' },
    { id: 'HIDDEN GEM', label: 'Hidden Gem' },
    { id: 'NEW', label: 'New' }
  ];

  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', '2XL'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category check
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'new-arrivals' || selectedCategory === 'gear-drop') {
          if (!product.collections.includes(selectedCategory)) return false;
        } else if (product.category !== selectedCategory && !product.collections.includes(selectedCategory)) {
          return false;
        }
      }

      // Badge check
      if (selectedBadge !== 'all' && product.badge !== selectedBadge) {
        return false;
      }

      // Size check
      if (selectedSize !== 'all' && product.sizes) {
        if (!product.sizes.includes(selectedSize) && !product.sizes.some((s) => s.includes('Fits'))) {
          return false;
        }
      }

      // Price check
      if (product.price > priceMax) {
        return false;
      }

      // Query check if provided
      if (initialQuery) {
        const q = initialQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          (product.description ? product.description.toLowerCase().includes(q) : false);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popularity') {
        // Sort by GA4 purchase and conversion significance
        const scoreA = (a.ga4Insight?.purchases || 0) + (a.role === 'HERO' ? 500 : 0);
        const scoreB = (b.ga4Insight?.purchases || 0) + (b.role === 'HERO' ? 500 : 0);
        return scoreB - scoreA;
      }
      if (sortBy === 'newest') {
        return a.badge === 'NEW' ? -1 : 1;
      }
      if (sortBy === 'price-asc') {
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });
  }, [selectedCategory, selectedBadge, selectedSize, priceMax, sortBy, initialQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedBadge('all');
    setSelectedSize('all');
    setPriceMax(150);
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedBadge !== 'all' || selectedSize !== 'all' || priceMax < 150;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title & Sort Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8EAED] pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#202124]">
            {initialQuery
              ? `Results for "${initialQuery}"`
              : selectedCategory === 'all'
              ? 'All Google Gear'
              : categories.find((c) => c.id === selectedCategory)?.label || 'Products'}
          </h1>
          <p className="text-xs text-[#5F6368] mt-1">
            Showing {filteredProducts.length} items • Authentic Google Merch
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden px-3 py-2 border border-[#DADCE0] rounded-[4px] text-xs font-medium text-[#202124] flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#5F6368] hidden sm:inline">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DADCE0] rounded-[4px] px-3 py-2 text-xs text-[#202124] focus:outline-none focus:border-[#4285F4]"
            >
              <option value="popularity">Popularity (Most Purchased)</option>
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters (Section 16.1) */}
        <aside className="hidden md:block md:col-span-3 space-y-6 bg-[#F8F9FA] p-5 rounded-[8px] border border-[#E8EAED]">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124]">
              Filter Catalogue
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#4285F4] hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-xs font-semibold text-[#202124] block mb-2">Category</label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[4px] text-xs flex items-center justify-between transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-[#E8F0FE] text-[#1967D2] font-semibold'
                      : 'text-[#3C4043] hover:bg-[#F1F3F4]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Badges Filter */}
          <div className="border-t border-[#E8EAED] pt-4">
            <label className="text-xs font-semibold text-[#202124] block mb-2">Collection Badge</label>
            <div className="space-y-1">
              {badges.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBadge(b.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-[4px] text-xs flex items-center justify-between transition-colors ${
                    selectedBadge === b.id
                      ? 'bg-[#202124] text-white font-semibold'
                      : 'text-[#3C4043] hover:bg-[#F1F3F4]'
                  }`}
                >
                  <span>{b.label}</span>
                  {selectedBadge === b.id && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Sizing Filter */}
          <div className="border-t border-[#E8EAED] pt-4">
            <label className="text-xs font-semibold text-[#202124] block mb-2">Apparel Size</label>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map((sz) => (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2.5 py-1 text-xs rounded-[4px] border ${
                    selectedSize === sz
                      ? 'bg-[#4285F4] text-white border-[#4285F4]'
                      : 'bg-white text-[#202124] border-[#DADCE0] hover:border-[#80868B]'
                  }`}
                >
                  {sz === 'all' ? 'All' : sz}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="border-t border-[#E8EAED] pt-4">
            <div className="flex justify-between text-xs font-semibold text-[#202124] mb-2">
              <span>Max Price</span>
              <span>${priceMax}</span>
            </div>
            <input
              type="range"
              min="15"
              max="150"
              step="5"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#4285F4]"
            />
          </div>
        </aside>

        {/* Product Grid */}
        <div className="md:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED] p-8">
              <h3 className="text-base font-semibold text-[#202124]">No products match these filters</h3>
              <p className="text-xs text-[#5F6368] mt-1 max-w-sm mx-auto">
                Try widening your price range or clearing the badge filter to discover all gear.
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 bg-[#4285F4] text-white text-xs font-medium rounded-[4px]"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onNavigate={onNavigate}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>

              {visibleCount < filteredProducts.length && (
                <div className="mt-10 text-center">
                  <button
                    id="load-more-products-button"
                    onClick={() => setVisibleCount((prev) => prev + 24)}
                    className="px-6 py-2.5 bg-white hover:bg-[#F8F9FA] text-[#1A73E8] hover:text-[#174EA6] text-xs font-semibold rounded-[4px] border border-[#DADCE0] shadow-2xs transition-colors"
                  >
                    Show More Products (Showing {Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom-Sheet Filter Panel (Section 16) */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/40 backdrop-blur-xs md:hidden">
          <div className="bg-white rounded-t-[12px] p-5 max-h-[80vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8EAED]">
              <h3 className="text-sm font-bold text-[#202124]">Filters</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-full text-[#5F6368]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-2">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-3 py-2 text-xs rounded-[4px] border text-left ${
                      selectedCategory === c.id
                        ? 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC] font-semibold'
                        : 'bg-white text-[#202124] border-[#DADCE0]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div>
              <label className="text-xs font-semibold text-[#202124] block mb-2">Collection Badge</label>
              <div className="grid grid-cols-2 gap-2">
                {badges.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBadge(b.id)}
                    className={`px-3 py-2 text-xs rounded-[4px] border text-left ${
                      selectedBadge === b.id
                        ? 'bg-[#202124] text-white border-[#202124] font-semibold'
                        : 'bg-white text-[#202124] border-[#DADCE0]'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Max */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-[#202124] mb-1">
                <span>Max Price</span>
                <span>${priceMax}</span>
              </div>
              <input
                type="range"
                min="15"
                max="150"
                step="5"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-[#4285F4]"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={resetFilters}
                className="flex-1 py-3 text-xs font-semibold text-[#5F6368] border border-[#DADCE0] rounded-[4px]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex-1 py-3 bg-[#4285F4] text-white text-xs font-semibold rounded-[4px]"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
