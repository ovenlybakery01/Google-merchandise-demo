import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FaqViewProps {
  onNavigate: (view: string) => void;
}

interface FaqItem {
  question: string;
  answer: string;
  category: 'Shipping' | 'Returns' | 'Sizing' | 'Orders';
}

const FAQS: FaqItem[] = [
  {
    category: 'Shipping',
    question: 'What are the shipping rates and estimated delivery times?',
    answer: 'Standard US Ground shipping is FREE on all orders over $50 (arriving in 2–4 business days via USPS/FedEx). For orders under $50, standard shipping is a flat $5.99. Express 2-Day Air is available at checkout for $12.00.'
  },
  {
    category: 'Shipping',
    question: 'Where do Google Merchandise orders ship from?',
    answer: 'All orders are carefully packed and dispatched directly from our Mountain View, California fulfillment center.'
  },
  {
    category: 'Returns',
    question: 'What is your return and exchange policy?',
    answer: 'We offer 30-day hassle-free returns on all unworn, unwashed items in original packaging. We provide a prepaid shipping return label upon submission of your order number.'
  },
  {
    category: 'Returns',
    question: 'How long do refunds take to process?',
    answer: 'Once our warehouse receives your return, inspections take 1–2 business days, and funds are automatically refunded to your original payment method in 3–5 banking days.'
  },
  {
    category: 'Sizing',
    question: 'How does the 1998 Marine Layer Pullover fit?',
    answer: 'The 1998 Pullover features an authentic 90s relaxed, slightly boxy silhouette. If you prefer a tailored fit, we recommend ordering one size down. If you love classic retro drape and layering, order your normal size.'
  },
  {
    category: 'Sizing',
    question: 'What are the dimensions of the Google 1998 Socks?',
    answer: 'Our ribbed athletic crew socks are constructed with high-elasticity organic combed cotton and an elastane arch band, fitting US Men’s shoe sizes 7–12 and Women’s 8–13.'
  },
  {
    category: 'Orders',
    question: 'Do I need an account to place an order?',
    answer: 'No! Over 86% of our shoppers are first-time visitors, so guest checkout is enabled by default. You only need to enter your email address for order receipts and real-time tracking.'
  },
  {
    category: 'Orders',
    question: 'Which payment methods are accepted?',
    answer: 'We accept Visa, MasterCard, American Express, Discover, and Google Pay with zero transaction surcharges.'
  }
];

export const FaqView: React.FC<FaqViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const categories = ['All', 'Shipping', 'Returns', 'Sizing', 'Orders'];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchCat = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchQuery =
      searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQuery;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 pb-20">
      <div className="text-center space-y-3">
        <div className="w-12 h-12 bg-[#E8F0FE] rounded-full flex items-center justify-center mx-auto text-[#4285F4]">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#202124]">
          Frequently Asked Questions & Help
        </h1>
        <p className="text-xs sm:text-sm text-[#5F6368] max-w-md mx-auto">
          Instant answers on shipping timeframes, size charts, returns, and order tracking.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mt-4">
          <Search className="w-4 h-4 text-[#5F6368] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g., shipping, returns, sizing)..."
            className="w-full h-10 pl-10 pr-4 text-xs border border-[#DADCE0] rounded-[4px] focus:outline-none focus:border-[#4285F4] bg-white shadow-2xs"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex justify-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-[#202124] text-white font-semibold'
                : 'bg-[#F8F9FA] text-[#5F6368] hover:text-[#202124] border border-[#E8EAED]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center bg-[#F8F9FA] rounded-[6px] border border-[#E8EAED]">
            <p className="text-xs text-[#5F6368]">No matching questions found for "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs text-[#4285F4] font-medium hover:underline"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <div
                key={idx}
                className="border border-[#E8EAED] rounded-[6px] overflow-hidden bg-white shadow-2xs"
              >
                <button
                  onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-[#F8F9FA] transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-[#202124]">
                    {faq.question}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#5F6368] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#5F6368] shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-1 text-xs text-[#5F6368] leading-relaxed border-t border-[#F1F3F4] bg-[#F8F9FA]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="p-6 bg-[#F8F9FA] rounded-[8px] border border-[#E8EAED] text-center space-y-2">
        <h4 className="text-sm font-bold text-[#202124]">Still need assistance?</h4>
        <p className="text-xs text-[#5F6368]">
          Our customer support team in Mountain View is available Mon–Fri 9 AM – 6 PM PT.
        </p>
        <button
          onClick={() => onNavigate('contact')}
          className="mt-2 px-4 py-2 bg-[#4285F4] hover:bg-[#1A73E8] text-white text-xs font-semibold rounded-[4px]"
        >
          Contact Support Team
        </button>
      </div>
    </div>
  );
};
