import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useAddToCart } from '@/lib/hooks/useCart';
import { useLocation } from 'wouter';

interface ProductCardProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  features: string[];
  inStock: number;
  featured?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

export default function ProductCard({
  id,
  slug,
  name,
  price,
  originalPrice,
  image,
  category,
  features,
  inStock,
  featured = false,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { mutate: addToCart } = useAddToCart();
  const [, navigate] = useLocation();


  const handleAddToCart = () => {
    addToCart({ productId: id, quantity: 1 }
      // { onSuccess: () => {
      //   navigate('/cart'); 
      //   window.scrollTo({ top: 0, behavior: 'smooth' })} }
      );
    onAddToCart?.(id);
    
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    onToggleFavorite?.(id);
  };

  const handleQuickView = () => {
    // onQuickView?.(id);
    navigate(`/product/${slug}`);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

  return (
    <Card
      className={`group relative overflow-hidden transition-all duration-300 hover-elevate ${
        isHovered ? 'shadow-lg' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-product-${id}`}
    >
      <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: '1 / 1' }}>
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
      />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {featured && (
            <Badge variant="default" className="bg-primary text-primary-foreground">
              Premium
            </Badge>
          )}
          {inStock === 0 && (
            <Badge variant="secondary" className="bg-destructive text-destructive-foreground">
              Épuisé
            </Badge>
          )}
        </div>

        {/* Action Buttons - Appear on Hover */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white backdrop-blur-sm"
            onClick={handleToggleFavorite}
            data-testid={`button-favorite-${id}`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>

          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 bg-white/90 hover:bg-white backdrop-blur-sm"
            onClick={handleQuickView}
            data-testid={`button-quickview-${id}`}
          >
            <Eye className="h-4 w-4 text-gray-600" />
          </Button>
        </div>

        {/* Quick Add to Cart - Bottom Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            className="w-full bg-white text-black hover:bg-gray-100"
            onClick={handleAddToCart}
            disabled={inStock === 0}
            data-testid={`button-add-cart-${id}`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {inStock === 0 ? 'Indisponible' : 'Ajouter au Panier'}
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>

        <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-2" data-testid={`text-name-${id}`}>
          {name}
        </h3>

        <div className="flex  flex-col items-center justify-between mb-3">
          <span className="text-2xl font-bold text-primary" data-testid={`text-price-${id}`}>
            {formatPrice(price)}
          </span>
          {originalPrice && (
                        <>
                          <span className="text-lg text-muted-foreground line-through">
                            {formatPrice(originalPrice)}
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            -{Math.round((1 - price / originalPrice) * 100)}%
                          </Badge>
                        </>
                      )}
          {inStock > 0 && inStock <= 5 && (
            <span className="text-xs text-orange-600 font-medium">Plus que {inStock} en stock</span>
          )}
        </div>

        <div className="space-y-1">
          {features.slice(0, 2).map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <span className="w-1 h-1 bg-primary rounded-full mr-2" />
              {feature}
            </div>
          ))}
          {features.length > 2 && (
            <div className="text-sm text-muted-foreground">+{features.length - 2} autres caractéristiques</div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleAddToCart}
          disabled={inStock === 0}
          data-testid={`button-add-footer-${id}`}
        >
          {inStock === 0 ? 'Indisponible' : 'Ajouter au Panier'}
        </Button>
      </CardFooter>
    </Card>
  );
}
