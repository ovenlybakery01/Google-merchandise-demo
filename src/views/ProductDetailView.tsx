import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  ShoppingBag,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Share2,
  ExternalLink
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductBadge } from '../components/ProductBadge';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

interface ProductDetailViewProps {
  productId: string;
  onNavigate: (view: string, productId?: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  productId,
  onNavigate,
  onQuickView
}) => {
  const { addItem, addToRecentlyViewed, logAnalytics } = useCart();
  const product = PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : ''
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Accordion states
  const [shippingOpen, setShippingOpen] = useState(true);
  const [returnsOpen, setReturnsOpen] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveImageIndex(0);
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0].name);
    }
    setQuantity(1);
    addToRecentlyViewed(product);
    logAnalytics('view_item', {
      product_id: product.id,
      name: product.name,
      price: product.price,
      badge: product.badge
    });
  }, [productId]);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedSize, selectedColor);
    logAnalytics('buy_now_direct', {
      product_id: product.id,
      price: product.price
    });
    onNavigate('checkout');
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && ((product.relatedProductIds && product.relatedProductIds.includes(p.id)) || p.category === product.category)
  ).slice(0, 4);

  // Frequently bought together pairing
  const freqBoughtProduct = PRODUCTS.find((p) => product.frequentlyBoughtWith?.includes(p.id)) || relatedProducts[0] || PRODUCTS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-12 pb-24 md:pb-16">
      {/* Breadcrumbs for orientation */}
      <nav aria-label="Breadcrumbs" className="text-xs text-[#5F6368] flex items-center gap-1.5">
        <button onClick={() => onNavigate('home')} className="hover:text-[#202124]">Home</button>
        <span>/</span>
        <button onClick={() => onNavigate('shop')} className="hover:text-[#202124]">Shop</button>
        <span>/</span>
        <button onClick={() => onNavigate(product.category)} className="capitalize hover:text-[#202124]">
          {product.category}
        </button>
        <span>/</span>
        <span className="text-[#202124] font-medium truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left: Product Images Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-4/3 rounded-[8px] overflow-hidden bg-[#F8F9FA] border border-[#E8EAED]">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <div className="absolute top-3.5 left-3.5 z-10">
                <ProductBadge badge={product.badge} size="md" />
              </div>
            )}
          </div>
        </div>

        {/* Right: Decision-Making Info */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Header / Stock / Title */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
                  <span className="text-xs font-semibold text-[#137333]">
                    {product.availability === 'in_stock'
                      ? 'In stock • Ships in 24 hours'
                      : 'Limited inventory remaining'}
                  </span>
                </div>

                {/* Activity Signal per PRD Section 12 */}
                {product.rating && (
                  <span className="text-xs text-[#5F6368] font-medium bg-[#F8F9FA] px-2.5 py-1 rounded-[4px] border border-[#E8EAED]">
                    ★ {product.rating} ({product.reviewCount || 0}+ verified)
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#202124] tracking-tight leading-snug">
                {product.name}
              </h1>

              {product.productUrl && (
                <div className="mt-1.5">
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1A73E8] hover:text-[#174EA6] hover:underline"
                  >
                    <span>Official Google Merchandise Store Listing</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              <div className="mt-2.5 flex items-baseline gap-3">
                <span className="text-2xl font-bold text-[#202124]">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#5F6368] line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#137333] font-medium bg-[#E6F4EA] px-2 py-0.5 rounded-[4px]">
                  Eligible for Free US Shipping
                </span>
              </div>
            </div>

            {/* Concise Description */}
            {product.description && (
              <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Scannable Product Highlights Bullets per Section 12 */}
            {product.highlights && product.highlights.length > 0 && (
              <div className="p-3.5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED] space-y-1.5">
                <span className="text-xs font-semibold text-[#202124] block mb-1 uppercase tracking-wider">
                  Key Product Highlights
                </span>
                {product.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#3C4043]">
                    <span className="text-[#4285F4] font-bold">•</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-[#202124] mb-2">
                  <span>Size: <strong className="font-semibold">{selectedSize}</strong></span>
                  <button
                    onClick={() => setStoryOpen(!storyOpen)}
                    className="text-[#4285F4] hover:underline"
                  >
                    Fit & Sizing Info
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[44px] h-10 px-3.5 rounded-[4px] text-xs font-medium border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#202124] text-white border-[#202124] shadow-xs'
                          : 'bg-white text-[#202124] border-[#DADCE0] hover:border-[#202124]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="text-xs font-medium text-[#202124] block mb-2">
                  Color: <strong className="font-semibold">{selectedColor}</strong>
                </span>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.name
                          ? 'border-[#4285F4] scale-110 shadow-xs'
                          : 'border-white ring-1 ring-[#DADCE0]'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-[#202124]">Quantity:</span>
                <div className="flex items-center border border-[#DADCE0] rounded-[4px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#5F6368] hover:text-[#202124]"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center text-xs font-semibold text-[#202124]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#5F6368] hover:text-[#202124]"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  id="pdp-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className={`h-12 rounded-[4px] text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all ${
                    added
                      ? 'bg-[#34A853] text-white'
                      : 'bg-[#4285F4] hover:bg-[#1A73E8] text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

                <button
                  id="pdp-buy-now-btn"
                  onClick={handleBuyNow}
                  className="h-12 bg-[#202124] hover:bg-[#3C4043] text-white rounded-[4px] text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {product.productUrl && (
                <div className="pt-2">
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#1A73E8] hover:text-[#174EA6] hover:underline font-medium"
                  >
                    <span>View item on official Google Merchandise Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Expandable Accordions for Shipping & Returns (Section 12) */}
            <div className="border-t border-[#E8EAED] pt-4 space-y-3">
              {/* Shipping Accordion */}
              <div className="border border-[#E8EAED] rounded-[4px] overflow-hidden">
                <button
                  onClick={() => setShippingOpen(!shippingOpen)}
                  className="w-full px-4 py-3 bg-[#F8F9FA] flex items-center justify-between text-xs font-semibold text-[#202124]"
                >
                  <span className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-[#4285F4]" />
                    <span>Shipping Timeframe (US-First)</span>
                  </span>
                  {shippingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {shippingOpen && (
                  <div className="p-4 text-xs text-[#5F6368] space-y-1.5 bg-white border-t border-[#E8EAED]">
                    <p>• <strong>Free US Standard Shipping</strong> on orders over $50 (2–4 business days).</p>
                    <p>• <strong>Express 2-Day Air</strong> available at checkout ($12 flat rate).</p>
                    <p>• Direct dispatch from Mountain View fulfillment hub with real-time tracking.</p>
                  </div>
                )}
              </div>

              {/* Returns Accordion */}
              <div className="border border-[#E8EAED] rounded-[4px] overflow-hidden">
                <button
                  onClick={() => setReturnsOpen(!returnsOpen)}
                  className="w-full px-4 py-3 bg-[#F8F9FA] flex items-center justify-between text-xs font-semibold text-[#202124]"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-[#34A853]" />
                    <span>30-Day Hassle-Free Returns</span>
                  </span>
                  {returnsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {returnsOpen && (
                  <div className="p-4 text-xs text-[#5F6368] space-y-1.5 bg-white border-t border-[#E8EAED]">
                    <p>• Not your fit? Return unworn items within 30 days for a full refund or instant size exchange.</p>
                    <p>• Prepaid shipping labels provided with every return request.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together Bundle Module (Section 11.6 & 12) */}
      {freqBoughtProduct && (
        <section className="p-6 bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368] block mb-2">
            FREQUENTLY BOUGHT TOGETHER
          </span>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-[4px] border border-[#DADCE0]"
              />
              <span className="text-lg font-bold text-[#5F6368]">+</span>
              <img
                src={freqBoughtProduct.images[0]}
                alt={freqBoughtProduct.name}
                className="w-16 h-16 object-cover rounded-[4px] border border-[#DADCE0]"
              />
              <div>
                <p className="text-xs font-semibold text-[#202124]">
                  {product.name} + {freqBoughtProduct.name}
                </p>
                <p className="text-xs text-[#5F6368]">
                  Combine everyday staples and save with free shipping.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <span className="text-xs text-[#5F6368] block">Bundle Price</span>
                <span className="text-base font-bold text-[#202124]">
                  ${(product.price + freqBoughtProduct.price).toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => {
                  addItem(product, 1);
                  addItem(freqBoughtProduct, 1);
                }}
                className="px-4 py-2 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] transition-colors"
              >
                Add Both to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Related Products Grid (Section 11.6 & 12) */}
      <section className="space-y-4 pt-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#202124]">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              onNavigate={onNavigate}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      </section>

      {/* Persistent Sticky Mobile Add to Cart Bar per PRD Section 12 & 16 */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-[#E8EAED] p-3 px-4 shadow-lg flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#202124] truncate max-w-[150px]">
            {product.name}
          </p>
          <p className="text-xs font-bold text-[#202124]">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button
          id="mobile-sticky-add-btn"
          onClick={handleAddToCart}
          className="flex-1 max-w-[200px] h-11 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-1.5 shadow-xs transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
