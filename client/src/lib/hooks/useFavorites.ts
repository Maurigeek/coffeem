import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dataService } from '../dataService';
import { useToast } from '@/hooks/use-toast';

export function useFavorites() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => dataService.getFavorites(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (productId: string) => dataService.toggleFavorite(productId),
    onSuccess: (isFavorite, productId) => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      
      toast({
        title: isFavorite ? "Ajouté aux favoris" : "Retiré des favoris",
        description: isFavorite 
          ? "Le produit a été ajouté à vos favoris."
          : "Le produit a été retiré de vos favoris.",
        duration: 2000,
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible de modifier les favoris.",
        variant: "destructive",
      });
    },
  });
}