import { Product } from '@shared/schema';;
import { slugify } from './slugify';
import { cleanSpecs } from './specs';

export type ProductWithSlug = Product & { slug: string };

export const baseProducts: Omit<ProductWithSlug, 'slug'>[] = [
  {
    id: "1",
    name: "Espresso Maestro Pro",
    description: "La machine espresso ultime pour les amateurs de café exigeants. Conçue avec une attention méticuleuse aux détails, elle combine technologie de pointe et design élégant pour offrir une expérience café exceptionnelle.",
    price: 1299.99,
    originalPrice: 1599.99,
    image: '/Premium_espresso_machine_product_4825e079.png',
    images: ['/Premium_espresso_machine_product_4825e079.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/espresso-${i+1}/800/600`),
    category: "Espresso",
    features: [
      "Système de pression 15 bars pour un espresso parfait",
      "Moulin intégré en acier inoxydable avec 12 niveaux de mouture",
      "Écran tactile intelligent avec interface intuitive",
      "Système de vapeur professionnel pour cappuccinos et lattes",
      "Réservoir d'eau amovible de 2.5L",
      "Plateau d'égouttement amovible en acier inoxydable",
      "Préchauffage rapide en moins de 60 secondes",
      "Garantie étendue de 3 ans incluse"
    ],
    inStock: 5,
    featured: true,
    rating: 4.8,
    reviewCount: 142,
    specifications: cleanSpecs({
      'Dimensions': '35 x 40 x 45 cm',
      'Poids': '8.5 kg',
      'Puissance': '1450W',
      'Pression': '15 bars',
      'Capacité réservoir': '2.5L',
      'Matériaux': 'Acier inoxydable et plastique ABS',
      'Couleur': 'Noir mat / Acier inoxydable',
      'Garantie': '3 ans'
    })
  },
  {
    id: "2",
    name: "Bean-to-Cup Elite",
    description: "L'expérience café automatisée par excellence. Cette machine transforme les grains de café en délicieuse boisson d'une simple pression, offrant la fraîcheur et la qualité d'un café professionnel à domicile.",
    price: 2499.99,
    originalPrice: 2899.99,
    image: '/Bean-to-cup_coffee_machine_product_a4000224.png',
    images: ['/Bean-to-cup_coffee_machine_product_a4000224.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/bean-${i+1}/800/600`),
    category: "Automatique",
    features: [
      "Moulin céramique silencieux avec 10 réglages de mouture",
      "12 recettes préprogrammées personnalisables",
      "Réservoir d'eau filtré de 2.5L",
      "Système de nettoyage automatique intégré",
      "Double système de chauffe rapide",
      "Interface utilisateur LCD rétroéclairée",
      "Bac à grains hermétique de 500g",
      "Garantie premium 5 ans"
    ],
    inStock: 8,
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    specifications: cleanSpecs({
      'Dimensions': '42 x 35 x 48 cm',
      'Poids': '12.3 kg',
      'Puissance': '1850W',
      'Pression': '19 bars',
      'Capacité réservoir': '2.5L',
      'Capacité grains': '500g',
      'Matériaux': 'Acier inoxydable brossé',
      'Garantie': '5 ans'
    })
  },
  {
    id: "3",
    name: "French Press Deluxe",
    description: "L'art du café français revisité avec une élégance contemporaine. Cette presse française haut de gamme révèle tous les arômes de votre café avec un design sophistiqué en cuivre et acier.",
    price: 899.99,
    image: '/Luxury_French_press_machine_cce82276.png',
    images: ['/Luxury_French_press_machine_cce82276.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/press-${i+1}/800/600`),
    category: "French Press",
    features: [
      "Finition cuivre premium artisanale",
      "Double paroi isolante pour maintien température",
      "Filtre ultra-fin en acier inoxydable",
      "Capacité généreuse de 1.2L (8-10 tasses)",
      "Poignée ergonomique anti-dérapante",
      "Base antidérapante en silicone",
      "Résistant au lave-vaisselle",
      "Garantie artisanale 2 ans"
    ],
    inStock: 12,
    featured: false,
    rating: 4.6,
    reviewCount: 234,
    specifications: cleanSpecs({
      'Dimensions': '18 x 15 x 28 cm',
      'Poids': '1.8 kg',
      'Capacité': '1.2L',
      'Matériaux': 'Cuivre, acier inoxydable, verre borosilicate',
      'Couleur': 'Cuivre brillant',
      'Entretien': 'Compatible lave-vaisselle',
      'Garantie': '2 ans'
    })
  },
  {
    id: "4",
    name: "Cappuccino Master",
    description: "Le maître du cappuccino pour les connaisseurs. Machine semi-automatique offrant un contrôle total sur chaque étape de préparation, du mouturage à la texture parfaite du lait.",
    price: 1899.99,
    originalPrice: 2199.99,
    image: '/Premium_espresso_machine_product_4825e079.png',
    images: ['/Premium_espresso_machine_product_4825e079.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/espresso-${i+1}/800/600`),
    category: "Cappuccino",
    features: [
      "Buse vapeur rotative à 360° pour mousser le lait",
      "Contrôle de température PID ultra-précis",
      "Réservoir lait intégré réfrigérant",
      "Interface utilisateur tactile 7 pouces",
      "Mémoire 8 profils personnalisés",
      "Système anti-calcaire automatique",
      "Préchauffage intelligent 45 secondes",
      "Support technique dédié inclus"
    ],
    inStock: 3,
    featured: true,
    rating: 4.7,
    reviewCount: 167,
    specifications: cleanSpecs({
      'Dimensions': '38 x 42 x 44 cm',
      'Poids': '11.2 kg',
      'Puissance': '1650W',
      'Pression': '15 bars',
      'Capacité réservoir eau': '2.8L',
      'Capacité réservoir lait': '1.5L',
      'Écran': 'Tactile 7 pouces couleur',
      'Garantie': '4 ans'
    })
  },
  {
    id: "5",
    name: "Barista Station Pro",
    description: "La station café professionnelle pour votre cuisine. Équipée d'une double chaudière et de contrôles pro, elle rivalise avec les machines de café commercial pour les vrais passionnés.",
    price: 3299.99,
    image: '/Bean-to-cup_coffee_machine_product_a4000224.png',
    images: ['/Bean-to-cup_coffee_machine_product_a4000224.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/bean-${i+1}/800/600`),
    category: "Professionnel",
    features: [
      "Double chaudière indépendante cuivre",
      "Contrôle PID de température ±1°C",
      "Manomètre analogique professionnel",
      "Construction entièrement métallique",
      "Groupe E61 thermo-siphon",
      "Réservoir vibrant Ulka 15 bars",
      "Plateau chauffant pour tasses",
      "Formation barista offerte"
    ],
    inStock: 2,
    featured: true,
    rating: 4.9,
    reviewCount: 45,
    specifications: cleanSpecs({
      'Dimensions': '58 x 53 x 45 cm',
      'Poids': '28.5 kg',
      'Puissance': '2400W',
      'Pression': '15 bars',
      'Capacité réservoir': '4.0L',
      'Chaudières': 'Double (1.4L + 2.6L)',
      'Matériaux': 'Acier inoxydable 304',
      'Garantie': '7 ans'
    })
  },
  {
    id: "6",
    name: "Compact Essential",
    description: "L'espresso de qualité dans un format compact. Parfaite pour les petites cuisines sans compromis sur la qualité, elle offre tous les essentiels d'une grande machine espresso.",
    price: 599.99,
    image: '/Luxury_French_press_machine_cce82276.png',
    images: ['/Luxury_French_press_machine_cce82276.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/press-${i+1}/800/600`),
    category: "Compact",
    features: [
      "Design ultra-compact gain de place",
      "Une touche pour espresso parfait",
      "Réservoir amovible 1.2L",
      "Mode économie d'énergie intelligent",
      "Chauffe rapide 30 secondes",
      "Nettoyage simplifié",
      "Garantie fabricant étendue",
      "Compatible capsules et café moulu"
    ],
    inStock: 15,
    featured: false,
    rating: 4.4,
    reviewCount: 312,
    specifications: cleanSpecs({
      'Dimensions': '25 x 32 x 28 cm',
      'Poids': '4.2 kg',
      'Puissance': '1200W',
      'Pression': '15 bars',
      'Capacité réservoir': '1.2L',
      'Matériaux': 'Plastique ABS premium',
      'Couleur': 'Noir mat',
      'Garantie': '2 ans'
    })
  },
  {
    id: "7",
    name: "Mocha Deluxe Pro",
    description: "La machine à café qui transforme votre cuisine en café italien authentique. Spécialisée dans les mochas et chocolats chauds, elle marie parfaitement café et cacao pour des boissons gourmandes.",
    price: 1699.99,
    originalPrice: 1999.99,
    image: '/Premium_espresso_machine_product_4825e079.png',
    images: ['/Premium_espresso_machine_product_4825e079.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/espresso-${i+1}/800/600`),
    category: "Mocha",
    features: [
      "Réservoir chocolat intégré chauffant",
      "10 recettes mocha préprogrammées",
      "Mélangeur automatique chocolat-café",
      "Contrôle intensité cacao",
      "Buse vapeur double circuit",
      "Écran tactile couleur 5 pouces",
      "Nettoyage circuits chocolat automatique",
      "Accessoires barista premium inclus"
    ],
    inStock: 7,
    featured: true,
    rating: 4.5,
    reviewCount: 98,
    specifications: cleanSpecs({
      'Dimensions': '40 x 38 x 42 cm',
      'Poids': '9.8 kg',
      'Puissance': '1750W',
      'Pression': '15 bars',
      'Capacité réservoir eau': '2.2L',
      'Capacité chocolat': '800ml',
      'Écran': '5 pouces tactile',
      'Garantie': '3 ans'
    })
  },
  {
    id: "8",
    name: "Cold Brew Master",
    description: "Révolutionnez votre été avec cette machine dédiée au cold brew et café glacé. Extraction à froid pour révéler des arômes uniques et des cafés rafraîchissants d'exception.",
    price: 1199.99,
    image: '/Bean-to-cup_coffee_machine_product_a4000224.png',
    images: ['/Bean-to-cup_coffee_machine_product_a4000224.png'],
    media360: Array.from({length:12}, (_,i)=>`https://picsum.photos/seed/bean-${i+1}/800/600`),
    category: "Cold Brew",
    features: [
      "Système d'extraction à froid 12-24h",
      "Réservoir isotherme 3L",
      "Filtre permanent ultra-fin",
      "Programmation automatique",
      "Robinet de service professionnel",
      "Moulin intégré réglage cold brew",
      "Carafe service verre 1.5L incluse",
      "Recettes cold brew exclusives"
    ],
    inStock: 9,
    featured: false,
    rating: 4.3,
    reviewCount: 156,
    specifications: cleanSpecs({
      'Dimensions': '35 x 25 x 65 cm',
      'Poids': '6.8 kg',
      'Capacité totale': '3L',
      'Temps extraction': '12-24h',
      'Matériaux': 'Verre, acier inoxydable',
      'Température': 'Ambiante à froid',
      'Garantie': '2 ans'
    })
  }
]

export const mockProducts: ProductWithSlug[] = baseProducts.map(p => ({
  ...p,
  slug: slugify(p.name),
}));

export const categories = [
  'Espresso', 
  'Automatique', 
  'French Press', 
  'Cappuccino', 
  'Professionnel', 
  'Compact', 
  'Mocha', 
  'Cold Brew'
];

export const brands = [
  'Cafetière Premium', 
  'Elite Coffee', 
  'Master Brew', 
  'Professional Series'
];