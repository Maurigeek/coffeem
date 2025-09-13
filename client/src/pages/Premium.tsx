import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/lib/hooks/useProducts";
import { useAddToCart } from "@/lib/hooks/useCart";
import { useToggleFavorite } from "@/lib/hooks/useFavorites";
import { Star, Filter, SlidersHorizontal, Award, Crown, Zap } from "lucide-react";

export default function Premium() {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([1000, 5000]);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Filtrer les produits premium (prix > 1000€)
  const { data: allProducts = [], isLoading } = useProducts();
  const addToCartMutation = useAddToCart();
  const toggleFavoriteMutation = useToggleFavorite();

  const premiumProducts = allProducts.filter(product => 
    product.price >= 1000 && 
    product.price >= priceRange[0] && 
    product.price <= priceRange[1] &&
    (categoryFilter === "all" || product.category === categoryFilter)
  ).sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name": return a.name.localeCompare(b.name);
      case "featured": 
      default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const categories = ["all", ...Array.from(new Set(allProducts.filter(p => p.price >= 1000).map(p => p.category)))];

  const handleAddToCart = (productId: string) => {
    addToCartMutation.mutate({ productId, quantity: 1 });
  };

  const handleToggleFavorite = (productId: string) => {
    toggleFavoriteMutation.mutate(productId);
  };

  const handleQuickView = (productId: string) => {
    console.log(`Aperçu rapide du produit premium ${productId}`);
  };

  const premiumFeatures = [
    {
      icon: Crown,
      title: "Sélection Exclusive",
      description: "Machines sélectionnées pour leur prestige et performance exceptionnelle"
    },
    {
      icon: Award,
      title: "Garantie Premium",
      description: "5 ans de garantie étendue avec service prioritaire inclus"
    },
    {
      icon: Zap,
      title: "Installation VIP",
      description: "Installation et formation personnalisée par nos experts"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/80 to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30" data-testid="badge-premium">
              COLLECTION PREMIUM
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
              Machines d'Exception
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Découvrez notre sélection exclusive de machines à café haut de gamme, 
              conçues pour les connaisseurs les plus exigeants.
            </p>
            <div className="flex items-center justify-center gap-4 text-white/80">
              <Star className="w-5 h-5 fill-current" />
              <span className="text-sm font-medium">Sélection Exclusive</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span className="text-sm font-medium">Garantie 5 ans</span>
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <span className="text-sm font-medium">Service VIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-transparent hover-elevate">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-semibold">
                {premiumProducts.length} Machines Premium
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
                data-testid="button-toggle-filters"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48" data-testid="select-sort-by">
                  <SelectValue placeholder="Trier par..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">À la Une</SelectItem>
                  <SelectItem value="price-asc">Prix Croissant</SelectItem>
                  <SelectItem value="price-desc">Prix Décroissant</SelectItem>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className={`lg:block ${showFilters ? 'block' : 'hidden'} space-y-6`}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <SlidersHorizontal className="w-5 h-5" />
                    Filtres
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Catégorie
                    </label>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger data-testid="select-category-filter">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category === "all" ? "Toutes" : category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Fourchette de Prix
                    </label>
                    <div className="px-2">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={5000}
                        min={1000}
                        step={100}
                        className="mb-3"
                        data-testid="slider-price-range"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{priceRange[0]}€</span>
                        <span>{priceRange[1]}€</span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Reset Filters */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      setCategoryFilter("all");
                      setPriceRange([1000, 5000]);
                      setSortBy("featured");
                    }}
                    data-testid="button-reset-filters"
                  >
                    Réinitialiser
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, index) => (
                    <Card key={index} className="animate-pulse">
                      <div className="aspect-square bg-muted rounded-t-lg"></div>
                      <CardContent className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : premiumProducts.length === 0 ? (
                <Card className="p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">Aucune machine trouvée</h3>
                  <p className="text-muted-foreground">
                    Essayez d'ajuster vos filtres pour voir plus de résultats.
                  </p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="grid-premium-products">
                  {premiumProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      {...product}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                      onQuickView={handleQuickView}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Besoin de Conseils ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Nos experts sont là pour vous accompagner dans le choix de votre machine d'exception.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" data-testid="button-contact-expert">
              Contacter un Expert
            </Button>
            <Button variant="outline" size="lg" data-testid="button-schedule-demo">
              Programmer une Démo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}