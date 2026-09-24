import React from 'react';
import { Sparkles, History, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Collection1998ViewProps {
  onNavigate: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
}

export const Collection1998View: React.FC<Collection1998ViewProps> = ({
  onNavigate,
  onQuickView
}) => {
  const { addItem, logAnalytics } = useCart();
  const retroProducts = PRODUCTS.filter((p) => p.collections.includes('1998-retro'));

  return (
    <div className="pb-16 space-y-12">
      {/* Editorial Hero Banner per Section 11.5 */}
      <section className="relative bg-[#1A1C1E] text-white overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold tracking-wider text-[#FBBC05] uppercase">
              <History className="w-3.5 h-3.5" />
              <span>THE ARCHIVE SERIES • EST. SEPTEMBER 1998</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              The 1998 Retro Collection
            </h1>

            <p className="text-sm sm:text-base text-[#C4C7C5] max-w-xl leading-relaxed">
              Before algorithms, data centers, and campus shuttles, there was a quiet garage in Menlo Park with borrowed servers and an ambitious idea: organize the world’s information.
            </p>

            <p className="text-xs sm:text-sm text-[#8E918F] max-w-xl leading-relaxed">
              This curated editorial collection recreates the tactile garments of early Silicon Valley — unbleached heavy French terry, athletic ribbed socks with the original primary stripes, and unstructured washed cotton caps.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  logAnalytics('retro_explore_click');
                  document.getElementById('retro-grid')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center gap-2 transition-colors min-h-[44px]"
              >
                <span>Explore the 1998 Vault</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('lookbook')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-[4px] transition-colors min-h-[44px]"
              >
                View Archival Lookbook
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[8px] overflow-hidden border border-white/20 shadow-2xl aspect-4/3">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
                alt="1998 garage archival atmosphere"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-white/90">
                <span className="font-mono text-[#FBBC05] block text-[10px]">
                  PHOTO ARCHIVE: 1998 GARAGE LAB
                </span>
                <span className="font-medium">First Google Server Rack built with toy construction blocks.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED]">
            <span className="text-xs font-bold text-[#4285F4] uppercase tracking-wider block mb-1">
              01 • AUTHENTIC KNITS
            </span>
            <h3 className="text-sm font-semibold text-[#202124]">380 GSM Heavyweight Fleece</h3>
            <p className="text-xs text-[#5F6368] mt-1">
              Spun from sustainably grown organic cotton with a dry, vintage hand-feel that drapes with 90s boxy proportions.
            </p>
          </div>

          <div className="p-5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED]">
            <span className="text-xs font-bold text-[#EA4335] uppercase tracking-wider block mb-1">
              02 • THE PRIMARY PALETTE
            </span>
            <h3 className="text-sm font-semibold text-[#202124]">Original Serif Wordmark</h3>
            <p className="text-xs text-[#5F6368] mt-1">
              Direct high-density embroidery of Google's initial 1998 serif logo with custom-dyed yarns matching our first home page.
            </p>
          </div>

          <div className="p-5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED]">
            <span className="text-xs font-bold text-[#34A853] uppercase tracking-wider block mb-1">
              03 • RESPONSIBLE SOURCING
            </span>
            <h3 className="text-sm font-semibold text-[#202124]">Lifetime Longevity</h3>
            <p className="text-xs text-[#5F6368] mt-1">
              Pre-shrunk, reinforced cross-grain side panels and bar-tacked stress points ensure these pieces outlive fleeting trends.
            </p>
          </div>
        </div>
      </section>

      {/* Curated Product Grid */}
      <section id="retro-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#202124]">
              The 1998 Retro Vault
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              Featuring the Fan Favourite Socks and Marine Layer Pullover
            </p>
          </div>
          <span className="text-xs font-medium text-[#5F6368]">
            {retroProducts.length} Archival Artifacts
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {retroProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
