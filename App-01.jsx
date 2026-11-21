import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  ArrowLeft,
  Bell,
  Check,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Grid,
  Heart,
  HelpCircle,
  Home,
  Info,
  Lock,
  LogOut,
  MapPin,
  MessageCircle,
  Minus,
  Moon,
  Package,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Sun,
  Tag,
  Trash2,
  Truck,
  User,
  X,
} from "lucide-react";

/**
 * ============================================================================
 * 1. CONFIGURATION & DESIGN SYSTEM TOKENS (App.json & design_system.json)
 * ============================================================================
 */
const APP_CONFIG = {
  config: {
    name: "Storefront App",
    file: "App.json",
    version: "1.6.0",
    status: "draft",
    description:
      "Konfigurasi aplikasi storefront React mobile-only dengan AppShell, halaman standalone, navigasi utama, dan overlay.",
    platform: "mobile",
    framework: "react",
    rendering: "spa",
    design_reference: "design_system.json",
  },
  application: {
    id: "storefront",
    name: "Storefront",
    locale: "id-ID",
    theme: {
      mode: "system",
      source: "design_system.json",
    },
  },
  app_shell: {
    header: {
      enabled: true,
      items: [
        { id: "logo", type: "brand", enabled: true, align: "left", target: "home" },
        {
          id: "notification",
          type: "icon_button",
          enabled: true,
          align: "right",
          show_badge: true,
          target: "notification",
        },
        {
          id: "cart",
          type: "icon_button",
          enabled: true,
          align: "right",
          show_badge: true,
          target: "cart",
        },
        {
          id: "profile",
          type: "avatar_button",
          enabled: true,
          align: "right",
          target: "profile",
        },
      ],
    },
    main_content: {
      pages: [
        {
          id: "home",
          path: "/",
          title: "Beranda",
          component: "HomePage",
          enabled: true,
          render_in: "app_shell",
          bottom_tab: true,
        },
        {
          id: "products",
          path: "/products",
          title: "Produk",
          component: "ProductsPage",
          enabled: true,
          render_in: "app_shell",
          bottom_tab: true,
        },
        {
          id: "profile",
          path: "/profile",
          title: "Profil",
          component: "ProfilePage",
          enabled: true,
          render_in: "app_shell",
          bottom_tab: false,
        },
      ],
    },
    bottom_navigation: {
      enabled: true,
      items: [
        { id: "home", label: "Home", icon: "home", route: "/", page: "home" },
        {
          id: "products",
          label: "Products",
          icon: "grid",
          route: "/products",
          page: "products",
        },
        {
          id: "livechat",
          label: "Live Chat",
          icon: "message-circle",
          route: "/livechat",
          page: "livechat",
        },
      ],
    },
  },
  standalone_pages: {
    pages: [
      {
        id: "checkout",
        path: "/checkout",
        title: "Checkout",
        component: "CheckoutPage",
        enabled: true,
      },
      {
        id: "payment_result",
        path: "/payment/result",
        title: "Status Pembayaran",
        component: "PaymentResultPage",
        enabled: true,
      },
      {
        id: "notification",
        path: "/notifications",
        title: "Notifikasi",
        component: "NotificationsPage",
        enabled: true,
      },
      {
        id: "cart",
        path: "/cart",
        title: "Keranjang",
        component: "CartPage",
        enabled: true,
      },
      {
        id: "livechat",
        path: "/livechat",
        title: "Live Chat",
        component: "LiveChatPage",
        enabled: true,
      },
    ],
  },
  navigation: {
    default_route: "/",
    not_found_route: "/404",
    route_access: {
      home: "public",
      products: "public",
      categories: "public",
      category_detail: "public",
      product_detail: "public",
      search: "public",
      livechat: "public",
      cart: "public",
      wishlist: "public",
      profile: "public",
      orders: "authenticated",
      order_detail: "authenticated",
      addresses: "authenticated",
      address_form: "authenticated",
      account_settings: "authenticated",
      help: "public",
      login: "guest_only",
      register: "guest_only",
      forgot_password: "guest_only",
      checkout: "authenticated",
      payment_result: "authenticated",
      notification: "public",
    },
    guards: {
      authenticated_redirect: "/login",
      guest_only_redirect: "/",
      preserve_intended_destination: true,
    },
  },
};

const DESIGN_TOKENS = {
  color: {
    palette: {
      white: "#FFFFFF",
      black: "#000000",
      gray_50: "#F9F9FB",
      gray_100: "#F5F5F7",
      gray_200: "#E8E8ED",
      gray_300: "#D2D2D7",
      gray_400: "#AEAEB2",
      gray_500: "#86868B",
      gray_600: "#6E6E73",
      gray_700: "#424245",
      gray_800: "#2C2C2E",
      gray_900: "#1D1D1F",
      blue_500: "#0071E3",
      blue_600: "#006EDB",
      green_500: "#248A3D",
      red_500: "#D70015",
      orange_500: "#C93400",
      yellow_500: "#B88600",
    },
    semantic: {
      light: {
        background: "#FFFFFF",
        surface: "#FFFFFF",
        surface_secondary: "#F5F5F7",
        surface_tertiary: "#F9F9FB",
        text_primary: "#1D1D1F",
        text_secondary: "#6E6E73",
        text_tertiary: "#86868B",
        text_inverse: "#FFFFFF",
        border: "#E8E8ED",
        border_strong: "#D2D2D7",
        accent: "#0071E3",
        accent_hover: "#006EDB",
        accent_subtle: "#EAF3FF",
        success: "#248A3D",
        success_subtle: "#EAF6EC",
        warning: "#B88600",
        warning_subtle: "#FFF6DB",
        danger: "#D70015",
        danger_subtle: "#FFF0F0",
        overlay_backdrop: "rgba(0, 0, 0, 0.40)",
      },
      dark: {
        background: "#000000",
        surface: "#1C1C1E",
        surface_secondary: "#2C2C2E",
        surface_tertiary: "#3A3A3C",
        text_primary: "#F5F5F7",
        text_secondary: "#AEAEB2",
        text_tertiary: "#8E8E93",
        text_inverse: "#1D1D1F",
        border: "#38383A",
        border_strong: "#48484A",
        accent: "#0A84FF",
        accent_hover: "#409CFF",
        accent_subtle: "#102A45",
        success: "#30D158",
        success_subtle: "#15351F",
        warning: "#FFD60A",
        warning_subtle: "#3A3210",
        danger: "#FF453A",
        danger_subtle: "#3D1717",
        overlay_backdrop: "rgba(0, 0, 0, 0.64)",
      },
    },
  },
  overlay_z_index: {
    page: 0,
    popover: 100,
    drawer: 200,
    bottom_sheet: 300,
    modal: 400,
    dialog: 500,
    toast: 600,
  },
};

/**
 * ============================================================================
 * 2. MOCK STOREFRONT DATA (data.json)
 * ============================================================================
 */
const INITIAL_CATEGORIES = [
  { id: "audio", name: "Audio", iconName: "Sparkles", count: 4 },
  { id: "wearables", name: "Wearables", iconName: "Star", count: 3 },
  { id: "desk", name: "Desk Setup", iconName: "Package", count: 4 },
  { id: "bags", name: "Tas & Travel", iconName: "ShoppingBag", count: 3 },
];

const INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "Studio ANC Wireless Headphones",
    category: "audio",
    categoryLabel: "Audio",
    price: 2499000,
    comparePrice: 2899000,
    rating: 4.9,
    reviewsCount: 318,
    badge: "Terlaris",
    badgeVariant: "info",
    colorName: "Silver Matte",
    accentHex: "#D2D2D7",
    description:
      "Headphone nirkabel peredam bising adaptif dengan driver 40mm berpresisi tinggi, daya tahan baterai hingga 40 jam, serta bantalan busa memori ultra-lembut untuk sesi mendengarkan panjang.",
    specs: [
      "Baterai hingga 40 jam (USB-C Fast Charge)",
      "Active Noise Cancellation + Transparency Mode",
      "Bluetooth 5.3 Multipoint Connection",
    ],
  },
  {
    id: "prod-2",
    name: "Chrono Titanium Smart Watch",
    category: "wearables",
    categoryLabel: "Wearables",
    price: 3899000,
    comparePrice: null,
    rating: 4.8,
    reviewsCount: 214,
    badge: "Baru",
    badgeVariant: "success",
    colorName: "Natural Titanium",
    accentHex: "#8E8E93",
    description:
      "Jam tangan pintar berbingkai titanium ringan dengan layar LTPO OLED super terang, pemantauan detak jantung & tidur presisi, serta ketahanan air 5ATM.",
    specs: [
      "Layar LTPO OLED 2000 nits anti-silau",
      "Sensor kesehatan & latihan multi-olahraga",
      "Tahan air 5ATM + GPS dual-frekuensi",
    ],
  },
  {
    id: "prod-3",
    name: "Aero Mechanical Compact 75%",
    category: "desk",
    categoryLabel: "Desk Setup",
    price: 1649000,
    comparePrice: 1899000,
    rating: 4.9,
    reviewsCount: 162,
    badge: "Hemat",
    badgeVariant: "warning",
    colorName: "Cloud Gray",
    accentHex: "#6E6E73",
    description:
      "Keyboard mekanikal layout 75% dengan gasket mount, switch tactile senyap, keycap PBT dye-sub, dan konektivitas tri-mode untuk meja kerja minimalis.",
    specs: [
      "Gasket mount + peredam suara 4 lapis",
      "Koneksi Wired USB-C, 2.4GHz & Bluetooth",
      "Keycap PBT tebal anti-kilap",
    ],
  },
  {
    id: "prod-4",
    name: "Nomad Sling Pack 6L Weatherproof",
    category: "bags",
    categoryLabel: "Tas & Travel",
    price: 899000,
    comparePrice: null,
    rating: 4.7,
    reviewsCount: 95,
    badge: null,
    badgeVariant: "neutral",
    colorName: "Obsidian Black",
    accentHex: "#1D1D1F",
    description:
      "Tas selempang ringkas berbahan kain ripstop tahan cipratan air dengan kompartemen terorganisir untuk kamera saku, powerbank, dan kebutuhan harian.",
    specs: [
      "Material ripstop tahan air & ritsleting YKK",
      "Kapasitas 6L dengan saku magnetik cepat",
      "Tali bahu ergonomis lepas-pasang",
    ],
  },
  {
    id: "prod-5",
    name: "Pulse Mini Desk Speaker",
    category: "audio",
    categoryLabel: "Audio",
    price: 1299000,
    comparePrice: 1499000,
    rating: 4.8,
    reviewsCount: 128,
    badge: "Terlaris",
    badgeVariant: "info",
    colorName: "Warm White",
    accentHex: "#F5F5F7",
    description:
      "Speaker meja ringkas dengan suara jernih seimbang, radiator pasif ganda, serta kontrol putar aluminium presisi untuk ruang kerja atau kamar.",
    specs: [
      "Dual full-range driver + bass radiator",
      "Input USB-C audio & Bluetooth 5.3",
      "Bodi aluminium anodized minimalis",
    ],
  },
  {
    id: "prod-6",
    name: "MagStand Aluminum Charging Dock",
    category: "desk",
    categoryLabel: "Desk Setup",
    price: 749000,
    comparePrice: null,
    rating: 4.6,
    reviewsCount: 84,
    badge: null,
    badgeVariant: "neutral",
    colorName: "Graphite",
    accentHex: "#424245",
    description:
      "Dudukan pengisi daya magnetik berbahan aluminium solid dengan sudut kemiringan ergonomis untuk melihat notifikasi dan panggilan di meja kerja.",
    specs: [
      "Pengisian daya magnetik 15W stabil",
      "Alas anti-slip & pemberat presisi",
      "Termasuk kabel USB-C anyaman 1.5m",
    ],
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Promo Akhir Pekan Gear Kerja",
    body: "Nikmati potongan spesial untuk seri Audio dan Desk Setup pilihan hingga Minggu malam.",
    time: "15 menit lalu",
    read: false,
    type: "promo",
  },
  {
    id: "notif-2",
    title: "Pesanan #SF-2026-8841 Sedang Dikirim",
    body: "Kurir telah mengambil paket Anda dan sedang dalam perjalanan menuju alamat tujuan.",
    time: "2 jam lalu",
    read: false,
    type: "order",
  },
  {
    id: "notif-3",
    title: "Selamat Datang di Storefront",
    body: "Gunakan kode voucher HEMAT10 untuk potongan 10% pada transaksi berikutnya.",
    time: "Kemarin",
    read: true,
    type: "info",
  },
];

const INITIAL_ADDRESSES = [
  {
    id: "addr-1",
    label: "Rumah Utama",
    recipient: "Nadia Kusuma",
    phone: "0812-3456-7890",
    street: "Jl. Boulevard Panakkukang No. 28, Masale",
    city: "Makassar, Sulawesi Selatan 90231",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Kantor Studio",
    recipient: "Nadia Kusuma",
    phone: "0812-3456-7890",
    street: "Jl. Jenderal Sudirman Kav. 14, Sawerigading",
    city: "Makassar, Sulawesi Selatan 90113",
    isDefault: false,
  },
];

