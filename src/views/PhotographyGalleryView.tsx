import React, { useState } from 'react';
import { Camera, Eye, Filter, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
import { LOOKBOOK_PHOTOS } from '../data/lookbook';
import { LookbookPhoto } from '../types';

interface PhotographyGalleryViewProps {
  onOpenLightbox: (photo: LookbookPhoto) => void;
  onNavigateToProduct: (productId: string) => void;
}

export const PhotographyGalleryView: React.FC<PhotographyGalleryViewProps> = ({
  onOpenLightbox,
  onNavigateToProduct
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Lookbook', 'Studio', 'Details', 'Streetwear', '1998 Archive'];

  const filteredPhotos = selectedFilter === 'All'
    ? LOOKBOOK_PHOTOS
    : LOOKBOOK_PHOTOS.filter((p) => p.category === selectedFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20">
      {/* Portfolio Header */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F9FA] rounded-full text-xs font-semibold tracking-wider text-[#4285F4] uppercase border border-[#E8EAED]">
          <Camera className="w-3.5 h-3.5" />
          <span>PORTFOLIO & CAMPAIGN LOOKBOOK</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#202124] tracking-tight">
          Visual Archive & Photography Portfolio
        </h1>

        <p className="text-sm text-[#5F6368] leading-relaxed">
          A minimalist study of Google’s archival garments, tactile materials, and urban environments. Captured on natural light, medium format cameras, and 35mm film.
        </p>
      </div>

      {/* Filter Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-[#E8EAED]">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-4 py-2 rounded-[4px] text-xs font-medium whitespace-nowrap transition-all ${
              selectedFilter === filter
                ? 'bg-[#202124] text-white shadow-xs font-semibold'
                : 'bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124] hover:bg-[#E8EAED]'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Responsive Image Galleries Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => onOpenLightbox(photo)}
            className="group relative flex flex-col bg-white rounded-[6px] overflow-hidden border border-[#E8EAED] cursor-pointer shadow-2xs hover:shadow-md transition-all duration-300"
          >
            {/* Image Container with Aspect Ratio */}
            <div className={`relative w-full ${photo.aspectRatio} bg-[#F8F9FA] overflow-hidden`}>
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Category Pill Tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider rounded-[3px]">
                  {photo.category}
                </span>
              </div>

              {/* View Overlay Action */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-xs text-[#202124] text-xs font-medium rounded-full shadow flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Enlarge Photo</span>
                </span>
              </div>
            </div>

            {/* Photo Metadata Caption Bar */}
            <div className="p-4 flex flex-col justify-between flex-grow bg-white">
              <div>
                <h3 className="text-sm font-semibold text-[#202124] group-hover:text-[#4285F4] transition-colors line-clamp-1">
                  {photo.title}
                </h3>
                <p className="text-xs text-[#5F6368] mt-1 line-clamp-2 leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-[#F1F3F4] flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#80868B] truncate max-w-[180px]">
                  {photo.cameraInfo}
                </span>

                {photo.featuredProductId && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigateToProduct(photo.featuredProductId!);
                    }}
                    className="text-[#4285F4] hover:text-[#1A73E8] font-semibold flex items-center gap-1 shrink-0"
                  >
                    <span>Shop Piece</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
