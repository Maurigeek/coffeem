import { Product, CartItem, Order } from '@shared/schema';
import { mockProducts } from './mockData';

// Service qui simule une API backend avec localStorage
class DataService {
  private storageKeys = {
    products: 'coffee_shop_products',
    cart: 'coffee_shop_cart',
    orders: 'coffee_shop_orders',
    favorites: 'coffee_shop_favorites',
  };

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialise les produits s'ils n'existent pas
    if (!localStorage.getItem(this.storageKeys.products)) {
      localStorage.setItem(this.storageKeys.products, JSON.stringify(mockProducts));
    }

    // Initialise le panier vide s'il n'existe pas
    if (!localStorage.getItem(this.storageKeys.cart)) {
      localStorage.setItem(this.storageKeys.cart, JSON.stringify([]));
    }

    // Initialise les commandes vides si elles n'existent pas
    if (!localStorage.getItem(this.storageKeys.orders)) {
      localStorage.setItem(this.storageKeys.orders, JSON.stringify([]));
    }

    // Initialise les favoris vides s'ils n'existent pas
    if (!localStorage.getItem(this.storageKeys.favorites)) {
      localStorage.setItem(this.storageKeys.favorites, JSON.stringify([]));
    }
  }

  // Simule une latence réseau
  private delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // PRODUITS
  async getProducts(filters?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
  }): Promise<Product[]> {
    await this.delay();
    
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]') as Product[];
    
    if (!filters) return products;

    return products.filter(product => {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        if (!product.name.toLowerCase().includes(searchTerm) &&
            !product.category.toLowerCase().includes(searchTerm) &&
            !product.description.toLowerCase().includes(searchTerm)) {
          return false;
        }
      }

      if (filters.category && product.category !== filters.category) return false;
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      if (filters.featured !== undefined && product.featured !== filters.featured) return false;

      return true;
    });
  }

  async getProduct(id: string): Promise<Product | null> {
    await this.delay(200);
    
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]') as Product[];
    return products.find(p => p.id === id) || null;
  }

  async getFeaturedProducts(limit: number = 4): Promise<Product[]> {
    await this.delay(250);
    
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]') as Product[];
    return products.filter(p => p.featured).slice(0, limit);
  }

  // PANIER
  async getCart(): Promise<CartItem[]> {
    await this.delay(100);
    
    const cart = JSON.parse(localStorage.getItem(this.storageKeys.cart) || '[]') as CartItem[];
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]') as Product[];
    
    // Enrichit les items du panier avec les données produit
    return cart.map(item => ({
      ...item,
      product: products.find(p => p.id === item.productId)
    }));
  }

  async addToCart(productId: string, quantity: number = 1): Promise<CartItem[]> {
    await this.delay(200);
    
    const cart = JSON.parse(localStorage.getItem(this.storageKeys.cart) || '[]') as CartItem[];
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        productId,
        quantity
      };
      cart.push(newItem);
    }

    localStorage.setItem(this.storageKeys.cart, JSON.stringify(cart));
    return this.getCart();
  }

  async updateCartItem(itemId: string, quantity: number): Promise<CartItem[]> {
    await this.delay(150);
    
    const cart = JSON.parse(localStorage.getItem(this.storageKeys.cart) || '[]') as CartItem[];
    const item = cart.find(i => i.id === itemId);

    if (item) {
      if (quantity <= 0) {
        const index = cart.findIndex(i => i.id === itemId);
        cart.splice(index, 1);
      } else {
        item.quantity = quantity;
      }
    }

    localStorage.setItem(this.storageKeys.cart, JSON.stringify(cart));
    return this.getCart();
  }

  async removeFromCart(itemId: string): Promise<CartItem[]> {
    await this.delay(100);
    
    const cart = JSON.parse(localStorage.getItem(this.storageKeys.cart) || '[]') as CartItem[];
    const updatedCart = cart.filter(item => item.id !== itemId);
    
    localStorage.setItem(this.storageKeys.cart, JSON.stringify(updatedCart));
    return this.getCart();
  }

  async clearCart(): Promise<void> {
    await this.delay(100);
    localStorage.setItem(this.storageKeys.cart, JSON.stringify([]));
  }

  async getCartTotal(): Promise<number> {
    const cart = await this.getCart();
    return cart.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  }

  async getCartCount(): Promise<number> {
    const cart = await this.getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
  }

  // FAVORIS
  async getFavorites(): Promise<string[]> {
    await this.delay(100);
    return JSON.parse(localStorage.getItem(this.storageKeys.favorites) || '[]');
  }

  async addToFavorites(productId: string): Promise<string[]> {
    await this.delay(100);
    
    const favorites = JSON.parse(localStorage.getItem(this.storageKeys.favorites) || '[]') as string[];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem(this.storageKeys.favorites, JSON.stringify(favorites));
    }
    
    return favorites;
  }

  async removeFromFavorites(productId: string): Promise<string[]> {
    await this.delay(100);
    
    const favorites = JSON.parse(localStorage.getItem(this.storageKeys.favorites) || '[]') as string[];
    const updatedFavorites = favorites.filter(id => id !== productId);
    
    localStorage.setItem(this.storageKeys.favorites, JSON.stringify(updatedFavorites));
    return updatedFavorites;
  }

  async toggleFavorite(productId: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    
    if (favorites.includes(productId)) {
      await this.removeFromFavorites(productId);
      return false;
    } else {
      await this.addToFavorites(productId);
      return true;
    }
  }

  // COMMANDES
  async createOrder(orderData: {
    shippingAddress: string;
    billingAddress: string;
  }): Promise<Order> {
    await this.delay(500);
    
    const cart = await this.getCart();
    const total = await this.getCartTotal();
    
    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      items: cart,
      total,
      status: 'pending',
      shippingAddress: orderData.shippingAddress,
      billingAddress: orderData.billingAddress,
      createdAt: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]') as Order[];
    orders.push(order);
    localStorage.setItem(this.storageKeys.orders, JSON.stringify(orders));

    // Vide le panier après commande
    await this.clearCart();

    return order;
  }

  async getOrders(): Promise<Order[]> {
    await this.delay(200);
    return JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]');
  }

  async getOrder(id: string): Promise<Order | null> {
    await this.delay(150);
    const orders = JSON.parse(localStorage.getItem(this.storageKeys.orders) || '[]') as Order[];
    return orders.find(order => order.id === id) || null;
  }

  // UTILITAIRES
  async searchProducts(query: string): Promise<Product[]> {
    return this.getProducts({ search: query });
  }

  getCategories(): string[] {
    const products = JSON.parse(localStorage.getItem(this.storageKeys.products) || '[]') as Product[];
    return Array.from(new Set(products.map(p => p.category)));
  }

  // Méthode pour réinitialiser toutes les données (utile pour le développement)
  resetAllData(): void {
    Object.values(this.storageKeys).forEach(key => {
      localStorage.removeItem(key);
    });
    this.initializeData();
  }
}

// Instance singleton
export const dataService = new DataService();