const INITIAL_ORDERS = [
  {
    id: "SF-2026-8841",
    date: "20 Nov 2026",
    status: "Dalam Pengiriman",
    statusVariant: "info",
    total: 2499000,
    shippingMethod: "Reguler Express (1-2 Hari)",
    paymentMethod: "QRIS / Virtual Account",
    address: "Jl. Boulevard Panakkukang No. 28, Makassar",
    items: [
      {
        productId: "prod-1",
        name: "Studio ANC Wireless Headphones",
        price: 2499000,
        qty: 1,
        colorName: "Silver Matte",
        accentHex: "#D2D2D7",
      },
    ],
  },
  {
    id: "SF-2026-8790",
    date: "08 Nov 2026",
    status: "Selesai",
    statusVariant: "success",
    total: 1649000,
    shippingMethod: "Hemat Terpercaya (2-4 Hari)",
    paymentMethod: "Kartu Debit / Kredit",
    address: "Jl. Boulevard Panakkukang No. 28, Makassar",
    items: [
      {
        productId: "prod-3",
        name: "Aero Mechanical Compact 75%",
        price: 1649000,
        qty: 1,
        colorName: "Cloud Gray",
        accentHex: "#6E6E73",
      },
    ],
  },
];

const SHIPPING_METHODS = [
  {
    id: "reguler",
    name: "Reguler Express",
    eta: "Estimasi tiba 1–2 hari",
    cost: 18000,
  },
  {
    id: "hemat",
    name: "Hemat Terpercaya",
    eta: "Estimasi tiba 2–4 hari",
    cost: 0,
  },
  {
    id: "instant",
    name: "Kilat Same-Day",
    eta: "Tiba dalam beberapa jam",
    cost: 35000,
  },
];

const PAYMENT_METHODS = [
  {
    id: "qris",
    name: "QRIS Instant Pay",
    detail: "Scan kode QR semua e-wallet & m-banking",
  },
  {
    id: "va",
    name: "Transfer Virtual Account",
    detail: "Verifikasi otomatis tanpa unggah bukti",
  },
  {
    id: "card",
    name: "Kartu Debit / Kredit",
    detail: "Visa, Mastercard & JCB terenkripsi",
  },
];

const VOUCHERS = {
  HEMAT10: {
    code: "HEMAT10",
    type: "percent",
    value: 0.1,
    description: "Diskon 10% subtotal produk",
  },
  ONGKIRFREE: {
    code: "ONGKIRFREE",
    type: "shipping",
    value: 1,
    description: "Gratis ongkos kirim penuh",
  },
};

const INITIAL_CHAT_MESSAGES = [
  {
    id: "msg-1",
    sender: "agent",
    agentName: "Raka · Spesialis Produk",
    text: "Halo! Selamat datang di Storefront. Ada yang bisa saya bantu terkait spesifikasi produk, stok, atau pesanan Anda?",
    time: "19:00",
  },
];

function formatIDR(amount) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

/**
 * ============================================================================
 * 3. THEME & APPLICATION STATE CONTEXT
 * ============================================================================
 */
const AppContext = createContext(null);

