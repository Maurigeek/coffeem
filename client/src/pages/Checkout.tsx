import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useCart, useCartTotal } from '@/lib/hooks/useCart';
import { dataService } from '@/lib/dataService';
import { luhnCheck, detectBrand } from '@/lib/payment';
import { CheckCircle2, CreditCard, Shield, ArrowLeft, Lock } from 'lucide-react';

declare global { interface Window { paypal?: any } }

// Logos SVG inline (pas d’assets externes nécessaires)
function VisaLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className="h-6"><rect width="48" height="16" rx="3" fill="white"/><text x="8" y="11" fontSize="9" fontWeight="700" fill="#1A1F71">VISA</text></svg>
  );
}
function MastercardLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className="h-6"><rect width="48" height="16" rx="3" fill="white"/><circle cx="21" cy="8" r="5" fill="#EB001B"/><circle cx="27" cy="8" r="5" fill="#F79E1B" opacity="0.9"/></svg>
  );
}
function PaypalLogo({ className = 'h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 16" className="h-6"><rect width="48" height="16" rx="3" fill="white"/><text x="8" y="11" fontSize="9" fontWeight="700" fill="#003087">Pay</text><text x="24" y="11" fontSize="9" fontWeight="700" fill="#009CDE">Pal</text></svg>
  );
}

