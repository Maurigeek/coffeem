import { useQuery } from '@tanstack/react-query';
import { dataService } from '../dataService';
import { Product } from '@shared/schema';

export function useProducts(filters?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  featured?: boolean;
}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => dataService.getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => id ? dataService.getProduct(id) : null,
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useFeaturedProducts(limit = 4) {
  return useQuery({
    queryKey: ['featured-products', limit],
    queryFn: () => dataService.getFeaturedProducts(limit),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProductSearch(query: string) {
  return useQuery({
    queryKey: ['product-search', query],
    queryFn: () => dataService.searchProducts(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => Promise.resolve(dataService.getCategories()),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
}