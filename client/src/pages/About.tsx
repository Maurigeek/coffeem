import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Coffee, Heart, Shield, Truck } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Coffee,
      title: "Passion du Café",
      description: "Depuis 1985, nous sélectionnons les meilleures machines à café pour vous offrir l'expérience ultime.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Chaque machine est testée et approuvée par nos experts baristas avant d'intégrer notre catalogue.",
    },
    {
      icon: Heart,
      title: "Service Client",
      description: "Notre équipe dédiée vous accompagne avant, pendant et après votre achat pour votre satisfaction.",
    },
    {
      icon: Shield,
      title: "Garantie Premium",
      description: "Toutes nos machines bénéficient d'une garantie étendue et d'un service après-vente de qualité.",
    },
  ];

  const stats = [
    { number: "25+", label: "Années d'Expérience" },
    { number: "50k+", label: "Clients Satisfaits" },
    { number: "200+", label: "Modèles Disponibles" },
    { number: "15", label: "Marques Premium" },
  ];

  const team = [
    {
      name: "Marie Dubois",
      role: "Fondatrice & CEO",
      description: "Passionnée de café depuis toujours, Marie a créé Coffee Premium pour partager son amour des machines d'exception.",
    },
    {
      name: "Pierre Martin",
      role: "Expert Technique",
      description: "20 ans d'expérience dans la maintenance et la réparation des machines à espresso professionnelles.",
    },
    {
      name: "Sophie Laurent",
      role: "Responsable Qualité",
      description: "Ancienne barista championne de France, elle sélectionne personnellement chaque machine de notre catalogue.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4" data-testid="badge-about-us">
              À PROPOS DE NOUS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              L'Art du Café Premium
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Depuis plus de 25 ans, nous sommes les spécialistes français des machines à café 
              d'exception. Notre mission : vous offrir l'excellence dans chaque tasse.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ce qui nous guide dans notre quête de l'excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover-elevate" data-testid={`card-value-${index}`}>
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-4">
                NOTRE HISTOIRE
              </Badge>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Une Passion Transmise de Génération en Génération
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Fondée en 1985 par Marie Dubois, Coffee Premium est née d'une passion 
                  dévorante pour l'art du café. Tout a commencé dans un petit atelier 
                  parisien où Marie réparait et restaurait des machines à espresso vintage.
                </p>
                <p>
                  Au fil des années, cette expertise s'est transformée en une véritable 
                  philosophie : offrir à chaque amateur de café les outils les plus 
                  raffinés pour créer des moments d'exception.
                </p>
                <p>
                  Aujourd'hui, Coffee Premium est devenu la référence française des 
                  machines à café premium, alliant tradition artisanale et innovation 
                  technologique.
                </p>
              </div>
            </div>
            {/* <div className="relative">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    Notre Équipe
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {team.map((member, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-primary mb-1">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div> */}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Un accompagnement complet pour votre satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover-elevate">
              <CardContent className="pt-6">
                <Truck className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Livraison Express</h3>
                <p className="text-muted-foreground text-sm">
                  Livraison gratuite en 24-48h partout en France avec installation 
                  et mise en service incluses.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover-elevate">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Garantie Étendue</h3>
                <p className="text-muted-foreground text-sm">
                  Toutes nos machines bénéficient d'une garantie de 3 ans 
                  avec service après-vente premium.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover-elevate">
              <CardContent className="pt-6">
                <Coffee className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Formation Barista</h3>
                <p className="text-muted-foreground text-sm">
                  Sessions de formation personnalisées pour maîtriser 
                  votre machine et sublimer vos cafés.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}