import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import heroImage from '@assets/generated_images/Coffee_machine_lifestyle_hero_c016d78a.png';

export default function HeroSection() {
  const handleShopNow = () => {
    console.log('Boutique ouverte');
  };

  const handleWatchDemo = () => {
    console.log('Démo vidéo lancée');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Machine à café premium dans cuisine moderne"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center min-h-[80vh] py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              L'Excellence du Café
              <span className="block text-primary">Redéfinie</span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-200 leading-relaxed">
              Découvrez notre collection exclusive de machines à café premium. 
              Chaque tasse est une expérience, chaque moment devient exceptionnel.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                onClick={handleShopNow}
                data-testid="button-shop-now"
              >
                Découvrir la Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm px-8 py-3"
                onClick={handleWatchDemo}
                data-testid="button-watch-demo"
              >
                <Play className="mr-2 h-5 w-5" />
                Voir la Démo
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-300">Modèles Premium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-300">Support Expert</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5★</div>
                <div className="text-sm text-gray-300">Satisfaction Client</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}