import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../dataService';
import { useToast } from '@/hooks/use-toast';

export function useCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => dataService.getCart(),
    staleTime: 0, // Always fetch fresh cart data
  });
}

export function useCartCount() {
  return useQuery({
    queryKey: ['cart-count'],
    queryFn: () => dataService.getCartCount(),
    staleTime: 0,
  });
}

export function useCartTotal() {
  return useQuery({
    queryKey: ['cart-total'],
    queryFn: () => dataService.getCartTotal(),
    staleTime: 0,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ productId, quantity = 1 }: { productId: string; quantity?: number }) =>
      dataService.addToCart(productId, quantity),
    onSuccess: (updatedCart, variables) => {
      // Invalide toutes les queries liées au panier
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      
      toast({
        title: "Produit ajouté au panier",
        description: `${variables.quantity} article(s) ajouté(s) avec succès.`,
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    },
  });
}

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
        title: "Erreur",
        description: "Impossible de mettre à jour le panier.",
        variant: "destructive",
      });
    },
  });
}

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
        title: "Produit retiré",
        description: "Le produit a été retiré du panier.",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit du panier.",
        variant: "destructive",
      });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => dataService.clearCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-count'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
      
      toast({
        title: "Panier vidé",
        description: "Tous les produits ont été retirés du panier.",
      });
    },
  });
}