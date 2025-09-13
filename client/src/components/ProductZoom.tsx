import { useState, useRef, useEffect } from 'react';

interface ProductZoomProps {
  image: string;
  alt: string;
  className?: string;
}

export default function ProductZoom({ image, alt, className = '' }: ProductZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !zoomRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Main Image */}
      <div
        ref={imageRef}
        className="relative cursor-zoom-in select-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        data-testid="product-zoom-container"
      >
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-200"
          draggable={false}
        />
        
        {/* Zoom Indicator */}
        {isZoomed && (
          <div
            className="absolute pointer-events-none border-2 border-primary bg-primary/10 rounded-full"
            style={{
              width: '100px',
              height: '100px',
              left: `${zoomPosition.x}%`,
              top: `${zoomPosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>

      {/* Zoomed Image Overlay */}
      {isZoomed && (
        <div
          ref={zoomRef}
          className="absolute inset-0 pointer-events-none z-10 bg-background border-2 border-primary rounded-lg overflow-hidden"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: '200%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          data-testid="product-zoom-overlay"
        >
          {/* Zoom Instructions */}
          <div className="absolute top-4 left-4 bg-black/75 text-white px-3 py-1 rounded-md text-sm">
            Zoom activé - Déplacez la souris
          </div>
        </div>
      )}
    </div>
  );
}