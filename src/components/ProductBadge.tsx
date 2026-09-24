import React from 'react';
import { BadgeType } from '../types';

interface ProductBadgeProps {
  badge: BadgeType;
  className?: string;
  size?: 'sm' | 'md';
}

export const ProductBadge: React.FC<ProductBadgeProps> = ({ badge, className = '', size = 'sm' }) => {
  const getBadgeStyle = () => {
    switch (badge) {
      case 'HERO':
        return 'bg-[#4285F4] text-white border-transparent';
      case 'FAN FAVOURITE':
        return 'bg-[#E6F4EA] text-[#137333] border-[#CEEAD6] font-semibold';
      case 'TRENDING':
        return 'bg-[#FCE8E6] text-[#C5221F] border-[#FAD2CF] font-semibold';
      case 'HIDDEN GEM':
        return 'bg-[#FEF7E0] text-[#B06000] border-[#FEEFC3] font-semibold';
      case 'NEW':
        return 'bg-[#F1F3F4] text-[#3C4043] border-[#DADCE0] font-medium';
      case 'SUPPORTING':
        return 'bg-[#E8F0FE] text-[#1967D2] border-[#D2E3FC] font-medium';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sizeStyle = size === 'sm' ? 'text-[11px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`inline-flex items-center tracking-wider uppercase rounded-[4px] border ${sizeStyle} ${getBadgeStyle()} ${className}`}
    >
      {badge}
    </span>
  );
};
