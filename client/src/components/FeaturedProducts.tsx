import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { ArrowRight } from 'lucide-react';
import espressoImage from '@assets/generated_images/Premium_espresso_machine_product_4825e079.png';
import beanToCupImage from '@assets/generated_images/Bean-to-cup_coffee_machine_product_a4000224.png';
import frenchPressImage from '@assets/generated_images/Luxury_French_press_machine_cce82276.png';

export default function FeaturedProducts() {
  // todo: remove mock functionality
  const featuredProducts = [
    {
      id: "1",
      name: "Espresso Maestro Pro",
      price: 1299.99,
      image: espressoImage,
      category: "Espresso",
      features: [
        "Système de pression 15 bars",
        "Moulin intégré en acier",
        "Écran tactile intelligent",
        "Vapeur professionnelle"
      ],
      inStock: 5,
      featured: true,
    },
    {
      id: "2",
      name: "Bean-to-Cup Elite",
      price: 2499.99,
      image: beanToCupImage,
      category: "Automatique",
      features: [
        "Moulin céramique silencieux",
        "12 recettes préprogrammées",
        "Réservoir d'eau 2.5L",
        "Nettoyage automatique"
      ],
      inStock: 8,
      featured: true,
    },
    {
      id: "3",
      name: "French Press Deluxe",
      price: 899.99,
      image: frenchPressImage,
      category: "French Press",
      features: [
        "Finition cuivre premium",
        "Double paroi isolante",
        "Filtre ultra-fin",
        "Capacité 1.2L"
      ],
      inStock: 12,
      featured: true,
    },
    {
      id: "4",
      name: "Cappuccino Master",
      price: 1899.99,
      image: espressoImage,
      category: "Cappuccino",
      features: [
        "Buse vapeur rotative",
        "Contrôle de température précis",
        "Réservoir lait intégré",
        "Interface utilisateur intuitive"
      ],
      inStock: 3,
      featured: true,
    },
  ];

  const handleAddToCart = (productId: string) => {
    console.log(`Produit ${productId} ajouté au panier`);
  };

  const handleToggleFavorite = (productId: string) => {
    console.log(`Produit ${productId} ajouté/retiré des favoris`);
  };

  const handleQuickView = (productId: string) => {
    console.log(`Aperçu rapide du produit ${productId}`);
  };

  const handleViewAll = () => {
    console.log('Navigation vers le catalogue complet');
  };

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