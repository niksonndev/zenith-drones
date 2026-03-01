'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const TOTAL_FRAMES = 60;
const SEQUENCE_BASE = '/images/sequence';

function getFrameSrc(index: number): string {
  const num = String(index + 1).padStart(2, '0');
  return `${SEQUENCE_BASE}/drone-${num}.webp`;
}

function preloadImages(): Promise<HTMLImageElement[]> {
  const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load frame ${i + 1}`));
      img.src = getFrameSrc(i);
    });
  });
  return Promise.all(promises);
}

/** Opacidade do label baseada no frame (fade in/out suave) */
function labelOpacity(frameIndex: number, start: number, end: number): number {
  if (frameIndex < start || frameIndex > end) return 0;
  const fadeFrames = 6;
  if (frameIndex < start + fadeFrames) return (frameIndex - start) / fadeFrames;
  if (frameIndex > end - fadeFrames) return (end - frameIndex) / fadeFrames;
  return 1;
}

export default function HeroExplosion() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [frames, setFrames] = useState<HTMLImageElement[] | null>(null);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ w: 0, h: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const index = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(latest * (TOTAL_FRAMES - 1))
    );
    setFrameIndex(index);
  });

  // Preload da sequência
  useEffect(() => {
    let cancelled = false;
    preloadImages()
      .then((loaded) => {
        if (!cancelled) {
          setFrames(loaded);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Redimensionar canvas (Retina)
  const updateCanvasSize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const rect = container.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    canvas.width = w;
    canvas.height = h;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    setCanvasSize({ w, h });
  }, []);

  useEffect(() => {
    updateCanvasSize();
    const ro = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateCanvasSize]);

  // Desenhar frame no canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const list = frames;
    const idx = frameIndex;
    if (!canvas || !list || list.length === 0) return;

    const img = list[idx];
    if (!img) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.min(w / iw, h / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (w - sw) / 2;
    const sy = (h - sh) / 2;

    ctx.drawImage(img, sx, sy, sw, sh);
  }, [frames, frameIndex, canvasSize]);

  const labelChassi = labelOpacity(frameIndex, 5, 25);
  const labelHelices = labelOpacity(frameIndex, 15, 38);
  const labelCamera = labelOpacity(frameIndex, 40, 60);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F5F5F7]"
      style={{ minHeight: '380vh' }}>
      <div className="sticky top-0 flex min-h-screen flex-col items-center justify-center px-4 py-20 md:px-8 md:py-28">
        <motion.div
          className="mb-8 text-center md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] md:text-4xl lg:text-5xl">
            Zenith Drone
            <span className="text-[#1d1d1f]/70"> | Master Edition</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-[#86868b] md:text-lg">
            Role para explorar os componentes.
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative flex h-[340px] w-full max-w-2xl items-center justify-center md:h-[420px]">
          {/* LCP: primeiro frame estático enquanto a sequência carrega */}
          {(isLoading || !frames?.length) && (
            <img
              src={getFrameSrc(0)}
              alt="Zenith Drone"
              className="absolute inset-0 h-full w-full object-contain"
              fetchPriority="high"
            />
          )}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full object-contain"
            style={{ opacity: frames?.length && !isLoading ? 1 : 0 }}
            aria-hidden
          />

          {/* Labels baseados em frameIndex */}
          <div
            className="absolute left-1/2 top-[28%] z-20 -translate-x-1/2 text-center transition-opacity duration-150"
            style={{ opacity: labelChassi }}>
            <span className="text-xs font-medium tracking-wide text-[#1d1d1f] md:text-sm">
              Chassi em Fibra de Carbono
            </span>
          </div>
          <div
            className="absolute left-1/2 top-[72%] z-20 -translate-x-1/2 text-center transition-opacity duration-150"
            style={{ opacity: labelCamera }}>
            <span className="text-xs font-medium tracking-wide text-[#1d1d1f] md:text-sm">
              Câmera 8K RAW + Gimbal 3 Eixos
            </span>
          </div>
          <div
            className="absolute left-1/2 top-[18%] z-20 -translate-x-1/2 text-center transition-opacity duration-150"
            style={{ opacity: labelHelices }}>
            <span className="text-xs font-medium tracking-wide text-[#1d1d1f] md:text-sm">
              Hélices Aerodinâmicas
            </span>
          </div>
        </div>

        <motion.p
          className="mt-12 text-sm font-medium text-[#86868b]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}>
          Role para explorar
        </motion.p>
      </div>
    </section>
  );
}
