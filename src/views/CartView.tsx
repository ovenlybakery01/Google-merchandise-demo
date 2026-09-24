import React from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartViewProps {
  onNavigate: (view: string, productId?: string) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress,
    logAnalytics
  } = useCart();

  const handleCheckout = () => {
    logAnalytics('begin_checkout', { source: 'cart_page', value: subtotal });
    onNavigate('checkout');
  };

  const estimatedShipping = subtotal >= freeShippingThreshold ? 0 : 5.99;
  const estimatedTax = subtotal * 0.0825; // 8.25% CA sales tax est.
  const orderTotal = subtotal + estimatedShipping + estimatedTax;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-[#F8F9FA] rounded-full flex items-center justify-center mx-auto text-[#5F6368]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-[#202124]">Your Shopping Cart is Empty</h1>
        <p className="text-sm text-[#5F6368] max-w-sm mx-auto">
          Explore the Google Gear Drop collection to find archival hoodies, tees, and everyday accessories.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('gear-drop')}
            className="px-6 py-3 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] shadow-xs"
          >
            Explore the Gear Drop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-24 md:pb-16">
      <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#202124]">
          Shopping Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)
        </h1>
        <button
          onClick={() => onNavigate('shop')}
          className="text-xs text-[#4285F4] hover:underline flex items-center gap-1 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      {/* Free Shipping Progress */}
      <div className="p-4 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED]">
        <div className="flex justify-between text-xs font-medium mb-1.5">
          <span>
            {subtotal >= freeShippingThreshold ? (
              <strong className="text-[#137333]">✓ You've earned Free US Standard Shipping!</strong>
            ) : (
              <span className="text-[#3C4043]">
                Add ${(freeShippingThreshold - subtotal).toFixed(2)} more for <strong>Free Shipping</strong>
              </span>
            )}
          </span>
          <span className="text-[#5F6368]">{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-[#E8EAED] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#34A853] h-full transition-all duration-300 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items Table + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Line Items (Left) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-[#E8EAED] border border-[#E8EAED] rounded-[8px] bg-white overflow-hidden">
            {items.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-[4px] object-cover bg-[#F8F9FA] border border-[#E8EAED] shrink-0"
                  />
                  <div className="min-w-0">
                    <h3
                      onClick={() => onNavigate('pdp', item.product.id)}
                      className="text-sm font-semibold text-[#202124] hover:text-[#4285F4] cursor-pointer truncate"
                    >
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-[#5F6368] mt-1 space-x-2">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>• Color: {item.selectedColor}</span>}
                    </div>
                    <span className="text-xs font-semibold text-[#202124] mt-1 block sm:hidden">
                      ${item.product.price.toFixed(2)} each
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  {/* Quantity adjustment */}
                  <div className="flex items-center border border-[#DADCE0] rounded-[4px]">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#5F6368] hover:text-[#202124]"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center text-xs font-semibold text-[#202124]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-[#5F6368] hover:text-[#202124]"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[70px]">
                    <span className="text-sm font-bold text-[#202124]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 text-[#5F6368] hover:text-[#EA4335] rounded-full hover:bg-[#F1F3F4] transition-colors"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary (Right) */}
        <div className="lg:col-span-4 bg-[#F8F9FA] p-6 rounded-[8px] border border-[#E8EAED] space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#202124]">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-xs text-[#3C4043]">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#202124]">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span>
                {estimatedShipping === 0 ? (
                  <span className="text-[#137333] font-semibold">FREE</span>
                ) : (
                  `$${estimatedShipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8.25%)</span>
              <span>${estimatedTax.toFixed(2)}</span>
            </div>

            <div className="border-t border-[#E8EAED] pt-3 flex justify-between text-base font-bold text-[#202124]">
              <span>Estimated Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-[11px] text-[#5F6368]">
            Taxes and official delivery schedule verified during checkout.
          </p>

          <button
            id="cart-proceed-checkout-btn"
            onClick={handleCheckout}
            className="w-full h-12 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-sm font-semibold rounded-[4px] flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-xs text-[#5F6368] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#34A853]" />
            <span>Encrypted Guest Checkout Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
