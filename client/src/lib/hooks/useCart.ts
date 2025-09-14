import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../dataService';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'wouter';

/** Liste enrichie du panier */
export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => dataService.getCart(),
    staleTime: 0,
  });
}

/** Nombre d’articles total */
export function useCartCount() {
  return useQuery({
    queryKey: ['cart-count'],
    queryFn: () => dataService.getCartCount(),
    staleTime: 0,
  });
}

/** Total TTC (selon règles du service) */
export function useCartTotal() {
  return useQuery({
    queryKey: ['cart-total'],
    queryFn: () => dataService.getCartTotal(),
    staleTime: 0,
  });
}

/** Ajouter un produit */
export function useAddToCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [, navigate] = useLocation();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
      dataService.addToCart(productId, quantity),
    onSuccess: (_updatedCart, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      toast({
        title: 'Produit ajouté',
        description: `${variables.quantity ?? 1} article(s) ajouté(s) au panier.`,
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: "Impossible d'ajouter le produit au panier.",
        variant: 'destructive',
      });
    },
  });
}

/** Mettre à jour la quantité */
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      dataService.updateCartItem(itemId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Mise à jour du panier impossible.',
        variant: 'destructive',
      });
    },
  });
}

/** Retirer une ligne */
export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (itemId: string) => dataService.removeFromCart(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      toast({
        title: 'Produit retiré',
        description: 'Le produit a été retiré du panier.',
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: 'Erreur',
        description: 'Impossible de retirer ce produit.',
        variant: 'destructive',
      });
    },
  });
}

/** Vider le panier */
export function useClearCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => dataService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      toast({ title: 'Panier vidé', description: 'Tous les produits ont été retirés.' });
    },
  });
}
