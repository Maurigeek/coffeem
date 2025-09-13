import { useState } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProductZoom from '@/components/ProductZoom';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw } from 'lucide-react';
import espressoImage from '@assets/generated_images/Premium_espresso_machine_product_4825e079.png';

export default function ProductDetail() {
  const [, params] = useRoute('/product/:id');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // todo: remove mock functionality
  const product = {
    id: params?.id || '1',
    name: 'Espresso Maestro Pro',
    price: 1299.99,
    originalPrice: 1599.99,
    image: espressoImage,
    category: 'Espresso',
    rating: 4.8,
    reviewCount: 142,
    inStock: 5,
    description: 'La machine espresso ultime pour les amateurs de café exigeants. Conçue avec une attention méticuleuse aux détails, elle combine technologie de pointe et design élégant pour offrir une expérience café exceptionnelle.',
    features: [
      'Système de pression 15 bars pour un espresso parfait',
      'Moulin intégré en acier inoxydable avec 12 niveaux de mouture',
      'Écran tactile intelligent avec interface intuitive',
      'Système de vapeur professionnel pour cappuccinos et lattes',
      'Réservoir d\'eau amovible de 2.5L',
      'Plateau d\'égouttement amovible en acier inoxydable',
      'Préchauffage rapide en moins de 60 secondes',
      'Garantie étendue de 3 ans incluse'
    ],
    specifications: {
      'Dimensions': '35 x 40 x 45 cm',
      'Poids': '8.5 kg',
      'Puissance': '1450W',
      'Pression': '15 bars',
      'Capacité réservoir': '2.5L',
      'Matériaux': 'Acier inoxydable et plastique ABS',
      'Couleur': 'Noir mat / Acier inoxydable',
      'Garantie': '3 ans'
    }
  };

  const handleAddToCart = () => {
    console.log(`${quantity}x ${product.name} ajouté au panier`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    console.log(`Produit ${!isFavorite ? 'ajouté aux' : 'retiré des'} favoris`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <ProductZoom
            image={product.image}
            alt={product.name}
            className="aspect-square rounded-lg border"
          />
          <div className="text-sm text-muted-foreground text-center">
            Passez la souris sur l'image pour zoomer
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Breadcrumb */}
          <div className="text-sm text-muted-foreground">
            <span>Accueil</span> / <span>Machines Espresso</span> / <span>{product.name}</span>
          </div>

          {/* Product Header */}
          <div>
            <Badge variant="outline" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2" data-testid="text-product-name">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} avis)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-primary" data-testid="text-product-price">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <Badge variant="destructive" className="text-xs">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {/* Stock Status */}
            {product.inStock > 0 && product.inStock <= 5 && (
              <div className="mb-4">
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  Plus que {product.inStock} en stock
                </Badge>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity & Actions */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantité:</label>
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-2 hover:bg-muted"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  data-testid="button-quantity-decrease"
                >
                  -
                </button>
                <span className="px-4 py-2 text-center min-w-12" data-testid="text-quantity">
                  {quantity}
                </span>
                <button
                  className="px-3 py-2 hover:bg-muted"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-quantity-increase"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au Panier
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleToggleFavorite}
                className={isFavorite ? 'text-red-500 border-red-200' : ''}
                data-testid="button-toggle-favorite"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>

            <Button size="lg" variant="secondary" className="w-full" data-testid="button-buy-now">
              Acheter Maintenant
            </Button>
          </div>

          {/* Delivery Info */}
          <Card className="p-4">
            <CardContent className="p-0">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Livraison gratuite et installation incluse</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Garantie étendue 3 ans incluse</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">Retour gratuit sous 30 jours</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <div className="space-y-8">
          {/* Features */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Caractéristiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Specifications */}
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Spécifications Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{key}</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}