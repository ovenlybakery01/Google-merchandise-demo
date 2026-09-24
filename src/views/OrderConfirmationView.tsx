import React from 'react';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { Order } from '../types';

interface OrderConfirmationViewProps {
  order: Order | null;
  onNavigate: (view: string) => void;
}

export const OrderConfirmationView: React.FC<OrderConfirmationViewProps> = ({ order, onNavigate }) => {
  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#202124]">No recent order found</h2>
        <button
          onClick={() => onNavigate('home')}
          className="px-4 py-2 bg-[#4285F4] text-white text-xs rounded-[4px]"
        >
          Return to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Confirmation Header Banner */}
      <div className="text-center space-y-3">
        <div className="w-14 h-14 bg-[#E6F4EA] rounded-full flex items-center justify-center mx-auto text-[#137333]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-[#137333]">
          Order Confirmed & Payment Verified
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-[#202124]">
          Thank you, {order.shippingInfo.firstName}!
        </h1>

        <p className="text-sm text-[#5F6368] max-w-md mx-auto">
          We’ve received your order and sent confirmation to <strong className="text-[#202124]">{order.shippingInfo.email}</strong>.
        </p>

        <div className="inline-block bg-[#F8F9FA] px-4 py-2 rounded-[6px] border border-[#E8EAED]">
          <span className="text-xs text-[#5F6368]">Order Number: </span>
          <span className="text-xs font-mono font-bold text-[#202124]">{order.orderNumber}</span>
        </div>
      </div>

      {/* Shipment Status Card */}
      <div className="p-5 bg-white border border-[#E8EAED] rounded-[8px] shadow-2xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F1F3F4] pb-3">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#4285F4]" />
            <span className="text-xs font-semibold text-[#202124]">
              Estimated Delivery: {order.estimatedDelivery}
            </span>
          </div>
          <span className="text-xs font-medium text-[#137333] bg-[#E6F4EA] px-2 py-0.5 rounded-[4px]">
            Preparing for Dispatch
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#3C4043]">
          <div>
            <h4 className="font-semibold text-[#202124] mb-1">Shipping Destination</h4>
            <p>{order.shippingInfo.firstName} {order.shippingInfo.lastName}</p>
            <p>{order.shippingInfo.address} {order.shippingInfo.apartment ? `, ${order.shippingInfo.apartment}` : ''}</p>
            <p>{order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}</p>
            <p>{order.shippingInfo.country}</p>
          </div>

          <div>
            <h4 className="font-semibold text-[#202124] mb-1">Billing & Summary</h4>
            <p>Paid via {order.paymentInfo.paymentMethod === 'card' ? 'Credit Card (••4242)' : 'Google Pay'}</p>
            <p className="mt-1 font-bold text-sm text-[#202124]">Total Paid: ${order.total.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Purchased Items List */}
      <div className="bg-[#F8F9FA] p-5 rounded-[8px] border border-[#E8EAED] space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124]">
          Items Ordered ({order.items.reduce((s, i) => s + i.quantity, 0)})
        </h3>
        <div className="divide-y divide-[#E8EAED]">
          {order.items.map((item) => (
            <div key={item.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-12 h-12 object-cover rounded-[4px] border border-[#DADCE0]"
                />
                <div>
                  <p className="font-medium text-[#202124]">{item.product.name}</p>
                  <p className="text-[11px] text-[#5F6368]">
                    Qty: {item.quantity} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                  </p>
                </div>
              </div>
              <span className="font-semibold text-[#202124]">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={() => onNavigate('home')}
          className="flex-1 h-12 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <span>Return to Store Front</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => onNavigate('lookbook')}
          className="px-5 h-12 bg-white hover:bg-[#F8F9FA] text-[#202124] border border-[#DADCE0] text-xs font-semibold rounded-[4px] flex items-center justify-center gap-2 transition-colors"
        >
          <span>Explore Campaign Lookbook</span>
        </button>
      </div>
    </div>
  );
};
