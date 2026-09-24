import React from 'react';
import { Instagram, Globe, Shield, RefreshCw, Truck } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#F8F9FA] border-t border-[#E8EAED] text-[#5F6368] text-xs">
      {/* Trust Highlights Strip */}
      <div className="border-b border-[#E8EAED] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#E8F0FE] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#4285F4]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#202124]">Fast US Shipping</h4>
                <p className="text-xs text-[#5F6368] mt-0.5">Free standard shipping on all orders over $50.</p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-[#137333]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#202124]">30-Day Easy Returns</h4>
                <p className="text-xs text-[#5F6368] mt-0.5">Hassle-free exchanges and prepaid return labels.</p>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-3 justify-center sm:justify-start">
              <div className="w-10 h-10 rounded-full bg-[#FEF7E0] flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-[#B06000]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#202124]">Official Authenticity</h4>
                <p className="text-xs text-[#5F6368] mt-0.5">Genuine Google licensed merchandise & sustainable fabrics.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Shop Collections
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('gear-drop')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Google Gear Drop
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('1998-retro')}
                  className="hover:text-[#202124] transition-colors"
                >
                  1998 Retro Collection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('apparel')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Apparel & Fleeces
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('accessories')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Totes & Drinkware
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('new-arrivals')}
                  className="hover:text-[#202124] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Editorial & Brand
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('lookbook')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Campaign Lookbook & Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Our Heritage & 1998 Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Sustainable Materials & GRS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Sizing Guide
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Customer Support
            </h5>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Order Tracking & Shipping
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Returns & Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#202124] transition-colors"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-wider text-[#202124] mb-3">
              Organic Social & Community
            </h5>
            <p className="text-xs text-[#5F6368] mb-3 leading-relaxed">
              Follow our Mountain View design studio for behind-the-scenes archival releases and community gear drops.
            </p>
            {/* Instagram prioritized per PRD Section 10.7 */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DADCE0] hover:border-[#202124] rounded-[4px] text-xs font-medium text-[#202124] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#EA4335]" />
              <span>@googlemerch</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-10 pt-6 border-t border-[#E8EAED] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#80868B]">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" />
            <span>United States (USD $) • English</span>
          </div>

          <div>
            © 2026 Google LLC. All rights reserved. Google Merchandise Store Redesign.
          </div>
        </div>
      </div>
    </footer>
  );
};
