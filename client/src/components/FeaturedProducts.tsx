import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import { useFeaturedProducts } from '@/lib/hooks/useProducts';
import { useAddToCart } from '@/lib/hooks/useCart';
import { useToggleFavorite } from '@/lib/hooks/useFavorites';

export default function FeaturedProducts() {
  const { data: featuredProducts = [], isLoading } = useFeaturedProducts(4);
  const addToCartMutation = useAddToCart();
  const toggleFavoriteMutation = useToggleFavorite();

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const handleToggleFavorite = (productId: string) => {
    toggleFavoriteMutation.mutate(productId);
  };

  const handleQuickView = (productId: string) => {
    console.log(`Aperçu rapide du produit ${productId}`);
  };

  const handleViewAll = () => {
    console.log('Navigation vers le catalogue complet');
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Produits à la Une
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Chargement des produits...
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-card rounded-lg p-4 animate-pulse">
                <div className="aspect-square bg-muted rounded-lg mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Produits à la Une
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre sélection exclusive de machines à café premium, 
            choisies pour leur excellence et leur innovation.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleViewAll}
            className="group"
            data-testid="button-view-all-products"
          >
            Voir Tous les Produits
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}