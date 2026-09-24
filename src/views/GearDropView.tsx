import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, ShoppingBag, ShieldCheck } from 'lucide-react';
import { CAMPAIGN_HERO_PRODUCT, CAMPAIGN_SUPPORTING_PRODUCTS } from '../data/products';
import { ProductBadge } from '../components/ProductBadge';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface GearDropViewProps {
  onNavigate: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
}

export const GearDropView: React.FC<GearDropViewProps> = ({ onNavigate, onQuickView }) => {
  const { addItem, logAnalytics } = useCart();
  const hero = CAMPAIGN_HERO_PRODUCT;

  const [selectedSize, setSelectedSize] = useState<string>(hero.sizes ? hero.sizes[2] : 'L'); // default L
  const [selectedColor, setSelectedColor] = useState<string>(hero.colors ? hero.colors[0].name : '');
  const [heroAdded, setHeroAdded] = useState(false);

  const handleHeroAddToCart = () => {
    addItem(hero, 1, selectedSize, selectedColor);
    setHeroAdded(true);
    logAnalytics('hero_add_to_cart', {
      product: hero.name,
      size: selectedSize,
      color: selectedColor
    });
    setTimeout(() => setHeroAdded(false), 1200);
  };

  const handleScrollToGrid = () => {
    logAnalytics('shop_the_drop_click', { source: 'landing_page_cta' });
    document.getElementById('gear-drop-essentials')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pb-20 space-y-12">
      {/* Campaign Header Banner */}
      <section className="bg-[#202124] text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-[#3C4043]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-[#FBBC05] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Google Gear Drop • 2026 Collection</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Find the gear that fits your Google world.
          </h1>

          <p className="text-sm sm:text-base text-[#BDC1C6] max-w-2xl mx-auto leading-relaxed">
            One flagship hero. Four everyday essentials. A data-driven release engineered for young, mobile creators and technologists.
          </p>

          <div className="pt-2">
            <button
              onClick={handleScrollToGrid}
              className="px-6 py-3 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-sm font-semibold rounded-[4px] shadow-sm inline-flex items-center gap-2 transition-colors"
            >
              <span>SHOP THE DROP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 13.1 Product Hierarchy: The Hero Feature Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED] p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Image Showcase */}
            <div className="lg:col-span-7">
              <div
                onClick={() => onNavigate('pdp', hero.id)}
                className="relative aspect-4/3 sm:aspect-16/10 rounded-[6px] overflow-hidden bg-white border border-[#DADCE0] shadow-sm cursor-pointer group"
              >
                <img
                  src={hero.images[0]}
                  alt={hero.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <div className="absolute top-3 left-3">
                  <ProductBadge badge="HERO" size="md" />
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-[4px]">
                  <span>Click to view lookbook angles & gallery</span>
                </div>
              </div>
            </div>

            {/* Hero Details & Direct Action */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <span className="text-xs font-semibold text-[#1967D2] uppercase tracking-wider block mb-1">
                  THE FLAGSHIP HERO
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#202124] leading-snug">
                  {hero.name}
                </h2>
                <div className="flex items-baseline gap-3 mt-2">
                  <span className="text-2xl font-bold text-[#202124]">
                    ${hero.price.toFixed(2)}
                  </span>
                  {hero.originalPrice && (
                    <span className="text-sm text-[#5F6368] line-through">
                      ${hero.originalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-[#137333] font-medium bg-[#E6F4EA] px-2 py-0.5 rounded-[4px]">
                    Free Shipping
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
                {hero.description}
              </p>

              {/* Sizes Selection */}
              {hero.sizes && (
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#202124] mb-1.5">
                    <span>Select Size: {selectedSize}</span>
                    <button
                      onClick={() => onNavigate('faq')}
                      className="text-[#4285F4] hover:underline text-[11px]"
                    >
                      Sizing Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hero.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`min-w-[42px] h-9 px-3 rounded-[4px] text-xs font-medium border transition-all ${
                          selectedSize === sz
                            ? 'bg-[#202124] text-white border-[#202124]'
                            : 'bg-white text-[#202124] border-[#DADCE0] hover:border-[#202124]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {hero.colors && (
                <div>
                  <span className="text-xs font-medium text-[#202124] block mb-1.5">
                    Color: {selectedColor}
                  </span>
                  <div className="flex gap-2.5">
                    {hero.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        title={c.name}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-[#4285F4] scale-110'
                            : 'border-white ring-1 ring-[#DADCE0]'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Primary Action Button */}
              <div className="pt-2 space-y-2">
                <button
                  id="hero-feature-add-btn"
                  onClick={handleHeroAddToCart}
                  className={`w-full h-12 rounded-[4px] text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                    heroAdded
                      ? 'bg-[#34A853] text-white'
                      : 'bg-[#4285F4] hover:bg-[#1A73E8] text-white'
                  }`}
                >
                  {heroAdded ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>Added to Mini Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-5 h-5" />
                      <span>Add Flagship to Cart • ${hero.price.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-[#5F6368] pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                    <span>Free US delivery in 2–4 days</span>
                  </span>
                  <span>•</span>
                  <span>30-day hassle-free returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13.2 Short Campaign Story Block ("1998 dropped into 2026") */}
      <section className="max-w-4xl mx-auto px-4 text-center py-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#5F6368] block mb-1">
          THE CONCEPT
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-[#202124]">
          1998 Dropped Into 2026
        </h3>
        <p className="text-sm text-[#5F6368] mt-2 leading-relaxed">
          Google incorporated in 1998 with simple tools and audacious curiosity. We re-engineered that foundational era into contemporary heavyweight silhouettes, tactile recycled canvas, and double-walled drinkware. Built to work, wear, and last.
        </p>
      </section>

      {/* 13.1 Supporting Grid: Four Essentials in Equal Weight */}
      <section id="gear-drop-essentials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4] block mb-1">
              THE SECOND TIER
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              Four Everyday Essentials
            </h2>
          </div>

          <button
            onClick={handleScrollToGrid}
            className="hidden sm:inline-flex px-3 py-1.5 bg-[#F1F3F4] text-xs font-semibold text-[#202124] rounded-[4px]"
          >
            SHOP THE DROP
          </button>
        </div>

        {/* 4-Item Grid matching Section 13.1 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CAMPAIGN_SUPPORTING_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Bottom Campaign CTA Footer Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="p-8 rounded-[8px] bg-[#F8F9FA] border border-[#E8EAED] text-center space-y-3">
          <h3 className="text-xl font-bold text-[#202124]">
            Ready to gear up?
          </h3>
          <p className="text-xs text-[#5F6368] max-w-md mx-auto">
            All Google Gear Drop orders include free US standard shipping over $50 and are packaged in biodegradable paper shippers.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigate('shop')}
              className="px-5 py-2.5 bg-[#202124] hover:bg-[#3C4043] text-white text-xs font-semibold rounded-[4px] transition-colors"
            >
              Browse Full Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
