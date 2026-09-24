import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface MiniCartProps {
  onNavigate: (view: string) => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({ onNavigate }) => {
  const {
    items,
    isMiniCartOpen,
    closeMiniCart,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    addItem,
    logAnalytics
  } = useCart();

  if (!isMiniCartOpen) return null;

  // Cross sell: recommend Tote or Tumbler if not already in cart
  const itemProductIds = items.map((i) => i.product.id);
  const crossSellProducts = PRODUCTS.filter(
    (p) => (p.id === 'google-recycled-canvas-tote' || p.id === 'google-super-g-spectra-tumbler') &&
           !itemProductIds.includes(p.id)
  ).slice(0, 1);

  const handleCheckoutClick = () => {
    closeMiniCart();
    logAnalytics('begin_checkout', {
      source: 'mini_cart',
      value: subtotal,
      items_count: items.length
    });
    onNavigate('checkout');
  };

  const handleViewCartClick = () => {
    closeMiniCart();
    onNavigate('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-opacity"
        onClick={closeMiniCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          id="mini-cart-drawer"
          aria-label="Shopping Cart Drawer"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E8EAED] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#4285F4]" />
              <h2 className="text-base font-semibold text-[#202124]">
                Your Cart ({items.reduce((s, i) => s + i.quantity, 0)})
              </h2>
            </div>
            <button
              id="close-mini-cart"
              onClick={closeMiniCart}
              aria-label="Close cart"
              className="p-1.5 rounded-full text-[#5F6368] hover:text-[#202124] hover:bg-[#F1F3F4] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#F8F9FA] border-b border-[#E8EAED]">
            <div className="flex items-center justify-between text-xs font-medium mb-1.5">
              <span>
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-[#137333] font-semibold">
                    ✓ You qualified for Free US Shipping!
                  </span>
                ) : (
                  <span className="text-[#3C4043]">
                    Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for{' '}
                    <strong className="text-[#202124]">Free US Shipping</strong>
                  </span>
                )}
              </span>
              <span className="text-[#5F6368]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#E8EAED] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#34A853] h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-14 h-14 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto mb-3 text-[#5F6368]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-medium text-[#202124]">Your cart is empty</h3>
                <p className="text-xs text-[#5F6368] mt-1 max-w-xs mx-auto">
                  Explore the Google Gear Drop collection to find archival hoodies, tees, and everyday accessories.
                </p>
                <button
                  onClick={() => {
                    closeMiniCart();
                    onNavigate('gear-drop');
                  }}
                  className="mt-4 px-4 py-2 bg-[#4285F4] text-white text-xs font-medium rounded-[4px] hover:bg-[#1A73E8] transition-colors"
                >
                  Explore Gear Drop
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 pb-4 border-b border-[#F1F3F4] last:border-b-0"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-[4px] object-cover bg-[#F8F9FA] border border-[#E8EAED] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-medium text-[#202124] truncate pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#5F6368] hover:text-[#EA4335] transition-colors p-1"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#5F6368] mt-0.5">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span className="ml-2">• {item.selectedColor}</span>}
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-[#DADCE0] rounded-[4px]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5F6368] hover:text-[#202124]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-medium text-[#202124]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-[#5F6368] hover:text-[#202124]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#202124]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Low-Friction Cross-Sell Recommendation */}
            {items.length > 0 && crossSellProducts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#E8EAED]">
                <span className="text-[11px] font-medium text-[#5F6368] uppercase tracking-wider block mb-2">
                  Frequently Added Together
                </span>
                {crossSellProducts.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED]"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 object-cover rounded-[4px] shrink-0"
                      />
                      <div className="truncate">
                        <p className="text-xs font-medium text-[#202124] truncate">{p.name}</p>
                        <p className="text-[11px] text-[#5F6368]">${p.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => addItem(p, 1)}
                      className="text-xs font-medium text-[#4285F4] hover:text-[#1A73E8] bg-white border border-[#D2E3FC] px-2.5 py-1 rounded-[4px] shrink-0 shadow-xs"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer & Checkout Call-to-action */}
          {items.length > 0 && (
            <div className="p-5 border-t border-[#E8EAED] bg-white space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-normal text-[#5F6368]">Estimated Subtotal</span>
                <span className="text-lg font-bold text-[#202124]">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-[11px] text-[#5F6368]">
                Shipping and taxes calculated at checkout. Free 30-day returns.
              </p>

              <button
                id="mini-cart-checkout-btn"
                onClick={handleCheckoutClick}
                className="w-full h-11 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-sm font-semibold rounded-[4px] flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <span>Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleViewCartClick}
                  className="text-xs text-[#5F6368] hover:text-[#202124] underline transition-colors"
                >
                  View Full Cart
                </button>
                <div className="flex items-center gap-1 text-[11px] text-[#5F6368]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Secure 256-bit checkout</span>
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
