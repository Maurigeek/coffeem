import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import espressoImage from '@assets/generated_images/Premium_espresso_machine_product_4825e079.png';
import beanToCupImage from '@assets/generated_images/Bean-to-cup_coffee_machine_product_a4000224.png';
import frenchPressImage from '@assets/generated_images/Luxury_French_press_machine_cce82276.png';

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // todo: remove mock functionality
  const products = [
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
      featured: false,
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
    {
      id: "5",
      name: "Barista Station Pro",
      price: 3299.99,
      image: beanToCupImage,
      category: "Professionnel",
      features: [
        "Double chaudière indépendante",
        "Contrôle PID de température",
        "Manomètre analogique",
        "Construction tout métal"
      ],
      inStock: 2,
      featured: true,
    },
    {
      id: "6",
      name: "Compact Essential",
      price: 599.99,
      image: frenchPressImage,
      category: "Compact",
      features: [
        "Design ultra-compact",
        "Une touche pour espresso",
        "Réservoir 1.2L",
        "Économie d'énergie"
      ],
      inStock: 15,
      featured: false,
    },
  ];

  const categories = ['Espresso', 'Automatique', 'French Press', 'Cappuccino', 'Professionnel', 'Compact'];
  const brands = ['Cafetière Premium', 'Elite Coffee', 'Master Brew', 'Professional Series'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    return matchesSearch && matchesPrice && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'featured':
      default:
        return b.featured ? 1 : -1;
    }
  });

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleAddToCart = (productId: string) => {
    console.log(`Produit ${productId} ajouté au panier`);
  };

  const handleToggleFavorite = (productId: string) => {
    console.log(`Produit ${productId} ajouté/retiré des favoris`);
  };

  const handleQuickView = (productId: string) => {
    console.log(`Aperçu rapide du produit ${productId}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
          Catalogue de Machines à Café
        </h1>
        <p className="text-muted-foreground">
          Découvrez notre collection complète de machines à café premium
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-80 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5" />
                Filtres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div>
                <label className="text-sm font-medium mb-2 block">Rechercher</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Nom ou catégorie..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-catalog-search"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-3 block">
                  Prix: {priceRange[0]}€ - {priceRange[1]}€
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={5000}
                  step={50}
                  className="w-full"
                  data-testid="slider-price-range"
                />
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium mb-3 block">Catégories</label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                        data-testid={`checkbox-category-${category.toLowerCase()}`}
                      />
                      <label
                        htmlFor={category}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <label className="text-sm font-medium mb-3 block">Marques</label>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBrands([...selectedBrands, brand]);
                          } else {
                            setSelectedBrands(selectedBrands.filter(b => b !== brand));
                          }
                        }}
                        data-testid={`checkbox-brand-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                      />
                      <label
                        htmlFor={brand}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 3000]);
                  setSelectedCategories([]);
                  setSelectedBrands([]);
                }}
                data-testid="button-clear-filters"
              >
                Effacer les filtres
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="text-sm text-muted-foreground">
              {sortedProducts.length} produit(s) trouvé(s)
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Trier par:</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Mis en avant</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                  <SelectItem value="name">Nom A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  onQuickView={handleQuickView}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-muted-foreground mb-4">
                  Essayez de modifier vos critères de recherche ou filtres
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setPriceRange([0, 3000]);
                    setSelectedCategories([]);
                    setSelectedBrands([]);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
}