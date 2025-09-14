// client/src/lib/dataService.ts
import { Product, CartItem, Order } from '@shared/schema';
import { mockProducts } from './mockData';

const STORAGE = {
  version: 'coffee_shop_version',
  products: 'coffee_shop_products',
  cart: 'coffee_shop_cart',
  orders: 'coffee_shop_orders',
  favorites: 'coffee_shop_favorites',
};

// ⚠️ Incrémente la version quand tu modifies la structure/contenu des produits
const DATA_VERSION = 'v2';

function safeParse<T>(raw: string | null, fallback: T): T {
  try { return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
}

function nowId(prefix: string) {
  // crypto.randomUUID n’est pas dispo partout -> fallback
  // @ts-ignore
  return (typeof crypto !== 'undefined' && crypto.randomUUID)
    // @ts-ignore
    ? crypto.randomUUID()
    : `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// Normalise les chemins d’images hérités des anciens dumps (attached_assets, /@fs/…)
function fixPath(x: string | undefined | null): string | undefined | null {
  if (!x) return x;
  if (x.includes('attached_assets') || x.includes('/@fs/')) {
    const justFile = x.split('/').pop()!;
    return `/${justFile}`; // sert depuis client/public/justFile
  }
  return x;
}

// Service qui simule une API backend avec localStorage
class DataService {
  constructor() {
    this.initializeData();
  }

  private initializeData() {
    if (typeof window === 'undefined' || !('localStorage' in window)) return;

    const currentVersion = localStorage.getItem(STORAGE.version);

    // 1) Si version différente → réinjecte les produits “propres”
    if (currentVersion !== DATA_VERSION) {
      localStorage.removeItem(STORAGE.products);
      localStorage.setItem(STORAGE.version, DATA_VERSION);
    }

    // 2) S’il n’y a pas de produits → injecte mockProducts (avec chemins /public)
    if (!localStorage.getItem(STORAGE.products)) {
      const normalized = (mockProducts || []).map((p: any) => ({
        ...p,
        image: fixPath(p.image) ?? p.image,
        images: Array.isArray(p.images) ? p.images.map((i: string) => fixPath(i) ?? i) : [],
      }));
      localStorage.setItem(STORAGE.products, JSON.stringify(normalized));
    } else {
      // 3) Migration douce : corrige les chemins hérités
      const prod = safeParse<any[]>(localStorage.getItem(STORAGE.products), []);
      const migrated = prod.map((p) => ({
        ...p,
        image: fixPath(p.image) ?? p.image,
        images: Array.isArray(p.images) ? p.images.map((i: string) => fixPath(i) ?? i) : [],
      }));
      localStorage.setItem(STORAGE.products, JSON.stringify(migrated));
    }

    // 4) Initialise les autres clés si absentes
    for (const key of [STORAGE.cart, STORAGE.orders, STORAGE.favorites]) {
      if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify([]));
    }
  }

  // Simule une latence réseau
  private delay(ms: number = 150): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // ========== PRODUITS ==========
  async getProducts(filters?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<Product[]> {
    await this.delay();
    const products = safeParse<Product[]>(localStorage.getItem(STORAGE.products), []);

    if (!filters) return products;

    const searchTerm = (filters.search || '').toLowerCase();

    return products.filter((product) => {
      if (searchTerm) {
        const hay = `${product.name} ${product.category} ${product.description}`.toLowerCase();
        if (!hay.includes(searchTerm)) return false;
      }
      if (filters.category && product.category !== filters.category) return false;
      if (typeof filters.minPrice === 'number' && product.price < filters.minPrice) return false;
      if (typeof filters.maxPrice === 'number' && product.price > filters.maxPrice) return false;
      if (typeof filters.featured === 'boolean' && product.featured !== filters.featured) return false;
      return true;
    });
  }

  async getProduct(idOrSlug: string): Promise<Product | null> {
    await this.delay(100);
    const products = safeParse<Product[]>(localStorage.getItem(STORAGE.products), []);
    // supporte id OU slug si tu enregistres le slug dans Product (sinon ne garde que id)
    return (
      products.find((p: any) => p.id === idOrSlug || p.slug === idOrSlug) ||
      null
    );
  }

  async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    await this.delay(120);
    const products = safeParse<Product[]>(localStorage.getItem(STORAGE.products), []);
    return products.filter((p) => p.featured).slice(0, limit);
  }

  // ========== PANIER ==========
  /**
   * Retourne un panier enrichi :
   * - lignes où le product est trouvé
   * - calcule lineTotal
   */
  async getCart(): Promise<CartItem[]> {
    await this.delay(60);

    const raw = safeParse<CartItem[]>(localStorage.getItem(STORAGE.cart), []);
    const products = safeParse<Product[]>(localStorage.getItem(STORAGE.products), []);

    // on garde uniquement les lignes qui matchent un produit existant
    const enriched = raw
      .map((item) => {
        const product = products.find((p: any) => p.id === item.productId);
        if (!product) return null; // produit supprimé -> on l’ignore
        return {
          ...item,
          product,
          // sécurité: quantité minimale = 1
          quantity: Math.max(1, item.quantity || 1),
          // @ts-ignore (si CartItem n’a pas lineTotal dans le schéma)
          lineTotal: product.price * Math.max(1, item.quantity || 1),
        };
      })
      .filter(Boolean) as CartItem[];

    // Si des lignes ont été ignorées, on sauvegarde un panier nettoyé
    if (enriched.length !== raw.length) {
      const compact = enriched.map(({ id, product, productId, quantity }) => ({
        id,
        productId,
        quantity,
      }));
      localStorage.setItem(STORAGE.cart, JSON.stringify(compact));
    }

    return enriched;
  }

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
    await this.delay(80);

    const cart = safeParse<CartItem[]>(localStorage.getItem(STORAGE.cart), []);
    const existing = cart.find((i) => i.productId === productId);

    if (existing) {
      existing.quantity = Math.max(1, (existing.quantity || 1) + quantity);
    } else {
      cart.push({
        id: nowId('cart'),
        productId,
        quantity: Math.max(1, quantity),
      });
    }

    localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
    // renvoie le panier enrichi
    return this.getCart();
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem[]> {
    await this.delay(70);

    const cart = safeParse<CartItem[]>(localStorage.getItem(STORAGE.cart), []);
    const idx = cart.findIndex((i) => i.id === itemId);

    if (idx >= 0) {
      if (quantity <= 0) {
        cart.splice(idx, 1);
      } else {
        cart[idx].quantity = Math.max(1, quantity);
      }
      localStorage.setItem(STORAGE.cart, JSON.stringify(cart));
    }

    return this.getCart();
  }

  async removeFromCart(itemId: string): Promise<CartItem[]> {
    await this.delay(60);

    const cart = safeParse<CartItem[]>(localStorage.getItem(STORAGE.cart), []);
    const updated = cart.filter((i) => i.id !== itemId);
    localStorage.setItem(STORAGE.cart, JSON.stringify(updated));

    return this.getCart();
  }

  async clearCart(): Promise<void> {
    await this.delay(40);
    localStorage.setItem(STORAGE.cart, JSON.stringify([]));
  }

  async getCartTotal(): Promise<number> {
    const cart = await this.getCart();
    return cart.reduce((sum, item) => sum + ((item as any).lineTotal || 0), 0);
  }

  async getCartCount(): Promise<number> {
    const cart = await this.getCart();
    return cart.reduce((count, item) => count + Math.max(1, item.quantity || 1), 0);
  }

  // ========== FAVORIS ==========
  async getFavorites(): Promise<string[]> {
    await this.delay(40);
    return safeParse<string[]>(localStorage.getItem(STORAGE.favorites), []);
  }

  async addToFavorites(productId: string): Promise<string[]> {
    await this.delay(40);
    const favorites = safeParse<string[]>(localStorage.getItem(STORAGE.favorites), []);
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem(STORAGE.favorites, JSON.stringify(favorites));
    }
    return favorites;
  }

  async removeFromFavorites(productId: string): Promise<string[]> {
    await this.delay(40);
    const favorites = safeParse<string[]>(localStorage.getItem(STORAGE.favorites), []);
    const next = favorites.filter((id) => id !== productId);
    localStorage.setItem(STORAGE.favorites, JSON.stringify(next));
    return next;
  }

  async toggleFavorite(productId: string): Promise<boolean> {
    const cur = await this.getFavorites();
    if (cur.includes(productId)) {
      await this.removeFromFavorites(productId);
      return false;
    }
    await this.addToFavorites(productId);
    return true;
  }

  // ========== COMMANDES ==========
  async placeOrder(order: Order): Promise<Order> {
    await this.delay(120);
    const orders = safeParse<Order[]>(localStorage.getItem(STORAGE.orders), []);
    const next: Order = {
      ...order,
      id: order.id || nowId('order'),
      createdAt: new Date().toISOString(),
      status: order.status || 'paid',
    };
    orders.push(next);
    localStorage.setItem(STORAGE.orders, JSON.stringify(orders));
    await this.clearCart();
    return next;
  }

  async createOrder(orderData: { shippingAddress: string; billingAddress: string }): Promise<Order> {
    await this.delay(200);

    const cart = await this.getCart();
    const total = await this.getCartTotal();

    const order: Order = {
      id: nowId('order'),
      items: cart,
      total,
      status: 'pending',
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      createdAt: new Date().toISOString(),
    };

    const orders = safeParse<Order[]>(localStorage.getItem(STORAGE.orders), []);
    orders.push(order);
    localStorage.setItem(STORAGE.orders, JSON.stringify(orders));

    await this.clearCart();
    return order;
  }

  async getOrders(): Promise<Order[]> {
    await this.delay(100);
    return safeParse<Order[]>(localStorage.getItem(STORAGE.orders), []);
  }

  async getOrder(id: string): Promise<Order | null> {
    await this.delay(80);
    const orders = safeParse<Order[]>(localStorage.getItem(STORAGE.orders), []);
    return orders.find((o) => o.id === id) || null;
  }

  // ========== UTILITAIRES ==========
  async searchProducts(query: string): Promise<Product[]> {
    return this.getProducts({ search: query });
  }

  getCategories(): string[] {
    const products = safeParse<Product[]>(localStorage.getItem(STORAGE.products), []);
    return Array.from(new Set(products.map((p) => p.category)));
  }

  resetAllData(): void {
    if (typeof window === 'undefined' || !('localStorage' in window)) return;
    for (const key of Object.values(STORAGE)) localStorage.removeItem(key);
    this.initializeData();
  }
}

// Instance singleton
export const dataService = new DataService();
export type { CartItem };
