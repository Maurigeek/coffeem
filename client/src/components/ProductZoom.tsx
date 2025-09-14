// client/src/components/ProductZoom.tsx
import { useState, useRef } from 'react';
import clsx from 'clsx';

export interface ProductZoomProps {
  /** image principale - supporte src OU image */
  src?: string;
  image?: string;
  alt?: string;
  className?: string;
  zoom?: number;       // facteur de zoom (ex: 2 = 200%)
  showLens?: boolean;  // petit cercle loupe
  lensSize?: number;   // diamètre loupe
}

export default function ProductZoom({
  src,
  image,
  alt = '',
  className = '',
  zoom = 2,
  showLens = false,
  lensSize = 120,
}: ProductZoomProps) {
  const url = src || image || '';
  const [zoomOn, setZoomOn] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const wrapRef = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
    setPos({ x, y });
  }

  if (!url) {
    return (
      <div className={clsx('aspect-[4/3] rounded-xl border flex items-center justify-center text-sm text-muted-foreground', className)}>
        Image indisponible
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      onMouseEnter={() => setZoomOn(true)}
      onMouseLeave={() => setZoomOn(false)}
      onMouseMove={onMove}
      className={clsx('relative overflow-hidden rounded-xl border bg-muted/10 aspect-[4/3]', className)}
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: zoomOn ? `${zoom * 100}%` : 'cover',
        backgroundPosition: zoomOn ? `${pos.x}% ${pos.y}%` : 'center',
        backgroundRepeat: 'no-repeat',
        cursor: zoomOn ? 'zoom-in' : 'default',
      }}
      role="img"
      aria-label={alt}
    >
      {/* img pour SEO/alt/layout (masquée visuellement) */}
      <img src={url} alt={alt} className="h-full w-full object-cover opacity-0 pointer-events-none" />
      {showLens && zoomOn && (
        <div
          className="absolute pointer-events-none rounded-full ring-2 ring-white/70 shadow"
          style={{
            width: lensSize,
            height: lensSize,
            left: `calc(${pos.x}% - ${lensSize/2}px)`,
            top: `calc(${pos.y}% - ${lensSize/2}px)`,
            backgroundImage: `url(${url})`,
            backgroundSize: `${zoom * 100}%`,
            backgroundPosition: `${pos.x}% ${pos.y}%`,
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
}
