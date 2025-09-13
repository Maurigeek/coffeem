import { Link } from 'wouter';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inscription newsletter:', email);
    setEmail('');
  };

  const navigation = {
    shop: [
      { name: 'Machines Espresso', href: '/espresso' },
      { name: 'Machines Automatiques', href: '/automatic' },
      { name: 'Accessoires', href: '/accessories' },
      { name: 'Promotions', href: '/promotions' },
    ],
    support: [
      { name: 'Centre d\'aide', href: '/help' },
      { name: 'Contact', href: '/contact' },
      { name: 'Garantie', href: '/warranty' },
      { name: 'Réparations', href: '/repairs' },
    ],
    company: [
      { name: 'À propos', href: '/about' },
      { name: 'Notre histoire', href: '/story' },
      { name: 'Carrières', href: '/careers' },
      { name: 'Presse', href: '/press' },
    ],
    legal: [
      { name: 'Conditions d\'utilisation', href: '/terms' },
      { name: 'Politique de confidentialité', href: '/privacy' },
      { name: 'Mentions légales', href: '/legal' },
      { name: 'Cookies', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-4">
              <div className="mb-6">
                <h3 className="text-2xl font-serif font-bold text-foreground">
                  Cafetière Premium
                </h3>
                <p className="mt-2 text-muted-foreground">
                  L'excellence du café depuis 1985. Découvrez l'art du café avec nos machines premium.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-3" />
                  <span>+33 1 23 45 67 89</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-3" />
                  <span>contact@cafetiere-premium.fr</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3" />
                  <span>123 Rue du Café, 75001 Paris</span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  Restez informé
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Recevez nos dernières nouveautés et offres exclusives
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Votre email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                    data-testid="input-newsletter"
                  />
                  <Button type="submit" data-testid="button-newsletter">
                    S'abonner
                  </Button>
                </form>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground mb-4">Boutique</h4>
              <ul className="space-y-2">
                {navigation.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      data-testid={`footer-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2">
                {navigation.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      data-testid={`footer-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground mb-4">Entreprise</h4>
              <ul className="space-y-2">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      data-testid={`footer-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="font-semibold text-foreground mb-4">Légal</h4>
              <ul className="space-y-2">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      data-testid={`footer-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <span className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Cafetière Premium. Tous droits réservés.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-testid="social-facebook"
                onClick={() => console.log('Facebook ouvert')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-testid="social-instagram"
                onClick={() => console.log('Instagram ouvert')}
              >
                <Instagram className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                data-testid="social-twitter"
                onClick={() => console.log('Twitter ouvert')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}