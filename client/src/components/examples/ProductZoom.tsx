import ProductZoom from '../ProductZoom';
import espressoImage from '@assets/generated_images/Premium_espresso_machine_product_4825e079.png';

export default function ProductZoomExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4">Zoom au survol - Passez la souris sur l'image</h3>
        <ProductZoom
          image={espressoImage}
          alt="Machine à café avec zoom"
          className="aspect-square rounded-lg border"
        />
      </div>
    </div>
  );
}