function AppProvider({ children }) {
  // Theme mode: "system" | "light" | "dark"
  const [themeMode, setThemeMode] = useState(APP_CONFIG.application.theme.mode);
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setSystemPrefersDark(e.matches);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const resolvedTheme =
    themeMode === "system" ? (systemPrefersDark ? "dark" : "light") : themeMode;

  const tokens = useMemo(() => {
    const semantic = DESIGN_TOKENS.color.semantic[resolvedTheme];
    return {
      mode: themeMode,
      resolvedTheme,
      ...semantic,
      palette: DESIGN_TOKENS.color.palette,
      zIndex: DESIGN_TOKENS.overlay_z_index,
    };
  }, [themeMode, resolvedTheme]);

  // Auth & User State
  const [user, setUser] = useState({
    id: "usr-01",
    name: "Nadia Kusuma",
    email: "nadia.kusuma@storefront.id",
    phone: "0812-3456-7890",
    tier: "Member Plus",
    isAuthenticated: true,
  });

  // Navigation State (path-based + params)
  const [currentPath, setCurrentPath] = useState("/");
  const [routeParams, setRouteParams] = useState({});
  const [intendedRoute, setIntendedRoute] = useState(null);

  // Commerce & App Data State
  const [products] = useState(INITIAL_PRODUCTS);
  const [categories] = useState(INITIAL_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [cart, setCart] = useState([
    {
      productId: "prod-1",
      qty: 1,
    },
  ]);
  const [wishlist, setWishlist] = useState(["prod-2"]);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [lastPaymentResult, setLastPaymentResult] = useState({
    status: "success",
    orderId: "SF-2026-8841",
    amount: 2517000,
    method: "QRIS Instant Pay",
    message: "Pembayaran telah terverifikasi dan pesanan sedang diproses.",
  });
  const [chatMessages, setChatMessages] = useState(INITIAL_CHAT_MESSAGES);

  // Centralized Overlay State (managed by OverlayHost)
  const [overlays, setOverlays] = useState([]);
  const [toasts, setToasts] = useState([]);
  const lastFocusedElementRef = useRef(null);

  const showToast = useCallback((message, variant = "default") => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setToasts((prev) => [...prev.slice(-2), { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 2800);
  }, []);

  const openOverlay = useCallback((overlayConfig) => {
    if (typeof document !== "undefined" && document.activeElement instanceof HTMLElement) {
      lastFocusedElementRef.current = document.activeElement;
    }
    const id = overlayConfig.id || `ov-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setOverlays((prev) => [...prev, { ...overlayConfig, id }]);
    return id;
  }, []);

  const closeOverlay = useCallback((id) => {
    setOverlays((prev) => {
      if (id) return prev.filter((item) => item.id !== id);
      return prev.slice(0, -1);
    });
    setTimeout(() => {
      if (lastFocusedElementRef.current && typeof lastFocusedElementRef.current.focus === "function") {
        lastFocusedElementRef.current.focus();
        lastFocusedElementRef.current = null;
      }
    }, 10);
  }, []);

  const closeAllOverlays = useCallback(() => {
    setOverlays([]);
  }, []);

  // Route & Guard Resolution
  const resolveRouteKey = useCallback((path) => {
    if (path === "/") return "home";
    if (path === "/products") return "products";
    if (path === "/profile") return "profile";
    if (path === "/checkout") return "checkout";
    if (path === "/payment/result") return "payment_result";
    if (path === "/notifications") return "notification";
    if (path === "/cart") return "cart";
    if (path === "/livechat") return "livechat";
    if (path === "/categories") return "categories";
    if (path.startsWith("/categories/")) return "category_detail";
    if (path.startsWith("/products/")) return "product_detail";
    if (path === "/search") return "search";
    if (path === "/wishlist") return "wishlist";
    if (path === "/orders") return "orders";
    if (path.startsWith("/orders/")) return "order_detail";
    if (path === "/addresses") return "addresses";
    if (path === "/address-form") return "address_form";
    if (path === "/account-settings") return "account_settings";
    if (path === "/help") return "help";
    if (path === "/login") return "login";
    if (path === "/register") return "register";
    if (path === "/forgot-password") return "forgot_password";
    return "not_found";
  }, []);

  const navigate = useCallback(
    (target, params = {}) => {
      const targetToPathMap = {
        home: "/",
        products: "/products",
        profile: "/profile",
        notification: "/notifications",
        notifications: "/notifications",
        cart: "/cart",
        livechat: "/livechat",
        checkout: "/checkout",
        payment_result: "/payment/result",
        categories: "/categories",
        category_detail: params.categoryId ? `/categories/${params.categoryId}` : "/categories",
        product_detail: params.productId ? `/products/${params.productId}` : "/products",
        search: "/search",
        wishlist: "/wishlist",
        orders: "/orders",
        order_detail: params.orderId ? `/orders/${params.orderId}` : "/orders",
        addresses: "/addresses",
        address_form: "/address-form",
        account_settings: "/account-settings",
        help: "/help",
        login: "/login",
        register: "/register",
        forgot_password: "/forgot-password",
      };

      const nextPath = target.startsWith("/")
        ? target
        : targetToPathMap[target] || APP_CONFIG.navigation.not_found_route;

      const routeKey = resolveRouteKey(nextPath);
      const accessPolicy = APP_CONFIG.navigation.route_access[routeKey] || "public";

      // Route Guard Enforcement
      if (accessPolicy === "authenticated" && !user.isAuthenticated) {
        if (APP_CONFIG.navigation.guards.preserve_intended_destination) {
          setIntendedRoute({ path: nextPath, params });
        }
        setRouteParams({});
        setCurrentPath(APP_CONFIG.navigation.guards.authenticated_redirect);
        showToast("Silakan masuk terlebih dahulu untuk mengakses halaman ini.", "warning");
        return;
      }

      if (accessPolicy === "guest_only" && user.isAuthenticated) {
        setRouteParams({});
        setCurrentPath(APP_CONFIG.navigation.guards.guest_only_redirect);
        return;
      }

      setRouteParams(params);
      setCurrentPath(nextPath);
    },
    [resolveRouteKey, user.isAuthenticated, showToast]
  );

  const loginUser = useCallback(
    (emailInput = "nadia.kusuma@storefront.id", nameInput = "Nadia Kusuma") => {
      setUser((prev) => ({
        ...prev,
        name: nameInput.trim() || "Nadia Kusuma",
        email: emailInput.trim() || "nadia.kusuma@storefront.id",
        isAuthenticated: true,
      }));
      showToast("Berhasil masuk ke akun Storefront.");

      if (intendedRoute) {
        const dest = intendedRoute;
        setIntendedRoute(null);
        setRouteParams(dest.params || {});
        setCurrentPath(dest.path);
      } else {
        setRouteParams({});
        setCurrentPath("/");
      }
    },
    [intendedRoute, showToast]
  );

  const logoutUser = useCallback(() => {
    setUser((prev) => ({
      ...prev,
      isAuthenticated: false,
    }));
    showToast("Anda telah keluar dari akun.");
    setRouteParams({});
    setCurrentPath("/");
  }, [showToast]);

  // Cart & Wishlist Actions
  const addToCart = useCallback(
    (productId, qty = 1, openCartAfter = false) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === productId);
        if (existing) {
          return prev.map((item) =>
            item.productId === productId ? { ...item, qty: item.qty + qty } : item
          );
        }
        return [...prev, { productId, qty }];
      });
      const product = products.find((p) => p.id === productId);
      showToast(`${product?.name || "Produk"} ditambahkan ke keranjang.`);
      if (openCartAfter) {
        navigate("/cart");
      }
    },
    [products, showToast, navigate]
  );

  const updateCartQty = useCallback((productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.productId === productId ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback(
    (productId) => {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      showToast("Item dihapus dari keranjang.");
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((prev) => {
        const exists = prev.includes(productId);
        const product = products.find((p) => p.id === productId);
        if (exists) {
          showToast(`Dihapus dari favorit: ${product?.name || "Produk"}`);
          return prev.filter((id) => id !== productId);
        }
        showToast(`Disimpan ke favorit: ${product?.name || "Produk"}`);
        return [...prev, productId];
      });
    },
    [products, showToast]
  );

  // Notifications Actions
  const markNotificationRead = useCallback((notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("Semua notifikasi ditandai sudah dibaca.");
  }, [showToast]);

  // Address Actions
  const saveAddress = useCallback(
    (addressData) => {
      setAddresses((prev) => {
        const normalized = prev.map((addr) =>
          addressData.isDefault ? { ...addr, isDefault: false } : addr
        );
        if (addressData.id) {
          return normalized.map((addr) =>
            addr.id === addressData.id ? { ...addr, ...addressData } : addr
          );
        }
        const newAddr = {
          ...addressData,
          id: `addr-${Date.now()}`,
          isDefault: addressData.isDefault || prev.length === 0,
        };
        return [...normalized, newAddr];
      });
      setEditingAddressId(null);
      showToast("Alamat pengiriman berhasil disimpan.");
      navigate("/addresses");
    },
    [navigate, showToast]
  );

  // Order & Checkout Actions
  const placeOrder = useCallback(
    ({ address, shippingMethod, paymentMethod, discountAmount, finalTotal, itemsDetail }) => {
      const orderId = `SF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder = {
        id: orderId,
        date: "21 Nov 2026",
        status: "Menunggu Pengiriman",
        statusVariant: "info",
        total: finalTotal,
        discountAmount,
        shippingMethod: shippingMethod.name,
        paymentMethod: paymentMethod.name,
        address: `${address.street}, ${address.city}`,
        items: itemsDetail,
      };
      setOrders((prev) => [newOrder, ...prev]);
      setLastPaymentResult({
        status: "success",
        orderId,
        amount: finalTotal,
        method: paymentMethod.name,
        message: "Pembayaran berhasil dikonfirmasi dan pesanan Anda telah dibuat.",
      });
      clearCart();
      navigate("/payment/result");
    },
    [clearCart, navigate]
  );

  const sendChatMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: trimmed,
      time: timeStr,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const replyText =
        trimmed.toLowerCase().includes("ongkir") || trimmed.toLowerCase().includes("kirim")
          ? "Kami menyediakan pengiriman Reguler Express, Hemat Terpercaya (gratis ongkir), dan Kilat Same-Day. Anda juga bisa memakai kode ONGKIRFREE saat checkout."
          : trimmed.toLowerCase().includes("garansi") || trimmed.toLowerCase().includes("retur")
          ? "Semua produk di Storefront dilindungi garansi resmi dan kebijakan pengecekan barang saat diterima."
          : "Terima kasih atas pesan Anda! Tim kami sedang meninjau detail pertanyaan Anda dan siap membantu proses belanja Anda.";

      const afterReply = new Date();
      const replyTime = `${String(afterReply.getHours()).padStart(2, "0")}:${String(
        afterReply.getMinutes()
      ).padStart(2, "0")}`;

      setChatMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now() + 1}`,
          sender: "agent",
          agentName: "Raka · Spesialis Produk",
          text: replyText,
          time: replyTime,
        },
      ]);
    }, 550);
  }, []);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      config: APP_CONFIG,
      tokens,
      themeMode,
      setThemeMode,
      resolvedTheme,
      user,
      loginUser,
      logoutUser,
      currentPath,
      routeParams,
      resolveRouteKey,
      navigate,
      products,
      categories,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      cart,
      cartCount,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      notifications,
      unreadNotificationsCount,
      markNotificationRead,
      markAllNotificationsRead,
      addresses,
      editingAddressId,
      setEditingAddressId,
      saveAddress,
      orders,
      placeOrder,
      lastPaymentResult,
      setLastPaymentResult,
      chatMessages,
      sendChatMessage,
      overlays,
      openOverlay,
      closeOverlay,
      closeAllOverlays,
      toasts,
      showToast,
    }),
    [
      tokens,
      themeMode,
      resolvedTheme,
      user,
      loginUser,
      logoutUser,
      currentPath,
      routeParams,
      resolveRouteKey,
      navigate,
      products,
      categories,
      selectedCategory,
      searchQuery,
      cart,
      cartCount,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      wishlist,
      toggleWishlist,
      notifications,
      unreadNotificationsCount,
      markNotificationRead,
      markAllNotificationsRead,
      addresses,
      editingAddressId,
      saveAddress,
      orders,
      placeOrder,
      lastPaymentResult,
      chatMessages,
      sendChatMessage,
      overlays,
      openOverlay,
      closeOverlay,
      closeAllOverlays,
      toasts,
      showToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

/**
 * ============================================================================
 * 4. REUSABLE DESIGN SYSTEM COMPONENTS (components.json & design_system.json)
 * ============================================================================
 */
function DsButton({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  ariaLabel,
  style: customStyle = {},
}) {
  const { tokens } = useApp();

  const heightMap = {
    sm: "32px",
    md: "40px",
    lg: "48px",
  };

  const getVariantStyle = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: tokens.surface_secondary,
          color: tokens.text_primary,
          border: "1px solid transparent",
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: tokens.accent,
          border: `1px solid ${tokens.accent}`,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: tokens.accent,
          border: "1px solid transparent",
        };
      case "danger":
        return {
          backgroundColor: tokens.danger,
          color: "#FFFFFF",
          border: "1px solid transparent",
        };
      case "primary":
      default:
        return {
          backgroundColor: tokens.accent,
          color: "#FFFFFF",
          border: "1px solid transparent",
        };
    }
  };

  const vStyle = getVariantStyle();

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className="ds-interactive inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        height: heightMap[size] || "40px",
        padding: size === "sm" ? "0 12px" : "0 18px",
        borderRadius: "9999px",
        fontSize: size === "sm" ? "13px" : "14px",
        lineHeight: "20px",
        fontWeight: 600,
        width: fullWidth ? "100%" : "auto",
        minHeight: "44px",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        outlineColor: tokens.accent,
        ...vStyle,
        ...customStyle,
      }}
    >
      {children}
    </button>
  );
}

function DsCard({ children, onClick, style: customStyle = {}, padding = "16px" }) {
  const { tokens } = useApp();
  const isInteractive = typeof onClick === "function";

  return (
    <div
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      className={isInteractive ? "ds-interactive transition-transform active:scale-[0.99]" : ""}
      style={{
        backgroundColor: tokens.surface,
        borderRadius: "16px",
        border: `1px solid ${tokens.border}`,
        padding,
        cursor: isInteractive ? "pointer" : "default",
        ...customStyle,
      }}
    >
      {children}
    </div>
  );
}

function DsBadge({ children, variant = "neutral" }) {
  const { tokens } = useApp();

  const variantMap = {
    neutral: { bg: tokens.surface_secondary, fg: tokens.text_secondary },
    info: { bg: tokens.accent_subtle, fg: tokens.accent },
    success: { bg: tokens.success_subtle, fg: tokens.success },
    warning: { bg: tokens.warning_subtle, fg: tokens.warning },
    danger: { bg: tokens.danger_subtle, fg: tokens.danger },
  };

  const current = variantMap[variant] || variantMap.neutral;

  return (
    <span
      className="inline-flex items-center whitespace-nowrap"
      style={{
        backgroundColor: current.bg,
        color: current.fg,
        borderRadius: "9999px",
        padding: "4px 8px",
        fontSize: "12px",
        lineHeight: "16px",
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function DsInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  id,
}) {
  const { tokens } = useApp();
  const [focused, setFocused] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          style={{
            fontSize: "13px",
            lineHeight: "18px",
            fontWeight: 600,
            color: tokens.text_primary,
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          height: "48px",
          borderRadius: "12px",
          padding: "0 12px",
          backgroundColor: tokens.surface,
          color: tokens.text_primary,
          border: `1px solid ${error ? tokens.danger : focused ? tokens.accent : tokens.border}`,
          boxShadow: focused ? `0 0 0 3px ${tokens.accent_subtle}` : "none",
          fontSize: "16px",
          lineHeight: "24px",
          outline: "none",
          width: "100%",
          transition: "border-color 120ms ease, box-shadow 120ms ease",
        }}
      />
      {error && (
        <span style={{ fontSize: "12px", color: tokens.danger }}>{error}</span>
      )}
    </div>
  );
}

function DsSearchBar({ value, onChange, onSubmit, placeholder = "Cari produk, kategori, atau seri..." }) {
  const { tokens } = useApp();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(value);
      }}
      className="flex items-center gap-2 w-full"
      style={{
        height: "44px",
        borderRadius: "9999px",
        backgroundColor: tokens.surface_secondary,
        padding: "0 14px",
        border: `1px solid ${tokens.border}`,
      }}
    >
      <Search
        size={18}
        strokeWidth={1.8}
        aria-hidden="true"
        style={{ color: tokens.text_secondary, flexShrink: 0 }}
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full bg-transparent outline-none"
        style={{
          color: tokens.text_primary,
          fontSize: "14px",
          lineHeight: "20px",
        }}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Hapus pencarian"
          className="flex items-center justify-center"
          style={{
            minWidth: "32px",
            minHeight: "32px",
            color: tokens.text_tertiary,
          }}
        >
          <X size={16} strokeWidth={1.8} />
        </button>
      )}
    </form>
  );
}

/**
 * Product Artwork Frame (Pure SVG / Geometric Minimalist Illustration — Zero External Image URLs)
 */
function ProductArtwork({ product, size = "grid" }) {
  const { tokens } = useApp();
  const isCompact = size === "thumb";

  return (
    <div
      className="relative w-full overflow-hidden flex items-center justify-center select-none"
      style={{
        aspectRatio: isCompact ? undefined : "1 / 1",
        width: isCompact ? "68px" : "100%",
        height: isCompact ? "68px" : undefined,
        borderRadius: isCompact ? "12px" : "14px",
        backgroundColor: tokens.surface_secondary,
      }}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-4/5 h-4/5"
        role="img"
        aria-label={product.name}
      >
        <defs>
          <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={product.accentHex} stopOpacity="0.92" />
            <stop offset="100%" stopColor={tokens.text_tertiary} stopOpacity="0.45" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="54" fill={`url(#grad-${product.id})`} />
        {product.category === "audio" && (
          <g fill="none" stroke={tokens.surface} strokeWidth="7" strokeLinecap="round">
            <path d="M44 86 V72 A36 36 0 0 1 116 72 V86" />
            <rect x="36" y="76" width="16" height="32" rx="8" fill={tokens.surface} stroke="none" />
            <rect x="108" y="76" width="16" height="32" rx="8" fill={tokens.surface} stroke="none" />
          </g>
        )}
        {product.category === "wearables" && (
          <g>
            <rect x="62" y="24" width="36" height="22" rx="6" fill={tokens.text_primary} opacity="0.25" />
            <rect x="62" y="114" width="36" height="22" rx="6" fill={tokens.text_primary} opacity="0.25" />
            <rect x="46" y="44" width="68" height="72" rx="22" fill={tokens.surface} />
            <circle cx="80" cy="80" r="20" fill="none" stroke={tokens.accent} strokeWidth="5" />
          </g>
        )}
        {product.category === "desk" && (
          <g>
            <rect x="32" y="54" width="96" height="52" rx="12" fill={tokens.surface} />
            <rect x="44" y="66" width="16" height="10" rx="3" fill={tokens.surface_secondary} />
            <rect x="66" y="66" width="16" height="10" rx="3" fill={tokens.surface_secondary} />
            <rect x="88" y="66" width="16" height="10" rx="3" fill={tokens.accent} />
            <rect x="44" y="82" width="44" height="10" rx="3" fill={tokens.surface_secondary} />
            <rect x="94" y="82" width="22" height="10" rx="3" fill={tokens.surface_secondary} />
          </g>
        )}
        {product.category === "bags" && (
          <g>
            <path d="M54 54 Q80 34 106 54" fill="none" stroke={tokens.surface} strokeWidth="6" strokeLinecap="round" />
            <rect x="38" y="54" width="84" height="58" rx="18" fill={tokens.surface} />
            <line x1="38" y1="78" x2="122" y2="78" stroke={tokens.surface_secondary} strokeWidth="4" />
            <rect x="72" y="72" width="16" height="12" rx="4" fill={tokens.accent} />
          </g>
        )}
      </svg>
    </div>
  );
}

function ProductCard({ product }) {
  const { tokens, navigate, addToCart, wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <DsCard
      padding="12px"
      onClick={() => navigate("product_detail", { productId: product.id })}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "8px",
        backgroundColor: tokens.surface,
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="relative">
          <ProductArtwork product={product} size="grid" />
          <button
            type="button"
            aria-label={isWishlisted ? `Hapus ${product.name} dari favorit` : `Simpan ${product.name} ke favorit`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="absolute top-2 right-2 flex items-center justify-center rounded-full"
            style={{
              width: "34px",
              height: "34px",
              backgroundColor: tokens.surface,
              color: isWishlisted ? tokens.danger : tokens.text_secondary,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <Heart
              size={16}
              strokeWidth={1.8}
              fill={isWishlisted ? tokens.danger : "none"}
            />
          </button>
        </div>

        <div className="flex items-center justify-between gap-1">
          {product.badge ? (
            <DsBadge variant={product.badgeVariant}>{product.badge}</DsBadge>
          ) : (
            <span style={{ fontSize: "12px", color: tokens.text_tertiary }}>
              {product.categoryLabel}
            </span>
          )}
          <span
            className="inline-flex items-center gap-0.5"
            style={{ fontSize: "12px", color: tokens.text_secondary }}
          >
            <Star size={12} fill={tokens.warning} color={tokens.warning} aria-hidden="true" />
            {product.rating}
          </span>
        </div>

        <h3
          className="line-clamp-2"
          style={{
            fontSize: "14px",
            lineHeight: "20px",
            fontWeight: 500,
            color: tokens.text_primary,
            minHeight: "40px",
          }}
        >
          {product.name}
        </h3>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <div>
          <div
            style={{
              fontSize: "15px",
              lineHeight: "20px",
              fontWeight: 600,
              color: tokens.text_primary,
            }}
          >
            {formatIDR(product.price)}
          </div>
          {product.comparePrice && (
            <div
              className="line-through"
              style={{
                fontSize: "12px",
                lineHeight: "16px",
                color: tokens.text_tertiary,
              }}
            >
              {formatIDR(product.comparePrice)}
            </div>
          )}
        </div>

        <DsButton
          variant="secondary"
          size="sm"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id, 1, false);
          }}
          style={{ minHeight: "36px", height: "36px" }}
        >
          <Plus size={15} strokeWidth={2} />
          Keranjang
        </DsButton>
      </div>
    </DsCard>
  );
}

/**
 * Global UI States: AppLoading, AppError, EmptyState (global_ui in App.json)
 */
function EmptyState({ icon: Icon = Package, title, description, actionLabel, onAction }) {
  const { tokens } = useApp();
  return (
    <div
      className="flex flex-col items-center justify-center text-center py-10 px-4 gap-3"
      style={{ color: tokens.text_secondary }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: "56px",
          height: "56px",
          backgroundColor: tokens.surface_secondary,
          color: tokens.text_secondary,
        }}
      >
        <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1 max-w-[280px]">
        <h3 style={{ fontSize: "16px", lineHeight: "22px", fontWeight: 600, color: tokens.text_primary }}>
          {title}
        </h3>
        <p style={{ fontSize: "13px", lineHeight: "18px", color: tokens.text_secondary }}>
          {description}
        </p>
      </div>
      {actionLabel && onAction && (
        <DsButton variant="primary" size="md" onClick={onAction}>
          {actionLabel}
        </DsButton>
      )}
    </div>
  );
}

