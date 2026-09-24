import React from 'react';
import { History, Leaf, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-20">
      <div className="space-y-3 text-center sm:text-left">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#4285F4]">
          HERITAGE & CRAFTSMANSHIP
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#202124]">
          About the Google Merchandise Store
        </h1>
        <p className="text-sm text-[#5F6368] leading-relaxed max-w-2xl">
          Crafting thoughtful gear, sustainable everyday carry, and archival garments that connect global creators, engineers, and dreamers to Google culture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-[#202124]">1998 Into The Present</h2>
          <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
            When Larry Page and Sergey Brin founded Google in September 1998, they worked out of Susan Wojcicki's Menlo Park garage. Early Google merch was modest: screen-printed tees for Stanford friends and visiting colleagues.
          </p>
          <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
            Today, our store reimagines that heritage. We design archival fleeces with custom-milled organic French terry, double-wall stainless drinkware for long brainstorms, and recycled canvas totes built to carry laptops and notebooks across the globe.
          </p>
        </div>
        <div className="rounded-[8px] overflow-hidden border border-[#E8EAED] bg-[#F8F9FA] aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
            alt="Collaborative design studio"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
        <div className="p-5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED] space-y-2">
          <Leaf className="w-5 h-5 text-[#34A853]" />
          <h3 className="text-sm font-semibold text-[#202124]">Recycled Materials</h3>
          <p className="text-xs text-[#5F6368]">
            Over 80% of our cotton is GRS certified recycled or organic, and all packaging is 100% plastic-free.
          </p>
        </div>

        <div className="p-5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED] space-y-2">
          <ShieldCheck className="w-5 h-5 text-[#4285F4]" />
          <h3 className="text-sm font-semibold text-[#202124]">Official Authenticity</h3>
          <p className="text-xs text-[#5F6368]">
            Every product is officially licensed by Google LLC, designed with accurate archival typography and color specifications.
          </p>
        </div>

        <div className="p-5 bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED] space-y-2">
          <HeartHandshake className="w-5 h-5 text-[#EA4335]" />
          <h3 className="text-sm font-semibold text-[#202124]">Fair Wear Standards</h3>
          <p className="text-xs text-[#5F6368]">
            We partner exclusively with verified suppliers ensuring ethical labor practices, fair living wages, and safe facilities.
          </p>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={() => onNavigate('gear-drop')}
          className="px-6 py-3 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px] transition-colors"
        >
          Explore the Google Gear Drop
        </button>
      </div>
    </div>
  );
};
