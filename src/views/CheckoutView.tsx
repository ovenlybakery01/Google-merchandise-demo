import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Truck,
  Building,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ShippingInfo, PaymentInfo, Order } from '../types';

interface CheckoutViewProps {
  onOrderComplete: (order: Order) => void;
  onNavigate: (view: string) => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({ onOrderComplete, onNavigate }) => {
  const { items, subtotal, freeShippingThreshold, clearCart, logAnalytics } = useCart();

  // Linear steps: 1: Contact & Address, 2: Shipping Method, 3: Payment, 4: Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@example.com',
    phone: '(415) 555-0198',
    address: '1600 Amphitheatre Pkwy',
    apartment: 'Bldg 42',
    city: 'Mountain View',
    state: 'CA',
    zip: '94043',
    country: 'United States'
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '•••• •••• •••• 4242',
    cardName: 'Alex Rivera',
    expiry: '09/28',
    cvc: '888',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = shippingMethod === 'standard' ? (subtotal >= freeShippingThreshold ? 0 : 5.99) : 12.00;
  const taxCost = subtotal * 0.0825;
  const grandTotal = subtotal + shippingCost + taxCost;

  // Validation functions
  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!shippingInfo.firstName.trim()) errs.firstName = 'First name is required';
    if (!shippingInfo.lastName.trim()) errs.lastName = 'Last name is required';
    if (!shippingInfo.email.trim() || !shippingInfo.email.includes('@')) errs.email = 'Valid email is required for tracking';
    if (!shippingInfo.address.trim()) errs.address = 'Street address is required';
    if (!shippingInfo.city.trim()) errs.city = 'City is required';
    if (!shippingInfo.zip.trim()) errs.zip = 'ZIP code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: Record<string, string> = {};
    if (paymentInfo.paymentMethod === 'card') {
      if (!paymentInfo.cardName.trim()) errs.cardName = 'Name on card is required';
      if (!paymentInfo.cardNumber.trim()) errs.cardNumber = 'Card number is required';
      if (!paymentInfo.expiry.trim()) errs.expiry = 'Expiration required (MM/YY)';
      if (!paymentInfo.cvc.trim()) errs.cvc = 'CVC required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      logAnalytics('checkout_step_2_shipping');
      setCurrentStep(2);
    } else if (currentStep === 2) {
      logAnalytics('checkout_step_3_payment');
      setCurrentStep(3);
    } else if (currentStep === 3) {
      if (!validateStep3()) return;
      logAnalytics('checkout_step_4_review');
      setCurrentStep(4);
    }
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedOrderNumber = `GMS-${Math.floor(100000 + Math.random() * 900000)}`;
      const completedOrder: Order = {
        orderNumber: generatedOrderNumber,
        items,
        subtotal,
        shippingCost,
        tax: taxCost,
        total: grandTotal,
        shippingInfo,
        paymentInfo: {
          lastFour: '4242',
          cardName: paymentInfo.cardName,
          paymentMethod: paymentInfo.paymentMethod
        },
        createdAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        estimatedDelivery: '3–5 Business Days'
      };

      logAnalytics('purchase', {
        order_id: generatedOrderNumber,
        value: grandTotal,
        items_count: items.length
      });