function AppError({ message = "Terjadi kendala saat memuat data.", onRetry }) {
  const { tokens } = useApp();
  return (
    <DsCard
      style={{
        backgroundColor: tokens.danger_subtle,
        borderColor: tokens.danger,
      }}
    >
      <div className="flex items-start gap-3">
        <AlertCircle size={20} color={tokens.danger} className="shrink-0 mt-0.5" />
        <div className="flex flex-col gap-2 flex-1">
          <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
            Gagal Memuat Konten
          </div>
          <p style={{ fontSize: "13px", color: tokens.text_secondary }}>{message}</p>
          {onRetry && (
            <div>
              <DsButton variant="outline" size="sm" onClick={onRetry}>
                Coba Lagi
              </DsButton>
            </div>
          )}
        </div>
      </div>
    </DsCard>
  );
}

/**
 * ============================================================================
 * 5. APP SHELL COMPONENTS (Header, MainContent, PageRenderer, BottomNavigation)
 * ============================================================================
 */
function AppHeader() {
  const {
    tokens,
    navigate,
    unreadNotificationsCount,
    cartCount,
    user,
  } = useApp();

  return (
    <header
      className="flex items-center justify-between shrink-0"
      style={{
        height: "56px",
        padding: "0 16px",
        backgroundColor: tokens.surface,
        borderBottom: `1px solid ${tokens.border}`,
        flex: "0 0 auto",
      }}
    >
      {/* Brand Logo */}
      <button
        type="button"
        onClick={() => navigate("home")}
        aria-label="Storefront Beranda"
        className="flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          minHeight: "44px",
          color: tokens.text_primary,
          outlineColor: tokens.accent,
        }}
      >
        <span
          className="flex items-center justify-center rounded-xl"
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: tokens.accent,
            color: "#FFFFFF",
          }}
        >
          <ShoppingBag size={16} strokeWidth={2} aria-hidden="true" />
        </span>
        <span
          style={{
            fontSize: "18px",
            lineHeight: "24px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          Storefront
        </span>
      </button>

      {/* Right Action Items */}
      <div className="flex items-center gap-1">
        {/* Notification Button with Badge */}
        <button
          type="button"
          aria-label="Notifikasi"
          onClick={() => navigate("notification")}
          className="relative flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            width: "44px",
            height: "44px",
            color: tokens.text_primary,
            outlineColor: tokens.accent,
          }}
        >
          <Bell size={20} strokeWidth={1.8} aria-hidden="true" />
          {unreadNotificationsCount > 0 && (
            <span
              className="absolute top-2 right-2 flex items-center justify-center rounded-full"
              style={{
                minWidth: "16px",
                height: "16px",
                padding: "0 4px",
                backgroundColor: tokens.danger,
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Cart Button with Badge */}
        <button
          type="button"
          aria-label="Keranjang Belanja"
          onClick={() => navigate("cart")}
          className="relative flex items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            width: "44px",
            height: "44px",
            color: tokens.text_primary,
            outlineColor: tokens.accent,
          }}
        >
          <ShoppingBag size={20} strokeWidth={1.8} aria-hidden="true" />
          {cartCount > 0 && (
            <span
              className="absolute top-2 right-1.5 flex items-center justify-center rounded-full"
              style={{
                minWidth: "17px",
                height: "17px",
                padding: "0 4px",
                backgroundColor: tokens.accent,
                color: "#FFFFFF",
                fontSize: "10px",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              {cartCount}
            </span>
          )}
        </button>

        {/* Profile Avatar Button */}
        <button
          type="button"
          aria-label="Profil Akun"
          onClick={() => navigate("profile")}
          className="flex items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{
            width: "44px",
            height: "44px",
            outlineColor: tokens.accent,
          }}
        >
          <span
            className="flex items-center justify-center rounded-full"
            style={{
              width: "32px",
              height: "32px",
              backgroundColor: user.isAuthenticated ? tokens.accent_subtle : tokens.surface_secondary,
              color: user.isAuthenticated ? tokens.accent : tokens.text_secondary,
              border: `1px solid ${tokens.border}`,
              fontSize: "12px",
              fontWeight: 700,
            }}
          >
            {user.isAuthenticated ? (
              user.name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()
            ) : (
              <User size={16} strokeWidth={1.8} />
            )}
          </span>
        </button>
      </div>
    </header>
  );
}

function BottomNavigation() {
  const { tokens, currentPath, navigate } = useApp();

  const items = APP_CONFIG.app_shell.bottom_navigation.items;

  const renderIcon = (iconName, active) => {
    const props = {
      size: 22,
      strokeWidth: active ? 2.2 : 1.8,
      "aria-hidden": true,
    };
    if (iconName === "home") return <Home {...props} />;
    if (iconName === "grid") return <Grid {...props} />;
    if (iconName === "message-circle") return <MessageCircle {...props} />;
    return <Home {...props} />;
  };

  return (
    <nav
      aria-label="Navigasi Utama"
      className="flex items-center justify-around shrink-0"
      style={{
        height: "64px",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
        backgroundColor: tokens.surface,
        borderTop: `1px solid ${tokens.border}`,
        flex: "0 0 auto",
      }}
    >
      {items.map((item) => {
        const isActive = currentPath === item.route;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(item.route)}
            aria-current={isActive ? "page" : undefined}
            className="flex flex-col items-center justify-center gap-0.5 flex-1 focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
            style={{
              minHeight: "44px",
              color: isActive ? tokens.accent : tokens.text_secondary,
              outlineColor: tokens.accent,
            }}
          >
            {renderIcon(item.icon, isActive)}
            <span
              style={{
                fontSize: "11px",
                lineHeight: "14px",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/**
 * ============================================================================
 * 6. APP SHELL PAGES (home, products, profile + secondary routes inside shell)
 * ============================================================================
 */
function HomePage() {
  const {
    tokens,
    products,
    categories,
    searchQuery,
    setSearchQuery,
    setSelectedCategory,
    navigate,
    openOverlay,
    closeOverlay,
    user,
  } = useApp();

  const featuredProducts = products.slice(0, 4);

  const handlePromoPreview = () => {
    openOverlay({
      type: "bottom_sheet",
      title: "Penawaran Spesial Mingguan",
      content: (
        <div className="flex flex-col gap-4">
          <DsBadge variant="info">Kode Voucher Aktif</DsBadge>
          <p style={{ fontSize: "14px", lineHeight: "20px", color: tokens.text_secondary }}>
            Gunakan kode <strong style={{ color: tokens.text_primary }}>HEMAT10</strong> untuk diskon 10% atau{" "}
            <strong style={{ color: tokens.text_primary }}>ONGKIRFREE</strong> untuk gratis ongkir saat checkout.
          </p>
          <div className="flex gap-2 pt-1">
            <DsButton
              variant="primary"
              fullWidth
              onClick={() => {
                closeOverlay();
                navigate("products");
              }}
            >
              Belanja Sekarang
            </DsButton>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-6" style={{ padding: "16px 16px 24px 16px" }}>
      {/* Greeting & Search */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: "13px", color: tokens.text_secondary }}>
              {user.isAuthenticated ? `Halo, ${user.name.split(" ")[0]}` : "Selamat datang"}
            </p>
            <h1
              style={{
                fontSize: "24px",
                lineHeight: "30px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: tokens.text_primary,
              }}
            >
              Temukan Gear Favoritmu
            </h1>
          </div>
          <DsBadge variant="success">Resmi</DsBadge>
        </div>

        <DsSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={(q) => navigate("search", { query: q })}
        />
      </div>

      {/* Hero Banner Card */}
      <DsCard
        padding="20px"
        style={{
          backgroundColor: tokens.surface_secondary,
          borderColor: tokens.border,
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DsBadge variant="info">Koleksi Pilihan</DsBadge>
            <span style={{ fontSize: "12px", color: tokens.text_tertiary }}>
              Garansi &amp; Layanan
            </span>
          </div>
          <h2
            style={{
              fontSize: "20px",
              lineHeight: "26px",
              fontWeight: 700,
              color: tokens.text_primary,
            }}
          >
            Studio ANC Wireless Headphones
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "20px", color: tokens.text_secondary }}>
            Suara presisi, peredam bising adaptif, dan baterai 40 jam untuk produktivitas maupun waktu santai.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <DsButton
              variant="primary"
              size="sm"
              onClick={() => navigate("product_detail", { productId: "prod-1" })}
            >
              Lihat Detail
            </DsButton>
            <DsButton variant="secondary" size="sm" onClick={handlePromoPreview}>
              Info Voucher
            </DsButton>
          </div>
        </div>
      </DsCard>

      {/* Categories Section */}
      <section aria-label="Kategori Produk" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600, color: tokens.text_primary }}>
            Kategori
          </h2>
          <button
            type="button"
            onClick={() => navigate("categories")}
            className="inline-flex items-center gap-0.5"
            style={{ fontSize: "13px", fontWeight: 600, color: tokens.accent, minHeight: "32px" }}
          >
            Semua
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <DsCard
              key={cat.id}
              padding="14px"
              onClick={() => {
                setSelectedCategory(cat.id);
                navigate("category_detail", { categoryId: cat.id });
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                  <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
                    {cat.name}
                  </span>
                  <span style={{ fontSize: "12px", color: tokens.text_tertiary }}>
                    {cat.count} produk
                  </span>
                </div>
                <span
                  className="flex items-center justify-center rounded-xl"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: tokens.accent_subtle,
                    color: tokens.accent,
                  }}
                >
                  <Sparkles size={18} strokeWidth={1.8} aria-hidden="true" />
                </span>
              </div>
            </DsCard>
          ))}
        </div>
      </section>

      {/* Featured Products Grid (2 columns per design_system.json) */}
      <section aria-label="Produk Populer" className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 style={{ fontSize: "18px", lineHeight: "24px", fontWeight: 600, color: tokens.text_primary }}>
            Produk Populer
          </h2>
          <button
            type="button"
            onClick={() => navigate("products")}
            className="inline-flex items-center gap-0.5"
            style={{ fontSize: "13px", fontWeight: 600, color: tokens.accent, minHeight: "32px" }}
          >
            Katalog
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductsPage() {
  const {
    tokens,
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCat =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <div className="flex flex-col gap-1">
        <h1 style={{ fontSize: "22px", lineHeight: "28px", fontWeight: 700, color: tokens.text_primary }}>
          Katalog Produk
        </h1>
        <p style={{ fontSize: "13px", color: tokens.text_secondary }}>
          {filteredProducts.length} produk tersedia
        </p>
      </div>

      <DsSearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Cari nama produk..."
      />

      {/* Category Filter Pills (horizontal scroll contained inside MainContent) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className="shrink-0 rounded-full transition-colors"
          style={{
            height: "36px",
            padding: "0 14px",
            fontSize: "13px",
            fontWeight: 600,
            backgroundColor:
              selectedCategory === "all" ? tokens.accent : tokens.surface_secondary,
            color: selectedCategory === "all" ? "#FFFFFF" : tokens.text_primary,
          }}
        >
          Semua
        </button>
        {categories.map((cat) => {
          const active = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className="shrink-0 rounded-full transition-colors"
              style={{
                height: "36px",
                padding: "0 14px",
                fontSize: "13px",
                fontWeight: 600,
                backgroundColor: active ? tokens.accent : tokens.surface_secondary,
                color: active ? "#FFFFFF" : tokens.text_primary,
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Produk tidak ditemukan"
          description="Coba kata kunci lain atau pilih kategori yang berbeda."
          actionLabel="Reset Filter"
          onAction={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

function ProfilePage() {
  const {
    tokens,
    user,
    navigate,
    logoutUser,
    wishlist,
    orders,
    addresses,
    themeMode,
    setThemeMode,
  } = useApp();

  const menuItems = [
    {
      id: "orders",
      label: "Pesanan Saya",
      meta: user.isAuthenticated ? `${orders.length} pesanan` : "Perlu login",
      icon: Package,
      onClick: () => navigate("orders"),
    },
    {
      id: "wishlist",
      label: "Favorit Tersimpan",
      meta: `${wishlist.length} item`,
      icon: Heart,
      onClick: () => navigate("wishlist"),
    },
    {
      id: "addresses",
      label: "Alamat Pengiriman",
      meta: user.isAuthenticated ? `${addresses.length} alamat` : "Perlu login",
      icon: MapPin,
      onClick: () => navigate("addresses"),
    },
    {
      id: "account_settings",
      label: "Pengaturan Akun",
      meta: "Profil & keamanan",
      icon: Settings,
      onClick: () => navigate("account_settings"),
    },
    {
      id: "help",
      label: "Pusat Bantuan",
      meta: "FAQ & dukungan",
      icon: HelpCircle,
      onClick: () => navigate("help"),
    },
  ];

  return (
    <div className="flex flex-col gap-5" style={{ padding: "16px 16px 24px 16px" }}>
      <h1 style={{ fontSize: "22px", lineHeight: "28px", fontWeight: 700, color: tokens.text_primary }}>
        Profil
      </h1>

      {/* User Identity Card */}
      <DsCard>
        {user.isAuthenticated ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="flex items-center justify-center rounded-full shrink-0"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: tokens.accent_subtle,
                  color: tokens.accent,
                  fontSize: "18px",
                  fontWeight: 700,
                }}
              >
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className="truncate"
                    style={{ fontSize: "16px", fontWeight: 600, color: tokens.text_primary }}
                  >
                    {user.name}
                  </span>
                  <DsBadge variant="info">{user.tier}</DsBadge>
                </div>
                <span
                  className="truncate"
                  style={{ fontSize: "13px", color: tokens.text_secondary }}
                >
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span style={{ fontSize: "16px", fontWeight: 600, color: tokens.text_primary }}>
                Mode Tamu
              </span>
              <p style={{ fontSize: "13px", color: tokens.text_secondary }}>
                Masuk untuk mengelola pesanan, alamat tersimpan, dan checkout lebih cepat.
              </p>
            </div>
            <div className="flex gap-2">
              <DsButton variant="primary" size="sm" onClick={() => navigate("login")}>
                Masuk
              </DsButton>
              <DsButton variant="secondary" size="sm" onClick={() => navigate("register")}>
                Daftar
              </DsButton>
            </div>
          </div>
        )}
      </DsCard>

      {/* Theme Mode Switcher (design_system.json: light | dark | system) */}
      <DsCard padding="14px">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
              Tema Tampilan
            </span>
            <span style={{ fontSize: "12px", color: tokens.text_tertiary }}>
              {themeMode === "system" ? "Mengikuti Sistem" : themeMode === "dark" ? "Gelap" : "Terang"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "light", label: "Terang", icon: Sun },
              { id: "dark", label: "Gelap", icon: Moon },
              { id: "system", label: "Sistem", icon: Sparkles },
            ].map((opt) => {
              const IconComp = opt.icon;
              const active = themeMode === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setThemeMode(opt.id)}
                  className="flex items-center justify-center gap-1.5 rounded-xl"
                  style={{
                    minHeight: "44px",
                    fontSize: "13px",
                    fontWeight: 600,
                    backgroundColor: active ? tokens.accent_subtle : tokens.surface_secondary,
                    color: active ? tokens.accent : tokens.text_secondary,
                    border: `1px solid ${active ? tokens.accent : "transparent"}`,
                  }}
                >
                  <IconComp size={15} />
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </DsCard>

      {/* Menu List */}
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const IconComp = item.icon;
          return (
            <DsCard key={item.id} padding="14px" onClick={item.onClick}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center rounded-xl"
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: tokens.surface_secondary,
                      color: tokens.text_primary,
                    }}
                  >
                    <IconComp size={18} strokeWidth={1.8} />
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span style={{ fontSize: "12px", color: tokens.text_tertiary }}>{item.meta}</span>
                  <ChevronRight size={16} color={tokens.text_tertiary} />
                </div>
              </div>
            </DsCard>
          );
        })}
      </div>

      {/* Auth Actions */}
      {user.isAuthenticated ? (
        <DsButton variant="outline" fullWidth onClick={logoutUser}>
          <LogOut size={16} />
          Keluar dari Akun
        </DsButton>
      ) : (
        <DsButton variant="primary" fullWidth onClick={() => navigate("login")}>
          Masuk ke Akun
        </DsButton>
      )}
    </div>
  );
}

