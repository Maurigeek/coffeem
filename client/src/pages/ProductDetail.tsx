// client/src/pages/ProductDetail.tsx
import { useState, useMemo } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import ProductZoom from '@/components/ProductZoom';
import Product360 from '@/components/Product360';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ArrowLeft } from 'lucide-react';
import { useAddToCart } from '@/lib/hooks/useCart';
import { mockProducts } from '@/lib/mockData';

export default function ProductDetail() {
  // route lisible
  const [match, params] = useRoute('/product/:slug');
  const [, navigate] = useLocation();

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { mutate: addToCart } = useAddToCart();

  const product = useMemo(() => {
    const slug = params?.slug || '';
    return mockProducts.find(p => p.slug === slug);
  }, [params?.slug])

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

  const handleToggleFavorite = () => setIsFavorite(v => !v);
  const goToCart = () => { navigate('/cart'); window.scrollTo({ top: 0, behavior: 'smooth' }); };


  // garde-fou : produit introuvable → message et bouton retour
  if (!match || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Produit introuvable</h1>
        <p className="text-muted-foreground mb-6">
          Le produit demandé n’existe plus ou le lien est incorrect.
        </p>
        <Button onClick={() => navigate('/catalog')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au catalogue
        </Button>
      </div>
    );
  }

  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {/* ✅ on n’accède plus à product.* tant qu’on ne l’a pas validé ci-dessus */}
          <ProductZoom src={product.image} alt={product.name} />
          {product.media360?.length ? (
            <div className="mt-4">
              <Product360 frames={product.media360} className="aspect-[4/3] bg-black/20" />
            </div>
          ) : null}
          <div className="text-sm text-muted-foreground text-center">
            Passez la souris sur l'image pour zoomer
          </div>
        </div>

        {/* Infos */}
        <div className="space-y-6">
          <div className="text-sm text-muted-foreground">
            <span>Accueil</span> / <span>{product.category}</span> / <span>{product.name}</span>
          </div>

          <h1 className="text-3xl font-serif font-bold">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviewCount} avis)
            </span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="destructive" className="text-xs">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              </>
            )}
          </div>

          <div>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Quantité:</label>
              <div className="flex items-center border rounded-md">
                <button className="px-3 py-2 hover:bg-muted" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
                <button className="px-3 py-2 hover:bg-muted" onClick={() => setQuantity(q => q + 1)}>+</button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addToCart({ productId: product.id, quantity })}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ajouter au Panier
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsFavorite(v => !v)}
                className={isFavorite ? 'text-red-500 border-red-200' : ''}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
            </div>
             <Button
              onClick={() => addToCart({ productId: product.id, quantity }, 
                { onSuccess: () => goToCart() })}
              size="lg"
              variant="secondary"
              className="w-full"
              data-testid="button-buy-now"
            >
              Acheter Maintenant
            </Button>
          </div>

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

      {/* Détails */}
      <div className="mt-16">
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Caractéristiques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-2xl font-serif font-bold mb-6">Spécifications Techniques</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 border-b">
                  <span className="font-medium">{k}</span>
                  <span className="text-muted-foreground">{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
