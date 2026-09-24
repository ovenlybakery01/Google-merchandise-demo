import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, CAMPAIGN_SUPPORTING_PRODUCTS, CAMPAIGN_HERO_PRODUCT } from '../data/products';
import { ProductBadge } from './ProductBadge';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string, productId?: string, query?: string) => void;
}

const TRENDING_QUERIES = ['1998 Pullover', 'Google Socks', 'Canvas Tote', 'Gradient Tee', 'Spectra Tumbler', 'Heritage Cap'];

const SYNONYMS: Record<string, string> = {
  hoodie: 'pullover',
  sweater: 'pullover',
  sweatshirt: 'pullover',
  bag: 'tote',
  shopper: 'tote',
  cup: 'tumbler',
  bottle: 'tumbler',
  mug: 'tumbler',
  shirt: 'tee',
  tshirt: 'tee',
  hat: 'cap',
  jacket: 'windbreaker'
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { logAnalytics } = useCart();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      logAnalytics('search_open');
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setResults([]);
      return;
    }

    // Synonym replacement
    const words = trimmed.split(/\s+/);
    const normalizedWords = words.map((w) => SYNONYMS[w] || w);
    const searchTarget = normalizedWords.join(' ');

    const filtered = PRODUCTS.filter((product) => {
      const matchName = product.name.toLowerCase().includes(searchTarget) || product.name.toLowerCase().includes(trimmed);
      const matchDesc = product.description
        ? product.description.toLowerCase().includes(searchTarget) || product.description.toLowerCase().includes(trimmed)
        : false;
      const matchCategory = product.category.toLowerCase().includes(searchTarget);
      const matchCollections = product.collections.some((c) => c.includes(searchTarget));
      const matchBadge = product.badge?.toLowerCase().includes(searchTarget);

      return matchName || matchDesc || matchCategory || matchCollections || matchBadge;
    });

    setResults(filtered);
    logAnalytics('search_query', { query: trimmed, count: filtered.length });
  }, [query]);

  if (!isOpen) return null;

  const handleProductSelect = (productId: string) => {
    onClose();
    onNavigate('pdp', productId);
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
  };

  const handleViewAllResults = () => {
    onClose();
    onNavigate('shop', undefined, query);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-start justify-center pt-0 md:pt-16 p-0 md:p-4">
      <div
        id="search-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Search Google Merchandise"
        className="w-full max-w-2xl bg-white md:rounded-[8px] shadow-2xl overflow-hidden min-h-screen md:min-h-0 flex flex-col"
      >
        {/* Search Header Input */}
        <div className="p-4 sm:p-5 border-b border-[#E8EAED] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#5F6368] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            id="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Google gear, 1998 retro, tees, totes..."
            className="flex-1 text-base text-[#202124] placeholder-[#80868B] outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#5F6368] hover:text-[#202124] rounded-full hover:bg-[#F1F3F4]"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs font-medium text-[#5F6368] hover:text-[#202124] bg-[#F1F3F4] rounded-[4px]"
          >
            Close
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 max-h-[70vh] overflow-y-auto">
          {query.trim() === '' ? (
            /* Empty State: Trending queries & Five Campaign Products */
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-[#5F6368] mb-2.5">
                  <TrendingUp className="w-4 h-4 text-[#4285F4]" />
                  <span>TRENDING SEARCHES</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_QUERIES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3 py-1.5 bg-[#F8F9FA] hover:bg-[#E8F0FE] hover:text-[#1A73E8] border border-[#E8EAED] rounded-[4px] text-xs text-[#3C4043] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#5F6368]">
                    <Sparkles className="w-4 h-4 text-[#FBBC05]" />
                    <span>FEATURED GOOGLE GEAR DROP</span>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('gear-drop');
                    }}
                    className="text-xs text-[#4285F4] hover:underline"
                  >
                    View Drop →
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[CAMPAIGN_HERO_PRODUCT, ...CAMPAIGN_SUPPORTING_PRODUCTS].map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="flex items-center gap-3 p-2 rounded-[6px] hover:bg-[#F8F9FA] border border-transparent hover:border-[#E8EAED] cursor-pointer transition-all"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-[4px] object-cover bg-[#F1F3F4] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-medium text-[#202124] truncate">
                            {product.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-semibold text-[#202124]">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.badge && <ProductBadge badge={product.badge} size="sm" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length > 0 ? (
            /* Results Found */
            <div>
              <div className="flex items-center justify-between text-xs text-[#5F6368] mb-3 pb-2 border-b border-[#F1F3F4]">
                <span>{results.length} results matching "{query}"</span>
                <button
                  onClick={handleViewAllResults}
                  className="text-[#4285F4] hover:underline flex items-center gap-1"
                >
                  View in Shop <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductSelect(product.id)}
                    className="flex items-center justify-between p-3 rounded-[6px] hover:bg-[#F8F9FA] border border-[#E8EAED] cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-14 h-14 rounded-[4px] object-cover bg-[#F1F3F4] shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-medium text-[#202124] truncate">
                            {product.name}
                          </h4>
                          {product.badge && <ProductBadge badge={product.badge} size="sm" />}
                        </div>
                        <p className="text-xs text-[#5F6368] line-clamp-1">
                          {product.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-3">
                      <span className="text-sm font-semibold text-[#202124]">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* No Results: Never a dead end per PRD Section 14 */
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#5F6368]">
                <Search className="w-6 h-6 text-[#EA4335]" />
              </div>
              <h3 className="text-sm font-semibold text-[#202124]">
                No exact matches for "{query}"
              </h3>
              <p className="text-xs text-[#5F6368] mt-1 max-w-sm mx-auto">
                Check your spelling or explore the Google Gear Drop favorites below:
              </p>

              <div className="mt-5 text-left">
                <span className="text-xs font-medium text-[#5F6368] block mb-2">
                  TOP PICKS FROM THE GOOGLE GEAR DROP:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {CAMPAIGN_SUPPORTING_PRODUCTS.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductSelect(product.id)}
                      className="flex items-center gap-2.5 p-2 bg-[#F8F9FA] hover:bg-white border border-[#E8EAED] rounded-[4px] cursor-pointer"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-10 h-10 rounded-[3px] object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[#202124] truncate">{product.name}</p>
                        <p className="text-[11px] text-[#5F6368]">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
