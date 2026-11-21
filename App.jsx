import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Bell,
  ShoppingBag,
  User,
  Home,
  LayoutGrid,
  MessageCircle,
  Search,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  X,
  Check,
  SlidersHorizontal,
  ArrowUpDown,
  Heart,
  MapPin,
  Package,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  LogOut,
  ArrowUp,
  Store,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  Eye,
  EyeOff,
  Share2,
  Truck,
  Tag,
  Trash2,
  ZoomIn,
  ZoomOut,
  QrCode
} from 'lucide-react';

/**
 * ============================================================================
 * 1. DESIGN SYSTEM & MOCK CATALOG DATA (id-ID Localization)
 * ============================================================================
 */
const CATEGORIES = [
  { id: 'iphone', slug: 'iphone', name: 'iPhone', count: 4, tagline: 'Titanium. Begitu kuat. Begitu ringan. Begitu Pro.' },
  { id: 'mac', slug: 'mac', name: 'Mac', count: 3, tagline: 'Kekuatan superchip M4 untuk kreativitas tanpa batas.' },
  { id: 'ipad', slug: 'ipad', name: 'iPad', count: 2, tagline: 'Tipis luar biasa. Layar Ultra Retina XDR.' },
  { id: 'watch', slug: 'watch', name: 'Watch', count: 2, tagline: 'Partner kesehatan dan petualangan paling tangguh.' },
  { id: 'airpods', slug: 'airpods', name: 'AirPods', count: 2, tagline: 'Audio spasial personal dan peredam kebisingan aktif.' }
];

const PRODUCTS = [
  {
    id: 'iphone-16-pro',
    slug: 'iphone-16-pro',
    name: 'iPhone 16 Pro',
    category: 'iphone',
    categoryLabel: 'iPhone',
    tagline: 'Halo, Apple Intelligence.',
    price: 21499000,
    badge: 'Baru',
    popular: true,
    latest: true,
    featured: true,
    inStock: true,
    description: 'Desain titanium Grade 5 dengan lapisan mikroblasting baru. Ditenagai chip A18 Pro dan Kontrol Kamera generasi terbaru.',
    specs: [
      { label: 'Layar', value: '6,3 inci Super Retina XDR ProMotion 120Hz' },
      { label: 'Chip', value: 'Apple A18 Pro (CPU 6-core, GPU 6-core)' },
      { label: 'Kamera', value: '48MP Fusion + 48MP Ultra Wide + 12MP 5x Telephoto' },
      { label: 'Konektivitas', value: 'USB-C (USB 3), Wi-Fi 7, 5G' }
    ],
    colors: [
      { name: 'Desert Titanium', hex: '#C5B49E' },
      { name: 'Natural Titanium', hex: '#BAB6AD' },
      { name: 'White Titanium', hex: '#F2F1ED' },
      { name: 'Black Titanium', hex: '#3C3C3D' }
    ],
    storages: [
      { label: '128GB', delta: 0 },
      { label: '256GB', delta: 2500000 },
      { label: '512GB', delta: 6500000 },
      { label: '1TB', delta: 10500000 }
    ],
    artwork: 'smartphone'
  },
  {
    id: 'macbook-pro-14-m4',
    slug: 'macbook-pro-14-m4',
    name: 'MacBook Pro 14"',
    category: 'mac',
    categoryLabel: 'Mac',
    tagline: 'Bertenaga M4 Pro. Baterai hingga 24 jam.',
    price: 27999000,
    badge: 'M4 Pro',
    popular: true,
    latest: true,
    featured: true,
    inStock: true,
    description: 'Performa luar biasa untuk alur kerja profesional dengan layar Liquid Retina XDR dan tiga port Thunderbolt 5.',
    specs: [
      { label: 'Layar', value: '14,2 inci Liquid Retina XDR (1600 nits)' },
      { label: 'Chip', value: 'Apple M4 Pro 12-Core CPU / 16-Core GPU' },
      { label: 'Memori', value: '24GB Unified Memory' },
      { label: 'Baterai', value: 'Hingga 24 jam pemutaran video' }
    ],
    colors: [
      { name: 'Space Black', hex: '#2E2F31' },
      { name: 'Silver', hex: '#E3E4E5' }
    ],
    storages: [
      { label: '512GB SSD', delta: 0 },
      { label: '1TB SSD', delta: 3500000 },
      { label: '2TB SSD', delta: 9500000 }
    ],
    artwork: 'laptop'
  },
  {
    id: 'ipad-pro-11-m4',
    slug: 'ipad-pro-11-m4',
    name: 'iPad Pro 11"',
    category: 'ipad',
    categoryLabel: 'iPad',
    tagline: 'Tipis luar biasa. Chip Apple M4.',
    price: 18499000,
    badge: 'Ultra Retina XDR',
    popular: true,
    latest: false,
    featured: true,
    inStock: true,
    description: 'Produk Apple paling tipis yang pernah ada. Layar Tandem OLED Ultra Retina XDR dengan dukungan Apple Pencil Pro.',
    specs: [
      { label: 'Layar', value: '11 inci Tandem OLED Ultra Retina XDR' },
      { label: 'Chip', value: 'Apple M4 dengan Neural Engine 16-core' },
      { label: 'Ketebalan', value: '5,3 mm (444 gram)' }
    ],
    colors: [
      { name: 'Space Black', hex: '#2B2B2D' },
      { name: 'Silver', hex: '#DFDFE1' }
    ],
    storages: [
      { label: '256GB', delta: 0 },
      { label: '512GB', delta: 3500000 },
      { label: '1TB', delta: 10500000 }
    ],
    artwork: 'tablet'
  },
  {
    id: 'apple-watch-ultra-2',
    slug: 'apple-watch-ultra-2',
    name: 'Apple Watch Ultra 2',
    category: 'watch',
    categoryLabel: 'Watch',
    tagline: 'Petualangan level berikutnya.',
    price: 14999000,
    badge: 'Satin Black',
    popular: false,
    latest: true,
    featured: true,
    inStock: true,
    description: 'Casing titanium 49mm kelas dirgantara. GPS frekuensi ganda presisi tinggi dan ketahanan air hingga 100 meter.',
    specs: [
      { label: 'Casing', value: '49mm Titanium Grade 5' },
      { label: 'Kecerahan', value: 'Hingga 3000 nits Always-On Retina' },
      { label: 'Baterai', value: 'Hingga 36 jam (72 jam Mode Daya Rendah)' }
    ],
    colors: [
      { name: 'Black Titanium', hex: '#262628' },
      { name: 'Natural Titanium', hex: '#C6C2B8' }
    ],
    storages: [
      { label: 'Trail Loop', delta: 0 },
      { label: 'Ocean Band', delta: 0 },
      { label: 'Titanium Milanese', delta: 1800000 }
    ],
    artwork: 'watch'
  },
  {
    id: 'airpods-max-usbc',
    slug: 'airpods-max-usbc',
    name: 'AirPods Max (USB-C)',
    category: 'airpods',
    categoryLabel: 'AirPods',
    tagline: 'Audio fidelitas tinggi yang memukau.',
    price: 8999000,
    badge: 'USB-C',
    popular: true,
    latest: true,
    featured: false,
    inStock: true,
    description: 'Peredam Kebisingan Aktif tingkat Pro, Mode Transparansi Adaptif, dan Audio Spasial Personal dengan pengisian daya USB-C.',
    specs: [
      { label: 'Chip', value: 'Chip headphone Apple H1 (di setiap ear cup)' },
      { label: 'Baterai', value: 'Hingga 20 jam waktu dengar dengan ANC' },
      { label: 'Konektor', value: 'USB-C untuk pengisian daya & audio' }
    ],
    colors: [
      { name: 'Midnight', hex: '#27292E' },
      { name: 'Starlight', hex: '#E5DFD3' },
      { name: 'Blue', hex: '#637B92' },
      { name: 'Orange', hex: '#E38B6A' }
    ],
    storages: [
      { label: 'Standar', delta: 0 },
      { label: '+ AppleCare+', delta: 1199000 }
    ],
    artwork: 'headphones'
  },
  {
    id: 'airpods-pro-2',
    slug: 'airpods-pro-2',
    name: 'AirPods Pro (Generasi ke-2)',
    category: 'airpods',
    categoryLabel: 'AirPods',
    tagline: 'Audio Adaptif. Kini diputar.',
    price: 3999000,
    badge: 'Terlaris',
    popular: true,
    latest: false,
    featured: false,
    inStock: true,
    description: 'Ditenagai chip H2 dengan Peredam Kebisingan Aktif hingga 2x lebih baik dan Casing Pengisi Daya MagSafe (USB-C).',
    specs: [
      { label: 'Chip', value: 'Apple H2 + U1 di Casing MagSafe' },
      { label: 'Ketahanan', value: 'Tahan debu, keringat, dan air (IP54)' }
    ],
    colors: [{ name: 'White', hex: '#F5F5F7' }],
    storages: [{ label: 'USB-C MagSafe', delta: 0 }],
    artwork: 'earbuds'
  }
];

const VOUCHERS = {
  TRXWELCOME: { code: 'TRXWELCOME', discount: 500000, label: 'Diskon Member Baru Rp 500.000' },
  APPLE10: { code: 'APPLE10', discount: 1000000, label: 'Promo Bundling Rp 1.000.000' }
};

/**
 * ============================================================================
 * 2. UTILITIES & VECTOR PRODUCT ARTWORK
 * ============================================================================
 */
function formatIDR(amount) {
  return 'Rp ' + amount.toLocaleString('id-ID');
}

