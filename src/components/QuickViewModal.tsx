import React, { useState } from 'react';
import { X, Check, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { ProductBadge } from './ProductBadge';
import { useCart } from '../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onNavigate: (view: string, productId?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onNavigate
}) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const currentSize = selectedSize || (product.sizes ? product.sizes[0] : undefined);
  const currentColor = selectedColor || (product.colors ? product.colors[0]?.name : undefined);

  const handleAddToCart = () => {
    addItem(product, 1, currentSize, currentColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  const handleViewFullPDP = () => {
    onClose();
    onNavigate('pdp', product.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        id="quick-view-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Quick view of ${product.name}`}
        className="relative w-full max-w-3xl bg-white rounded-[8px] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 rounded-full bg-white/80 hover:bg-[#F1F3F4] text-[#5F6368] hover:text-[#202124] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image side */}
          <div className="bg-[#F8F9FA] p-6 flex flex-col justify-between">
            <div className="relative aspect-square rounded-[6px] overflow-hidden bg-white border border-[#E8EAED]">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <ProductBadge badge={product.badge} />
                </div>
              )}
            </div>

          </div>

          {/* Details side */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-[#34A853] font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                  In Stock • Mountain View Hub
                </span>
              </div>

              <h2 className="text-lg font-semibold text-[#202124] leading-snug">
                {product.name}
              </h2>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#202124]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#5F6368] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-xs text-[#5F6368] mt-3 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-medium text-[#202124] mb-1.5">
                    <span>Size: {currentSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[38px] h-8 px-2.5 rounded-[4px] text-xs font-medium border transition-all ${
                          currentSize === size
                            ? 'bg-[#202124] text-white border-[#202124]'
                            : 'bg-white text-[#202124] border-[#DADCE0] hover:border-[#202124]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-3">
                  <span className="text-xs font-medium text-[#202124] block mb-1.5">
                    Color: {currentColor}
                  </span>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        title={color.name}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          currentColor === color.name ? 'border-[#4285F4] scale-110' : 'border-white ring-1 ring-[#DADCE0]'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 space-y-2 pt-4 border-t border-[#F1F3F4]">
              <button
                id="quickview-add-to-cart"
                onClick={handleAddToCart}
                className={`w-full h-11 rounded-[4px] text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  added
                    ? 'bg-[#34A853] text-white'
                    : 'bg-[#4285F4] hover:bg-[#1A73E8] text-white shadow-sm'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ${product.price.toFixed(2)}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleViewFullPDP}
                className="w-full py-2 text-xs text-[#4285F4] hover:underline flex items-center justify-center gap-1 font-medium"
              >
                <span>View Full Product Details & Sizing</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {product.productUrl && (
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-1.5 text-xs text-[#5F6368] hover:text-[#1A73E8] flex items-center justify-center gap-1 font-medium transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View on Google Merchandise Store</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