/**
 * Additional App-Shell Subpages:
 * product_detail, categories, category_detail, search, wishlist,
 * orders, order_detail, addresses, address_form, account_settings,
 * help, login, register, forgot_password, not_found
 */
function ProductDetailPage() {
  const {
    tokens,
    products,
    routeParams,
    navigate,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useApp();

  const product =
    products.find((p) => p.id === routeParams.productId) || products[0];
  const [qty, setQty] = useState(1);
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="flex flex-col gap-5" style={{ padding: "16px 16px 28px 16px" }}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("products")}
          className="inline-flex items-center gap-1.5"
          style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
        <button
          type="button"
          aria-label="Toggle Favorit"
          onClick={() => toggleWishlist(product.id)}
          className="flex items-center justify-center rounded-full"
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: tokens.surface_secondary,
            color: isWishlisted ? tokens.danger : tokens.text_primary,
          }}
        >
          <Heart size={18} fill={isWishlisted ? tokens.danger : "none"} />
        </button>
      </div>

      <ProductArtwork product={product} size="grid" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <DsBadge variant={product.badgeVariant || "neutral"}>
            {product.badge || product.categoryLabel}
          </DsBadge>
          <span className="inline-flex items-center gap-1" style={{ fontSize: "13px", color: tokens.text_secondary }}>
            <Star size={14} fill={tokens.warning} color={tokens.warning} />
            {product.rating} ({product.reviewsCount} ulasan)
          </span>
        </div>

        <h1 style={{ fontSize: "22px", lineHeight: "28px", fontWeight: 700, color: tokens.text_primary }}>
          {product.name}
        </h1>

        <div className="flex items-baseline gap-2">
          <span style={{ fontSize: "20px", fontWeight: 700, color: tokens.accent }}>
            {formatIDR(product.price)}
          </span>
          {product.comparePrice && (
            <span className="line-through" style={{ fontSize: "13px", color: tokens.text_tertiary }}>
              {formatIDR(product.comparePrice)}
            </span>
          )}
        </div>
      </div>

      <DsCard>
        <div className="flex flex-col gap-2">
          <h2 style={{ fontSize: "15px", fontWeight: 600, color: tokens.text_primary }}>
            Deskripsi Produk
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "21px", color: tokens.text_secondary }}>
            {product.description}
          </p>
          <div className="pt-2 flex flex-col gap-1.5">
            {product.specs.map((spec, idx) => (
              <div key={idx} className="flex items-center gap-2" style={{ fontSize: "13px", color: tokens.text_primary }}>
                <Check size={15} color={tokens.success} className="shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>
        </div>
      </DsCard>

      {/* Quantity + Add to Cart */}
      <DsCard padding="14px">
        <div className="flex items-center justify-between gap-3">
          <div
            className="flex items-center rounded-full"
            style={{
              border: `1px solid ${tokens.border}`,
              backgroundColor: tokens.surface_secondary,
            }}
          >
            <button
              type="button"
              aria-label="Kurangi jumlah"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex items-center justify-center"
              style={{ width: "40px", height: "40px", color: tokens.text_primary }}
            >
              <Minus size={16} />
            </button>
            <span style={{ minWidth: "28px", textAlign: "center", fontWeight: 600, color: tokens.text_primary }}>
              {qty}
            </span>
            <button
              type="button"
              aria-label="Tambah jumlah"
              onClick={() => setQty((q) => q + 1)}
              className="flex items-center justify-center"
              style={{ width: "40px", height: "40px", color: tokens.text_primary }}
            >
              <Plus size={16} />
            </button>
          </div>

          <DsButton
            variant="primary"
            fullWidth
            onClick={() => addToCart(product.id, qty, true)}
          >
            Beli · {formatIDR(product.price * qty)}
          </DsButton>
        </div>
      </DsCard>
    </div>
  );
}

function CategoriesPage() {
  const { tokens, categories, navigate, setSelectedCategory } = useApp();
  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("home")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Beranda
      </button>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Semua Kategori
      </h1>
      <div className="flex flex-col gap-3">
        {categories.map((cat) => (
          <DsCard
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              navigate("category_detail", { categoryId: cat.id });
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div style={{ fontSize: "16px", fontWeight: 600, color: tokens.text_primary }}>
                  {cat.name}
                </div>
                <div style={{ fontSize: "13px", color: tokens.text_secondary }}>
                  {cat.count} produk tersedia
                </div>
              </div>
              <ChevronRight size={18} color={tokens.text_tertiary} />
            </div>
          </DsCard>
        ))}
      </div>
    </div>
  );
}

function CategoryDetailPage() {
  const { tokens, categories, products, routeParams, navigate } = useApp();
  const catId = routeParams.categoryId || "audio";
  const category = categories.find((c) => c.id === catId) || categories[0];
  const items = products.filter((p) => p.category === category.id);

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("categories")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Kategori
      </button>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        {category.name}
      </h1>
      <div className="grid grid-cols-2 gap-3">
        {items.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}

function SearchPage() {
  const { tokens, products, searchQuery, setSearchQuery, navigate } = useApp();
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Kembali"
          onClick={() => navigate("home")}
          className="flex items-center justify-center"
          style={{ width: "40px", height: "44px", color: tokens.text_primary }}
        >
          <ArrowLeft size={20} />
        </button>
        <DsSearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <p style={{ fontSize: "13px", color: tokens.text_secondary }}>
        Menampilkan {results.length} hasil{searchQuery ? ` untuk "${searchQuery}"` : ""}
      </p>

      {results.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Tidak ada hasil"
          description="Coba cari dengan kata kunci seperti Headphone, Watch, Keyboard, atau Tas."
          actionLabel="Tampilkan Semua"
          onAction={() => setSearchQuery("")}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {results.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

function WishlistPage() {
  const { tokens, products, wishlist, navigate } = useApp();
  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("profile")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Profil
      </button>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Favorit Tersimpan
      </h1>

      {savedProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Belum ada produk favorit"
          description="Simpan produk yang Anda sukai untuk dilihat kembali kapan saja."
          actionLabel="Jelajahi Produk"
          onAction={() => navigate("products")}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {savedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}

function OrdersPage() {
  const { tokens, orders, navigate } = useApp();
  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("profile")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Profil
      </button>
      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Pesanan Saya
      </h1>

      <div className="flex flex-col gap-3">
        {orders.map((ord) => (
          <DsCard
            key={ord.id}
            onClick={() => navigate("order_detail", { orderId: ord.id })}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.text_primary }}>
                  #{ord.id}
                </span>
                <DsBadge variant={ord.statusVariant || "info"}>{ord.status}</DsBadge>
              </div>
              <span style={{ fontSize: "12px", color: tokens.text_tertiary }}>
                {ord.date} · {ord.items.length} produk
              </span>
              <div className="flex items-center justify-between pt-1">
                <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.accent }}>
                  {formatIDR(ord.total)}
                </span>
                <span className="inline-flex items-center gap-0.5" style={{ fontSize: "12px", color: tokens.text_secondary }}>
                  Detail <ChevronRight size={14} />
                </span>
              </div>
            </div>
          </DsCard>
        ))}
      </div>
    </div>
  );
}

function OrderDetailPage() {
  const { tokens, orders, routeParams, navigate } = useApp();
  const order = orders.find((o) => o.id === routeParams.orderId) || orders[0];

  if (!order) {
    return (
      <EmptyState
        title="Pesanan tidak ditemukan"
        description="Detail pesanan tidak tersedia."
        actionLabel="Kembali ke Pesanan"
        onAction={() => navigate("orders")}
      />
    );
  }

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("orders")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Daftar Pesanan
      </button>

      <div className="flex items-center justify-between">
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: tokens.text_primary }}>
          #{order.id}
        </h1>
        <DsBadge variant={order.statusVariant || "info"}>{order.status}</DsBadge>
      </div>

      <DsCard>
        <div className="flex flex-col gap-2">
          <div style={{ fontSize: "13px", fontWeight: 600, color: tokens.text_primary }}>
            Produk Dipesan
          </div>
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-1" style={{ fontSize: "13px" }}>
              <span style={{ color: tokens.text_primary }}>
                {item.name} ×{item.qty}
              </span>
              <span style={{ fontWeight: 600, color: tokens.text_primary }}>
                {formatIDR(item.price * item.qty)}
              </span>
            </div>
          ))}
        </div>
      </DsCard>

      <DsCard>
        <div className="flex flex-col gap-2" style={{ fontSize: "13px" }}>
          <div style={{ fontWeight: 600, color: tokens.text_primary }}>Informasi Pengiriman &amp; Pembayaran</div>
          <div style={{ color: tokens.text_secondary }}>Alamat: {order.address}</div>
          <div style={{ color: tokens.text_secondary }}>Pengiriman: {order.shippingMethod}</div>
          <div style={{ color: tokens.text_secondary }}>Pembayaran: {order.paymentMethod}</div>
          <div
            className="flex items-center justify-between pt-2 mt-1"
            style={{ borderTop: `1px solid ${tokens.border}`, fontWeight: 700, fontSize: "15px", color: tokens.text_primary }}
          >
            <span>Total Dibayar</span>
            <span>{formatIDR(order.total)}</span>
          </div>
        </div>
      </DsCard>
    </div>
  );
}

