import React, { useState } from 'react';
import { Mail, CheckCircle2, MessageSquare, Clock, MapPin } from 'lucide-react';

interface ContactViewProps {
  onNavigate: (view: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: 'Order & Shipping Status',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-20">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4]">
          SUPPORT & ASSISTANCE
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#202124]">
          Contact Google Store Support
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] max-w-md mx-auto">
          Need help with your 1998 Retro order, size exchanges, or shipment status? We're here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-[8px] border border-[#E8EAED] shadow-2xs">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-12 h-12 bg-[#E6F4EA] rounded-full flex items-center justify-center mx-auto text-[#137333]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#202124]">Message Received!</h3>
              <p className="text-xs text-[#5F6368] max-w-xs mx-auto">
                A member of our team will follow up via email ({formData.email}) within 4–6 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs text-[#4285F4] hover:underline font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Jordan Lee"
                  className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] outline-none focus:border-[#4285F4]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] outline-none focus:border-[#4285F4]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">Topic</label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full h-10 px-3 text-xs border border-[#DADCE0] rounded-[4px] outline-none focus:border-[#4285F4] bg-white"
                >
                  <option value="Order & Shipping Status">Order & Shipping Status</option>
                  <option value="Returns & Exchanges">Returns & Exchanges</option>
                  <option value="Sizing & Garment Fit">Sizing & Garment Fit</option>
                  <option value="General Inquiries">General Inquiries</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#202124] block mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you today?"
                  className="w-full p-3 text-xs border border-[#DADCE0] rounded-[4px] outline-none focus:border-[#4285F4]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] transition-colors shadow-2xs"
              >
                Send Support Request
              </button>
            </form>
          )}
        </div>

        {/* Support Context & Fast Help */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-5 bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124]">
              Immediate Resolution
            </h3>
            <p className="text-xs text-[#5F6368]">
              Most inquiries about shipping timeframes, size fit, and returns can be resolved instantly in our Help Center.
            </p>
            <button
              onClick={() => onNavigate('faq')}
              className="w-full py-2 bg-white text-[#4285F4] hover:bg-[#F1F3F4] text-xs font-semibold rounded-[4px] border border-[#DADCE0] transition-colors"
            >
              Browse FAQs & Sizing Guide
            </button>
          </div>

          <div className="p-5 bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED] space-y-3 text-xs text-[#5F6368]">
            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#202124] block">Support Hours</strong>
                <span>Monday – Friday: 9:00 AM – 6:00 PM PT</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#EA4335] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#202124] block">Fulfillment Hub</strong>
                <span>1600 Amphitheatre Pkwy, Mountain View, CA 94043</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
