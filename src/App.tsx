import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MiniCart } from './components/MiniCart';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { LightboxModal } from './components/LightboxModal';

// Views
import { HomeView } from './views/HomeView';
import { GearDropView } from './views/GearDropView';
import { ShopView } from './views/ShopView';
import { Collection1998View } from './views/Collection1998View';
import { ProductDetailView } from './views/ProductDetailView';
import { PhotographyGalleryView } from './views/PhotographyGalleryView';
import { CartView } from './views/CartView';
import { CheckoutView } from './views/CheckoutView';
import { OrderConfirmationView } from './views/OrderConfirmationView';
import { AboutView } from './views/AboutView';
import { FaqView } from './views/FaqView';
import { ContactView } from './views/ContactView';

import { Product, LookbookPhoto, Order } from './types';
import { LOOKBOOK_PHOTOS } from './data/lookbook';
import { BarChart3, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('google-1998-pullover');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<LookbookPhoto | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showAnalyticsDrawer, setShowAnalyticsDrawer] = useState(false);

  const { toastMessage, clearToast, analyticsLog } = useCart();

  const handleNavigate = (view: string, productId?: string, query?: string) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    if (query !== undefined) {
      setSearchQuery(query);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setCurrentView('order-confirmed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#202124]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#202124] text-white px-4 py-2.5 rounded-[4px] shadow-lg text-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span>{toastMessage}</span>
          <button onClick={clearToast} className="text-[#9AA0A6] hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header with sticky category navigation */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
            onOpenLightbox={(photo) => setLightboxPhoto(photo)}
          />
        )}

        {currentView === 'gear-drop' && (
          <GearDropView
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {(currentView === 'shop' ||
          currentView === 'apparel' ||
          currentView === 'accessories' ||
          currentView === 'new-arrivals') && (
          <ShopView
            initialCategory={
              currentView === 'shop'
                ? 'all'
                : currentView === 'apparel'
                ? 'apparel'
                : currentView === 'accessories'
                ? 'accessories'
                : 'new-arrivals'
            }
            initialQuery={searchQuery}
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === '1998-retro' && (
          <Collection1998View
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === 'lookbook' && (
          <PhotographyGalleryView
            onOpenLightbox={(photo) => setLightboxPhoto(photo)}
            onNavigateToProduct={(pId) => handleNavigate('pdp', pId)}
          />
        )}

        {currentView === 'pdp' && (
          <ProductDetailView
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentView === 'cart' && (
          <CartView onNavigate={handleNavigate} />
        )}

        {currentView === 'checkout' && (
          <CheckoutView
            onOrderComplete={handleOrderComplete}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'order-confirmed' && (
          <OrderConfirmationView
            order={completedOrder}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'about' && (
          <AboutView onNavigate={handleNavigate} />
        )}

        {currentView === 'faq' && (
          <FaqView onNavigate={handleNavigate} />
        )}

        {currentView === 'contact' && (
          <ContactView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Modals & Slide-overs */}
      <MiniCart onNavigate={handleNavigate} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onNavigate={handleNavigate}
      />

      <LightboxModal
        photo={lightboxPhoto}
        photos={LOOKBOOK_PHOTOS}
        onClose={() => setLightboxPhoto(null)}
        onSelectPhoto={(p) => setLightboxPhoto(p)}
        onNavigateToProduct={(pId) => handleNavigate('pdp', pId)}
      />

      {/* Live GA4 Event Monitor Floating Inspector (per PRD Section 22 & 26) */}
      <div className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setShowAnalyticsDrawer(!showAnalyticsDrawer)}
          className="bg-white/90 backdrop-blur-xs hover:bg-white text-[#5F6368] hover:text-[#202124] border border-[#DADCE0] shadow-md px-3 py-1.5 rounded-full text-[11px] font-medium flex items-center gap-1.5 transition-all"
          title="GA4 Analytics Event Stream"
        >
          <BarChart3 className="w-3.5 h-3.5 text-[#4285F4]" />
          <span>GA4 Live Events ({analyticsLog.length})</span>
        </button>

        {showAnalyticsDrawer && (
          <div className="absolute bottom-10 left-0 w-80 bg-white border border-[#E8EAED] rounded-[8px] shadow-2xl p-4 text-xs space-y-2 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-[#F1F3F4]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                <strong className="text-[#202124]">GA4 Event Telemetry</strong>
              </div>
              <button
                onClick={() => setShowAnalyticsDrawer(false)}
                className="text-[#5F6368] hover:text-[#202124]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#5F6368]">
              Tracking KPIs from PRD Section 22 (Add-to-cart, Quick Add, Checkout, Drop clicks).
            </p>
            <div className="space-y-1.5 divide-y divide-[#F1F3F4]">
              {analyticsLog.length === 0 ? (
                <p className="text-[#80868B] py-2">Click around to record events...</p>
              ) : (
                analyticsLog.map((log, i) => (
                  <div key={i} className="pt-1.5 text-[11px]">
                    <div className="flex justify-between font-mono text-[10px] text-[#4285F4]">
                      <span>{log.event}</span>
                      <span className="text-[#80868B]">{log.timestamp}</span>
                    </div>
                    {log.details && (
                      <p className="text-[#5F6368] text-[10px] truncate mt-0.5">
                        {JSON.stringify(log.details)}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
