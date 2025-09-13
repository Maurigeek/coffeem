import { Shield, Truck, HeadphonesIcon, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Shield,
      title: 'Garantie Premium',
      description: 'Garantie étendue de 3 ans sur toutes nos machines avec service de réparation prioritaire.',
      color: 'text-blue-600',
    },
    {
      icon: Truck,
      title: 'Livraison Gratuite',
      description: 'Livraison gratuite et installation à domicile pour toutes commandes supérieures à 500€.',
      color: 'text-green-600',
    },
    {
      icon: HeadphonesIcon,
      title: 'Support Expert 24/7',
      description: 'Notre équipe d\'experts est disponible 24h/24 pour vous accompagner et vous conseiller.',
      color: 'text-purple-600',
    },
    {
      icon: Award,
      title: 'Qualité Certifiée',
      description: 'Tous nos produits sont certifiés ISO et testés rigoureusement avant expédition.',
      color: 'text-orange-600',
    },
  ];

  return (
    <section className="py-16 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Pourquoi Nous Choisir ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Plus qu'un simple achat, c'est l'assurance d'une expérience café exceptionnelle 
            avec un service client incomparable.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="text-center hover-elevate transition-all duration-300"
                data-testid={`benefit-${index}`}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border-2 mb-4 ${benefit.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">25+</div>
            <div className="text-sm text-muted-foreground">Années d'Expérience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">99%</div>
            <div className="text-sm text-muted-foreground">Taux de Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support Client</div>
          </div>
        </div>
      </div>
    </section>
  );
}