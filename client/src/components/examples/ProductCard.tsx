import ProductCard from '../ProductCard';
import espressoImage from '@assets/generated_images/Premium_espresso_machine_product_4825e079.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 bg-background">
      <ProductCard
        id="1"
        name="Espresso Maestro Pro"
        price={1299.99}
        image={espressoImage}
        category="Espresso"
        features={[
          "Système de pression 15 bars",
          "Moulin intégré en acier",
          "Écran tactile intelligent"
        ]}
        inStock={5}
        featured={true}
      />
    </div>
  );
}