import React from 'react';
import { ArrowRight, Sparkles, ChevronRight, CheckCircle2, TrendingUp, Heart, Eye } from 'lucide-react';
import { PRODUCTS, CAMPAIGN_HERO_PRODUCT } from '../data/products';
import { LOOKBOOK_PHOTOS } from '../data/lookbook';
import { ProductCard } from '../components/ProductCard';
import { ProductBadge } from '../components/ProductBadge';
import { useCart } from '../context/CartContext';
import { Product, LookbookPhoto } from '../types';

interface HomeViewProps {
  onNavigate: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
  onOpenLightbox: (photo: LookbookPhoto) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onQuickView,
  onOpenLightbox
}) => {
  const { logAnalytics, addItem } = useCart();

  // Curated subsets based on PRD Section 10.2
  const newArrivals = PRODUCTS.filter((p) => p.collections.includes('new-arrivals'));
  const trendingProduct = PRODUCTS.find((p) => p.id === 'super-g-gradient-tee') || PRODUCTS[2];
  const fanFavouriteProduct = PRODUCTS.find((p) => p.id === 'google-1998-socks') || PRODUCTS[1];
  const hiddenGemProduct = PRODUCTS.find((p) => p.id === 'google-recycled-canvas-tote') || PRODUCTS[3];
  const supportingTumbler = PRODUCTS.find((p) => p.id === 'google-super-g-spectra-tumbler') || PRODUCTS[4];

  const handleHeroDropClick = () => {
    logAnalytics('shop_the_drop_click', { source: 'hero_primary_cta' });
    onNavigate('gear-drop');
  };

  const handleMidPageDropClick = () => {
    logAnalytics('shop_the_drop_click', { source: 'midpage_campaign_band' });
    onNavigate('gear-drop');
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 10.1 Hero Section */}
      <section
        id="hero-section"
        className="relative bg-gradient-to-b from-[#F8F9FA] to-white border-b border-[#E8EAED] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Copy & CTAs */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white border border-[#DADCE0] rounded-full shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#202124]">
                  Google Gear Drop • 2026 Edition
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#202124] leading-[1.15]">
                Find the gear that fits your Google world.
              </h1>

              <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed max-w-xl">
                Experience archival craftsmanship engineered for the modern technologist. Featuring the flagship{' '}
                <strong className="text-[#202124] font-medium">Marine Layer 1998 Pullover</strong> alongside our most celebrated everyday essentials.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-shop-the-drop-cta"
                  onClick={handleHeroDropClick}
                  className="px-6 py-3 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-sm font-semibold rounded-[4px] shadow-xs flex items-center gap-2 transition-colors min-h-[44px]"
                >
                  <span>SHOP THE DROP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-shop-new-arrivals-cta"
                  onClick={() => onNavigate('new-arrivals')}
                  className="px-5 py-3 bg-white hover:bg-[#F8F9FA] text-[#202124] border border-[#DADCE0] text-sm font-medium rounded-[4px] transition-colors min-h-[44px]"
                >
                  Shop New Arrivals
                </button>
              </div>

              {/* Section 10.6 Understated Activity Signal */}
              <div className="pt-2 flex items-center gap-4 text-xs text-[#5F6368]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853]" />
                  <span>900+ pieces of gear shipped this month</span>
                </div>
                <span>•</span>
                <span>Fast Mountain View Dispatch</span>
              </div>
            </div>

            {/* Right Hero Product Image & Quick Card */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Clean Product Photography with breathing room per Section 10.1 */}
                <div
                  onClick={() => onNavigate('pdp', CAMPAIGN_HERO_PRODUCT.id)}
                  className="group relative aspect-4/3 sm:aspect-16/10 rounded-[8px] overflow-hidden bg-[#F1F3F4] border border-[#E8EAED] shadow-sm cursor-pointer"
                >
                  <img
                    src={CAMPAIGN_HERO_PRODUCT.images[0]}
                    alt={CAMPAIGN_HERO_PRODUCT.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  />

                  {/* Micro floating info pill */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-[6px] border border-[#E8EAED] flex items-center justify-between shadow-sm">
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold text-[#202124] truncate">
                        {CAMPAIGN_HERO_PRODUCT.name}
                      </p>
                      <p className="text-[11px] text-[#5F6368]">French Terry Vintage Fleece • $108.00</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(CAMPAIGN_HERO_PRODUCT, 1);
                      }}
                      className="shrink-0 px-3 py-1.5 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-medium rounded-[4px] transition-colors"
                    >
                      Quick Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10.2 Product Discovery: Fan Favourites & Hidden Gems Modules */}
      {/* Specifically closes the Socks & Canvas Tote visibility gaps! */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fan Favourites Spotlight (1998 Socks: 585 purchases / 671 views) */}
          <div
            id="fan-favourites-module"
            className="p-5 sm:p-6 bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-[#EA4335]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#202124]">
                    FAN FAVOURITE SPOTLIGHT
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-[#202124]">
                The Underground Legend: {fanFavouriteProduct.name}
              </h2>
              <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">
                Purchased by 585 shoppers with an unprecedented 87.2% conversion rate. Ribbed athletic knit with authentic Google four-color jacquard cuffs.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-4 bg-white p-3.5 rounded-[6px] border border-[#E8EAED]">
              <img
                src={fanFavouriteProduct.images[0]}
                alt={fanFavouriteProduct.name}
                className="w-20 h-20 object-cover rounded-[4px] bg-[#F1F3F4] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium text-[#202124] truncate">
                    {fanFavouriteProduct.name}
                  </h3>
                  <span className="text-sm font-bold text-[#202124]">
                    ${fanFavouriteProduct.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#34A853] mt-0.5">In Stock • Ready to ship</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => addItem(fanFavouriteProduct, 1)}
                    className="px-3 py-1.5 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] transition-colors"
                  >
                    Quick Add $16
                  </button>
                  <button
                    onClick={() => onNavigate('pdp', fanFavouriteProduct.id)}
                    className="px-3 py-1.5 text-xs text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-[4px]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Hidden Gems Spotlight (Canvas Tote: 300 purchases / 196 views) */}
          <div
            id="hidden-gems-module"
            className="p-5 sm:p-6 bg-[#FEF7E0]/40 rounded-[8px] border border-[#FEEFC3] flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#B06000]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#B06000]">
                    QUIETLY LOVED • HIDDEN GEM
                  </span>
                </div>
              </div>

              <h2 className="text-lg font-semibold text-[#202124]">
                The Everyday Carry: {hiddenGemProduct.name}
              </h2>
              <p className="text-xs text-[#5F6368] mt-1 leading-relaxed">
                Generates more purchases than catalog views (300 orders from 196 views). Built from 16oz recycled duck canvas with an internal 14" laptop sleeve.
              </p>
            </div>

            <div className="mt-5 flex items-center gap-4 bg-white p-3.5 rounded-[6px] border border-[#E8EAED]">
              <img
                src={hiddenGemProduct.images[0]}
                alt={hiddenGemProduct.name}
                className="w-20 h-20 object-cover rounded-[4px] bg-[#F1F3F4] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium text-[#202124] truncate">
                    {hiddenGemProduct.name}
                  </h3>
                  <span className="text-sm font-bold text-[#202124]">
                    ${hiddenGemProduct.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-[#34A853] mt-0.5">GRS Certified Recycled Cotton</p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => addItem(hiddenGemProduct, 1)}
                    className="px-3 py-1.5 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] transition-colors"
                  >
                    Quick Add $18
                  </button>
                  <button
                    onClick={() => onNavigate('pdp', hiddenGemProduct.id)}
                    className="px-3 py-1.5 text-xs text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] rounded-[4px]"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10.2 Trending Module (Leads with Super G Gradient Tee) */}
      <section id="trending-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-4 h-4 text-[#EA4335]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#EA4335]">
                TRENDING NOW
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              High-Velocity Wardrobe Essentials
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-xs font-semibold text-[#4285F4] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <ProductCard
            product={trendingProduct}
            onNavigate={onNavigate}
            onQuickView={onQuickView}
          />
          <ProductCard
            product={fanFavouriteProduct}
            onNavigate={onNavigate}
            onQuickView={onQuickView}
          />
          <ProductCard
            product={hiddenGemProduct}
            onNavigate={onNavigate}
            onQuickView={onQuickView}
          />
          <ProductCard
            product={supportingTumbler}
            onNavigate={onNavigate}
            onQuickView={onQuickView}
          />
        </div>
      </section>

      {/* 10.8 Gear Drop Campaign Band (PRD Section 10.2 & 13) */}
      {/* Distinct visual section reintroducing campaign mid-page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[8px] bg-[#202124] text-white p-6 sm:p-10 overflow-hidden">
          {/* Subtle Google accent border bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853]" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#FBBC05] font-semibold tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>THE GOOGLE GEAR DROP CAMPAIGN</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              1998 Dropped Into 2026.
            </h2>

            <p className="text-sm text-[#BDC1C6] leading-relaxed">
              Archival silhouettes, heavyweight French terry fabrics, and laser-precise detailing. One flagship hero, four everyday essentials.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                id="midpage-shop-the-drop-cta"
                onClick={handleMidPageDropClick}
                className="px-5 py-2.5 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('1998-retro')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-[4px] transition-colors min-h-[44px]"
              >
                Explore 1998 Retro Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10.2 New Arrivals Rail (Horizontal scroll on mobile, grid on desktop) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#5F6368] block mb-1">
              JUST ADDED
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              New Arrivals For Fall
            </h2>
          </div>
          <button
            onClick={() => onNavigate('new-arrivals')}
            className="text-xs font-semibold text-[#4285F4] hover:underline flex items-center gap-1"
          >
            <span>Explore All New</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile horizontal scroll / desktop grid */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5 overflow-x-auto sm:overflow-visible no-scrollbar pb-3 sm:pb-0">
          {newArrivals.slice(0, 4).map((product) => (
            <div key={product.id} className="w-[260px] sm:w-auto shrink-0">
              <ProductCard
                product={product}
                onNavigate={onNavigate}
                onQuickView={onQuickView}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Photography Portfolio & Editorial Lookbook Teaser */}
      {/* Satisfies user's explicit photography portfolio request with responsive galleries */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4] block mb-1">
              CAMPAIGN PHOTOGRAPHY & LOOKBOOK
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              Minimalist Visual Archive
            </h2>
            <p className="text-xs text-[#5F6368] mt-1">
              Studio still-lifes, street portraits, and texture studies captured on natural light and medium format film.
            </p>
          </div>
          <button
            onClick={() => onNavigate('lookbook')}
            className="text-xs font-semibold text-[#202124] hover:text-[#4285F4] flex items-center gap-1.5 self-start sm:self-auto py-1 px-3 bg-[#F8F9FA] rounded-[4px] border border-[#E8EAED]"
          >
            <span>View Full Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Image Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {LOOKBOOK_PHOTOS.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              onClick={() => onOpenLightbox(photo)}
              className="group relative rounded-[6px] overflow-hidden bg-[#F8F9FA] border border-[#E8EAED] cursor-pointer aspect-4/5"
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-[10px] text-[#FBBC05] uppercase tracking-wider font-semibold">
                  {photo.category}
                </span>
                <p className="text-xs font-medium truncate">{photo.title}</p>
                <p className="text-[10px] text-white/70 truncate">{photo.cameraInfo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