export default function Checkout() {
  const { data: cartItems = [] } = useCart();
  // Ton hook renvoie un NOMBRE (total TTC)
  const { data: totalFromHook = 0 } = useCartTotal();
  const [, navigate] = useLocation();

  // Récap local fallback
  const subtotal = useMemo(
    () => cartItems.reduce((s: number, it: any) => s + ((it.product?.price || 0) * (it.quantity || 1)), 0),
    [cartItems]
  );
  const shipping = 0;
  const tax = 0;
  const total = (typeof totalFromHook === 'number' && totalFromHook > 0)
    ? totalFromHook
    : (subtotal + shipping + tax);

  // États carte (démo)
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [holder, setHolder] = useState('');
  const [brand, setBrand] = useState<'visa'|'mastercard'|'unknown'>('unknown');
  const [paying, setPaying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string>('');

  // PayPal
  const paypalRef = useRef<HTMLDivElement>(null);
  const paypalMarksRef = useRef<HTMLDivElement>(null);
  const paypalLoaded = useRef(false);

  useEffect(() => {
    if (paypalLoaded.current) return;
    const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test';
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&components=buttons,marks&intent=CAPTURE`;
    script.async = true;
    script.onload = () => {
      if (!window.paypal) return;
      paypalLoaded.current = true;

      // PayPal Marks (logos officiels)
      if (paypalMarksRef.current) {
        try {
          window.paypal.Marks({ fundingSource: window.paypal.FUNDING.PAYPAL }).render(paypalMarksRef.current);
        } catch {}
      }

      // PayPal Buttons
      if (paypalRef.current) {
        window.paypal.Buttons({
          style: { shape: 'pill', layout: 'vertical', color: 'gold', label: 'checkout' },
          createOrder: (_: any, actions: any) => actions.order.create({
            purchase_units: [{
              amount: { value: total.toFixed(2), currency_code: 'EUR' },
              description: 'Commande CoffeeLux',
            }]
          }),
          onApprove: async (_: any, actions: any) => {
            await actions.order.capture();
            await dataService.placeOrder({
              id: '',
              items: cartItems,
              total,
              status: 'paid',
              shippingAddress: 'N/A (PayPal)',
              billingAddress: 'N/A (PayPal)',
              createdAt: new Date().toISOString(),
            } as any);
            setSuccess(true);
            setMessage('Paiement PayPal réussi. Merci !');
            setTimeout(() => navigate('/'), 1500);
          },
          onError: (err: any) => {
            console.error(err);
            setMessage('Échec du paiement PayPal. Réessayez.');
          }
        }).render(paypalRef.current);
      }
    };
    document.body.appendChild(script);
    return () => { if (script.parentNode) script.parentNode.removeChild(script); };
  }, [total, cartItems, navigate]);

  useEffect(() => { setBrand(detectBrand(cardNumber)); }, [cardNumber]);

  async function payWithCard(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const detected = detectBrand(cardNumber);
    if (detected === 'unknown') { setMessage('Carte non reconnue. Utilisez Visa ou Mastercard.'); return; }
    if (!luhnCheck(cardNumber)) { setMessage('Numéro de carte invalide.'); return; }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) { setMessage('Expiration invalide (MM/YY).'); return; }
    if (!/^\d{3,4}$/.test(cvc)) { setMessage('CVC invalide.'); return; }

    setPaying(true);
    await new Promise(r => setTimeout(r, 900)); // simulation

    await dataService.placeOrder({
      id: '',
      items: cartItems,
      total,
      status: 'paid',
      shippingAddress: 'Adresse non fournie (démo)',
      billingAddress: holder || 'Titulaire non fourni',
      createdAt: new Date().toISOString(),
    } as any);

    setSuccess(true);
    setMessage('Paiement carte simulé avec succès. Merci !');
    setTimeout(() => navigate('/'), 1200);
  }

  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="text-center p-8">
            <h1 className="text-2xl font-bold mb-2">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-6">Ajoutez des produits avant de passer au paiement.</p>
            <Button asChild><Link href="/catalog">Voir le catalogue</Link></Button>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="max-w-3xl mx-auto px-4">
          <Card className="text-center p-8">
            <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-2">Paiement confirmé</h1>
            <p className="text-muted-foreground">{message}</p>
            <div className="mt-6">
              <Button asChild><Link href="/">Retour à l’accueil</Link></Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link href="/cart"><ArrowLeft className="w-4 h-4 mr-2" />Retour au panier</Link>
          </Button>
          <h1 className="text-2xl font-serif font-bold">Paiement sécurisé</h1>
        </div>

        {/* 💳 Moyens de paiement + rassurance */}
        <Card className="mb-8">
          <CardContent className="py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <VisaLogo />
                <MastercardLogo />
                <div className="h-6 w-px bg-muted hidden sm:block" />
                <PaypalLogo />
                {/* Marks officiels PayPal (affichage dynamique) */}
                <div ref={paypalMarksRef} className="ml-2" aria-hidden />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Transactions chiffrées • Remboursement garanti 30j
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Carte Visa/Mastercard (démo) */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Carte bancaire
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={payWithCard} className="space-y-4">
                <div>
                  <label className="text-sm">Titulaire</label>
                  <Input value={holder} onChange={e=>setHolder(e.target.value)} placeholder="Nom sur la carte" required />
                </div>

                <div>
                  <label className="text-sm flex items-center justify-between">
                    Numéro de carte
                    <span className="text-xs text-muted-foreground">
                      {brand === 'visa' ? 'Visa' : brand === 'mastercard' ? 'Mastercard' : '—'}
                    </span>
                  </label>
                  <Input
                    value={cardNumber}
                    onChange={e=>setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    inputMode="numeric"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm">Expiration (MM/YY)</label>
                    <Input value={expiry} onChange={e=>setExpiry(e.target.value)} placeholder="12/29" required />
                  </div>
                  <div>
                    <label className="text-sm">CVC</label>
                    <Input value={cvc} onChange={e=>setCvc(e.target.value)} placeholder="123" inputMode="numeric" required />
                  </div>
                </div>

                {message && <div className="text-sm text-red-500">{message}</div>}

                <Button type="submit" className="w-full" disabled={paying}>
                  {paying ? 'Traitement…' : 'Payer'}
                </Button>
                {/* <p className="text-xs text-muted-foreground mt-2 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> Démo 100% front-end — aucun back-end requis
                </p> */}
              </form>
            </CardContent>
          </Card>

          {/* PayPal */}
          {/* <Card>
            <CardHeader><CardTitle>PayPal</CardTitle></CardHeader>
            <CardContent>
              <div ref={paypalRef} />
              <Separator className="my-6" />
              <p className="text-xs text-muted-foreground">
                Configurez <code>VITE_PAYPAL_CLIENT_ID</code> dans <code>.env</code> (sandbox/production).
              </p>
            </CardContent>
          </Card> */}
        </div>

        {/* Récapitulatif */}
        <div className="mt-8 max-w-2xl text-center">
          <Card>
            <CardHeader><CardTitle>Récapitulatif</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {cartItems.map((it: any) => (
                <div key={it.id} className="flex justify-between text-sm">
                  <span className="truncate max-w-[60%]">
                    {it.product?.name || it.productId} × {it.quantity}
                  </span>
                  <span>{((it.product?.price || 0) * (it.quantity || 1)).toFixed(2)} €</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between text-sm"><span>Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
              <div className="flex justify-between text-sm"><span>Livraison</span><span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span></div>
              <div className="flex justify-between text-sm"><span>TVA</span><span>{tax.toFixed(2)} €</span></div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>{total.toFixed(2)} €</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
