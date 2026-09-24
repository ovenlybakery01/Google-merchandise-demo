import { Product } from '../types';
import { MERCH_PRODUCTS } from './merchProducts';

const CURATED_SHOWCASE_PRODUCTS: Product[] = [
  {
    id: 'google-1998-pullover',
    slug: 'google-marine-layer-1998-pullover',
    name: 'Google Marine Layer 1998 Pullover',
    price: 108.00,
    originalPrice: 120.00,
    category: 'apparel',
    collections: ['1998-retro', 'gear-drop', 'new-arrivals', 'apparel'],
    badge: 'HERO',
    role: 'HERO',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop', // classic heather grey pullover
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop', // detail fabric
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop', // folded aesthetic
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop', // model fit
    ],
    description: 'The flagship piece of the Google Gear Drop. Developed in collaboration with Marine Layer, this archival pullover features vintage-washed French terry fleece and the original 1998 Google serif wordmark embroidered with precision at the chest.',
    story: 'In September 1998, Google incorporated with a simple mission and a garage office in Menlo Park. This pullover celebrates that quiet beginning with authentic 90s boxy proportion, custom rib-knit cuffs, and heavyweight 380 GSM sustainably sourced cotton.',
    highlights: [
      '380 GSM Heavyweight Custom French Terry',
      'Original 1998 Google Serif primary embroidery',
      'Pre-shrunk vintage wash for immediate lived-in drape',
      'Machine wash cold, lay flat or tumble dry low'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Vintage Heather Oatmeal', hex: '#E8E5DF' },
      { name: 'Classic Charcoal', hex: '#2F3136' },
      { name: 'Primary Archive Navy', hex: '#1A2A44' }
    ],
    availability: 'in_stock',
    stockCount: 42,
    rating: 4.9,
    reviewCount: 158,
    ga4Insight: {
      revenue: 15975,
      purchases: 158,
      views: 3047,
      highlight: '#1 Top Revenue Flagship ($15,975) & Most Viewed Item'
    },
    relatedProductIds: ['google-1998-socks', 'google-recycled-canvas-tote', 'super-g-gradient-tee'],
    frequentlyBoughtWith: ['google-1998-socks', 'google-super-g-spectra-tumbler']
  },
  {
    id: 'google-1998-socks',
    slug: 'google-1998-socks',
    name: 'Google 1998 Socks',
    price: 16.00,
    category: 'retro',
    collections: ['1998-retro', 'gear-drop', 'apparel'],
    badge: 'FAN FAVOURITE',
    role: 'FAN FAVOURITE',
    images: [
      'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=1200&auto=format&fit=crop', // clean ribbed athletic crew socks
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop', // socks detail
      'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'The runaway underground hit of the Google catalog. Ribbed athletic crew socks finished with the iconic four-color Google heritage stripes (Blue, Red, Yellow, Green) and arch compression for everyday comfort.',
    story: 'Identified in store analytics as the highest-converting single item in catalog history (585 purchases from just 671 product views). Crafted with seamless toe closure and moisture-wicking organic combed cotton.',
    highlights: [
      '80% Combed Organic Cotton, 17% Polyamide, 3% Elastane',
      'Heritage Google 4-Color Jacquard Cuffs',
      'Targeted arch support with cushioned footbed',
      'One size fits most (US Men 7–12 / Women 8–13)'
    ],
    sizes: ['One Size (Fits 7-12)'],
    colors: [
      { name: 'Archive Chalk White', hex: '#F8F9FA' },
      { name: 'Slate Heather', hex: '#5F6368' }
    ],
    availability: 'in_stock',
    stockCount: 110,
    rating: 4.95,
    reviewCount: 585,
    ga4Insight: {
      revenue: 9594,
      purchases: 585,
      views: 671,
      highlight: 'Highest Conversion in Store (87.2% Purchase/View Ratio)'
    },
    relatedProductIds: ['google-1998-pullover', 'google-recycled-canvas-tote', 'super-g-gradient-tee'],
    frequentlyBoughtWith: ['google-1998-pullover', 'google-recycled-canvas-tote']
  },
  {
    id: 'super-g-gradient-tee',
    slug: 'super-g-gradient-tee',
    name: 'Super G Gradient Tee',
    price: 28.00,
    category: 'apparel',
    collections: ['gear-drop', 'new-arrivals', 'apparel'],
    badge: 'TRENDING',
    role: 'TRENDING',
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop', // minimalist white t-shirt on model
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop', // clean black tee
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'A modern staple featuring our refined chromatic Super G emblem. Cut in a contemporary relaxed silhouette from 240 GSM organic ring-spun cotton that gets softer with every wash.',
    story: 'Designed in Mountain View, California for technologists and creators. The gradient micro-emblem at the left chest is printed with water-based eco-pigments that never crack or fade.',
    highlights: [
      '240 GSM Premium Ringspun Cotton',
      'High-definition gradient Super G chest print',
      'Ribbed collar with reinforced back neck tape',
      'Modern relaxed drop-shoulder cut'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Optic White', hex: '#FFFFFF' },
      { name: 'Deep Obsidian', hex: '#1E1F22' },
      { name: 'Sand Khaki', hex: '#D2C8B8' }
    ],
    availability: 'in_stock',
    stockCount: 88,
    rating: 4.8,
    reviewCount: 217,
    ga4Insight: {
      revenue: 5274,
      purchases: 217,
      views: 1564,
      highlight: '#2 Top Revenue T-Shirt with 1,564 organic views'
    },
    relatedProductIds: ['google-1998-pullover', 'google-1998-socks', 'google-super-g-spectra-tumbler'],
    frequentlyBoughtWith: ['google-1998-socks', 'google-recycled-canvas-tote']
  },
  {
    id: 'google-recycled-canvas-tote',
    slug: 'google-recycled-canvas-tote',
    name: 'Google Recycled Canvas Tote',
    price: 18.00,
    category: 'accessories',
    collections: ['gear-drop', 'accessories'],
    badge: 'HIDDEN GEM',
    role: 'HIDDEN GEM',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop', // canvas tote bag clean
      'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=1200&auto=format&fit=crop', // tote bag lifestyle
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'The understated everyday tote built from 16oz recycled cotton duck canvas. Features an internal 14-inch padded laptop slip pocket, brass key clip, and reinforced cross-stitched handles.',
    story: 'One of the store’s quietest legends: 300 verified purchases generated from only 196 catalog views. Loved by engineers, designers, and students carrying MacBooks and Field Notes daily.',
    highlights: [
      '16oz 100% GRS-Certified Recycled Heavyweight Canvas',
      'Internal sleeve fits up to 14" laptop or tablet',
      'Heavy-duty 1.5" webbing shoulder straps (11" drop)',
      'Subtle tonal Google wordmark with recycled leaf stamp'
    ],
    sizes: ['One Size (16" x 14" x 5")'],
    colors: [
      { name: 'Natural Unbleached Ecru', hex: '#F0ECE1' },
      { name: 'Washed Black', hex: '#2C2D30' }
    ],
    availability: 'in_stock',
    stockCount: 65,
    rating: 4.9,
    reviewCount: 300,
    ga4Insight: {
      revenue: 4546.80,
      purchases: 300,
      views: 196,
      highlight: 'Viral Under-the-Radar Gem (153% Purchase-to-View Rate)'
    },
    relatedProductIds: ['google-super-g-spectra-tumbler', 'google-1998-socks', 'google-1998-pullover'],
    frequentlyBoughtWith: ['google-super-g-spectra-tumbler', 'google-1998-pullover']
  },
  {
    id: 'google-super-g-spectra-tumbler',
    slug: 'google-super-g-spectra-tumbler',
    name: 'Google Super G Spectra Tumbler',
    price: 24.00,
    category: 'accessories',
    collections: ['gear-drop', 'accessories'],
    badge: 'SUPPORTING',
    role: 'SUPPORTING',
    images: [
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1200&auto=format&fit=crop', // matte sleek tumbler
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop', // tumbler desk aesthetic
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Double-walled vacuum-insulated stainless steel tumbler with spill-resistant MagSlide lid. Keeps liquids piping hot for 12 hours or ice-cold for 24 hours. Finished with a laser-etched Spectra emblem.',
    story: 'Engineered for long hackathons and morning commutes. Fits all standard car cup holders and features a tactile matte powder coat finish that resists fingerprint marks and condenses zero sweat.',
    highlights: [
      '18/8 Kitchen-grade Pro Stainless Steel',
      'Vacuum insulation: 24 hrs cold / 12 hrs hot',
      'BPA-free splash-proof sliding lid',
      'Dishwasher safe (top rack recommended)'
    ],
    sizes: ['20 oz (590 ml)'],
    colors: [
      { name: 'Matte Vapor White', hex: '#FFFFFF' },
      { name: 'Matte Midnight Slate', hex: '#212529' },
      { name: 'Google Blue Powder', hex: '#4285F4' }
    ],
    availability: 'in_stock',
    stockCount: 54,
    rating: 4.85,
    reviewCount: 181,
    ga4Insight: {
      revenue: 4087.80,
      purchases: 181,
      views: 403,
      highlight: '#1 Most Bundled Accessory ($4,087 Revenue)'
    },
    relatedProductIds: ['google-recycled-canvas-tote', 'super-g-gradient-tee', 'google-1998-pullover'],
    frequentlyBoughtWith: ['google-recycled-canvas-tote', 'google-1998-socks']
  },
  {
    id: 'google-1998-heritage-cap',
    slug: 'google-1998-heritage-cap',
    name: 'Google 1998 Heritage Dad Cap',
    price: 32.00,
    category: 'retro',
    collections: ['1998-retro', 'accessories'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1200&auto=format&fit=crop', // clean baseball cap
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Unstructured 6-panel low-profile dad cap crafted from 100% washed cotton twill. Detailed with direct embroidered 1998 primary logo and an antique brass buckle adjustment strap.',
    highlights: [
      '100% Washed Cotton Chino Twill',
      'Embroidered archival Google serif logo',
      'Adjustable antique brass strap back',
      'Stitched eyelets for ventilation'
    ],
    sizes: ['One Size (Adjustable)'],
    colors: [
      { name: 'Heritage Navy', hex: '#1E293B' },
      { name: 'Washed Stone Khaki', hex: '#E2E8F0' },
      { name: 'Forest Moss', hex: '#334155' }
    ],
    availability: 'in_stock',
    stockCount: 35,
    rating: 4.7,
    reviewCount: 94,
    relatedProductIds: ['google-1998-pullover', 'google-1998-socks'],
    frequentlyBoughtWith: ['google-1998-pullover']
  },
  {
    id: 'google-windbreaker-retro',
    slug: 'google-archive-ripstop-windbreaker',
    name: 'Google Archive Ripstop Windbreaker',
    price: 94.00,
    category: 'apparel',
    collections: ['1998-retro', 'new-arrivals', 'apparel'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1200&auto=format&fit=crop', // jacket
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Water-resistant lightweight ripstop shell engineered with colorblocked heritage panels inspired by early Bay Area tech outerwear. Packable into its own rear zippered pocket.',
    highlights: [
      'Recycled ripstop polyester with DWR water-repellent finish',
      'Concealed zippered storm flap and scuba hood',
      'Elastic cord lock hem cinching system',
      'Packs down to 6x6" travel pouch'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Retro Colorblock White/Navy', hex: '#F1F5F9' },
      { name: 'Carbon Black', hex: '#0F172A' }
    ],
    availability: 'in_stock',
    stockCount: 22,
    rating: 4.8,
    reviewCount: 42,
    relatedProductIds: ['google-1998-pullover', 'super-g-gradient-tee'],
    frequentlyBoughtWith: ['google-1998-socks']
  },
  {
    id: 'google-campus-notebook-set',
    slug: 'google-campus-notebook-pen-set',
    name: 'Google Mountain View Notebook & Pen Set',
    price: 22.00,
    category: 'accessories',
    collections: ['accessories'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Hardcover journal featuring 192 numbered dot-grid pages of bleed-resistant 100 GSM recycled stone paper, paired with an anodized aluminum rollerball pen.',
    highlights: [
      'Tree-free water-resistant stone paper',
      'Lay-flat smyth-sewn binding',
      'Integrated ribbon marker and expandable back pocket',
      'Precision 0.5mm black gel ink cartridge included'
    ],
    sizes: ['A5 (5.8" x 8.3")'],
    colors: [
      { name: 'Minimalist Oatmeal', hex: '#F5F5F0' },
      { name: 'Google Blue Hardcover', hex: '#4285F4' }
    ],
    availability: 'in_stock',
    stockCount: 40,
    rating: 4.9,
    reviewCount: 63,
    relatedProductIds: ['google-recycled-canvas-tote', 'google-super-g-spectra-tumbler'],
    frequentlyBoughtWith: ['google-recycled-canvas-tote']
  },
  {
    id: 'google-1998-heavyweight-hoodie',
    slug: 'google-1998-menlo-park-heavyweight-hoodie',
    name: 'Google 1998 Menlo Park Heavyweight Hoodie',
    price: 98.00,
    originalPrice: 115.00,
    category: 'apparel',
    collections: ['1998-retro', 'apparel', 'new-arrivals'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'An architectural 500 GSM loopback cotton hoodie honoring the iconic Menlo Park garage origin. Features double-needle coverstitching, a crossover hood without drawstrings, and the archival 1998 Google wordmark with vintage exclamation mark.',
    story: 'Back when Google’s first server rack was made of LEGO bricks, warmth during late-night code sprints came from rugged cotton sweatshirts. This piece reconstructs that era with substantial 500 GSM combed cotton and a concealed interior media pocket.',
    highlights: [
      '500 GSM Custom Heavyweight Combed Cotton',
      'Direct embroidered 1998 primary logo on chest',
      'Crossover clean hood with no dangling drawstrings',
      'Ribbed side action gussets for unrestricted movement'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Garage Ash Grey', hex: '#DCDFE4' },
      { name: 'Archive Midnight', hex: '#1C2536' },
      { name: 'Sand Dune', hex: '#C2B69D' }
    ],
    availability: 'in_stock',
    stockCount: 38,
    rating: 4.95,
    reviewCount: 74,
    ga4Insight: {
      revenue: 7252,
      purchases: 74,
      views: 512,
      highlight: 'New Arrival Favorite: 98% 5-Star Review Consensus'
    },
    relatedProductIds: ['google-1998-pullover', 'google-1998-socks', 'google-1998-heritage-cap'],
    frequentlyBoughtWith: ['google-1998-socks', 'google-1998-heritage-cap']
  },
  {
    id: 'google-1998-racer-tee',
    slug: 'google-1998-archival-ringer-tee',
    name: 'Google 1998 Archival Ringer Tee',
    price: 34.00,
    category: 'apparel',
    collections: ['1998-retro', 'apparel'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Vintage collegiate-inspired ringer t-shirt featuring contrast ribbed collar and cuffs, crafted from 200 GSM combed organic cotton with a lightly distressed 1998 Stanford-era graphic.',
    story: 'Reflecting the casual athletic aesthetic worn across Bay Area university computer labs in the late 90s. Soft-washed with natural pumice stones to achieve an authentic broken-in vintage feel from day one.',
    highlights: [
      '100% GOTS-Certified Combed Organic Cotton',
      'Contrast 1x1 rib knit collar and armbands',
      'Eco-friendly water-based discharge screenprint',
      'Pre-shrunk vintage wash finish'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Natural / Navy Trim', hex: '#F4EFEA' },
      { name: 'Heather Grey / Charcoal Trim', hex: '#D8D8D8' }
    ],
    availability: 'in_stock',
    stockCount: 52,
    rating: 4.8,
    reviewCount: 39,
    relatedProductIds: ['google-1998-socks', 'google-1998-heritage-cap', 'super-g-gradient-tee'],
    frequentlyBoughtWith: ['google-1998-socks']
  },
  {
    id: 'google-1998-enamel-pin-set',
    slug: 'google-1998-heritage-enamel-pin-trio',
    name: 'Google 1998 Heritage Enamel Pin Trio',
    price: 18.00,
    category: 'retro',
    collections: ['1998-retro', 'accessories'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Set of three hard cloisonné enamel pins celebrating Google’s founding iconography: the 1998 serif logo with exclamation point, the 3.5" floppy disk archive icon, and the classic "I’m Feeling Lucky" button.',
    story: 'Polished to a mirror sheen with 24k gold-plated brass borders and secure dual rubber clutch backings, ideal for pinning onto denim jackets, tote bags, or lanyard straps.',
    highlights: [
      'Set of 3 collector pins in custom kraft presentation card',
      'Hard enamel with hand-polished jewelry finish',
      'Dual rubber clutch backings for twist prevention',
      'Corrosion-resistant gold electroplating'
    ],
    sizes: ['Set of 3 (1.25" each)'],
    colors: [
      { name: 'Heritage Multi-Color', hex: '#4285F4' }
    ],
    availability: 'in_stock',
    stockCount: 140,
    rating: 4.9,
    reviewCount: 88,
    relatedProductIds: ['google-recycled-canvas-tote', 'google-1998-heritage-cap'],
    frequentlyBoughtWith: ['google-recycled-canvas-tote', 'google-1998-socks']
  },
  {
    id: 'google-1998-wool-blanket',
    slug: 'google-1998-archival-wool-camp-blanket',
    name: 'Google 1998 Archival Wool Camp Blanket',
    price: 145.00,
    category: 'retro',
    collections: ['1998-retro', 'accessories', 'gear-drop'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600369672770-985fd30004eb?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Loom-woven in the Pacific Northwest using 100% pure virgin wool. Features bold archival stripes in Google’s primary blue, red, yellow, and green, bordered by traditional whipped blanket stitching.',
    story: 'A tribute to the outdoor spirit of Northern California. Thick, insulating, and naturally water and odor resistant, this heirloom wool blanket is built to last decades of camping trips, beach bonfires, or studio layering.',
    highlights: [
      '100% Pure Virgin Wool woven on historic jacquard looms',
      'Dimensions: 54" x 72" (Full twin camp proportion)',
      'Subtle debossed leather archival patch in corner',
      'Dry clean only'
    ],
    sizes: ['54" x 72" Throw'],
    colors: [
      { name: 'Archive Heather Navy', hex: '#1E2A38' },
      { name: 'Oatmeal Wool', hex: '#E6E1D8' }
    ],
    availability: 'low_stock',
    stockCount: 8,
    rating: 5.0,
    reviewCount: 26,
    relatedProductIds: ['google-1998-pullover', 'google-super-g-spectra-tumbler'],
    frequentlyBoughtWith: ['google-1998-pullover', 'google-super-g-spectra-tumbler']
  },
  {
    id: 'google-cloud-quarter-zip',
    slug: 'google-cloud-tech-fleece-quarter-zip',
    name: 'Google Cloud Tech Fleece Quarter-Zip',
    price: 86.00,
    category: 'apparel',
    collections: ['apparel', 'new-arrivals', 'gear-drop'],
    badge: 'TRENDING',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Modern technical pullover engineered with bonded spacer microfleece for lightweight thermal regulation. Accented with a matte rubberized YKK zipper and breathable laser-cut underarm ventilation holes.',
    story: 'Designed in Mountain View for seamless transitions from cold air-conditioned server labs to breezy campus walkways. Soft, clean, and wrinkle-resistant for frequent travel.',
    highlights: [
      'Bonded spacer microfleece (310 GSM)',
      'Underarm laser-cut ventilation ports',
      'Tonal matte silicone Google Cloud emblem on cuff',
      'Ergonomic raglan sleeves for frictionless mobility'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Cloud Slate Grey', hex: '#4A5568' },
      { name: 'Deep Carbon', hex: '#1A202C' },
      { name: 'Steel Blue', hex: '#2B6CB0' }
    ],
    availability: 'in_stock',
    stockCount: 44,
    rating: 4.85,
    reviewCount: 112,
    relatedProductIds: ['super-g-gradient-tee', 'google-commuter-rolltop-backpack'],
    frequentlyBoughtWith: ['super-g-gradient-tee', 'google-super-g-spectra-tumbler']
  },
  {
    id: 'google-developer-workshirt',
    slug: 'google-mountain-view-canvas-overshirt',
    name: 'Google Mountain View Canvas Overshirt',
    price: 112.00,
    category: 'apparel',
    collections: ['apparel', 'new-arrivals'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Rugged chore jacket silhouette cut from heavy 12oz duck canvas with triple-needle felled seams. Features dual chest drop pockets, a dedicated pen/stylus slot, and custom matte metal rivet buttons.',
    story: 'A modern staple for makers, engineers, and creators. The unlined structure allows effortless layering over tees and hoodies while developing a personalized patina over years of wear.',
    highlights: [
      '12oz Heavyweight 100% Cotton Duck Canvas',
      'Internal tablet/notebook slip pocket',
      'Reinforced bar-tacking at stress points',
      'Tonal embroidered mini wordmark on back yoke'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Bay Area Tobacco', hex: '#8B5A2B' },
      { name: 'Washed Charcoal', hex: '#2F3337' }
    ],
    availability: 'in_stock',
    stockCount: 29,
    rating: 4.9,
    reviewCount: 48,
    relatedProductIds: ['super-g-gradient-tee', 'google-1998-pullover'],
    frequentlyBoughtWith: ['super-g-gradient-tee', 'google-recycled-canvas-tote']
  },
  {
    id: 'google-chroma-pocket-tee',
    slug: 'google-chroma-heavyweight-pocket-tee',
    name: 'Google Chroma Heavyweight Pocket Tee',
    price: 32.00,
    category: 'apparel',
    collections: ['apparel', 'new-arrivals'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'A crisp, boxy pocket t-shirt crafted from 240 GSM organic ringspun jersey. Accented with signature 4-color micro-bartack embroidery at the pocket seam for a subtle, refined statement.',
    highlights: [
      '240 GSM Heavyweight Organic Cotton',
      'Left chest patch pocket with reinforced corners',
      'Drop-shoulder relaxed modern cut',
      'Blind-stitched hems for sleek silhouette'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Optical Bone', hex: '#F9F8F6' },
      { name: 'Matte Ink', hex: '#151618' },
      { name: 'Sage Green', hex: '#5A6B5C' }
    ],
    availability: 'in_stock',
    stockCount: 65,
    rating: 4.75,
    reviewCount: 92,
    relatedProductIds: ['super-g-gradient-tee', 'google-1998-socks'],
    frequentlyBoughtWith: ['google-1998-socks', 'google-super-g-spectra-tumbler']
  },
  {
    id: 'google-android-bot-crewneck',
    slug: 'android-heritage-embroidered-crewneck',
    name: 'Android Heritage Embroidered Crewneck',
    price: 78.00,
    category: 'apparel',
    collections: ['apparel', 'new-arrivals'],
    badge: 'FAN FAVOURITE',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Classic midweight crewneck sweatshirt featuring tonal high-density embroidery of the beloved Android Bugdroid mascot on the left chest. Soft-brushed interior for maximum warmth.',
    story: 'Android has powered over 3 billion devices around the globe. This sweatshirt honors the open platform that brought computing to everyone with understated styling and premium French terry.',
    highlights: [
      '360 GSM Brushed French Terry Cotton',
      'Tonal high-density silicone Bugdroid emblem',
      'Heavy-rib neck, cuffs, and bottom hem',
      'Garment-dyed for rich color depth'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Android Green', hex: '#3DDC84' },
      { name: 'Dark Heather Slate', hex: '#33383F' },
      { name: 'Oatmeal Melange', hex: '#EAE6DF' }
    ],
    availability: 'in_stock',
    stockCount: 47,
    rating: 4.9,
    reviewCount: 135,
    relatedProductIds: ['super-g-gradient-tee', 'google-1998-socks'],
    frequentlyBoughtWith: ['google-1998-socks', 'google-recycled-canvas-tote']
  },
  {
    id: 'google-commuter-rolltop-backpack',
    slug: 'google-rolltop-modular-commuter-backpack',
    name: 'Google Rolltop Modular Commuter Backpack',
    price: 128.00,
    category: 'accessories',
    collections: ['accessories', 'gear-drop', 'new-arrivals'],
    badge: 'TRENDING',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Weatherproof 24L commuter pack crafted from recycled 840D Cordura ballistic nylon. Features a magnetic Fidlock V-buckle closure, dedicated suspended 16" laptop sleeve, and quick-access side zip.',
    story: 'Built for the modern mobile technologist navigating transit, flights, and bike commutes. An ergonomic airflow EVA back panel keeps you cool while luggage trolley sleeve slides seamlessly over carry-ons.',
    highlights: [
      'Recycled 840D Ballistic Cordura with TPU waterproof coating',
      'Suspended false-bottom compartment fits up to 16" MacBook Pro',
      'German Fidlock magnetic buckle for one-handed operation',
      'Concealed passport and tech organizer pockets'
    ],
    sizes: ['24L (18.5" x 12" x 6")'],
    colors: [
      { name: 'Matte Stealth Black', hex: '#1C1D1F' },
      { name: 'Mineral Stone', hex: '#8F939D' }
    ],
    availability: 'in_stock',
    stockCount: 31,
    rating: 4.9,
    reviewCount: 84,
    relatedProductIds: ['google-recycled-canvas-tote', 'google-super-g-spectra-tumbler'],
    frequentlyBoughtWith: ['google-super-g-spectra-tumbler', 'google-campus-notebook-set']
  },
  {
    id: 'google-wireless-charging-desk-pad',
    slug: 'google-felt-vegan-leather-dual-desk-mat',
    name: 'Google Felt & Vegan Leather Dual Desk Mat',
    price: 48.00,
    category: 'accessories',
    collections: ['accessories', 'new-arrivals'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Dual-sided executive workspace mat pairing soft acoustic wool felt on one side with waterproof vegan pebble leather on the reverse. Features an integrated 15W Qi fast wireless phone charging corner.',
    story: 'Transforms any desktop into an intentional, clutter-free productivity station. The magnetic cable groove prevents charging cords from slipping off your desk during busy workdays.',
    highlights: [
      'Dual-surface: Organic merino wool felt & waterproof PU leather',
      'Built-in 15W Qi-certified fast wireless charging pad',
      'Magnetic cable management recess keeps cables pinned',
      'Spacious 35.4" x 15.7" keyboard and mouse surface'
    ],
    sizes: ['35.4" x 15.7" Large'],
    colors: [
      { name: 'Heather Charcoal / Black Leather', hex: '#373A40' },
      { name: 'Oatmeal Wool / Tan Leather', hex: '#D7CEC7' }
    ],
    availability: 'in_stock',
    stockCount: 41,
    rating: 4.85,
    reviewCount: 67,
    relatedProductIds: ['google-campus-notebook-set', 'google-super-g-spectra-tumbler'],
    frequentlyBoughtWith: ['google-campus-notebook-set']
  },
  {
    id: 'google-borosilicate-glass-carafe',
    slug: 'google-artisan-pour-over-glass-carafe-mug',
    name: 'Google Artisan Pour-Over Glass Carafe & Mug',
    price: 38.00,
    category: 'accessories',
    collections: ['accessories'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Hand-blown lab-grade borosilicate glass pour-over carafe paired with a matching 12oz double-walled coffee glass. Outfitted with an insulated matte silicone grip ring in Google slate.',
    highlights: [
      'Thermal shock resistant borosilicate glass (-20°C to 150°C)',
      'Laser-etched metric & ounce measurement graduations',
      'Reusable stainless steel mesh micro-filter included',
      'Dishwasher and microwave safe'
    ],
    sizes: ['Carafe 600ml + Mug 350ml'],
    colors: [
      { name: 'Clear Glass / Slate Band', hex: '#3C4043' },
      { name: 'Clear Glass / Sand Band', hex: '#D2C8B8' }
    ],
    availability: 'in_stock',
    stockCount: 36,
    rating: 4.9,
    reviewCount: 51,
    relatedProductIds: ['google-super-g-spectra-tumbler', 'google-campus-notebook-set'],
    frequentlyBoughtWith: ['google-super-g-spectra-tumbler']
  },
  {
    id: 'google-tech-organizer-pouch',
    slug: 'google-grid-tek-modular-cable-tech-pouch',
    name: 'Google Grid-Tek Modular Cable & Tech Pouch',
    price: 26.00,
    category: 'accessories',
    collections: ['accessories', 'gear-drop'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1584905066893-7d5c142ba4e1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Accordion-style tech accessories case featuring weather-resistant diamond ripstop fabric, YKK AquaGuard zipper, and elastic retention loops designed to neatly store power bricks, USB-C cords, dongles, and styluses.',
    highlights: [
      'Water-repellent 420D Diamond Ripstop nylon',
      'Elastic woven loops secure up to 8 cables and 2 chargers',
      'Fleece-lined interior zip pocket protects portable SSDs',
      'Flat-lay origami opening for effortless desktop access'
    ],
    sizes: ['8.5" x 5.5" x 2.8"'],
    colors: [
      { name: 'Carbon Black', hex: '#1B1C1E' },
      { name: 'Google Blue Slate', hex: '#3B78DE' }
    ],
    availability: 'in_stock',
    stockCount: 75,
    rating: 4.8,
    reviewCount: 119,
    relatedProductIds: ['google-commuter-rolltop-backpack', 'google-recycled-canvas-tote'],
    frequentlyBoughtWith: ['google-commuter-rolltop-backpack', 'google-recycled-canvas-tote']
  },
  {
    id: 'google-pixel-keycaps-set',
    slug: 'google-chroma-mechanical-keycap-set',
    name: 'Google Chroma Mechanical Keycap Set',
    price: 54.00,
    category: 'accessories',
    collections: ['accessories', 'gear-drop', 'new-arrivals'],
    badge: 'HIDDEN GEM',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Custom 142-key mechanical keyboard keycap set in Cherry profile. Molded from 1.5mm thick double-shot PBT that will never shine or fade, complete with Google primary color modifier accents and developer novelty keys.',
    story: 'Celebrated by mechanical keyboard enthusiasts across open source communities. Features crisp legends, universal ANSI/ISO layout compatibility, and special command keys for Linux, macOS, and ChromeOS.',
    highlights: [
      '1.5mm Ultra-Durable Double-Shot PBT Plastic',
      'Universal compatibility with MX switches & clones',
      'Full 142-key coverage including 60%, 65%, 75%, TKL, and Full Size',
      'Custom novelty Enter, Spacebar, and Escape artisan accents'
    ],
    sizes: ['142-Key Full Set (Cherry Profile)'],
    colors: [
      { name: 'Chroma Minimal Chalk', hex: '#F0F2F5' },
      { name: 'Dark Terminal Obsidian', hex: '#1E2022' }
    ],
    availability: 'in_stock',
    stockCount: 28,
    rating: 4.95,
    reviewCount: 96,
    ga4Insight: {
      revenue: 5184,
      purchases: 96,
      views: 380,
      highlight: 'Key enthusiast favorite with 96 purchases and viral dev shares'
    },
    relatedProductIds: ['google-wireless-charging-desk-pad', 'google-super-g-spectra-tumbler'],
    frequentlyBoughtWith: ['google-wireless-charging-desk-pad']
  },
  {
    id: 'google-insulated-bottle-32oz',
    slug: 'google-hydropure-insulated-stainless-bottle-32oz',
    name: 'Google HydroPure Insulated Stainless Bottle 32oz',
    price: 34.00,
    category: 'accessories',
    collections: ['accessories', 'gear-drop'],
    badge: 'NEW',
    role: 'CATALOG',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=1200&auto=format&fit=crop'
    ],
    description: 'Large-capacity 32oz vacuum flask engineered with pro-grade 18/8 stainless steel and copper thermal lining. Keeps water icy cold for 36 hours. Equipped with leakproof spout lid and integrated silicone carrying loop.',
    highlights: [
      'Triple-wall vacuum insulation with copper lining',
      'Powder-coated textured sweat-free exterior',
      'Wide mouth opening fits standard ice cubes',
      '100% BPA and phthalate-free'
    ],
    sizes: ['32 oz (950 ml)'],
    colors: [
      { name: 'Alpine Matte White', hex: '#FFFFFF' },
      { name: 'Deep Space Navy', hex: '#14213D' },
      { name: 'Google Primary Yellow', hex: '#FBBC05' }
    ],
    availability: 'in_stock',
    stockCount: 62,
    rating: 4.85,
    reviewCount: 142,
    relatedProductIds: ['google-super-g-spectra-tumbler', 'google-commuter-rolltop-backpack'],
    frequentlyBoughtWith: ['google-commuter-rolltop-backpack', 'super-g-gradient-tee']
  }
];

const curatedSlugs = new Set(CURATED_SHOWCASE_PRODUCTS.map((p) => p.slug.toLowerCase()));
const uniqueMerchProducts = MERCH_PRODUCTS.filter((p) => !curatedSlugs.has(p.slug.toLowerCase()));

export const PRODUCTS: Product[] = [...CURATED_SHOWCASE_PRODUCTS, ...uniqueMerchProducts];

export const CAMPAIGN_HERO_PRODUCT = PRODUCTS[0]; // Google Marine Layer 1998 Pullover
export const CAMPAIGN_SUPPORTING_PRODUCTS = [
  PRODUCTS[1], // Google 1998 Socks (Fan Favourite)
  PRODUCTS[2], // Super G Gradient Tee (Trending)
  PRODUCTS[3], // Google Recycled Canvas Tote (Hidden Gem)
  PRODUCTS[4], // Google Super G Spectra Tumbler (Supporting)
];