function AddressesPage() {
  const { tokens, addresses, navigate, setEditingAddressId } = useApp();
  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate("profile")}
          className="inline-flex items-center gap-1.5"
          style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
        >
          <ArrowLeft size={18} />
          Profil
        </button>
        <DsButton
          variant="primary"
          size="sm"
          onClick={() => {
            setEditingAddressId(null);
            navigate("address_form");
          }}
        >
          <Plus size={15} />
          Tambah
        </DsButton>
      </div>

      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Alamat Pengiriman
      </h1>

      <div className="flex flex-col gap-3">
        {addresses.map((addr) => (
          <DsCard key={addr.id}>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: "15px", fontWeight: 600, color: tokens.text_primary }}>
                    {addr.label}
                  </span>
                  {addr.isDefault && <DsBadge variant="success">Utama</DsBadge>}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setEditingAddressId(addr.id);
                    navigate("address_form");
                  }}
                  style={{ fontSize: "13px", fontWeight: 600, color: tokens.accent }}
                >
                  Ubah
                </button>
              </div>
              <div style={{ fontSize: "13px", fontWeight: 500, color: tokens.text_primary }}>
                {addr.recipient} · {addr.phone}
              </div>
              <div style={{ fontSize: "13px", color: tokens.text_secondary }}>
                {addr.street}, {addr.city}
              </div>
            </div>
          </DsCard>
        ))}
      </div>
    </div>
  );
}

function AddressFormPage() {
  const { tokens, addresses, editingAddressId, saveAddress, navigate } = useApp();
  const existing = addresses.find((a) => a.id === editingAddressId);

  const [label, setLabel] = useState(existing?.label || "");
  const [recipient, setRecipient] = useState(existing?.recipient || "");
  const [phone, setPhone] = useState(existing?.phone || "");
  const [street, setStreet] = useState(existing?.street || "");
  const [city, setCity] = useState(existing?.city || "");
  const [isDefault, setIsDefault] = useState(existing?.isDefault || false);
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim() || !recipient.trim() || !street.trim() || !city.trim()) {
      setFormError("Harap lengkapi label, penerima, jalan, dan kota.");
      return;
    }
    saveAddress({
      id: existing?.id,
      label,
      recipient,
      phone: phone || "0812-0000-0000",
      street,
      city,
      isDefault,
    });
  };

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("addresses")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Alamat
      </button>

      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        {existing ? "Ubah Alamat" : "Alamat Baru"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <DsInput
          id="addr-label"
          label="Label Alamat"
          placeholder="Contoh: Rumah, Kantor"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
        <DsInput
          id="addr-recipient"
          label="Nama Penerima"
          placeholder="Nama lengkap penerima"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <DsInput
          id="addr-phone"
          label="Nomor Telepon"
          placeholder="08xxxxxxxxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <DsInput
          id="addr-street"
          label="Alamat Jalan"
          placeholder="Nama jalan, nomor rumah, RT/RW"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <DsInput
          id="addr-city"
          label="Kota & Kode Pos"
          placeholder="Kota, Provinsi, Kode Pos"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label className="flex items-center gap-2 py-1" style={{ fontSize: "13px", color: tokens.text_primary }}>
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            style={{ width: "18px", height: "18px", accentColor: tokens.accent }}
          />
          Jadikan alamat pengiriman utama
        </label>

        {formError && <AppError message={formError} />}

        <DsButton type="submit" variant="primary" fullWidth>
          Simpan Alamat
        </DsButton>
      </form>
    </div>
  );
}

function AccountSettingsPage() {
  const { tokens, user, navigate, showToast } = useApp();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("profile")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Profil
      </button>

      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Pengaturan Akun
      </h1>

      <DsCard>
        <div className="flex flex-col gap-3">
          <DsInput
            id="acc-name"
            label="Nama Lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DsInput
            id="acc-phone"
            label="Nomor Handphone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <DsButton
            variant="primary"
            fullWidth
            onClick={() => showToast("Perubahan profil berhasil disimpan.")}
          >
            Simpan Perubahan
          </DsButton>
        </div>
      </DsCard>
    </div>
  );
}

function HelpPage() {
  const { tokens, navigate } = useApp();
  const faqs = [
    {
      q: "Bagaimana cara melacak pesanan?",
      a: "Buka menu Profil → Pesanan Saya untuk melihat status pengiriman dan detail pesanan Anda.",
    },
    {
      q: "Apakah bisa menggunakan kode voucher saat checkout?",
      a: "Ya, masukkan kode HEMAT10 atau ONGKIRFREE pada bagian Voucher di halaman Checkout.",
    },
    {
      q: "Bagaimana menghubungi tim dukungan?",
      a: "Gunakan tab Live Chat di navigasi bawah untuk berbicara langsung dengan asisten kami.",
    },
  ];

  return (
    <div className="flex flex-col gap-4" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("profile")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Profil
      </button>

      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Pusat Bantuan
      </h1>

      <div className="flex flex-col gap-3">
        {faqs.map((item, idx) => (
          <DsCard key={idx}>
            <div className="flex flex-col gap-1.5">
              <div style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
                {item.q}
              </div>
              <p style={{ fontSize: "13px", lineHeight: "19px", color: tokens.text_secondary }}>
                {item.a}
              </p>
            </div>
          </DsCard>
        ))}
      </div>

      <DsButton variant="secondary" fullWidth onClick={() => navigate("livechat")}>
        <MessageCircle size={16} />
        Mulai Live Chat
      </DsButton>
    </div>
  );
}

function LoginPage() {
  const { tokens, loginUser, navigate } = useApp();
  const [email, setEmail] = useState("nadia.kusuma@storefront.id");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, "Nadia Kusuma");
  };

  return (
    <div className="flex flex-col gap-5" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("home")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Beranda
      </button>

      <div className="flex flex-col gap-1">
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: tokens.text_primary }}>
          Masuk ke Storefront
        </h1>
        <p style={{ fontSize: "13px", color: tokens.text_secondary }}>
          Akses checkout, riwayat pesanan, dan alamat pengiriman tersimpan.
        </p>
      </div>

      <DsCard>
        <form onSubmit={handleLogin} className="flex flex-col gap-3.5">
          <DsInput
            id="login-email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DsInput
            id="login-password"
            label="Kata Sandi"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate("forgot_password")}
              style={{ fontSize: "12px", fontWeight: 600, color: tokens.accent }}
            >
              Lupa kata sandi?
            </button>
          </div>
          <DsButton type="submit" variant="primary" fullWidth>
            Masuk
          </DsButton>
        </form>
      </DsCard>

      <div className="text-center" style={{ fontSize: "13px", color: tokens.text_secondary }}>
        Belum punya akun?{" "}
        <button
          type="button"
          onClick={() => navigate("register")}
          style={{ fontWeight: 600, color: tokens.accent }}
        >
          Daftar sekarang
        </button>
      </div>
    </div>
  );
}

function RegisterPage() {
  const { tokens, loginUser, navigate } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    loginUser(email || "member.baru@storefront.id", name || "Member Baru");
  };

  return (
    <div className="flex flex-col gap-5" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("login")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Masuk
      </button>

      <h1 style={{ fontSize: "24px", fontWeight: 700, color: tokens.text_primary }}>
        Buat Akun Baru
      </h1>

      <DsCard>
        <form onSubmit={handleRegister} className="flex flex-col gap-3.5">
          <DsInput
            id="reg-name"
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DsInput
            id="reg-email"
            label="Email"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DsInput
            id="reg-password"
            label="Kata Sandi"
            type="password"
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <DsButton type="submit" variant="primary" fullWidth>
            Daftar Akun
          </DsButton>
        </form>
      </DsCard>
    </div>
  );
}

function ForgotPasswordPage() {
  const { tokens, navigate, showToast } = useApp();
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col gap-5" style={{ padding: "16px 16px 24px 16px" }}>
      <button
        type="button"
        onClick={() => navigate("login")}
        className="inline-flex items-center gap-1.5 self-start"
        style={{ minHeight: "44px", fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
      >
        <ArrowLeft size={18} />
        Kembali ke Masuk
      </button>

      <h1 style={{ fontSize: "22px", fontWeight: 700, color: tokens.text_primary }}>
        Atur Ulang Kata Sandi
      </h1>
      <p style={{ fontSize: "13px", color: tokens.text_secondary }}>
        Masukkan email terdaftar untuk menerima tautan pemulihan kata sandi.
      </p>

      <DsCard>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            showToast("Tautan pemulihan telah dikirim ke email Anda.");
            navigate("login");
          }}
          className="flex flex-col gap-3.5"
        >
          <DsInput
            id="forgot-email"
            label="Email Terdaftar"
            type="email"
            placeholder="nama@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DsButton type="submit" variant="primary" fullWidth>
            Kirim Tautan
          </DsButton>
        </form>
      </DsCard>
    </div>
  );
}

function NotFoundPage() {
  const { tokens, navigate } = useApp();
  return (
    <div className="p-4">
      <EmptyState
        icon={Info}
        title="Halaman tidak ditemukan"
        description="Rute yang Anda tuju tidak tersedia di aplikasi Storefront."
        actionLabel="Kembali ke Beranda"
        onAction={() => navigate("home")}
      />
      <div className="text-center" style={{ color: tokens.text_tertiary, fontSize: "12px" }}>
        Kode: 404
      </div>
    </div>
  );
}

function PageRenderer() {
  const { currentPath, resolveRouteKey } = useApp();
  const routeKey = resolveRouteKey(currentPath);

  switch (routeKey) {
    case "home":
      return <HomePage />;
    case "products":
      return <ProductsPage />;
    case "profile":
      return <ProfilePage />;
    case "product_detail":
      return <ProductDetailPage />;
    case "categories":
      return <CategoriesPage />;
    case "category_detail":
      return <CategoryDetailPage />;
    case "search":
      return <SearchPage />;
    case "wishlist":
      return <WishlistPage />;
    case "orders":
      return <OrdersPage />;
    case "order_detail":
      return <OrderDetailPage />;
    case "addresses":
      return <AddressesPage />;
    case "address_form":
      return <AddressFormPage />;
    case "account_settings":
      return <AccountSettingsPage />;
    case "help":
      return <HelpPage />;
    case "login":
      return <LoginPage />;
    case "register":
      return <RegisterPage />;
    case "forgot_password":
      return <ForgotPasswordPage />;
    default:
      return <NotFoundPage />;
  }
}

function MainContent() {
  const { tokens } = useApp();

  return (
    <main
      id="main-content"
      className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        flex: "1 1 0%",
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden",
        overscrollBehavior: "contain",
        WebkitOverflowScrolling: "touch",
        backgroundColor: tokens.background,
      }}
    >
      <PageRenderer />
    </main>
  );
}

function AppShell() {
  const { tokens } = useApp();

  return (
    <div
      className="flex flex-col w-full h-full overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        backgroundColor: tokens.background,
      }}
    >
      <AppHeader />
      <MainContent />
      <BottomNavigation />
    </div>
  );
}

/**
 * ============================================================================
 * 7. STANDALONE PAGES (Render outside AppShell; no Header or BottomNavigation)
 * ============================================================================
 */
function StandalonePageLayout({ children, style = {} }) {
  return <div className="flex flex-col w-full h-full min-h-0 overflow-hidden" style={{ height: "100dvh", minHeight: "100dvh", overflow: "hidden", ...style }}>{children}</div>;
}
function StandaloneHeader({ children }) { return <header className="shrink-0 w-full">{children}</header>; }
function StandaloneContent({ children, className = "", style = {} }) { return <main className={"flex-1 min-h-0 overflow-y-auto overflow-x-hidden " + className} style={{ overscrollBehavior: "contain", ...style }}>{children}</main>; }
function StandaloneBottomAction({ children, className = "", style = {} }) { return <footer className={"shrink-0 w-full " + className} style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)", ...style }}>{children}</footer>; }

