import { useEffect, useRef, useState } from 'react';

interface Props {
  frames: string[]; // ordered images around the product
  className?: string;
}

export default function Product360({ frames, className = '' }: Props){
  const [idx, setIdx] = useState(0);
  const startX = useRef<number | null>(null);
  const len = Array.isArray(frames) ? frames.length : 0;
  const hasFrames = len >= 8;

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>){
    startX.current = e.clientX;
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>){
    if(startX.current == null || !hasFrames) return;
    const dx = e.clientX - startX.current;
    const step = Math.trunc(dx/12);
    if(step !== 0){
      setIdx(prev => (prev + step % len + len) % len);
      startX.current = e.clientX;
    }
  }
  function onPointerUp(){ startX.current = null; }

  if(!hasFrames){
    return <div className={"aspect-[4/3] bg-muted rounded-3xl"} />;
  }

  return (
    <div className={"relative overflow-hidden rounded-3xl " + className}
         onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>
      <img src={frames[idx]} alt={`frame ${idx+1}`} className="w-full h-full object-cover select-none" draggable={false} />
      <div className="absolute right-2 top-2 text-[10px] bg-black/40 text-white px-2 py-1 rounded">Glissez pour pivoter</div>
    </div>
  );
}