      clearCart();
      setIsProcessing(false);
      onOrderComplete(completedOrder);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b border-[#E8EAED] pb-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold text-[#202124]">
            Google Store Express Checkout
          </h1>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#137333] font-medium bg-[#E6F4EA] px-2.5 py-1 rounded-[4px]">
          <Lock className="w-3.5 h-3.5" />
          <span>Guest Checkout • 256-bit SSL</span>
        </div>
      </div>

      {/* Progress Indicator (Step X of 4) per Section 15.3 */}
      <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-medium text-[#5F6368]">
        {[
          { step: 1, label: 'Contact & Address' },
          { step: 2, label: 'Delivery' },
          { step: 3, label: 'Payment' },
          { step: 4, label: 'Review' }
        ].map((s) => (
          <div
            key={s.step}
            className={`flex items-center gap-1.5 ${
              currentStep === s.step
                ? 'text-[#4285F4] font-bold'
                : currentStep > s.step
                ? 'text-[#34A853]'
                : 'text-[#80868B]'
            }`}
          >
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] ${
                currentStep === s.step
                  ? 'bg-[#4285F4] text-white'
                  : currentStep > s.step
                  ? 'bg-[#34A853] text-white'
                  : 'bg-[#E8EAED] text-[#5F6368]'
              }`}
            >
              {currentStep > s.step ? <Check className="w-3.5 h-3.5" /> : s.step}
            </span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Mobile Collapsible Order Summary Accordion per Section 15.3 */}
      <div className="lg:hidden border border-[#E8EAED] rounded-[6px] overflow-hidden bg-[#F8F9FA]">
        <button
          onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
          className="w-full p-4 flex items-center justify-between text-xs font-semibold text-[#202124]"
        >
          <span>
            {mobileSummaryOpen ? 'Hide' : 'Show'} Order Summary ({items.length} items)
          </span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-[#202124]">${grandTotal.toFixed(2)}</span>
            {mobileSummaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {mobileSummaryOpen && (
          <div className="p-4 border-t border-[#E8EAED] space-y-3 bg-white text-xs">
            {items.map((it) => (
              <div key={it.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img src={it.product.images[0]} alt="" className="w-9 h-9 rounded object-cover" />
                  <div>
                    <p className="font-medium text-[#202124]">{it.product.name}</p>
                    <p className="text-[11px] text-[#5F6368]">Qty: {it.quantity}</p>
                  </div>
                </div>
                <span className="font-semibold text-[#202124]">
                  ${(it.product.price * it.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step-by-Step Form Container */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[8px] border border-[#E8EAED] shadow-2xs space-y-6">
          {/* STEP 1: Contact & Address */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#202124]">
                  1. Contact & Shipping Address (Guest Checkout)
                </h2>
                <span className="text-[11px] text-[#137333]">No account required</span>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">
                  Email Address (for order receipts & tracking) *
                </label>
                <input
                  type="email"
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className={`w-full h-10 px-3 text-xs border rounded-[4px] outline-none ${
                    errors.email ? 'border-[#EA4335]' : 'border-[#DADCE0] focus:border-[#4285F4]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-[#EA4335] mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">First Name *</label>
                  <input
                    type="text"
                    value={shippingInfo.firstName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    className={`w-full h-10 px-3 text-xs border rounded-[4px] outline-none ${
                      errors.firstName ? 'border-[#EA4335]' : 'border-[#DADCE0] focus:border-[#4285F4]'
                    }`}
                  />
                  {errors.firstName && <p className="text-[11px] text-[#EA4335] mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">Last Name *</label>
                  <input
                    type="text"
                    value={shippingInfo.lastName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    className={`w-full h-10 px-3 text-xs border rounded-[4px] outline-none ${
                      errors.lastName ? 'border-[#EA4335]' : 'border-[#DADCE0] focus:border-[#4285F4]'
                    }`}
                  />
                  {errors.lastName && <p className="text-[11px] text-[#EA4335] mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">Street Address *</label>
                <input
                  type="text"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className={`w-full h-10 px-3 text-xs border rounded-[4px] outline-none ${
                    errors.address ? 'border-[#EA4335]' : 'border-[#DADCE0] focus:border-[#4285F4]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-[#EA4335] mt-1">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">City *</label>
                  <input
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className={`w-full h-10 px-3 text-xs border rounded-[4px] outline-none ${
                      errors.city ? 'border-[#EA4335]' : 'border-[#DADCE0] focus:border-[#4285F4]'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-[#EA4335] mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">State *</label>
                  <input
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">ZIP *</label>
                  <input
                    type="text"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    className={`w-full h-10 px-3 text-xs border rounded-[4px] outline-none ${
                      errors.zip ? 'border-[#EA4335]' : 'border-[#DADCE0] focus:border-[#4285F4]'
                    }`}
                  />
                  {errors.zip && <p className="text-[11px] text-[#EA4335] mt-1">{errors.zip}</p>}
                </div>
              </div>

              <button
                id="checkout-step1-continue"
                onClick={handleNextStep}
                className="w-full h-12 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-2 mt-4"
              >
                <span>Continue to Shipping Method</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Shipping Method */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h2 className="text-base font-bold text-[#202124]">
                2. Select Delivery Speed
              </h2>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 border rounded-[6px] flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-[#4285F4] bg-[#E8F0FE]/40'
                      : 'border-[#DADCE0] hover:border-[#80868B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="accent-[#4285F4]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#202124]">
                        Standard US Ground (3–5 Business Days)
                      </p>
                      <p className="text-[11px] text-[#5F6368]">
                        Delivered by USPS / FedEx with tracking
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#202124]">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$5.99'}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 border rounded-[6px] flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-[#4285F4] bg-[#E8F0FE]/40'
                      : 'border-[#DADCE0] hover:border-[#80868B]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="accent-[#4285F4]"
                    />
                    <div>
                      <p className="text-xs font-semibold text-[#202124]">
                        Express 2-Day Air (2 Business Days)
                      </p>
                      <p className="text-[11px] text-[#5F6368]">
                        Guaranteed expedited air courier dispatch
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#202124]">$12.00</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-3 text-xs text-[#5F6368] hover:text-[#202124] border border-[#DADCE0] rounded-[4px]"
                >
                  Back
                </button>
                <button
                  id="checkout-step2-continue"
                  onClick={handleNextStep}
                  className="flex-1 h-12 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#202124]">
                  3. Secure Payment Method
                </h2>
                <div className="flex items-center gap-1 text-[11px] text-[#5F6368]">
                  <CreditCard className="w-4 h-4 text-[#4285F4]" />
                  <span>Visa, MC, Amex, Discover</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8F9FA] rounded-[6px] border border-[#DADCE0] space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">
                    Cardholder Name *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                    className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] bg-white"
                  />
                  {errors.cardName && <p className="text-[11px] text-[#EA4335] mt-1">{errors.cardName}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#202124] block mb-1">
                    Card Number (Demo sandbox prefilled) *
                  </label>
                  <input
                    type="text"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                    className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] bg-white font-mono"
                  />
                  {errors.cardNumber && <p className="text-[11px] text-[#EA4335] mt-1">{errors.cardNumber}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#202124] block mb-1">Expiration *</label>
                    <input
                      type="text"
                      value={paymentInfo.expiry}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] bg-white"
                    />
                    {errors.expiry && <p className="text-[11px] text-[#EA4335] mt-1">{errors.expiry}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#202124] block mb-1">CVC *</label>
                    <input
                      type="text"
                      value={paymentInfo.cvc}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvc: e.target.value })}
                      placeholder="123"
                      className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] bg-white"
                    />
                    {errors.cvc && <p className="text-[11px] text-[#EA4335] mt-1">{errors.cvc}</p>}
                  </div>
                </div>
              </div>

              {/* Trust Signal Note */}
              <div className="flex items-center gap-2 text-xs text-[#5F6368] pt-1">
                <ShieldCheck className="w-4 h-4 text-[#34A853]" />
                <span>Your payment credentials are tokenized and protected by Google Pay standards.</span>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-3 text-xs text-[#5F6368] hover:text-[#202124] border border-[#DADCE0] rounded-[4px]"
                >
                  Back
                </button>
                <button
                  id="checkout-step3-continue"
                  onClick={handleNextStep}
                  className="flex-1 h-12 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-2"
                >
                  <span>Review Final Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review & Place Order */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h2 className="text-base font-bold text-[#202124]">
                4. Review & Confirm Order
              </h2>

              <div className="p-4 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED] text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#5F6368]">Deliver to:</span>
                  <span className="font-semibold text-[#202124]">
                    {shippingInfo.firstName} {shippingInfo.lastName} • {shippingInfo.address}, {shippingInfo.city}, {shippingInfo.state}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5F6368]">Contact:</span>
                  <span className="text-[#202124]">{shippingInfo.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5F6368]">Shipping Speed:</span>
                  <span className="text-[#202124]">
                    {shippingMethod === 'standard' ? 'Standard Ground (3-5 days)' : 'Express 2-Day Air'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5F6368]">Payment:</span>
                  <span className="text-[#202124]">Credit Card (ending in 4242)</span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-3 text-xs text-[#5F6368] hover:text-[#202124] border border-[#DADCE0] rounded-[4px]"
                >
                  Back
                </button>
                <button
                  id="checkout-place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="flex-1 h-12 bg-[#34A853] hover:bg-[#137333] text-white text-sm font-semibold rounded-[4px] flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  {isProcessing ? (
                    <span>Processing Order...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Place Order • ${grandTotal.toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Desktop Persistent Order Summary (Right Column) */}
        <div className="hidden lg:block lg:col-span-5 bg-[#F8F9FA] p-6 rounded-[8px] border border-[#E8EAED] space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124]">
            Order Summary ({items.length} items)
          </h3>

          <div className="divide-y divide-[#E8EAED] max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    className="w-10 h-10 rounded object-cover border border-[#DADCE0] shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-[#202124] truncate">{item.product.name}</p>
                    <p className="text-[11px] text-[#5F6368]">
                      Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-[#202124] pl-2">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E8EAED] pt-3 space-y-2 text-xs text-[#3C4043]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#202124]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="font-medium text-[#202124]">
                {shippingCost === 0 ? <span className="text-[#137333]">FREE</span> : `$${shippingCost.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax (8.25%)</span>
              <span className="font-medium text-[#202124]">${taxCost.toFixed(2)}</span>
            </div>
            <div className="border-t border-[#E8EAED] pt-2 flex justify-between text-base font-bold text-[#202124]">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
