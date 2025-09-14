import { z } from "zod";

// Types pour le frontend uniquement
export interface Product {
  id: string;
  name: string;
  slug:string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  media360?: string[];
  category: string;
  features: string[];
  inStock: number;
  featured: boolean;
  rating?: number;
  reviewCount?: number;
  originalPrice?: number;
  specifications?: Record<string, string>;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: string;
  shippingAddress: string;
  billingAddress: string;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  email?: string;
}

// Schemas de validation Zod
export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().positive(),
  image: z.string().url(),
  category: z.string().min(1),
  features: z.array(z.string()),
  inStock: z.number().int().min(0),
  featured: z.boolean(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().min(0).optional(),
  originalPrice: z.number().positive().optional(),
  specifications: z.record(z.string()).optional(),
});

export const cartItemSchema = z.object({
  id: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
  product: productSchema.optional(),
});

export const orderSchema = z.object({
  id: z.string(),
  items: z.array(cartItemSchema),
  total: z.number().positive(),
  status: z.string(),
  shippingAddress: z.string().min(1),
  billingAddress: z.string().min(1),
  createdAt: z.string(),
});

export type InsertProduct = z.infer<typeof productSchema>;
export type InsertCartItem = Omit<z.infer<typeof cartItemSchema>, 'id'>;
export type InsertOrder = Omit<z.infer<typeof orderSchema>, 'id' | 'createdAt'>;