function CartPage() {
  const {
    tokens,
    cart,
    products,
    updateCartQty,
    removeFromCart,
    navigate,
  } = useApp();

  const detailedItems = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return { ...item, product };
      })
      .filter(Boolean);
  }, [cart, products]);

  const subtotal = useMemo(
    () => detailedItems.reduce((sum, item) => sum + item.product.price * item.qty, 0),
    [detailedItems]
  );

  return (
    <StandalonePageLayout style={{ backgroundColor: tokens.background }}>
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
        {/* cart_header */}
        <StandaloneHeader>
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-4"
          style={{
            height: "56px",
            backgroundColor: tokens.surface,
            borderBottom: `1px solid ${tokens.border}`,
          }}
        >
          <button
            type="button"
            onClick={() => navigate("home")}
            className="inline-flex items-center gap-1.5"
            style={{ minHeight: "44px", fontWeight: 600, fontSize: "14px", color: tokens.text_primary }}
          >
            <ArrowLeft size={18} />
            Kembali
          </button>
          <h1 style={{ fontSize: "17px", fontWeight: 700, color: tokens.text_primary }}>
            Keranjang
          </h1>
          <span style={{ width: "60px" }} />
        </div>

        </StandaloneHeader>
        {/* cart_items */}
        <StandaloneContent className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          {detailedItems.length === 0 ? (
            <EmptyState
              icon={ShoppingBag}
              title="Keranjang masih kosong"
              description="Tambahkan produk pilihan Anda untuk melanjutkan ke checkout."
              actionLabel="Mulai Belanja"
              onAction={() => navigate("products")}
            />
          ) : (
            detailedItems.map(({ product, qty }) => (
              <DsCard key={product.id} padding="12px">
                <div className="flex gap-3">
                  <ProductArtwork product={product} size="thumb" />
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h2
                        className="truncate"
                        style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}
                      >
                        {product.name}
                      </h2>
                      <button
                        type="button"
                        aria-label={`Hapus ${product.name}`}
                        onClick={() => removeFromCart(product.id)}
                        style={{ color: tokens.text_tertiary, padding: "4px" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <span style={{ fontSize: "12px", color: tokens.text_secondary }}>
                      {product.colorName}
                    </span>
                    <div className="flex items-center justify-between pt-2">
                      <span style={{ fontSize: "14px", fontWeight: 700, color: tokens.text_primary }}>
                        {formatIDR(product.price * qty)}
                      </span>
                      <div
                        className="flex items-center rounded-full"
                        style={{
                          backgroundColor: tokens.surface_secondary,
                          border: `1px solid ${tokens.border}`,
                        }}
                      >
                        <button
                          type="button"
                          aria-label="Kurangi jumlah item"
                          onClick={() => updateCartQty(product.id, -1)}
                          className="flex items-center justify-center"
                          style={{ width: "32px", height: "32px", color: tokens.text_primary }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ padding: "0 8px", fontSize: "13px", fontWeight: 600, color: tokens.text_primary }}>
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Tambah jumlah item"
                          onClick={() => updateCartQty(product.id, 1)}
                          className="flex items-center justify-center"
                          style={{ width: "32px", height: "32px", color: tokens.text_primary }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </DsCard>
            ))
          )}
        </div>
        </StandaloneContent>
      </div>

      {/* cart_summary & checkout_action */}
      <StandaloneBottomAction className="p-4 flex flex-col gap-3" style={{ backgroundColor: tokens.surface, borderTop: "1px solid " + tokens.border }}>
        {detailedItems.length > 0 && (
          <>
          <div className="flex items-center justify-between">
            <span style={{ fontSize: "14px", color: tokens.text_secondary }}>Subtotal</span>
            <span style={{ fontSize: "18px", fontWeight: 700, color: tokens.text_primary }}>
              {formatIDR(subtotal)}
            </span>
          </div>
          <DsButton variant="primary" fullWidth onClick={() => navigate("checkout")}>
            Lanjut ke Checkout
          </DsButton>
          </>
        )}
      </StandaloneBottomAction>
    </StandalonePageLayout>
  );
}

function CheckoutPage() {
  const {
    tokens,
    cart,
    products,
    addresses,
    placeOrder,
    navigate,
    showToast,
  } = useApp();

  const [selectedAddrId, setSelectedAddrId] = useState(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || ""
  );
  const [shippingId, setShippingId] = useState(SHIPPING_METHODS[0].id);
  const [paymentId, setPaymentId] = useState(PAYMENT_METHODS[0].id);
  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMsg, setVoucherMsg] = useState("");

  const itemsDetail = useMemo(
    () =>
      cart
        .map((item) => {
          const p = products.find((prod) => prod.id === item.productId);
          if (!p) return null;
          return {
            productId: p.id,
            name: p.name,
            price: p.price,
            qty: item.qty,
            colorName: p.colorName,
            accentHex: p.accentHex,
          };
        })
        .filter(Boolean),
    [cart, products]
  );

  const subtotal = itemsDetail.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingMethod =
    SHIPPING_METHODS.find((s) => s.id === shippingId) || SHIPPING_METHODS[0];
  const paymentMethod =
    PAYMENT_METHODS.find((p) => p.id === paymentId) || PAYMENT_METHODS[0];
  const activeAddress =
    addresses.find((a) => a.id === selectedAddrId) || addresses[0];

  const handleApplyVoucher = () => {
    const code = voucherInput.trim().toUpperCase();
    if (!code) return;
    if (VOUCHERS[code]) {
      setAppliedVoucher(VOUCHERS[code]);
      setVoucherMsg(`Voucher ${code} diterapkan: ${VOUCHERS[code].description}`);
      showToast(`Voucher ${code} berhasil diterapkan.`);
    } else {
      setAppliedVoucher(null);
      setVoucherMsg("Kode voucher tidak valid. Coba HEMAT10 atau ONGKIRFREE.");
    }
  };

  const productDiscount =
    appliedVoucher?.type === "percent" ? Math.round(subtotal * appliedVoucher.value) : 0;
  const shippingCost =
    appliedVoucher?.type === "shipping" ? 0 : shippingMethod.cost;
  const finalTotal = Math.max(0, subtotal - productDiscount + shippingCost);

  if (itemsDetail.length === 0) {
    return (
      <StandalonePageLayout style={{ backgroundColor: tokens.background }}>
        <StandaloneHeader><div className="flex items-center justify-between px-4" style={{ height: "56px", backgroundColor: tokens.surface, borderBottom: "1px solid " + tokens.border }}><button type="button" onClick={() => navigate("cart")} className="inline-flex items-center gap-1.5" style={{ minHeight: "44px", fontWeight: 600, fontSize: "14px", color: tokens.text_primary }}><ArrowLeft size={18} />Keranjang</button><h1 style={{ fontSize: "17px", fontWeight: 700, color: tokens.text_primary }}>Checkout</h1><span style={{ width: "60px" }} /></div></StandaloneHeader>
        <StandaloneContent className="p-4">
        <EmptyState
          icon={ShoppingBag}
          title="Tidak ada item untuk di-checkout"
          description="Tambahkan produk ke keranjang terlebih dahulu."
          actionLabel="Kembali ke Produk"
          onAction={() => navigate("products")}
        />
        </StandaloneContent>
        <StandaloneBottomAction />
      </StandalonePageLayout>
    );
  }

  return (
    <StandalonePageLayout style={{ backgroundColor: tokens.background }}>
      {/* checkout_header */}
      <StandaloneHeader>
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4"
        style={{
          height: "56px",
          backgroundColor: tokens.surface,
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("cart")}
          className="inline-flex items-center gap-1.5"
          style={{ minHeight: "44px", fontWeight: 600, fontSize: "14px", color: tokens.text_primary }}
        >
          <ArrowLeft size={18} />
          Keranjang
        </button>
        <h1 style={{ fontSize: "17px", fontWeight: 700, color: tokens.text_primary }}>
          Checkout
        </h1>
        <span style={{ width: "60px" }} />
      </div>

      </StandaloneHeader>
      <StandaloneContent className="px-4 flex flex-col gap-4 pb-4">
      <div className="flex flex-col gap-4">
        {/* checkout_address */}
        <DsCard>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5" style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
                <MapPin size={16} color={tokens.accent} />
                Alamat Pengiriman
              </span>
              <button
                type="button"
                onClick={() => navigate("addresses")}
                style={{ fontSize: "12px", fontWeight: 600, color: tokens.accent }}
              >
                Kelola
              </button>
            </div>
            {addresses.map((addr) => (
              <label
                key={addr.id}
                className="flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer"
                style={{
                  backgroundColor:
                    selectedAddrId === addr.id ? tokens.accent_subtle : tokens.surface_secondary,
                  border: `1px solid ${selectedAddrId === addr.id ? tokens.accent : "transparent"}`,
                }}
              >
                <input
                  type="radio"
                  name="checkout-address"
                  checked={selectedAddrId === addr.id}
                  onChange={() => setSelectedAddrId(addr.id)}
                  style={{ marginTop: "3px", accentColor: tokens.accent }}
                />
                <div className="flex flex-col" style={{ fontSize: "13px" }}>
                  <span style={{ fontWeight: 600, color: tokens.text_primary }}>
                    {addr.label} · {addr.recipient}
                  </span>
                  <span style={{ color: tokens.text_secondary }}>
                    {addr.street}, {addr.city}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </DsCard>

        {/* checkout_items */}
        <DsCard>
          <div className="flex flex-col gap-2">
            <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
              Ringkasan Produk ({itemsDetail.length})
            </span>
            {itemsDetail.map((item) => (
              <div key={item.productId} className="flex items-center justify-between text-[13px] py-1">
                <span style={{ color: tokens.text_primary }}>
                  {item.name} ×{item.qty}
                </span>
                <span style={{ fontWeight: 600, color: tokens.text_primary }}>
                  {formatIDR(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>
        </DsCard>

        {/* shipping_method */}
        <DsCard>
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5" style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
              <Truck size={16} color={tokens.accent} />
              Metode Pengiriman
            </span>
            {SHIPPING_METHODS.map((ship) => (
              <label
                key={ship.id}
                className="flex items-center justify-between p-2.5 rounded-xl cursor-pointer"
                style={{
                  backgroundColor:
                    shippingId === ship.id ? tokens.accent_subtle : tokens.surface_secondary,
                  border: `1px solid ${shippingId === ship.id ? tokens.accent : "transparent"}`,
                }}
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="radio"
                    name="shipping-method"
                    checked={shippingId === ship.id}
                    onChange={() => setShippingId(ship.id)}
                    style={{ accentColor: tokens.accent }}
                  />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: tokens.text_primary }}>
                      {ship.name}
                    </div>
                    <div style={{ fontSize: "12px", color: tokens.text_secondary }}>{ship.eta}</div>
                  </div>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 600, color: tokens.text_primary }}>
                  {ship.cost === 0 ? "Gratis" : formatIDR(ship.cost)}
                </span>
              </label>
            ))}
          </div>
        </DsCard>

        {/* voucher_entry */}
        <DsCard>
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5" style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
              <Tag size={16} color={tokens.accent} />
              Kode Voucher
            </span>
            <div className="flex gap-2">
              <DsInput
                id="voucher-code"
                placeholder="HEMAT10 atau ONGKIRFREE"
                value={voucherInput}
                onChange={(e) => setVoucherInput(e.target.value)}
              />
              <DsButton variant="secondary" onClick={handleApplyVoucher} style={{ height: "48px" }}>
                Pakai
              </DsButton>
            </div>
            {voucherMsg && (
              <span
                style={{
                  fontSize: "12px",
                  color: appliedVoucher ? tokens.success : tokens.text_secondary,
                }}
              >
                {voucherMsg}
              </span>
            )}
          </div>
        </DsCard>

        {/* payment_method */}
        <DsCard>
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1.5" style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
              <CreditCard size={16} color={tokens.accent} />
              Metode Pembayaran
            </span>
            {PAYMENT_METHODS.map((pay) => (
              <label
                key={pay.id}
                className="flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer"
                style={{
                  backgroundColor:
                    paymentId === pay.id ? tokens.accent_subtle : tokens.surface_secondary,
                  border: `1px solid ${paymentId === pay.id ? tokens.accent : "transparent"}`,
                }}
              >
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentId === pay.id}
                  onChange={() => setPaymentId(pay.id)}
                  style={{ marginTop: "3px", accentColor: tokens.accent }}
                />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: tokens.text_primary }}>
                    {pay.name}
                  </div>
                  <div style={{ fontSize: "12px", color: tokens.text_secondary }}>{pay.detail}</div>
                </div>
              </label>
            ))}
          </div>
        </DsCard>

        {/* order_summary */}
        <DsCard>
          <div className="flex flex-col gap-2 text-[13px]">
            <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
              Rincian Pembayaran
            </span>
            <div className="flex justify-between">
              <span style={{ color: tokens.text_secondary }}>Subtotal Produk</span>
              <span style={{ color: tokens.text_primary }}>{formatIDR(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: tokens.text_secondary }}>Ongkos Kirim</span>
              <span style={{ color: tokens.text_primary }}>
                {shippingCost === 0 ? "Gratis" : formatIDR(shippingCost)}
              </span>
            </div>
            {productDiscount > 0 && (
              <div className="flex justify-between">
                <span style={{ color: tokens.success }}>Diskon Voucher</span>
                <span style={{ color: tokens.success }}>-{formatIDR(productDiscount)}</span>
              </div>
            )}
            <div
              className="flex justify-between pt-2 mt-1"
              style={{
                borderTop: `1px solid ${tokens.border}`,
                fontSize: "16px",
                fontWeight: 700,
                color: tokens.text_primary,
              }}
            >
              <span>Total Tagihan</span>
              <span>{formatIDR(finalTotal)}</span>
            </div>
          </div>
        </DsCard>

      </div>
      </StandaloneContent>
      {/* place_order_action */}
      <StandaloneBottomAction className="p-4" style={{ backgroundColor: tokens.surface, borderTop: "1px solid " + tokens.border }}>
        <DsButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={() =>
            placeOrder({
              address: activeAddress || addresses[0],
              shippingMethod,
              paymentMethod,
              discountAmount: productDiscount,
              finalTotal,
              itemsDetail,
            })
          }
        >
          <ShieldCheck size={18} />
          Bayar Sekarang · {formatIDR(finalTotal)}
        </DsButton>
      </StandaloneBottomAction>
    </StandalonePageLayout>
  );
}

function PaymentResultPage() {
  const { tokens, lastPaymentResult, navigate, showToast } = useApp();
  const isSuccess = lastPaymentResult?.status === "success";

  return (
    <StandalonePageLayout style={{ backgroundColor: tokens.background }}>
      <StandaloneHeader><div className="flex items-center justify-between px-4" style={{ height: "56px", backgroundColor: tokens.surface, borderBottom: "1px solid " + tokens.border }}><button type="button" onClick={() => navigate("home")} className="inline-flex items-center gap-1.5" style={{ minHeight: "44px", fontWeight: 600, fontSize: "14px", color: tokens.text_primary }}><ArrowLeft size={18} />Beranda</button><h1 style={{ fontSize: "17px", fontWeight: 700, color: tokens.text_primary }}>Status Pembayaran</h1><span style={{ width: "60px" }} /></div></StandaloneHeader>
      <StandaloneContent className="p-5">
      <div className="flex flex-col gap-5 pt-4">
        {/* payment_status */}
        <div className="flex flex-col items-center text-center gap-3">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: "68px",
              height: "68px",
              backgroundColor: isSuccess ? tokens.success_subtle : tokens.danger_subtle,
              color: isSuccess ? tokens.success : tokens.danger,
            }}
          >
            {isSuccess ? <CheckCircle2 size={36} /> : <AlertCircle size={36} />}
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, color: tokens.text_primary }}>
            {isSuccess ? "Pembayaran Berhasil" : "Pembayaran Tertunda"}
          </h1>
          <p style={{ fontSize: "14px", color: tokens.text_secondary, maxWidth: "300px" }}>
            {lastPaymentResult?.message}
          </p>
        </div>

        {/* order_reference & payment_details */}
        <DsCard>
          <div className="flex flex-col gap-2.5 text-[13px]">
            <div className="flex justify-between">
              <span style={{ color: tokens.text_secondary }}>Nomor Pesanan</span>
              <span style={{ fontWeight: 700, color: tokens.text_primary }}>
                #{lastPaymentResult?.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: tokens.text_secondary }}>Metode Pembayaran</span>
              <span style={{ fontWeight: 600, color: tokens.text_primary }}>
                {lastPaymentResult?.method}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: tokens.text_secondary }}>Nominal Pembayaran</span>
              <span style={{ fontWeight: 700, color: tokens.accent }}>
                {formatIDR(lastPaymentResult?.amount)}
              </span>
            </div>
          </div>
        </DsCard>
      </div>
      </StandaloneContent>
      {/* next_actions */}
      <StandaloneBottomAction className="flex flex-col gap-2.5 p-5 pt-3">
        <DsButton
          variant="primary"
          fullWidth
          onClick={() => navigate("order_detail", { orderId: lastPaymentResult?.orderId })}
        >
          Lihat Pesanan
        </DsButton>
        {!isSuccess && (
          <DsButton
            variant="outline"
            fullWidth
            onClick={() => showToast("Mencoba ulang proses pembayaran...")}
          >
            Coba Bayar Ulang
          </DsButton>
        )}
        <DsButton variant="secondary" fullWidth onClick={() => navigate("home")}>
          Kembali ke Beranda
        </DsButton>
      </StandaloneBottomAction>
    </StandalonePageLayout>
  );
}

