import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCart, useUpdateCartItem, useRemoveFromCart, useClearCart, useCartTotal } from "@/lib/hooks/useCart";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";

export default function Cart() {
  const { data: cartItems = [], isLoading } = useCart();
  const { data: cartTotal = { total: 0, subtotal: 0, shipping: 0, tax: 0 } } = useCartTotal();
  const updateCartMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();

  const [promoCode, setPromoCode] = useState('');

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCartMutation.mutate(productId);
    } else {
      updateCartMutation.mutate({ itemId: productId, quantity });
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCartMutation.mutate(productId);
  };

  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      clearCartMutation.mutate();
    }
  };

  const handleApplyPromo = () => {
    console.log('Appliquer le code promo:', promoCode);
    // Ici on pourrait implémenter la logique des codes promo
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-48"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-32 bg-muted rounded"></div>
                ))}
              </div>
              <div className="h-80 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-serif font-bold text-foreground mb-4">
              Votre panier est vide
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Découvrez notre sélection de machines à café d'exception
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" data-testid="button-continue-shopping">
                <Link href="/catalog">
                  Continuer mes Achats
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" data-testid="button-view-premium">
                <Link href="/premium">
                  Voir les Machines Premium
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="sm">
              <Link href="/catalog" data-testid="button-back-to-catalog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuer mes Achats
              </Link>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" data-testid="badge-cart-count">
              {cartItems.length} article{cartItems.length > 1 ? 's' : ''}
            </Badge>
            {cartItems.length > 0 && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClearCart}
                data-testid="button-clear-cart"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Vider le Panier
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Articles dans votre panier</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex items-center gap-4 p-4 border rounded-lg" data-testid={`cart-item-${item.productId}`}>
                    {item.product?.image && (
                      <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground truncate">
                        {item.product?.name || `Produit ${item.productId}`}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.product?.category}
                      </p>
                      <p className="text-lg font-semibold text-primary mt-1">
                        {item.product?.price.toLocaleString('fr-FR', { 
                          style: 'currency', 
                          currency: 'EUR' 
                        }) || '0€'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                        disabled={updateCartMutation.isPending}
                        data-testid={`button-decrease-${item.productId}`}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                        disabled={updateCartMutation.isPending}
                        data-testid={`button-increase-${item.productId}`}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveItem(item.productId)}
                      disabled={removeFromCartMutation.isPending}
                      className="text-destructive hover:text-destructive"
                      data-testid={`button-remove-${item.productId}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="mt-6">
              <CardContent className="pt-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Code promotionnel"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    data-testid="input-promo-code"
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleApplyPromo}
                    data-testid="button-apply-promo"
                  >
                    Appliquer
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl">Récapitulatif</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span data-testid="text-subtotal">
                    {(typeof cartTotal === 'object' ? cartTotal.subtotal : 0).toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span className={(typeof cartTotal === 'object' ? cartTotal.shipping : 0) === 0 ? "text-green-600" : ""} data-testid="text-shipping">
                    {(typeof cartTotal === 'object' ? cartTotal.shipping : 0) === 0 ? "Gratuite" : 
                     (typeof cartTotal === 'object' ? cartTotal.shipping : 0).toLocaleString('fr-FR', { 
                       style: 'currency', 
                       currency: 'EUR' 
                     })}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>TVA</span>
                  <span data-testid="text-tax">
                    {(typeof cartTotal === 'object' ? cartTotal.tax : 0).toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary" data-testid="text-total">
                    {(typeof cartTotal === 'object' ? cartTotal.total : cartTotal).toLocaleString('fr-FR', { 
                      style: 'currency', 
                      currency: 'EUR' 
                    })}
                  </span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button 
                    asChild
                    size="lg" 
                    className="w-full"
                    data-testid="button-proceed-checkout"
                  >
                    <Link href="/checkout">
                      Procéder au Paiement
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild
                    variant="outline" 
                    size="lg" 
                    className="w-full"
                    data-testid="button-continue-shopping-summary"
                  >
                    <Link href="/catalog">
                      Continuer mes Achats
                    </Link>
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground text-center pt-4">
                  Paiement sécurisé • Livraison gratuite dès 1000€
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}