function ProductArtwork({ type, colorHex = '#1D1D1F', className = 'w-20 h-20' }) {
  const isLight = ['#F5F5F7', '#F2F1ED', '#E3E4E5', '#E5DFD3', '#DFDFE1'].includes(colorHex);
  const stroke = isLight ? '#86868B' : colorHex;

  if (type === 'smartphone') {
    return (
      <svg className={className} viewBox="0 0 80 80" fill="none">
        <rect x="22" y="8" width="36" height="64" rx="7" fill={colorHex} stroke="#1D1D1F" strokeWidth="1.5" />
        <rect x="24.5" y="10.5" width="31" height="59" rx="5" fill="#111111" />
        <rect x="34" y="13" width="12" height="3.5" rx="1.75" fill="#2C2C2E" />
        <circle cx="40" cy="40" r="12" stroke="#0071E3" strokeWidth="2" opacity="0.85" />
      </svg>
    );
  }
  if (type === 'laptop') {
    return (
      <svg className={className} viewBox="0 0 80 80" fill="none">
        <rect x="14" y="18" width="52" height="36" rx="4" fill="#111111" stroke={stroke} strokeWidth="2" />
        <rect x="17" y="21" width="46" height="30" rx="2" fill="#1D1D1F" />
        <circle cx="40" cy="36" r="9" stroke="#0071E3" strokeWidth="2" />
        <path d="M8 54H72L69 58C68.5 58.6 67.8 59 67 59H13C12.2 59 11.5 58.6 11 58L8 54Z" fill={colorHex} stroke="#86868B" strokeWidth="1" />
      </svg>
    );
  }
  if (type === 'tablet') {
    return (
      <svg className={className} viewBox="0 0 80 80" fill="none">
        <rect x="18" y="10" width="44" height="60" rx="5" fill="#111111" stroke={stroke} strokeWidth="2" />
        <rect x="21" y="13" width="38" height="54" rx="3" fill="#1D1D1F" />
        <path d="M28 50L38 32L45 43L52 28" stroke="#0071E3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (type === 'watch') {
    return (
      <svg className={className} viewBox="0 0 80 80" fill="none">
        <path d="M31 10H49L51 22H29L31 10Z" fill="#424245" />
        <path d="M29 58H51L49 70H31L29 58Z" fill="#424245" />
        <rect x="24" y="21" width="32" height="38" rx="9" fill={colorHex} stroke="#1D1D1F" strokeWidth="1.5" />
        <rect x="27" y="24" width="26" height="32" rx="6" fill="#111111" />
        <circle cx="40" cy="40" r="8" stroke="#FF9500" strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none">
      <path d="M22 42V36C22 26.0589 30.0589 18 40 18C49.9411 18 58 26.0589 58 36V42" stroke="#86868B" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="16" y="38" width="11" height="20" rx="5.5" fill={colorHex} stroke="#1D1D1F" strokeWidth="1.5" />
      <rect x="53" y="38" width="11" height="20" rx="5.5" fill={colorHex} stroke="#1D1D1F" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * ============================================================================
 * 3. ROUTE REGISTRY & ACCESS METADATA (Strict App.json v1.5.0 Separation)
 * ============================================================================
 */
const STANDALONE_ROUTES = [
  { id: 'checkout', pattern: /^\/checkout$/, access: 'authenticated' },
  { id: 'payment_result', pattern: /^\/payment\/result$/, access: 'authenticated' },
  { id: 'notification', pattern: /^\/notifications$/, access: 'public' },
  { id: 'cart', pattern: /^\/cart$/, access: 'public' },
  { id: 'livechat', pattern: /^\/livechat$/, access: 'public' },
  { id: 'login', pattern: /^\/login$/, access: 'guest_only' },
  { id: 'register', pattern: /^\/register$/, access: 'guest_only' },
  { id: 'forgot_password', pattern: /^\/forgot-password$/, access: 'guest_only' },
  { id: 'product_gallery', pattern: /^\/products\/([^/]+)\/gallery$/, access: 'public' }
];

const APP_SHELL_ROUTES = [
  { id: 'home', pattern: /^\/$/, access: 'public' },
  { id: 'products', pattern: /^\/products$/, access: 'public' },
  { id: 'profile', pattern: /^\/profile$/, access: 'public' },
  { id: 'categories', pattern: /^\/categories$/, access: 'public' },
  { id: 'category_detail', pattern: /^\/categories\/([^/]+)$/, access: 'public' },
  { id: 'product_detail', pattern: /^\/products\/([^/]+)$/, access: 'public' },
  { id: 'search', pattern: /^\/search$/, access: 'public' },
  { id: 'wishlist', pattern: /^\/wishlist$/, access: 'public' },
  { id: 'orders', pattern: /^\/orders$/, access: 'authenticated' },
  { id: 'order_detail', pattern: /^\/orders\/([^/]+)$/, access: 'authenticated' },
  { id: 'addresses', pattern: /^\/account\/addresses$/, access: 'authenticated' },
  { id: 'address_form', pattern: /^\/account\/addresses\/new$/, access: 'authenticated' },
  { id: 'account_settings', pattern: /^\/account\/settings$/, access: 'authenticated' },
  { id: 'help', pattern: /^\/help$/, access: 'public' }
];

function matchRoute(path) {
  // Resolution order: 1. standalone_pages, 2. app_shell_pages
  for (const r of STANDALONE_ROUTES) {
    const m = path.match(r.pattern);
    if (m) return { ...r, shell: 'standalone', param: m[1] || null };
  }
  for (const r of APP_SHELL_ROUTES) {
    const m = path.match(r.pattern);
    if (m) return { ...r, shell: 'app_shell', param: m[1] || null };
  }
  return { id: 'not_found', shell: 'standalone', access: 'public', param: null };
}

/**
 * ============================================================================
 * 4. REUSABLE SHELL COMPONENTS (Header, BottomNavigation, ProductCard)
 * ============================================================================
 */
function AppHeader({ navigate, totalCartItems, unreadNotifCount, user }) {
  return (
    <header
      className="flex-none sticky top-0 z-40 h-[56px] w-full bg-white/95 backdrop-blur-md border-b border-[#E8E8ED] px-4 flex items-center justify-between"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Left: Brand Logo */}
      <button
        onClick={() => navigate('/')}
        aria-label="Beranda Storefront"
        className="flex items-center gap-2 min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#0071E3] active:opacity-80"
      >
        <svg className="w-5 h-5 text-[#1D1D1F] fill-current" viewBox="0 0 170 170">
          <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.08-7.96-9.25-17.18-12.5-27.67-3.26-10.49-4.88-20.55-4.88-30.18 0-11.43 2.86-21.02 8.58-28.76 5.72-7.74 12.91-11.74 21.57-12.01 4.48 0 9.65 1.35 15.52 4.04 5.86 2.7 9.64 4.09 11.33 4.18 1.34 0 5.54-1.63 12.6-4.88 7.06-3.25 13.02-4.65 17.88-4.21 13.52 1.09 23.69 6.36 30.51 15.82-12.18 7.39-18.16 17.64-17.94 30.76.22 10.27 4.05 18.81 11.49 25.63 5.08 4.74 11.05 7.67 17.91 8.81-1.45 4.46-3.13 8.8-5.04 13.03zM119.22 31.01c0 8.02-2.93 15.49-8.79 22.4-7.07 8.27-15.63 13.05-24.91 12.3-.15-.98-.23-2.02-.23-3.13 0-7.71 3.35-15.96 9.31-22.74 2.98-3.42 6.76-6.26 11.34-8.52 4.58-2.26 8.91-3.51 12.99-3.75.2 1.18.29 2.33.29 3.44z" />
        </svg>
        <div className="flex flex-col text-left leading-none">
          <span className="text-[14px] font-semibold tracking-tight text-[#1D1D1F]">Storefront</span>
          <span className="text-[10px] font-medium text-[#86868B] mt-0.5">The Exchange TRX</span>
        </div>
      </button>

      {/* Right: Notification, Cart, Profile (min 44px touch target) */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => navigate('/notifications')}
          aria-label="Notifikasi"
          className="relative w-[44px] h-[44px] rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] active:opacity-80 transition"
        >
          <Bell className="w-5 h-5" strokeWidth={1.75} />
          {unreadNotifCount > 0 && (
            <span className="absolute top-2 right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[#0071E3] text-white text-[10px] font-semibold flex items-center justify-center">
              {unreadNotifCount}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/cart')}
          aria-label="Keranjang Belanja"
          className="relative w-[44px] h-[44px] rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] active:opacity-80 transition"
        >
          <ShoppingBag className="w-5 h-5" strokeWidth={1.75} />
          {totalCartItems > 0 && (
            <span className="absolute top-2 right-1.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#0071E3] text-white text-[10px] font-semibold flex items-center justify-center">
              {totalCartItems}
            </span>
          )}
        </button>

        <button
          onClick={() => navigate('/profile')}
          aria-label="Akun Saya"
          className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7] active:opacity-80 transition"
        >
          {user ? (
            <span className="w-7 h-7 rounded-full bg-[#1D1D1F] text-white text-[11px] font-semibold flex items-center justify-center">
              {user.initials}
            </span>
          ) : (
            <User className="w-5 h-5" strokeWidth={1.75} />
          )}
        </button>
      </div>
    </header>
  );
}

function BottomNavigation({ currentRoute, navigate }) {
  // App.json v1.5.0: items [home -> /, products -> /products, livechat -> /livechat]
  const items = [
    { id: 'home', label: 'Home', icon: Home, route: '/' },
    { id: 'products', label: 'Products', icon: LayoutGrid, route: '/products' },
    { id: 'livechat', label: 'Live Chat', icon: MessageCircle, route: '/livechat' }
  ];

  return (
    <nav
      aria-label="Navigasi Utama"
      className="flex-none w-full bg-white border-t border-[#E8E8ED] px-3 flex items-center justify-around z-50"
      style={{
        minHeight: '64px',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive =
          (item.route === '/' && currentRoute === '/') ||
          (item.route === '/products' && currentRoute.startsWith('/products')) ||
          (item.route === '/livechat' && currentRoute === '/livechat');

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.route)}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
            className={`flex-1 h-[56px] min-h-[44px] flex flex-col items-center justify-center gap-1 transition ${
              isActive ? 'text-[#0071E3]' : 'text-[#86868B] hover:text-[#1D1D1F]'
            }`}
          >
            <Icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.75} />
            <span className="text-[11px] font-medium leading-none">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function ProductCard({ product, isWishlisted, onToggleWishlist, onOpenDetail, onOpenQuickVariant }) {
  return (
    <article
      onClick={() => onOpenDetail(product)}
      className="bg-white rounded-[16px] p-2 flex flex-col justify-between cursor-pointer active:opacity-80 transition group"
    >
      <div>
        <div className="relative w-full aspect-square rounded-[10px] bg-[#F5F5F7] flex items-center justify-center p-3 mb-2.5 overflow-hidden">
          {product.badge && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white text-[10px] font-semibold text-[#0071E3] shadow-sm">
              {product.badge}
            </span>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? 'Hapus dari Wishlist' : 'Tambah ke Wishlist'}
            className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-[#1D1D1F] shadow-sm"
          >
            <Heart
              className={`w-4 h-4 ${isWishlisted ? 'fill-[#D70015] text-[#D70015]' : 'text-[#6E6E73]'}`}
              strokeWidth={1.75}
            />
          </button>
          <div className="transition-transform duration-200 group-hover:scale-105">
            <ProductArtwork type={product.artwork} colorHex={product.colors[0].hex} className="w-20 h-20" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-1.5">
          {product.colors.map((c) => (
            <span
              key={c.name}
              className="w-2.5 h-2.5 rounded-full border border-black/15"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        <h3 className="text-[14px] font-semibold text-[#1D1D1F] leading-[18px] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[12px] text-[#6E6E73] leading-[16px] line-clamp-2 mt-0.5">
          {product.tagline}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3 pt-1 gap-1">
        <span className="text-[13px] font-semibold text-[#1D1D1F] tracking-tight">
          {formatIDR(product.price)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQuickVariant(product);
          }}
          aria-label={`Pilih varian ${product.name}`}
          className="w-8 h-8 rounded-full bg-[#0071E3] text-white flex items-center justify-center hover:bg-[#0066CC] active:scale-95 shrink-0 transition"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

/**
 * ============================================================================
 * 5. APP SHELL PAGES (MainContent)
 * ============================================================================
 */

/* --- 1. HOME PAGE (/) --- */
function HomePage({ navigate, wishlist, toggleWishlist, pushOverlay }) {
  const featuredProducts = PRODUCTS.filter((p) => p.featured);
  const popularProducts = PRODUCTS.filter((p) => p.popular).slice(0, 4);
  const latestProducts = PRODUCTS.filter((p) => p.latest).slice(0, 2);

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Search Entry Pill */}
      <div className="px-4 pt-3">
        <button
          onClick={() => navigate('/search')}
          className="w-full h-[44px] rounded-full bg-[#F5F5F7] px-4 flex items-center gap-3 text-[#86868B] active:bg-[#E8E8ED] transition"
        >
          <Search className="w-5 h-5 text-[#86868B]" strokeWidth={1.75} />
          <span className="text-[14px]">Cari iPhone, MacBook, iPad, AirPods...</span>
        </button>
      </div>

      {/* Hero Banner */}
      <section className="px-4">
        <div className="relative rounded-[24px] bg-[#111111] text-white p-6 overflow-hidden shadow-md">
          <div className="relative z-10 flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-white/15 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#248A3D]" />
              Flagship Storefront · Buka 10.00 – 22.00
            </span>
            <h1 className="text-[26px] font-bold tracking-tight leading-[32px] mt-1">
              Apple The Exchange TRX
            </h1>
            <p className="text-[14px] text-[#D2D2D7] leading-[20px]">
              Jelajahi koleksi perangkat Apple terbaru dengan cicilan 0% dan pengambilan ekspres di toko.
            </p>
            <div className="flex items-center gap-2.5 mt-4">
              <button
                onClick={() => navigate('/products')}
                className="h-[44px] px-5 rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-[14px] font-semibold transition"
              >
                Belanja Sekarang
              </button>
              <button
                onClick={() => navigate('/products/iphone-16-pro')}
                className="h-[44px] px-4 rounded-full bg-white/15 hover:bg-white/25 text-white text-[14px] font-medium transition"
              >
                iPhone 16 Pro
              </button>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#0071E3]/30 blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* Quick Categories */}
      <section className="flex flex-col gap-3">
        <div className="px-4 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight text-[#1D1D1F]">Kategori Pilihan</h2>
          <button
            onClick={() => navigate('/categories')}
            className="text-[14px] font-medium text-[#0071E3] min-h-[44px] flex items-center"
          >
            Semua
          </button>
        </div>
        <div className="flex gap-2.5 overflow-x-auto px-4 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(`/categories/${cat.slug}`)}
              className="shrink-0 h-[40px] px-4 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] text-[14px] font-medium text-[#1D1D1F] transition"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight text-[#1D1D1F]">Produk Unggulan</h2>
          <button
            onClick={() => navigate('/products')}
            className="text-[14px] font-medium text-[#0071E3] min-h-[44px] flex items-center"
          >
            Lihat semua
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
              onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
              onOpenQuickVariant={(prod) => pushOverlay({ type: 'bottom_sheet', id: 'variant_selector', payload: prod })}
            />
          ))}
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="px-4">
        <div className="rounded-[16px] bg-[#EAF3FF] p-4 flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
              Penawaran Khusus
            </span>
            <h3 className="text-[16px] font-semibold text-[#1D1D1F]">
              Potongan Rp 500.000 dengan kode TRXWELCOME
            </h3>
            <p className="text-[12px] text-[#6E6E73]">
              Berlaku untuk semua pembelian produk Apple hari ini.
            </p>
          </div>
          <button
            onClick={() => navigate('/products')}
            aria-label="Lihat Promo"
            className="shrink-0 w-[44px] h-[44px] rounded-full bg-[#0071E3] text-white flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Popular Products */}
      <section className="px-4 flex flex-col gap-3">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1D1D1F]">Paling Populer</h2>
        <div className="grid grid-cols-2 gap-3">
          {popularProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
              onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
              onOpenQuickVariant={(prod) => pushOverlay({ type: 'bottom_sheet', id: 'variant_selector', payload: prod })}
            />
          ))}
        </div>
      </section>

      {/* Latest Products & Content Highlights */}
      <section className="px-4 flex flex-col gap-3">
        <h2 className="text-[20px] font-semibold tracking-tight text-[#1D1D1F]">Rilis Terbaru</h2>
        <div className="grid grid-cols-2 gap-3">
          {latestProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
              onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
              onOpenQuickVariant={(prod) => pushOverlay({ type: 'bottom_sheet', id: 'variant_selector', payload: prod })}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/* --- 2. PRODUCTS PAGE (/products) --- */
function ProductsPage({ navigate, wishlist, toggleWishlist, pushOverlay }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(50000000);
  const [keyword, setKeyword] = useState('');

  const filteredProducts = useMemo(() => {
    const list = PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (p.price > maxPrice) return false;
      if (keyword && !p.name.toLowerCase().includes(keyword.toLowerCase())) return false;
      return true;
    });

    if (sortBy === 'price_asc') return [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [selectedCategory, sortBy, maxPrice, keyword]);

  return (
    <div className="flex flex-col gap-4 pt-3 pb-8">
      {/* Page Header & Search Entry */}
      <div className="px-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-bold tracking-tight text-[#1D1D1F]">Semua Produk</h1>
            <p className="text-[12px] text-[#6E6E73]">{filteredProducts.length} produk tersedia</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                pushOverlay({
                  type: 'bottom_sheet',
                  id: 'filter_sheet',
                  payload: { maxPrice, setMaxPrice }
                })
              }
              className="h-[36px] px-3.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[13px] font-medium flex items-center gap-1.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={() =>
                pushOverlay({
                  type: 'bottom_sheet',
                  id: 'sort_sheet',
                  payload: { sortBy, setSortBy }
                })
              }
              className="h-[36px] px-3.5 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[13px] font-medium flex items-center gap-1.5"
            >
              <ArrowUpDown className="w-4 h-4" />
              Urutkan
            </button>
          </div>
        </div>

        {/* Inline Keyword Filter */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#86868B] absolute left-3.5" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Filter nama produk..."
            className="w-full h-[40px] pl-10 pr-4 rounded-full bg-[#F5F5F7] text-[14px] text-[#1D1D1F] placeholder-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`shrink-0 h-[36px] px-4 rounded-full text-[13px] font-medium transition ${
              selectedCategory === 'all' ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#424245]'
            }`}
          >
            Semua
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`shrink-0 h-[36px] px-4 rounded-full text-[13px] font-medium transition ${
                selectedCategory === c.id ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#424245]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4 grid grid-cols-2 gap-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
              onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
              onOpenQuickVariant={(prod) => pushOverlay({ type: 'bottom_sheet', id: 'variant_selector', payload: prod })}
            />
          ))
        ) : (
          <div className="col-span-2 py-12 text-center flex flex-col items-center gap-2">
            <p className="text-[16px] font-semibold text-[#1D1D1F]">Produk tidak ditemukan</p>
            <p className="text-[13px] text-[#6E6E73]">Coba atur ulang filter kategori atau rentang harga Anda.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setMaxPrice(50000000);
                setKeyword('');
              }}
              className="mt-2 h-[40px] px-5 rounded-full bg-[#0071E3] text-white text-[14px] font-semibold"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- 3. LIVE CHAT PAGE (Standalone /livechat) --- */
function LiveChatPage({ chatMessages, setChatMessages, navigate }) {
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const userMsg = { id: 'u-' + Date.now(), sender: 'customer', name: 'Anda', text: trimmed, time };
    setChatMessages((prev) => [...prev, userMsg]);
    setInput('');

    setTimeout(() => {
      let replyText =
        'Terima kasih telah menghubungi Apple The Exchange TRX! Stok tersedia untuk pengambilan hari ini di Lantai G.';
      if (trimmed.toLowerCase().includes('cicilan')) {
        replyText = 'Kami mendukung cicilan 0% hingga 24 bulan dengan kartu kredit BCA, Mandiri, BNI, dan CIMB.';
      } else if (trimmed.toLowerCase().includes('jam')) {
        replyText = 'Toko buka setiap hari pukul 10.00 – 22.00 termasuk hari libur nasional.';
      }
      setChatMessages((prev) => [
        ...prev,
        { id: 'a-' + Date.now(), sender: 'agent', name: 'Mei Ling · Spesialis TRX', text: replyText, time }
      ]);
    }, 700);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-[100dvh] min-h-[100dvh] bg-white">
      {/* Standalone Conversation Header */}
      <div className="flex-none h-[56px] px-4 border-b border-[#E8E8ED] bg-white flex items-center gap-2">
        <button
          onClick={() => navigate('/')}
          aria-label="Kembali ke Beranda"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F] hover:bg-[#F5F5F7]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="relative w-9 h-9 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[12px] font-semibold">
          ML
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#248A3D] ring-2 ring-white" />
        </div>
        <div className="ml-1">
          <h1 className="text-[15px] font-semibold text-[#1D1D1F] leading-tight">Live Chat Spesialis</h1>
          <p className="text-[11px] text-[#6E6E73]">Online · Rata-rata balasan &lt; 1 menit</p>
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-3 no-scrollbar">
        {chatMessages.map((m) => {
          const isMe = m.sender === 'customer';
          return (
            <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
              <span className="text-[11px] text-[#86868B] mb-1 px-1">
                {m.name} · {m.time}
              </span>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-[16px] text-[14px] leading-[20px] ${
                  isMe
                    ? 'bg-[#0071E3] text-white rounded-br-[4px]'
                    : 'bg-[#F5F5F7] text-[#1D1D1F] rounded-bl-[4px]'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      {/* Support Entry Prompts */}
      <div className="flex-none px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-[#E8E8ED]">
        {['Cek stok iPhone 16 Pro', 'Info cicilan 0%', 'Jam operasional toko'].map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="shrink-0 h-[32px] px-3 rounded-full bg-[#EAF3FF] text-[#0071E3] text-[12px] font-medium"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex-none p-3 border-t border-[#E8E8ED] bg-white flex items-center gap-2"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 0px))' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tulis pesan ke Spesialis Apple..."
          className="flex-1 h-[48px] px-4 rounded-full bg-[#F5F5F7] text-[16px] text-[#1D1D1F] placeholder-[#86868B] outline-none focus:ring-2 focus:ring-[#0071E3]"
        />
        <button
          type="submit"
          aria-label="Kirim Pesan"
          className="w-[48px] h-[48px] rounded-full bg-[#0071E3] text-white flex items-center justify-center shrink-0 active:scale-95 transition"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

/* --- 4 & 5. CATEGORIES & CATEGORY DETAIL (/categories, /categories/:slug) --- */
function CategoriesPage({ navigate }) {
  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[24px] font-bold text-[#1D1D1F]">Kategori Produk</h1>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => navigate(`/categories/${cat.slug}`)}
            className="p-4 rounded-[16px] bg-[#F5F5F7] hover:bg-[#E8E8ED] flex items-center justify-between text-left transition"
          >
            <div>
              <h2 className="text-[18px] font-semibold text-[#1D1D1F]">{cat.name}</h2>
              <p className="text-[13px] text-[#6E6E73] mt-0.5">{cat.tagline}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#86868B] shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CategoryDetailPage({ slug, navigate, wishlist, toggleWishlist, pushOverlay }) {
  const category = CATEGORIES.find((c) => c.slug === slug) || CATEGORIES[0];
  const items = PRODUCTS.filter((p) => p.category === category.id);

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/categories')}
          aria-label="Kembali ke Kategori"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-[24px] font-bold text-[#1D1D1F]">{category.name}</h1>
          <p className="text-[12px] text-[#6E6E73]">{category.tagline}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {items.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            isWishlisted={wishlist.includes(p.id)}
            onToggleWishlist={toggleWishlist}
            onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
            onOpenQuickVariant={(prod) => pushOverlay({ type: 'bottom_sheet', id: 'variant_selector', payload: prod })}
          />
        ))}
      </div>
    </div>
  );
}

/* --- 6. PRODUCT DETAIL PAGE (/products/:slug) --- */
function ProductDetailPage({ slug, navigate, wishlist, toggleWishlist, addToCart, showToast }) {
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [colorIdx, setColorIdx] = useState(0);
  const [storageIdx, setStorageIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const selectedColor = product.colors[colorIdx] || product.colors[0];
  const selectedStorage = product.storages[storageIdx] || product.storages[0];
  const unitPrice = product.price + selectedStorage.delta;
  const isWishlisted = wishlist.includes(product.id);

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 2);

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Top Action Bar */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <button
          onClick={() => navigate('/products')}
          aria-label="Kembali ke Produk"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-1">
          <button
            onClick={() => toggleWishlist(product.id)}
            aria-label="Simpan ke Wishlist"
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[#1D1D1F]"
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D70015] text-[#D70015]' : ''}`} />
          </button>
          <button
            onClick={() => showToast('Tautan produk disalin ke papan klip', 'success')}
            aria-label="Bagikan Produk"
            className="w-[44px] h-[44px] rounded-full flex items-center justify-center text-[#1D1D1F]"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Gallery (Tap for Standalone Full-Screen Gallery) */}
      <div className="px-4">
        <div
          onClick={() => navigate(`/products/${product.slug}/gallery`)}
          className="relative w-full aspect-square rounded-[20px] bg-[#F5F5F7] flex flex-col items-center justify-center p-6 cursor-pointer"
        >
          <ProductArtwork type={product.artwork} colorHex={selectedColor.hex} className="w-44 h-44" />
          <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 text-[11px] font-medium text-[#1D1D1F] flex items-center gap-1 shadow-sm">
            <ZoomIn className="w-3.5 h-3.5" /> Galeri Layar Penuh
          </span>
        </div>
      </div>

      {/* Product Summary & Price */}
      <div className="px-4 flex flex-col gap-1.5">
        <span className="text-[12px] font-semibold uppercase tracking-wider text-[#0071E3]">
          {product.categoryLabel}
        </span>
        <h1 className="text-[26px] font-bold text-[#1D1D1F] leading-tight">{product.name}</h1>
        <p className="text-[20px] font-semibold text-[#1D1D1F] mt-1">{formatIDR(unitPrice)}</p>
        <p className="text-[13px] text-[#248A3D] font-medium flex items-center gap-1.5 mt-1">
          <CheckCircle2 className="w-4 h-4" /> Tersedia untuk Pengambilan di Toko & Pengiriman Ekspres
        </p>
      </div>

      {/* Variant Selector */}
      <div className="px-4 flex flex-col gap-4 border-y border-[#E8E8ED] py-4">
        <div>
          <span className="text-[13px] font-semibold text-[#1D1D1F]">
            Warna: <span className="font-normal text-[#6E6E73]">{selectedColor.name}</span>
          </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {product.colors.map((c, idx) => (
              <button
                key={c.name}
                onClick={() => setColorIdx(idx)}
                className={`h-[40px] px-3 rounded-full border flex items-center gap-2 text-[13px] font-medium ${
                  idx === colorIdx
                    ? 'border-[#0071E3] bg-[#EAF3FF]/50 text-[#1D1D1F]'
                    : 'border-[#D2D2D7] text-[#424245]'
                }`}
              >
                <span className="w-4 h-4 rounded-full border border-black/15" style={{ backgroundColor: c.hex }} />
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[13px] font-semibold text-[#1D1D1F]">Kapasitas / Varian</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {product.storages.map((s, idx) => (
              <button
                key={s.label}
                onClick={() => setStorageIdx(idx)}
                className={`h-[44px] px-3 rounded-[10px] border flex items-center justify-between text-[13px] ${
                  idx === storageIdx
                    ? 'border-[#0071E3] bg-[#EAF3FF]/40 text-[#0071E3] font-semibold'
                    : 'border-[#D2D2D7] text-[#1D1D1F]'
                }`}
              >
                <span>{s.label}</span>
                <span>{s.delta > 0 ? `+${formatIDR(s.delta)}` : 'Termasuk'}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#1D1D1F]">Jumlah</span>
          <div className="h-[40px] rounded-full bg-[#F5F5F7] flex items-center px-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              aria-label="Kurangi jumlah"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1D1D1F]"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-[14px] font-semibold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              aria-label="Tambah jumlah"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[#1D1D1F]"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart & Buy Now */}
      <div className="px-4 flex flex-col gap-2.5">
        <button
          onClick={() => addToCart(product, selectedColor, selectedStorage, qty)}
          className="w-full h-[52px] rounded-full bg-[#0071E3] hover:bg-[#0066CC] text-white text-[15px] font-semibold transition"
        >
          Tambah ke Keranjang · {formatIDR(unitPrice * qty)}
        </button>
        <button
          onClick={() => {
            addToCart(product, selectedColor, selectedStorage, qty, true);
            navigate('/checkout');
          }}
          className="w-full h-[48px] rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[15px] font-semibold transition"
        >
          Beli Langsung
        </button>
      </div>

      {/* Description & Specifications */}
      <div className="px-4 flex flex-col gap-3">
        <h2 className="text-[18px] font-semibold text-[#1D1D1F]">Deskripsi Produk</h2>
        <p className="text-[14px] text-[#424245] leading-relaxed">{product.description}</p>

        <h2 className="text-[18px] font-semibold text-[#1D1D1F] mt-2">Spesifikasi Utama</h2>
        <div className="rounded-[12px] bg-[#F5F5F7] p-3.5 flex flex-col divide-y divide-[#E8E8ED]">
          {product.specs.map((spec) => (
            <div key={spec.label} className="py-2.5 first:pt-0 last:pb-0 flex justify-between gap-4 text-[13px]">
              <span className="text-[#6E6E73]">{spec.label}</span>
              <span className="font-medium text-[#1D1D1F] text-right">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="px-4 flex flex-col gap-3">
        <h2 className="text-[18px] font-semibold text-[#1D1D1F]">Produk Terkait</h2>
        <div className="grid grid-cols-2 gap-3">
          {related.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWishlisted={wishlist.includes(p.id)}
              onToggleWishlist={toggleWishlist}
              onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
              onOpenQuickVariant={(prod) => addToCart(prod, prod.colors[0], prod.storages[0], 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* --- 7. SEARCH PAGE (/search) --- */
function SearchPage({ navigate, recentSearches, setRecentSearches, wishlist, toggleWishlist, pushOverlay }) {
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const applySearch = (term) => {
    setQuery(term);
    if (term.trim() && !recentSearches.includes(term.trim())) {
      setRecentSearches((prev) => [term.trim(), ...prev].slice(0, 5));
    }
  };

  return (
    <div className="px-4 py-4 flex flex-col gap-5 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 h-[44px] rounded-full bg-[#F5F5F7] px-4 flex items-center gap-2">
          <Search className="w-4 h-4 text-[#86868B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applySearch(query)}
            placeholder="Cari perangkat Apple..."
            className="flex-1 bg-transparent text-[15px] text-[#1D1D1F] outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Hapus pencarian">
              <X className="w-4 h-4 text-[#86868B]" />
            </button>
          )}
        </div>
      </div>

      {!query.trim() ? (
        <>
          {recentSearches.length > 0 && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Pencarian Terakhir</h2>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-[12px] text-[#0071E3] font-medium"
                >
                  Hapus Riwayat
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="h-[34px] px-3.5 rounded-full bg-[#F5F5F7] text-[13px] text-[#1D1D1F]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <h2 className="text-[14px] font-semibold text-[#1D1D1F]">Pencarian Populer</h2>
            <div className="flex flex-wrap gap-2">
              {['iPhone 16 Pro', 'MacBook Pro M4', 'iPad Pro', 'AirPods Max'].map((pop) => (
                <button
                  key={pop}
                  onClick={() => applySearch(pop)}
                  className="h-[34px] px-3.5 rounded-full bg-[#EAF3FF] text-[#0071E3] text-[13px] font-medium"
                >
                  {pop}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-[13px] text-[#6E6E73]">
            Menampilkan {results.length} hasil untuk &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-2 gap-3">
            {results.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={wishlist.includes(p.id)}
                onToggleWishlist={toggleWishlist}
                onOpenDetail={(prod) => navigate(`/products/${prod.slug}`)}
                onOpenQuickVariant={(prod) =>
                  pushOverlay({ type: 'bottom_sheet', id: 'variant_selector', payload: prod })
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* --- 8. NOTIFICATIONS PAGE (Standalone /notifications) --- */
function NotificationsPage({ notifications, setNotifications, navigate, showToast }) {
  const [tab, setTab] = useState('Semua');
  const filtered = notifications.filter((n) => (tab === 'Semua' ? true : n.category === tab));

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('Semua notifikasi ditandai telah dibaca', 'success');
  };

  return (
    <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto bg-white pb-8">
      {/* Standalone Notification Header */}
      <div className="sticky top-0 z-10 h-[56px] px-4 bg-white/95 backdrop-blur-md border-b border-[#E8E8ED] flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/')}
            aria-label="Kembali ke Beranda"
            className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[18px] font-bold text-[#1D1D1F]">Notifikasi</h1>
        </div>
        <button onClick={markAllRead} className="text-[13px] font-medium text-[#0071E3]">
          Tandai Dibaca
        </button>
      </div>

      {/* Filter Pills */}
      <div className="px-4 py-3 flex gap-2 border-b border-[#E8E8ED]">
        {['Semua', 'Pesanan', 'Promo'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`h-[34px] px-4 rounded-full text-[13px] font-medium ${
              tab === t ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#424245]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Notification List / Empty State */}
      {filtered.length === 0 ? (
        <div className="px-6 py-20 flex flex-col items-center text-center gap-2 my-auto">
          <Bell className="w-10 h-10 text-[#AEAEB2]" strokeWidth={1.5} />
          <h2 className="text-[18px] font-semibold text-[#1D1D1F]">Belum Ada Notifikasi</h2>
          <p className="text-[13px] text-[#6E6E73]">Pembaruan pesanan dan promo terbaru akan muncul di sini.</p>
        </div>
      ) : (
        <div className="flex flex-col">
          {filtered.map((n) => (
            <div
              key={n.id}
              onClick={() =>
                setNotifications((prev) =>
                  prev.map((item) => (item.id === n.id ? { ...item, unread: false } : item))
                )
              }
              className={`p-4 border-b border-[#E8E8ED] flex items-start gap-3 cursor-pointer ${
                n.unread ? 'bg-[#F5F5F7]' : 'bg-white'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#EAF3FF] text-[#0071E3] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-[14px] font-semibold text-[#1D1D1F]">{n.title}</h2>
                  <span className="text-[11px] text-[#86868B] shrink-0">{n.time}</span>
                </div>
                <p className="text-[13px] text-[#6E6E73] mt-1 leading-relaxed">{n.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --- 9. CART PAGE (Standalone /cart) --- */
function CartPage({ cart, setCart, appliedVoucher, setAppliedVoucher, navigate, showToast, pushOverlay }) {
  const [voucherCode, setVoucherCode] = useState(appliedVoucher?.code || '');

  const selectedItems = cart.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  const discount = appliedVoucher ? Math.min(subtotal, appliedVoucher.discount) : 0;
  const total = Math.max(0, subtotal - discount);

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    const found = VOUCHERS[voucherCode.trim().toUpperCase()];
    if (found) {
      setAppliedVoucher(found);
      showToast(`Voucher ${found.code} berhasil diterapkan!`, 'success');
    } else {
      showToast('Kode voucher tidak valid (coba: TRXWELCOME)', 'error');
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto bg-white pb-10">
      {/* Standalone Cart Header */}
      <div className="sticky top-0 z-10 h-[56px] px-4 bg-white/95 backdrop-blur-md border-b border-[#E8E8ED] flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h1 className="text-[17px] font-bold text-[#1D1D1F]">Keranjang</h1>
        </div>
        <div className="w-[44px]" />
      </div>

      {cart.length === 0 ? (
        <div className="px-6 py-20 flex flex-col items-center text-center gap-3 my-auto">
          <div className="w-16 h-16 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#86868B]">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-[20px] font-bold text-[#1D1D1F]">Keranjang Anda Kosong</h2>
          <p className="text-[14px] text-[#6E6E73]">Temukan perangkat Apple favorit Anda dan tambahkan ke keranjang.</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-2 h-[48px] px-6 rounded-full bg-[#0071E3] text-white text-[14px] font-semibold"
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <div className="px-4 py-4 flex flex-col gap-5 flex-1">
          <p className="text-[12px] text-[#6E6E73]">{selectedItems.length} item dipilih untuk checkout</p>

          {/* Cart Items */}
          <div className="flex flex-col divide-y divide-[#E8E8ED] border-y border-[#E8E8ED]">
            {cart.map((item) => (
              <div key={item.uid} className="py-4 flex gap-3 items-start">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() =>
                    setCart((prev) =>
                      prev.map((i) => (i.uid === item.uid ? { ...i, selected: !i.selected } : i))
                    )
                  }
                  aria-label={`Pilih ${item.name}`}
                  className="mt-7 w-5 h-5 accent-[#0071E3]"
                />
                <div className="w-[80px] h-[80px] rounded-[10px] bg-[#F5F5F7] flex items-center justify-center shrink-0">
                  <ProductArtwork type={item.artwork} colorHex={item.colorHex} className="w-14 h-14" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-[14px] font-semibold text-[#1D1D1F]">{item.name}</h2>
                    <p className="text-[12px] text-[#6E6E73]">
                      {item.color} · {item.storage}
                    </p>
                    <p className="text-[14px] font-semibold text-[#1D1D1F] mt-1">
                      {formatIDR(item.unitPrice * item.qty)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="h-[34px] rounded-full bg-[#F5F5F7] flex items-center px-1">
                      <button
                        onClick={() => {
                          if (item.qty === 1) {
                            pushOverlay({
                              type: 'dialog',
                              id: 'confirm_remove',
                              payload: {
                                title: 'Hapus Produk?',
                                message: `Hapus ${item.name} dari keranjang belanja Anda?`,
                                onConfirm: () => {
                                  setCart((prev) => prev.filter((i) => i.uid !== item.uid));
                                  showToast('Produk dihapus dari keranjang', 'info');
                                }
                              }
                            });
                          } else {
                            setCart((prev) =>
                              prev.map((i) => (i.uid === item.uid ? { ...i, qty: i.qty - 1 } : i))
                            );
                          }
                        }}
                        aria-label="Kurangi"
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-[13px] font-semibold">{item.qty}</span>
                      <button
                        onClick={() =>
                          setCart((prev) =>
                            prev.map((i) => (i.uid === item.uid ? { ...i, qty: i.qty + 1 } : i))
                          )
                        }
                        aria-label="Tambah"
                        className="w-7 h-7 rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => setCart((prev) => prev.filter((i) => i.uid !== item.uid))}
                      aria-label="Hapus item"
                      className="text-[#D70015] p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Voucher Entry */}
          <form onSubmit={handleApplyVoucher} className="flex gap-2">
            <input
              type="text"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
              placeholder="Kode voucher (mis. TRXWELCOME)"
              className="flex-1 h-[44px] px-4 rounded-[10px] border border-[#D2D2D7] text-[14px] outline-none focus:border-[#0071E3]"
            />
            <button
              type="submit"
              className="h-[44px] px-4 rounded-[10px] bg-[#1D1D1F] text-white text-[13px] font-semibold"
            >
              Pakai
            </button>
          </form>

          {/* Cart Summary */}
          <div className="rounded-[16px] bg-[#F5F5F7] p-4 flex flex-col gap-2">
            <div className="flex justify-between text-[13px] text-[#6E6E73]">
              <span>Subtotal</span>
              <span>{formatIDR(subtotal)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[13px] text-[#248A3D] font-medium">
                <span>Diskon Voucher ({appliedVoucher.code})</span>
                <span>-{formatIDR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[13px] text-[#6E6E73]">
              <span>Estimasi Pengiriman</span>
              <span className="text-[#248A3D] font-medium">Gratis</span>
            </div>
            <div className="h-[1px] bg-[#E8E8ED] my-1" />
            <div className="flex justify-between text-[16px] font-bold text-[#1D1D1F]">
              <span>Total Belanja</span>
              <span>{formatIDR(total)}</span>
            </div>
          </div>

          <button
            disabled={selectedItems.length === 0}
            onClick={() => navigate('/checkout')}
            className="w-full h-[50px] rounded-full bg-[#0071E3] disabled:opacity-40 text-white text-[15px] font-semibold shadow-sm mt-auto"
          >
            Lanjut ke Checkout ({selectedItems.length})
          </button>
        </div>
      )}
    </div>
  );
}

/* --- 10. WISHLIST PAGE (/wishlist) --- */
function WishlistPage({ wishlist, toggleWishlist, addToCart, navigate }) {
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/profile')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[22px] font-bold text-[#1D1D1F]">Wishlist Saya ({savedProducts.length})</h1>
      </div>

      {savedProducts.length === 0 ? (
        <div className="py-16 text-center flex flex-col items-center gap-3">
          <Heart className="w-10 h-10 text-[#AEAEB2]" />
          <p className="text-[15px] font-semibold text-[#1D1D1F]">Wishlist masih kosong</p>
          <button
            onClick={() => navigate('/products')}
            className="h-[44px] px-5 rounded-full bg-[#0071E3] text-white text-[14px] font-semibold"
          >
            Jelajahi Produk
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {savedProducts.map((p) => (
            <div key={p.id} className="p-3 rounded-[16px] border border-[#E8E8ED] flex items-center gap-3">
              <div className="w-16 h-16 rounded-[10px] bg-[#F5F5F7] flex items-center justify-center shrink-0">
                <ProductArtwork type={p.artwork} colorHex={p.colors[0].hex} className="w-12 h-12" />
              </div>
              <div className="flex-1">
                <h2 className="text-[14px] font-semibold text-[#1D1D1F]">{p.name}</h2>
                <p className="text-[13px] font-medium text-[#0071E3]">{formatIDR(p.price)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => addToCart(p, p.colors[0], p.storages[0], 1)}
                    className="h-[32px] px-3 rounded-full bg-[#0071E3] text-white text-[12px] font-semibold"
                  >
                    + Keranjang
                  </button>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="h-[32px] px-3 rounded-full bg-[#F5F5F7] text-[#6E6E73] text-[12px]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* --- 11. PROFILE PAGE (/profile) --- */
function ProfilePage({ user, setUser, orders, wishlist, navigate, showToast }) {
  return (
    <div className="px-4 py-5 flex flex-col gap-6 pb-8">
      {/* Profile Summary */}
      {user ? (
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center text-[20px] font-bold">
            {user.initials}
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0071E3]">
              Apple Member
            </span>
            <h1 className="text-[20px] font-bold text-[#1D1D1F]">{user.name}</h1>
            <p className="text-[13px] text-[#6E6E73]">{user.email}</p>
          </div>
        </div>
      ) : (
        <div className="p-5 rounded-[20px] bg-[#F5F5F7] flex flex-col gap-3">
          <h1 className="text-[20px] font-bold text-[#1D1D1F]">Masuk ke Akun Anda</h1>
          <p className="text-[13px] text-[#6E6E73]">
            Kelola pesanan, alamat pengiriman, dan checkout lebih cepat.
          </p>
          <div className="flex gap-2.5 mt-1">
            <button
              onClick={() => navigate('/login')}
              className="flex-1 h-[44px] rounded-full bg-[#0071E3] text-white text-[14px] font-semibold"
            >
              Masuk
            </button>
            <button
              onClick={() => navigate('/register')}
              className="flex-1 h-[44px] rounded-full bg-white text-[#1D1D1F] border border-[#D2D2D7] text-[14px] font-semibold"
            >
              Daftar
            </button>
          </div>
        </div>
      )}

      {/* Order & Wishlist Quick Shortcuts */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => navigate('/orders')}
          className="p-4 rounded-[16px] bg-[#F5F5F7] flex flex-col items-start gap-1 text-left"
        >
          <Package className="w-5 h-5 text-[#0071E3]" />
          <span className="text-[15px] font-semibold text-[#1D1D1F] mt-1">Pesanan Saya</span>
          <span className="text-[12px] text-[#6E6E73]">{orders.length} riwayat transaksi</span>
        </button>
        <button
          onClick={() => navigate('/wishlist')}
          className="p-4 rounded-[16px] bg-[#F5F5F7] flex flex-col items-start gap-1 text-left"
        >
          <Heart className="w-5 h-5 text-[#D70015]" />
          <span className="text-[15px] font-semibold text-[#1D1D1F] mt-1">Wishlist</span>
          <span className="text-[12px] text-[#6E6E73]">{wishlist.length} produk tersimpan</span>
        </button>
      </div>

      {/* Account Menu */}
      <div className="flex flex-col border-t border-[#E8E8ED]">
        {[
          { icon: MapPin, label: 'Alamat Saya', sub: 'Kelola alamat pengiriman & pengambilan', path: '/account/addresses' },
          { icon: ShieldCheck, label: 'Pengaturan Akun', sub: 'Profil, kata sandi & preferensi', path: '/account/settings' },
          { icon: HelpCircle, label: 'Pusat Bantuan', sub: 'FAQ dan layanan pelanggan', path: '/help' },
          { icon: MessageCircle, label: 'Live Chat Spesialis', sub: 'Hubungi tim Apple The Exchange TRX', path: '/livechat' }
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="min-h-[60px] py-2 border-b border-[#E8E8ED] flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-[#424245]" strokeWidth={1.75} />
                <div>
                  <div className="text-[15px] font-medium text-[#1D1D1F]">{item.label}</div>
                  <div className="text-[12px] text-[#6E6E73]">{item.sub}</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#AEAEB2]" />
            </button>
          );
        })}
      </div>

      {user && (
        <button
          onClick={() => {
            setUser(null);
            showToast('Anda telah keluar dari akun', 'info');
          }}
          className="w-full h-[48px] rounded-full bg-[#F5F5F7] text-[#D70015] text-[14px] font-semibold flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Keluar dari Akun
        </button>
      )}
    </div>
  );
}

/* --- 12 & 13. ORDERS & ORDER DETAIL (/orders, /orders/:orderId) --- */
function OrderHistoryPage({ orders, navigate }) {
  const [statusFilter, setStatusFilter] = useState('Semua');
  const filtered = orders.filter((o) => (statusFilter === 'Semua' ? true : o.status === statusFilter));

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/profile')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[22px] font-bold text-[#1D1D1F]">Pesanan Saya</h1>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['Semua', 'Diproses', 'Selesai'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`h-[34px] px-4 rounded-full text-[13px] font-medium ${
              statusFilter === st ? 'bg-[#1D1D1F] text-white' : 'bg-[#F5F5F7] text-[#424245]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((ord) => (
          <div
            key={ord.id}
            onClick={() => navigate(`/orders/${ord.id}`)}
            className="p-4 rounded-[16px] border border-[#E8E8ED] flex flex-col gap-2 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-bold text-[#1D1D1F]">{ord.id}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF3FF] text-[#0071E3] text-[11px] font-semibold">
                {ord.status}
              </span>
            </div>
            <p className="text-[13px] text-[#6E6E73]">
              {ord.items.map((i) => `${i.name} (${i.qty}x)`).join(', ')}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-[#E8E8ED]">
              <span className="text-[12px] text-[#86868B]">{ord.date}</span>
              <span className="text-[14px] font-bold text-[#1D1D1F]">{formatIDR(ord.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderDetailPage({ orderId, orders, setOrders, navigate, showToast }) {
  const order = orders.find((o) => o.id === orderId) || orders[0];
  if (!order) return null;

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/orders')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-[20px] font-bold text-[#1D1D1F]">Detail Pesanan</h1>
          <p className="text-[12px] text-[#6E6E73]">{order.id}</p>
        </div>
      </div>

      <div className="p-4 rounded-[16px] bg-[#F5F5F7] flex flex-col gap-2">
        <span className="text-[12px] font-semibold text-[#0071E3]">Status: {order.status}</span>
        <p className="text-[13px] text-[#1D1D1F]">Metode: {order.shipping}</p>
        <p className="text-[12px] text-[#6E6E73]">{order.address}</p>
      </div>

      <div className="flex flex-col divide-y divide-[#E8E8ED] border-y border-[#E8E8ED]">
        {order.items.map((item, i) => (
          <div key={i} className="py-3 flex justify-between text-[14px]">
            <div>
              <div className="font-semibold text-[#1D1D1F]">{item.name}</div>
              <div className="text-[12px] text-[#6E6E73]">
                {item.color} · {item.storage} · {item.qty}x
              </div>
            </div>
            <span className="font-semibold">{formatIDR(item.unitPrice * item.qty)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-[16px] font-bold text-[#1D1D1F]">
        <span>Total Pembayaran</span>
        <span>{formatIDR(order.total)}</span>
      </div>

      {order.status === 'Diproses' && (
        <button
          onClick={() => {
            setOrders((prev) =>
              prev.map((o) => (o.id === order.id ? { ...o, status: 'Dibatalkan' } : o))
            );
            showToast('Pesanan berhasil dibatalkan', 'info');
          }}
          className="w-full h-[46px] rounded-full border border-[#D70015] text-[#D70015] text-[14px] font-semibold"
        >
          Batalkan Pesanan
        </button>
      )}
    </div>
  );
}

/* --- 14, 15, 16, 17. ACCOUNT PAGES & HELP --- */
function AddressesPage({ addresses, setAddresses, navigate, showToast }) {
  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/profile')}
            aria-label="Kembali"
            className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[22px] font-bold text-[#1D1D1F]">Alamat Saya</h1>
        </div>
        <button
          onClick={() => navigate('/account/addresses/new')}
          className="h-[36px] px-3.5 rounded-full bg-[#0071E3] text-white text-[13px] font-semibold"
        >
          + Tambah
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-4 rounded-[16px] border ${
              addr.isDefault ? 'border-[#0071E3] bg-[#EAF3FF]/30' : 'border-[#E8E8ED]'
            } flex flex-col gap-1.5`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-bold text-[#1D1D1F]">
                {addr.label} · {addr.recipient}
              </span>
              {addr.isDefault && (
                <span className="px-2 py-0.5 rounded-full bg-[#0071E3] text-white text-[10px] font-semibold">
                  Utama
                </span>
              )}
            </div>
            <p className="text-[13px] text-[#6E6E73]">{addr.phone}</p>
            <p className="text-[13px] text-[#1D1D1F]">{addr.fullAddress}</p>
            {!addr.isDefault && (
              <button
                onClick={() => {
                  setAddresses((prev) =>
                    prev.map((a) => ({ ...a, isDefault: a.id === addr.id }))
                  );
                  showToast('Alamat utama diperbarui', 'success');
                }}
                className="self-start mt-1 text-[12px] font-semibold text-[#0071E3]"
              >
                Jadikan Alamat Utama
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AddressFormPage({ setAddresses, navigate, showToast }) {
  const [label, setLabel] = useState('Rumah');
  const [recipient, setRecipient] = useState('');
  const [phone, setPhone] = useState('');
  const [fullAddress, setFullAddress] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setAddresses((prev) => [
      ...prev,
      { id: 'addr-' + Date.now(), label, recipient, phone, fullAddress, isDefault: prev.length === 0 }
    ]);
    showToast('Alamat baru berhasil disimpan', 'success');
    navigate('/account/addresses');
  };

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/account/addresses')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[22px] font-bold text-[#1D1D1F]">Tambah Alamat</h1>
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-3.5">
        <input
          type="text"
          required
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Label Alamat (Rumah / Kantor)"
          className="h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[15px]"
        />
        <input
          type="text"
          required
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Nama Penerima"
          className="h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[15px]"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nomor Telepon"
          className="h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[15px]"
        />
        <textarea
          required
          rows={3}
          value={fullAddress}
          onChange={(e) => setFullAddress(e.target.value)}
          placeholder="Alamat Lengkap, Kota, Kode Pos"
          className="p-4 rounded-[10px] border border-[#D2D2D7] text-[15px]"
        />
        <button
          type="submit"
          className="mt-2 h-[50px] rounded-full bg-[#0071E3] text-white text-[15px] font-semibold"
        >
          Simpan Alamat
        </button>
      </form>
    </div>
  );
}

function AccountSettingsPage({ user, setUser, navigate, showToast }) {
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/profile')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[22px] font-bold text-[#1D1D1F]">Pengaturan Akun</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUser((prev) => ({
            ...prev,
            name,
            phone,
            initials: name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase()
          }));
          showToast('Profil berhasil diperbarui', 'success');
        }}
        className="flex flex-col gap-3.5"
      >
        <div>
          <label className="text-[12px] font-semibold text-[#6E6E73]">Nama Lengkap</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[15px]"
          />
        </div>
        <div>
          <label className="text-[12px] font-semibold text-[#6E6E73]">Nomor Telepon</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[15px]"
          />
        </div>
        <button
          type="submit"
          className="mt-2 h-[50px] rounded-full bg-[#0071E3] text-white text-[15px] font-semibold"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

function HelpCenterPage({ navigate }) {
  const faqs = [
    {
      q: 'Bagaimana cara kerja Pengambilan di Toko (Store Pickup)?',
      a: 'Pesan secara online, pilih metode Pengambilan di Apple The Exchange TRX, dan tunjukkan kode QR pesanan Anda di Lantai G dalam 1 jam.'
    },
    {
      q: 'Apakah semua produk bergaransi resmi Apple?',
      a: 'Ya, seluruh perangkat dilindungi garansi terbatas Apple 1 tahun dan dapat ditambahkan perlindungan AppleCare+.'
    },
    {
      q: 'Metode pembayaran apa saja yang diterima?',
      a: 'Kami menerima Apple Pay, kartu kredit/debit Visa & Mastercard (cicilan 0% tersedia), serta Virtual Account.'
    }
  ];

  return (
    <div className="px-4 py-4 flex flex-col gap-4 pb-8">
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/profile')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-[22px] font-bold text-[#1D1D1F]">Pusat Bantuan</h1>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((f, idx) => (
          <div key={idx} className="p-4 rounded-[16px] bg-[#F5F5F7] flex flex-col gap-1.5">
            <h2 className="text-[14px] font-semibold text-[#1D1D1F]">{f.q}</h2>
            <p className="text-[13px] text-[#6E6E73] leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate('/livechat')}
        className="w-full h-[48px] rounded-full bg-[#0071E3] text-white text-[14px] font-semibold"
      >
        Hubungi Spesialis via Live Chat
      </button>
    </div>
  );
}

/**
 * ============================================================================
 * 6. PAGE RENDERER (AppShell MainContent Router)
 * ============================================================================
 */
function PageRenderer({
  matchedRoute,
  navigate,
  user,
  setUser,
  wishlist,
  toggleWishlist,
  addToCart,
  addresses,
  setAddresses,
  orders,
  setOrders,
  recentSearches,
  setRecentSearches,
  showToast,
  pushOverlay
}) {
  switch (matchedRoute.id) {
    case 'home':
      return (
        <HomePage
          navigate={navigate}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          pushOverlay={pushOverlay}
        />
      );
    case 'products':
      return (
        <ProductsPage
          navigate={navigate}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          pushOverlay={pushOverlay}
        />
      );
    case 'profile':
      return (
        <ProfilePage
          user={user}
          setUser={setUser}
          orders={orders}
          wishlist={wishlist}
          navigate={navigate}
          showToast={showToast}
        />
      );
    case 'categories':
      return <CategoriesPage navigate={navigate} />;
    case 'category_detail':
      return (
        <CategoryDetailPage
          slug={matchedRoute.param}
          navigate={navigate}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          pushOverlay={pushOverlay}
        />
      );
    case 'product_detail':
      return (
        <ProductDetailPage
          slug={matchedRoute.param}
          navigate={navigate}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          showToast={showToast}
        />
      );
    case 'search':
      return (
        <SearchPage
          navigate={navigate}
          recentSearches={recentSearches}
          setRecentSearches={setRecentSearches}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          pushOverlay={pushOverlay}
        />
      );
    case 'wishlist':
      return (
        <WishlistPage
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
          navigate={navigate}
        />
      );
    case 'orders':
      return <OrderHistoryPage orders={orders} navigate={navigate} />;
    case 'order_detail':
      return (
        <OrderDetailPage
          orderId={matchedRoute.param}
          orders={orders}
          setOrders={setOrders}
          navigate={navigate}
          showToast={showToast}
        />
      );
    case 'addresses':
      return (
        <AddressesPage
          addresses={addresses}
          setAddresses={setAddresses}
          navigate={navigate}
          showToast={showToast}
        />
      );
    case 'address_form':
      return <AddressFormPage setAddresses={setAddresses} navigate={navigate} showToast={showToast} />;
    case 'account_settings':
      return (
        <AccountSettingsPage
          user={user}
          setUser={setUser}
          navigate={navigate}
          showToast={showToast}
        />
      );
    case 'help':
      return <HelpCenterPage navigate={navigate} />;
    default:
      return null;
  }
}

/**
 * ============================================================================
 * 7. STANDALONE PAGE RENDERER (Standalone Routes — Outside AppShell)
 * ============================================================================
 */
function StandalonePageRenderer({
  matchedRoute,
  navigate,
  user,
  setUser,
  intendedRoute,
  setIntendedRoute,
  cart,
  setCart,
  appliedVoucher,
  setAppliedVoucher,
  addresses,
  setOrders,
  notifications,
  setNotifications,
  chatMessages,
  setChatMessages,
  lastPaymentResult,
  setLastPaymentResult,
  showToast,
  pushOverlay
}) {
  const [showPass, setShowPass] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  // Standalone: /notifications
  if (matchedRoute.id === 'notification') {
    return (
      <NotificationsPage
        notifications={notifications}
        setNotifications={setNotifications}
        navigate={navigate}
        showToast={showToast}
      />
    );
  }

  // Standalone: /cart
  if (matchedRoute.id === 'cart') {
    return (
      <CartPage
        cart={cart}
        setCart={setCart}
        appliedVoucher={appliedVoucher}
        setAppliedVoucher={setAppliedVoucher}
        navigate={navigate}
        showToast={showToast}
        pushOverlay={pushOverlay}
      />
    );
  }

  // Standalone: /livechat
  if (matchedRoute.id === 'livechat') {
    return (
      <LiveChatPage
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        navigate={navigate}
      />
    );
  }

  // Standalone: /login
  if (matchedRoute.id === 'login') {
    return (
      <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto px-6 py-8 justify-between bg-white">
        <div>
          <button
            onClick={() => navigate('/')}
            aria-label="Kembali ke Beranda"
            className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="mt-6 flex flex-col gap-2">
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">Masuk ke Storefront</h1>
            <p className="text-[14px] text-[#6E6E73]">
              Gunakan Apple ID Anda untuk melanjutkan checkout dan melacak pesanan.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUser({
                name: 'Aiden Tan',
                initials: 'AT',
                email: 'aiden.tan@icloud.com',
                phone: '+62 812-8890-4410'
              });
              showToast('Berhasil masuk sebagai Aiden Tan', 'success');
              const dest = intendedRoute || '/';
              setIntendedRoute(null);
              navigate(dest);
            }}
            className="mt-8 flex flex-col gap-4"
          >
            <div>
              <label className="block text-[13px] font-medium text-[#424245] mb-1">Email Apple ID</label>
              <input
                type="email"
                required
                defaultValue="aiden.tan@icloud.com"
                className="w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[16px]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-medium text-[#424245] mb-1">Kata Sandi</label>
              <div className="relative flex items-center">
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  defaultValue="••••••••••••"
                  className="w-full h-[48px] px-4 pr-12 rounded-[10px] border border-[#D2D2D7] text-[16px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  aria-label="Tampilkan sandi"
                  className="absolute right-3 text-[#6E6E73]"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="self-end text-[13px] font-medium text-[#0071E3]"
            >
              Lupa kata sandi?
            </button>
            <button
              type="submit"
              className="mt-2 w-full h-[52px] rounded-full bg-[#0071E3] text-white text-[16px] font-semibold"
            >
              Masuk
            </button>
          </form>
        </div>

        <p className="text-center text-[14px] text-[#6E6E73] pt-6">
          Belum punya akun?{' '}
          <button onClick={() => navigate('/register')} className="font-semibold text-[#0071E3]">
            Daftar sekarang
          </button>
        </p>
      </div>
    );
  }

  // Standalone: /register
  if (matchedRoute.id === 'register') {
    return (
      <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto px-6 py-8 justify-between bg-white">
        <div>
          <button
            onClick={() => navigate('/login')}
            aria-label="Kembali"
            className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="mt-6 flex flex-col gap-2">
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">Buat Akun Baru</h1>
            <p className="text-[14px] text-[#6E6E73]">Satu akun untuk berbelanja dan layanan purnajual.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setUser({
                name: 'Aiden Tan',
                initials: 'AT',
                email: 'aiden.tan@icloud.com',
                phone: '+62 812-8890-4410'
              });
              showToast('Pendaftaran berhasil!', 'success');
              navigate('/');
            }}
            className="mt-6 flex flex-col gap-3.5"
          >
            <input
              type="text"
              required
              placeholder="Nama Lengkap"
              className="w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[16px]"
            />
            <input
              type="email"
              required
              placeholder="Alamat Email"
              className="w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[16px]"
            />
            <input
              type="password"
              required
              placeholder="Buat Kata Sandi"
              className="w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[16px]"
            />
            <button
              type="submit"
              className="mt-2 w-full h-[52px] rounded-full bg-[#0071E3] text-white text-[16px] font-semibold"
            >
              Daftar Akun
            </button>
          </form>
        </div>
        <p className="text-center text-[14px] text-[#6E6E73] pt-6">
          Sudah punya akun?{' '}
          <button onClick={() => navigate('/login')} className="font-semibold text-[#0071E3]">
            Masuk
          </button>
        </p>
      </div>
    );
  }

  // Standalone: /forgot-password
  if (matchedRoute.id === 'forgot_password') {
    return (
      <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto px-6 py-8 bg-white">
        <button
          onClick={() => navigate('/login')}
          aria-label="Kembali"
          className="w-[44px] h-[44px] -ml-2 rounded-full flex items-center justify-center text-[#1D1D1F]"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="mt-6 flex flex-col gap-2">
          <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">Lupa Kata Sandi</h1>
          <p className="text-[14px] text-[#6E6E73]">
            Masukkan email terdaftar untuk menerima tautan pengaturan ulang kata sandi.
          </p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast('Tautan pemulihan telah dikirim ke email Anda', 'success');
            navigate('/login');
          }}
          className="mt-8 flex flex-col gap-4"
        >
          <input
            type="email"
            required
            placeholder="nama@icloud.com"
            className="w-full h-[48px] px-4 rounded-[10px] border border-[#D2D2D7] text-[16px]"
          />
          <button
            type="submit"
            className="w-full h-[52px] rounded-full bg-[#0071E3] text-white text-[16px] font-semibold"
          >
            Kirim Tautan Pemulihan
          </button>
        </form>
      </div>
    );
  }

  // Standalone: /checkout
  if (matchedRoute.id === 'checkout') {
    const selectedItems = cart.filter((i) => i.selected);
    const subtotal = selectedItems.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
    const discount = appliedVoucher ? Math.min(subtotal, appliedVoucher.discount) : 0;
    const total = Math.max(0, subtotal - discount);
    const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];

    return (
      <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto bg-[#F5F5F7]">
        {/* Checkout Header */}
        <div className="sticky top-0 z-10 h-[56px] px-4 bg-white border-b border-[#E8E8ED] flex items-center justify-between shrink-0">
          <button
            onClick={() => navigate('/cart')}
            className="h-[44px] flex items-center gap-1 text-[#0071E3] text-[15px] font-medium"
          >
            <ChevronLeft className="w-5 h-5" /> Keranjang
          </button>
          <span className="text-[16px] font-bold text-[#1D1D1F]">Checkout</span>
          <div className="w-16" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const orderId = 'TRX-' + Math.floor(100000 + Math.random() * 900000);
            const newOrder = {
              id: orderId,
              date: '21 Nov 2026',
              status: 'Diproses',
              shipping: 'Pengambilan di Apple The Exchange TRX',
              address: defaultAddress?.fullAddress || 'Persiaran TRX, Kuala Lumpur',
              items: selectedItems,
              total
            };
            setOrders((prev) => [newOrder, ...prev]);
            setLastPaymentResult({ orderId, total, status: 'success', method: 'Apple Pay' });
            setCart((prev) => prev.filter((i) => !i.selected));
            setAppliedVoucher(null);
            navigate('/payment/result');
          }}
          className="p-4 flex flex-col gap-4 flex-1 pb-8"
        >
          {/* Checkout Address */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-1.5 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold uppercase text-[#0071E3] flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Alamat & Lokasi Pengambilan
              </span>
            </div>
            <p className="text-[14px] font-bold text-[#1D1D1F]">{defaultAddress?.recipient}</p>
            <p className="text-[13px] text-[#6E6E73]">{defaultAddress?.fullAddress}</p>
          </div>

          {/* Checkout Items */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-3 shadow-sm">
            <h2 className="text-[15px] font-bold text-[#1D1D1F]">Ringkasan Produk ({selectedItems.length})</h2>
            {selectedItems.map((item) => (
              <div key={item.uid} className="flex justify-between text-[13px]">
                <span className="text-[#424245]">
                  {item.name} ({item.storage}) × {item.qty}
                </span>
                <span className="font-semibold text-[#1D1D1F]">{formatIDR(item.unitPrice * item.qty)}</span>
              </div>
            ))}
          </div>

          {/* Shipping Method */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-2.5 shadow-sm">
            <h2 className="text-[15px] font-bold text-[#1D1D1F] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#0071E3]" /> Metode Pengiriman
            </h2>
            <label className="p-3 rounded-[10px] border-2 border-[#0071E3] bg-[#EAF3FF]/40 flex items-center justify-between cursor-pointer">
              <div>
                <div className="text-[14px] font-semibold text-[#1D1D1F]">Ambil di Toko (The Exchange TRX)</div>
                <div className="text-[12px] text-[#6E6E73]">Siap dalam 1 jam · Gratis</div>
              </div>
              <input type="radio" name="ship" defaultChecked className="accent-[#0071E3]" />
            </label>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-2.5 shadow-sm">
            <h2 className="text-[15px] font-bold text-[#1D1D1F] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#0071E3]" /> Metode Pembayaran
            </h2>
            <label className="p-3 rounded-[10px] border-2 border-[#0071E3] bg-[#EAF3FF]/40 flex items-center justify-between cursor-pointer">
              <span className="text-[14px] font-semibold text-[#1D1D1F]">Apple Pay / Kartu Kredit 0%</span>
              <input type="radio" name="pay" defaultChecked className="accent-[#0071E3]" />
            </label>
          </div>

          {/* Order Summary & Place Order Action */}
          <div className="bg-white rounded-[16px] p-4 flex flex-col gap-3 shadow-sm mt-auto">
            <div className="flex justify-between text-[16px] font-bold text-[#1D1D1F]">
              <span>Total Tagihan</span>
              <span>{formatIDR(total)}</span>
            </div>
            <button
              type="submit"
              disabled={selectedItems.length === 0}
              className="w-full h-[52px] rounded-full bg-[#0071E3] text-white text-[16px] font-semibold shadow-md"
            >
              Bayar Sekarang · {formatIDR(total)}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Standalone: /payment/result
  if (matchedRoute.id === 'payment_result') {
    const res = lastPaymentResult || {
      orderId: 'TRX-882910',
      total: 21499000,
      status: 'success',
      method: 'Apple Pay'
    };
    return (
      <div className="flex flex-col h-[100dvh] min-h-[100dvh] overflow-y-auto px-6 py-10 items-center text-center justify-between bg-white">
        <div className="flex flex-col items-center gap-3 mt-4 w-full">
          <div className="w-16 h-16 rounded-full bg-[#248A3D]/15 text-[#248A3D] flex items-center justify-center">
            <Check className="w-8 h-8" strokeWidth={2.5} />
          </div>
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#248A3D]">
            Pembayaran Berhasil
          </span>
          <h1 className="text-[26px] font-bold text-[#1D1D1F]">Pesanan Dikonfirmasi</h1>
          <p className="text-[14px] text-[#6E6E73] max-w-[280px]">
            Tunjukkan QR Pass berikut di meja pengambilan Apple The Exchange TRX.
          </p>

          <div className="w-full mt-4 rounded-[20px] bg-[#F5F5F7] p-5 flex flex-col items-center gap-3 border border-[#E8E8ED]">
            <span className="text-[12px] text-[#6E6E73]">Referensi Pesanan</span>
            <span className="text-[20px] font-bold tracking-wider text-[#1D1D1F]">{res.orderId}</span>
            <div className="w-28 h-28 rounded-[12px] bg-white p-2 flex items-center justify-center shadow-sm">
              <QrCode className="w-20 h-20 text-[#1D1D1F]" strokeWidth={1.5} />
            </div>
            <span className="text-[14px] font-semibold text-[#1D1D1F]">
              Total Dibayar: {formatIDR(res.total)}
            </span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-2.5 mt-6">
          <button
            onClick={() => navigate(`/orders/${res.orderId}`)}
            className="w-full h-[48px] rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[15px] font-semibold"
          >
            Lihat Detail Pesanan
          </button>
          <button
            onClick={() => navigate('/')}
            className="w-full h-[52px] rounded-full bg-[#0071E3] text-white text-[15px] font-semibold"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    );
  }

  // Standalone: /products/:slug/gallery
  if (matchedRoute.id === 'product_gallery') {
    const product = PRODUCTS.find((p) => p.slug === matchedRoute.param) || PRODUCTS[0];
    return (
      <div className="flex flex-col h-[100dvh] min-h-[100dvh] bg-[#111111] text-white justify-between p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(`/products/${product.slug}`)}
            aria-label="Tutup Galeri"
            className="w-[44px] h-[44px] rounded-full bg-white/15 flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[14px] font-semibold">{product.name}</span>
          <button
            onClick={() => setZoomed(!zoomed)}
            aria-label="Perbesar Gambar"
            className="w-[44px] h-[44px] rounded-full bg-white/15 flex items-center justify-center"
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center overflow-hidden">
          <div className={`transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}>
            <ProductArtwork type={product.artwork} colorHex={product.colors[0].hex} className="w-60 h-60" />
          </div>
        </div>

        <p className="text-center text-[12px] text-[#AEAEB2] pb-4">
          Ketuk ikon kaca pembesar di kanan atas untuk memperbesar tampilan perangkat
        </p>
      </div>
    );
  }

  // Fallback 404 Standalone
  return (
    <div className="flex flex-col h-[100dvh] min-h-[100dvh] px-6 items-center justify-center text-center gap-4 bg-white">
      <h1 className="text-[48px] font-bold text-[#1D1D1F]">404</h1>
      <p className="text-[16px] font-semibold text-[#1D1D1F]">Halaman tidak ditemukan.</p>
      <button
        onClick={() => navigate('/')}
        className="h-[48px] px-6 rounded-full bg-[#0071E3] text-white text-[15px] font-semibold"
      >
        Kembali ke Beranda
      </button>
    </div>
  );
}

/**
 * ============================================================================
 * 8. CENTRALIZED OVERLAY HOST (Stackable, Portal-Layer, Escape & Backdrop)
 * ============================================================================
 */
function OverlayHost({ stack, popOverlay, addToCart }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && stack.length > 0) {
        popOverlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [stack, popOverlay]);

  if (stack.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[70] max-w-[480px] mx-auto pointer-events-none">
      {stack.map((layer, index) => {
        const zBase = 70 + index * 10;
        return (
          <div
            key={layer.key}
            style={{ zIndex: zBase }}
            className="fixed inset-0 max-w-[480px] mx-auto flex flex-col justify-end pointer-events-auto"
          >
            {/* Backdrop */}
            <div
              onClick={popOverlay}
              className="absolute inset-0 bg-black/40 transition-opacity"
            />

            {/* Layer Content */}
            <div className="relative z-10 w-full">
              {layer.id === 'variant_selector' && (
                <VariantBottomSheet
                  product={layer.payload}
                  onClose={popOverlay}
                  onAdd={(prod, color, storage, qty) => {
                    addToCart(prod, color, storage, qty);
                    popOverlay();
                  }}
                />
              )}

              {layer.id === 'filter_sheet' && (
                <div className="bg-white rounded-t-[20px] p-4 pb-8 flex flex-col gap-4 shadow-xl">
                  <div className="w-9 h-1 rounded-full bg-[#D2D2D7] mx-auto" />
                  <div className="flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-[#1D1D1F]">Filter Harga Maksimum</h2>
                    <button onClick={popOverlay} className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[15000000, 25000000, 50000000].map((limit) => (
                      <button
                        key={limit}
                        onClick={() => {
                          layer.payload.setMaxPrice(limit);
                          popOverlay();
                        }}
                        className={`h-[48px] px-4 rounded-[12px] flex items-center justify-between text-[14px] ${
                          layer.payload.maxPrice === limit
                            ? 'bg-[#EAF3FF] text-[#0071E3] font-semibold'
                            : 'bg-[#F5F5F7] text-[#1D1D1F]'
                        }`}
                      >
                        <span>{limit === 50000000 ? 'Semua Harga' : `Hingga ${formatIDR(limit)}`}</span>
                        {layer.payload.maxPrice === limit && <Check className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {layer.id === 'sort_sheet' && (
                <div className="bg-white rounded-t-[20px] p-4 pb-8 flex flex-col gap-3 shadow-xl">
                  <div className="w-9 h-1 rounded-full bg-[#D2D2D7] mx-auto" />
                  <div className="flex items-center justify-between">
                    <h2 className="text-[18px] font-bold text-[#1D1D1F]">Urutkan Produk</h2>
                    <button onClick={popOverlay} className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  {[
                    { id: 'featured', label: 'Unggulan' },
                    { id: 'price_asc', label: 'Harga: Terendah ke Tertinggi' },
                    { id: 'price_desc', label: 'Harga: Tertinggi ke Terendah' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        layer.payload.setSortBy(opt.id);
                        popOverlay();
                      }}
                      className={`h-[48px] px-4 rounded-[12px] flex items-center justify-between text-[14px] ${
                        layer.payload.sortBy === opt.id
                          ? 'bg-[#EAF3FF] text-[#0071E3] font-semibold'
                          : 'bg-[#F5F5F7] text-[#1D1D1F]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {layer.payload.sortBy === opt.id && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              )}

              {layer.id === 'confirm_remove' && (
                <div className="m-4 mb-auto mt-auto bg-white rounded-[20px] p-6 shadow-xl flex flex-col gap-4 text-center">
                  <h2 className="text-[18px] font-bold text-[#1D1D1F]">{layer.payload.title}</h2>
                  <p className="text-[14px] text-[#6E6E73]">{layer.payload.message}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={popOverlay}
                      className="h-[44px] rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[14px] font-semibold"
                    >
                      Batal
                    </button>
                    <button
                      onClick={() => {
                        layer.payload.onConfirm();
                        popOverlay();
                      }}
                      className="h-[44px] rounded-full bg-[#D70015] text-white text-[14px] font-semibold"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function VariantBottomSheet({ product, onClose, onAdd }) {
  const [cIdx, setCIdx] = useState(0);
  const [sIdx, setSIdx] = useState(0);
  const color = product.colors[cIdx] || product.colors[0];
  const storage = product.storages[sIdx] || product.storages[0];
  const total = product.price + storage.delta;

  return (
    <div className="bg-white rounded-t-[20px] p-4 pb-8 flex flex-col gap-4 shadow-xl max-h-[90dvh] overflow-y-auto">
      <div className="w-9 h-1 rounded-full bg-[#D2D2D7] mx-auto" />
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase text-[#0071E3]">{product.categoryLabel}</span>
          <h2 className="text-[20px] font-bold text-[#1D1D1F]">{product.name}</h2>
        </div>
        <button onClick={onClose} aria-label="Tutup" className="w-9 h-9 rounded-full bg-[#F5F5F7] flex items-center justify-center">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-[#1D1D1F]">Warna: {color.name}</span>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c, idx) => (
            <button
              key={c.name}
              onClick={() => setCIdx(idx)}
              className={`h-[38px] px-3 rounded-full border flex items-center gap-2 text-[13px] ${
                idx === cIdx ? 'border-[#0071E3] bg-[#EAF3FF]/50 font-semibold' : 'border-[#D2D2D7]'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full border border-black/15" style={{ backgroundColor: c.hex }} />
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-semibold text-[#1D1D1F]">Kapasitas</span>
        <div className="grid grid-cols-2 gap-2">
          {product.storages.map((s, idx) => (
            <button
              key={s.label}
              onClick={() => setSIdx(idx)}
              className={`h-[44px] px-3 rounded-[10px] border flex items-center justify-between text-[13px] ${
                idx === sIdx ? 'border-[#0071E3] bg-[#EAF3FF]/40 text-[#0071E3] font-semibold' : 'border-[#D2D2D7]'
              }`}
            >
              <span>{s.label}</span>
              <span>{s.delta > 0 ? `+${formatIDR(s.delta)}` : 'Standar'}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onAdd(product, color, storage, 1)}
        className="w-full h-[52px] rounded-full bg-[#0071E3] text-white text-[15px] font-semibold mt-2"
      >
        Tambah ke Keranjang · {formatIDR(total)}
      </button>
    </div>
  );
}

/**
 * ============================================================================
 * 9. ROOT APP COMPONENT (RouteResolver, Guard Enforcement & AppShell)
 * ============================================================================
 */
export default function App() {
  const [route, setRoute] = useState('/');
  const [intendedRoute, setIntendedRoute] = useState(null);
  const [user, setUser] = useState({
    name: 'Aiden Tan',
    initials: 'AT',
    email: 'aiden.tan@icloud.com',
    phone: '+62 812-8890-4410'
  });

  const [cart, setCart] = useState([
    {
      uid: 'iphone-16-pro-Desert Titanium-256GB',
      productId: 'iphone-16-pro',
      name: 'iPhone 16 Pro',
      color: 'Desert Titanium',
      colorHex: '#C5B49E',
      storage: '256GB',
      unitPrice: 23999000,
      qty: 1,
      selected: true,
      artwork: 'smartphone'
    }
  ]);

  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [wishlist, setWishlist] = useState(['macbook-pro-14-m4']);
  const [recentSearches, setRecentSearches] = useState(['iPhone 16 Pro', 'AirPods Max']);
  const [addresses, setAddresses] = useState([
    {
      id: 'addr-1',
      label: 'Pengambilan Toko',
      recipient: 'Aiden Tan',
      phone: '+62 812-8890-4410',
      fullAddress: 'Apple The Exchange TRX, Persiaran TRX, 55188 Kuala Lumpur',
      isDefault: true
    }
  ]);
  const [orders, setOrders] = useState([
    {
      id: 'TRX-749102',
      date: '14 Nov 2026',
      status: 'Selesai',
      shipping: 'Pengambilan di Apple The Exchange TRX',
      address: 'Apple The Exchange TRX, Persiaran TRX',
      items: [{ name: 'AirPods Pro (Generasi ke-2)', color: 'White', storage: 'USB-C MagSafe', qty: 1, unitPrice: 3999000 }],
      total: 3999000
    }
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      category: 'Pesanan',
      title: 'Pesanan TRX-749102 Siap Diambil',
      body: 'Perangkat Anda siap diambil di Apple The Exchange TRX Lantai G.',
      time: '15m lalu',
      unread: true
    },
    {
      id: 'n2',
      category: 'Promo',
      title: 'Voucher Spesial Member TRXWELCOME',
      body: 'Nikmati potongan langsung Rp 500.000 untuk pembelian hari ini.',
      time: '2j lalu',
      unread: true
    }
  ]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 'm1',
      sender: 'agent',
      name: 'Mei Ling · Spesialis TRX',
      text: 'Selamat datang di Apple The Exchange TRX! Ada yang bisa saya bantu hari ini?',
      time: '19:00'
    }
  ]);

  const [lastPaymentResult, setLastPaymentResult] = useState(null);
  const [overlayStack, setOverlayStack] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Preserve scroll position on tab change inside MainContent
  const mainScrollRef = useRef(null);
  const scrollPositionsRef = useRef({});

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const pushOverlay = (layer) => {
    setOverlayStack((prev) => [...prev, { ...layer, key: Date.now() + Math.random() }]);
  };

  const popOverlay = () => {
    setOverlayStack((prev) => prev.slice(0, -1));
  };

  const navigate = (targetPath) => {
    // Save current scroll position of MainContent
    if (mainScrollRef.current) {
      scrollPositionsRef.current[route] = mainScrollRef.current.scrollTop;
    }

    const nextMatch = matchRoute(targetPath);

    // Route Access Guard Enforcement
    if (nextMatch.access === 'authenticated' && !user) {
      setIntendedRoute(targetPath);
      showToast('Silakan masuk terlebih dahulu untuk mengakses halaman ini', 'info');
      setRoute('/login');
      return;
    }
    if (nextMatch.access === 'guest_only' && user) {
      setRoute('/');
      return;
    }

    setRoute(targetPath);
  };

  // Restore scroll position when switching AppShell routes
  useEffect(() => {
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = scrollPositionsRef.current[route] || 0;
    }
  }, [route]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      showToast(exists ? 'Dihapus dari Wishlist' : 'Disimpan ke Wishlist', 'info');
      return exists ? prev.filter((id) => id !== productId) : [...prev, productId];
    });
  };

  const addToCart = (product, color, storage, qty = 1, silent = false) => {
    const uid = `${product.id}-${color.name}-${storage.label}`;
    const unitPrice = product.price + storage.delta;
    setCart((prev) => {
      const found = prev.find((i) => i.uid === uid);
      if (found) {
        return prev.map((i) => (i.uid === uid ? { ...i, qty: i.qty + qty, selected: true } : i));
      }
      return [
        ...prev,
        {
          uid,
          productId: product.id,
          name: product.name,
          color: color.name,
          colorHex: color.hex,
          storage: storage.label,
          unitPrice,
          qty,
          selected: true,
          artwork: product.artwork
        }
      ];
    });
    if (!silent) {
      showToast(`${product.name} ditambahkan ke keranjang`, 'success');
    }
  };

  const matchedRoute = matchRoute(route);
  const totalCartItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const unreadNotifCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="w-full h-[100dvh] min-h-[100dvh] bg-[#E8E8ED] flex justify-center overflow-hidden select-none sm:select-auto font-sans text-[#1D1D1F]">
      {/* Centered Mobile-Only Canvas (max-width: 480px, height: 100dvh) */}
      <div className="relative w-full max-w-[480px] h-[100dvh] min-h-[100dvh] bg-white shadow-2xl flex flex-col overflow-hidden">
        
        {/* Global Toast Layer */}
        <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-[448px] z-[110] pointer-events-none flex flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="bg-[#1D1D1F] text-white px-4 py-3 rounded-[10px] shadow-lg flex items-center gap-2.5 text-[13px] font-medium"
            >
              {t.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#248A3D] shrink-0" />
              ) : t.type === 'error' ? (
                <AlertCircle className="w-4 h-4 text-[#D70015] shrink-0" />
              ) : (
                <Info className="w-4 h-4 text-[#0071E3] shrink-0" />
              )}
              <span className="flex-1">{t.message}</span>
            </div>
          ))}
        </div>

        {/* =================================================================
            ROUTE RENDERER: StandalonePageRenderer vs AppShell
            ================================================================= */}
        {matchedRoute.shell === 'standalone' ? (
          <StandalonePageRenderer
            matchedRoute={matchedRoute}
            navigate={navigate}
            user={user}
            setUser={setUser}
            intendedRoute={intendedRoute}
            setIntendedRoute={setIntendedRoute}
            cart={cart}
            setCart={setCart}
            appliedVoucher={appliedVoucher}
            setAppliedVoucher={setAppliedVoucher}
            addresses={addresses}
            orders={orders}
            setOrders={setOrders}
            notifications={notifications}
            setNotifications={setNotifications}
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
            lastPaymentResult={lastPaymentResult}
            setLastPaymentResult={setLastPaymentResult}
            showToast={showToast}
            pushOverlay={pushOverlay}
          />
        ) : (
          /* APP SHELL: Direct children strictly [Header, main_content, bottom_navigation] */
          <div className="flex flex-col w-full h-[100dvh] min-h-[100dvh] overflow-hidden">
            
            {/* 1. Header (flex: 0 0 auto, sticky top) */}
            <AppHeader
              navigate={navigate}
              totalCartItems={totalCartItems}
              unreadNotifCount={unreadNotifCount}
              user={user}
            />

            {/* 2. main_content (flex: 1 1 0%, min-height: 0, overflow-y: auto) */}
            <main
              id="main-content"
              ref={mainScrollRef}
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain bg-white"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <PageRenderer
                matchedRoute={matchedRoute}
                navigate={navigate}
                user={user}
                setUser={setUser}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                addToCart={addToCart}
                addresses={addresses}
                setAddresses={setAddresses}
                orders={orders}
                setOrders={setOrders}
                recentSearches={recentSearches}
                setRecentSearches={setRecentSearches}
                showToast={showToast}
                pushOverlay={pushOverlay}
              />
            </main>

            {/* 3. bottom_navigation (flex: 0 0 auto, in_flow) */}
            <BottomNavigation currentRoute={route} navigate={navigate} />
          </div>
        )}

        {/* =================================================================
            CENTRALIZED OVERLAY HOST (Above App Content)
            ================================================================= */}
        <OverlayHost stack={overlayStack} popOverlay={popOverlay} addToCart={addToCart} />
      </div>
    </div>
  );
}