function NotificationsPage() {
  const {
    tokens,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    navigate,
  } = useApp();

  return (
    <StandalonePageLayout style={{ backgroundColor: tokens.background }}>
      {/* notification_header */}
      <StandaloneHeader>
      <div
        className="sticky top-0 z-10 flex items-center justify-between px-4"
        style={{
          height: "56px",
          backgroundColor: tokens.surface,
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("home")}
          className="inline-flex items-center gap-1.5"
          style={{ minHeight: "44px", fontWeight: 600, fontSize: "14px", color: tokens.text_primary }}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
        <h1 style={{ fontSize: "17px", fontWeight: 700, color: tokens.text_primary }}>
          Notifikasi
        </h1>
        <button
          type="button"
          onClick={markAllNotificationsRead}
          style={{ fontSize: "12px", fontWeight: 600, color: tokens.accent, minHeight: "44px" }}
        >
          Tandai Dibaca
        </button>
      </div>

      </StandaloneHeader>
      {/* notification_list or notification_empty_state */}
      <StandaloneContent className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="Belum ada notifikasi"
            description="Informasi promo dan status pesanan Anda akan tampil di sini."
          />
        ) : (
          notifications.map((notif) => (
            <DsCard
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              style={{
                backgroundColor: notif.read ? tokens.surface : tokens.surface_tertiary,
                borderColor: notif.read ? tokens.border : tokens.accent,
              }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.text_primary }}>
                      {notif.title}
                    </span>
                    {!notif.read && <DsBadge variant="info">Baru</DsBadge>}
                  </div>
                  <p style={{ fontSize: "13px", lineHeight: "19px", color: tokens.text_secondary }}>
                    {notif.body}
                  </p>
                  <span style={{ fontSize: "11px", color: tokens.text_tertiary }}>
                    {notif.time}
                  </span>
                </div>
              </div>
            </DsCard>
          ))
        )}
      </div>
      </StandaloneContent>
      <StandaloneBottomAction />
    </StandalonePageLayout>
  );
}

function LiveChatPage() {
  const { tokens, chatMessages, sendChatMessage, navigate } = useApp();
  const [draft, setDraft] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    sendChatMessage(draft);
    setDraft("");
  };

  return (
    <StandalonePageLayout style={{ backgroundColor: tokens.background }}>
      {/* chat_header */}
      <StandaloneHeader>
      <div
        className="flex items-center justify-between px-4 shrink-0"
        style={{
          height: "56px",
          backgroundColor: tokens.surface,
          borderBottom: `1px solid ${tokens.border}`,
        }}
      >
        <button
          type="button"
          onClick={() => navigate("home")}
          className="inline-flex items-center gap-1.5"
          style={{ minHeight: "44px", fontWeight: 600, fontSize: "14px", color: tokens.text_primary }}
        >
          <ArrowLeft size={18} />
          Kembali
        </button>
        <div className="flex flex-col items-center">
          <span style={{ fontSize: "15px", fontWeight: 700, color: tokens.text_primary }}>
            Live Chat
          </span>
          <span style={{ fontSize: "11px", color: tokens.success }}>Online · Balas cepat</span>
        </div>
        <span style={{ width: "60px" }} />
      </div>

      </StandaloneHeader>
      {/* conversation */}
      <StandaloneContent className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-3">
        {chatMessages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[82%] ${isUser ? "self-end items-end" : "self-start items-start"}`}
            >
              {!isUser && msg.agentName && (
                <span style={{ fontSize: "11px", color: tokens.text_tertiary, marginBottom: "2px" }}>
                  {msg.agentName}
                </span>
              )}
              <div
                className="px-3.5 py-2.5 rounded-2xl"
                style={{
                  backgroundColor: isUser ? tokens.accent : tokens.surface_secondary,
                  color: isUser ? "#FFFFFF" : tokens.text_primary,
                  fontSize: "14px",
                  lineHeight: "20px",
                }}
              >
                {msg.text}
              </div>
              <span style={{ fontSize: "10px", color: tokens.text_tertiary, marginTop: "2px" }}>
                {msg.time}
              </span>
            </div>
          );
        })}
        <div ref={endRef} />
      </div>

      </StandaloneContent>
      {/* message_composer */}
      <StandaloneBottomAction style={{ paddingBottom: 0 }}>
      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 p-3 shrink-0"
        style={{
          backgroundColor: tokens.surface,
          borderTop: `1px solid ${tokens.border}`,
          paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Tulis pesan Anda..."
          aria-label="Tulis pesan Anda"
          className="flex-1 rounded-full px-4 outline-none"
          style={{
            height: "44px",
            backgroundColor: tokens.surface_secondary,
            color: tokens.text_primary,
            fontSize: "14px",
            border: `1px solid ${tokens.border}`,
          }}
        />
        <button
          type="submit"
          aria-label="Kirim Pesan"
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: "44px",
            height: "44px",
            backgroundColor: tokens.accent,
            color: "#FFFFFF",
          }}
        >
          <Send size={18} />
        </button>
      </form>
      </StandaloneBottomAction>
    </StandalonePageLayout>
  );
}

function StandalonePageRenderer() {
  const { tokens, currentPath, resolveRouteKey } = useApp();
  const routeKey = resolveRouteKey(currentPath);

  const renderStandalone = () => {
    switch (routeKey) {
      case "checkout":
        return <CheckoutPage />;
      case "payment_result":
        return <PaymentResultPage />;
      case "notification":
        return <NotificationsPage />;
      case "cart":
        return <CartPage />;
      case "livechat":
        return <LiveChatPage />;
      default:
        return <CartPage />;
    }
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100dvh",
        minHeight: "100dvh",
        overflow: "hidden",
        backgroundColor: tokens.background,
      }}
    >
      {renderStandalone()}
    </div>
  );
}

/**
 * ============================================================================
 * 8. CENTRALIZED OVERLAY HOST (Portal above app content, stackable, ESC & backdrop)
 * ============================================================================
 */
function OverlayHost() {
  const { tokens, overlays, closeOverlay, toasts } = useApp();
  const [portalRoot, setPortalRoot] = useState(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    let hostEl = document.getElementById("application-portal-root");
    if (!hostEl) {
      hostEl = document.createElement("div");
      hostEl.id = "application-portal-root";
      document.body.appendChild(hostEl);
    }
    setPortalRoot(hostEl);
  }, []);

  useEffect(() => {
    if (overlays.length === 0) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeOverlay();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [overlays.length, closeOverlay]);

  if (!portalRoot) return null;

  return createPortal(
    <>
      {overlays.map((ov, idx) => {
        const baseZ = tokens.zIndex[ov.type] || 300;
        const zIndex = baseZ + idx * 10;

        return (
          <div
            key={ov.id}
            role="dialog"
            aria-modal="true"
            aria-label={ov.title || "Overlay"}
            className="fixed inset-0 flex items-end justify-center"
            style={{
              zIndex,
              backgroundColor: tokens.overlay_backdrop,
              backdropFilter: "blur(2px)",
            }}
            onClick={() => closeOverlay(ov.id)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full flex flex-col gap-3"
              style={{
                maxWidth: "480px",
                maxHeight: "90dvh",
                backgroundColor: tokens.surface,
                color: tokens.text_primary,
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
                padding: "20px",
                boxShadow: "0 16px 48px rgba(0, 0, 0, 0.20)",
              }}
            >
              <div className="flex items-center justify-between">
                <h2 style={{ fontSize: "17px", fontWeight: 700, color: tokens.text_primary }}>
                  {ov.title}
                </h2>
                <button
                  type="button"
                  aria-label="Tutup"
                  onClick={() => closeOverlay(ov.id)}
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: tokens.surface_secondary,
                    color: tokens.text_primary,
                  }}
                >
                  <X size={18} />
                </button>
              </div>
              <div className="overflow-y-auto">{ov.content}</div>
            </div>
          </div>
        );
      })}

      {/* Global Toast Host (z_index: 600) */}
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 w-full pointer-events-none"
          style={{
            zIndex: tokens.zIndex.toast || 600,
            maxWidth: "448px",
            padding: "0 16px",
          }}
        >
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="w-full rounded-2xl px-4 py-3 text-center"
              style={{
                backgroundColor: tokens.palette.gray_900,
                color: tokens.palette.white,
                fontSize: "13px",
                fontWeight: 500,
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.22)",
              }}
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </>,
    portalRoot
  );
}

/**
 * ============================================================================
 * 9. ROUTE RESOLVER & ROOT APPLICATION EXPORT
 * ============================================================================
 */
const STANDALONE_ROUTE_KEYS = new Set([
  "checkout",
  "payment_result",
  "notification",
  "cart",
  "livechat",
]);

function RouteResolver() {
  const { currentPath, resolveRouteKey } = useApp();
  const routeKey = resolveRouteKey(currentPath);

  if (STANDALONE_ROUTE_KEYS.has(routeKey)) {
    return <StandalonePageRenderer />;
  }

  return <AppShell />;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || "Terjadi kesalahan aplikasi." };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4">
          <AppError
            message={this.state.message}
            onRetry={() => this.setState({ hasError: false, message: "" })}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

function MobileCanvasFrame({ children }) {
  const { tokens } = useApp();

  return (
    <div
      className="w-screen overflow-hidden flex justify-center"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        backgroundColor: tokens.resolvedTheme === "dark" ? "#0B0B0C" : "#EFEFF4",
        fontFamily:
          "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }
        @media (prefers-reduced-motion: reduce) {
          .ds-interactive, * {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
          }
        }
      `}</style>
      <div
        className="w-full h-full overflow-hidden relative"
        style={{
          width: "100%",
          maxWidth: "480px",
          height: "100dvh",
          minHeight: "100dvh",
          backgroundColor: tokens.background,
          color: tokens.text_primary,
          boxShadow: "0 16px 48px rgba(0, 0, 0, 0.12)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <MobileCanvasFrame>
          <RouteResolver />
        </MobileCanvasFrame>
        <OverlayHost />
      </AppProvider>
    </ErrorBoundary>
  );
}
