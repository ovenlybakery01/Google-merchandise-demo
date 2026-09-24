import React, { useState } from 'react';
import { Plus, Check, Eye, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { ProductBadge } from './ProductBadge';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onNavigate: (view: string, productId?: string) => void;
  onQuickView?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onNavigate,
  onQuickView
}) => {
  const { addItem, logAnalytics } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleCardClick = () => {
    logAnalytics('select_item', {
      product_id: product.id,
      product_name: product.name,
      badge: product.badge
    });
    onNavigate('pdp', product.id);
  };

  const currentImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-white border border-[#E8EAED] rounded-[6px] overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer h-full"
    >
      {/* Product Image Area */}
      <div className="relative w-full pt-[100%] bg-[#F8F9FA] overflow-hidden">
        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge in top-left */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <ProductBadge badge={product.badge} />
          </div>
        )}

        {/* Quick View & Official Store link buttons (desktop) */}
        <div className="hidden md:flex items-center gap-1.5 absolute top-2.5 right-2.5 z-10">
          {product.productUrl && (
            <a
              href={product.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title="View on Google Merchandise Store"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-[#5F6368] shadow hover:text-[#1A73E8] hover:bg-white transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {onQuickView && (
            <button
              id={`quick-view-${product.id}`}
              onClick={(e) => {
                e.stopPropagation();
                onQuickView(product);
              }}
              title="Quick View"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/90 text-[#202124] shadow hover:bg-white transition-opacity duration-200 opacity-0 group-hover:opacity-100"
            >
              <Eye className="w-4 h-4 text-[#5F6368]" />
            </button>
          )}
        </div>

        {/* Quick Add floating action button */}
        <div className="absolute bottom-2.5 right-2.5 z-10">
          <button
            id={`quick-add-${product.id}`}
            onClick={handleQuickAdd}
            aria-label={`Quick add ${product.name} to cart`}
            className={`min-w-[40px] h-[40px] px-3.5 flex items-center justify-center gap-1.5 rounded-[4px] text-xs font-medium shadow-sm transition-all duration-150 ${
              addedAnimation
                ? 'bg-[#34A853] text-white'
                : 'bg-[#4285F4] hover:bg-[#1A73E8] text-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Availability State */}
          {product.availability && (
            <div className="flex items-center gap-1.5 mb-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  product.availability === 'in_stock'
                    ? 'bg-[#34A853]'
                    : product.availability === 'low_stock'
                    ? 'bg-[#FBBC05]'
                    : 'bg-[#EA4335]'
                }`}
              />
              <span className="text-[11px] text-[#5F6368]">
                {product.availability === 'in_stock'
                  ? 'In stock • Ready to ship'
                  : product.availability === 'low_stock'
                  ? `Only ${product.stockCount} left`
                  : 'Sold out'}
              </span>
            </div>
          )}

          <h3 className="text-sm md:text-[15px] font-medium text-[#202124] line-clamp-2 leading-snug group-hover:text-[#4285F4] transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-3 pt-2 border-t border-[#F1F3F4] flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-[#202124]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#5F6368] line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.ga4Insight && (
            <span className="text-[10px] text-[#5F6368] bg-[#F8F9FA] px-1.5 py-0.5 rounded border border-[#E8EAED] hidden lg:inline-block">
              {product.role === 'FAN FAVOURITE' ? '585 bought' : product.role === 'HIDDEN GEM' ? 'High Demand' : `${product.reviewCount}+ sold`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
