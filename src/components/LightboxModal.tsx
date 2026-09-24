import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ShoppingBag, Camera } from 'lucide-react';
import { LookbookPhoto } from '../types';

interface LightboxModalProps {
  photo: LookbookPhoto | null;
  photos: LookbookPhoto[];
  onClose: () => void;
  onSelectPhoto: (photo: LookbookPhoto) => void;
  onNavigateToProduct?: (productId: string) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  photo,
  photos,
  onClose,
  onSelectPhoto,
  onNavigateToProduct
}) => {
  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    onSelectPhoto(photos[prevIndex]);
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const nextIndex = (currentIndex + 1) % photos.length;
    onSelectPhoto(photos[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos]);

  return (
    <div
      id="lightbox-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Top controls */}
      <div className="flex items-center justify-between text-white z-20" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-[#FBBC05]" />
          <span className="text-xs font-mono text-white/80 tracking-wider">
            LOOKBOOK ARCHIVE • {currentIndex + 1} / {photos.length}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div
        className="relative flex-1 flex items-center justify-center py-2 sm:py-4 select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePrev}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="max-h-[72vh] max-w-full object-contain rounded-[4px] shadow-2xl transition-transform duration-300"
        />

        <button
          onClick={handleNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Metadata & Product Link */}
      <div
        className="bg-black/60 border border-white/10 rounded-[6px] p-4 max-w-2xl mx-auto w-full text-white z-20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-[#FBBC05] font-medium tracking-wide uppercase">
              {photo.category}
            </span>
            <h3 className="text-sm sm:text-base font-semibold text-white mt-0.5">
              {photo.title}
            </h3>
            <p className="text-xs text-white/70 mt-1">{photo.caption}</p>
            <p className="text-[11px] font-mono text-white/50 mt-1.5">{photo.cameraInfo}</p>
          </div>

          {photo.featuredProductId && onNavigateToProduct && (
            <button
              onClick={() => {
                onClose();
                onNavigateToProduct(photo.featuredProductId!);
              }}
              className="shrink-0 px-4 py-2 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Shop Item</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
