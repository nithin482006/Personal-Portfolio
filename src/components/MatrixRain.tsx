import { useEffect, useRef } from 'react';

const CHARS = '01アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF><{}[]:;/\\|!@#$%^&*';
const FONT_SIZE = 13;
const COLOR_HEAD = '#4ade80';
const COLOR_MID = '#16a34a';
const COLOR_TAIL = '#14532d';
const FADE_ALPHA = 0.05;
const FPS_INTERVAL = 55;

interface Props { opacity?: number }

export default function MatrixRain({ opacity = 0.13 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let drops: number[] = [];

    const reset = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.floor(canvas.width / FONT_SIZE);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -(canvas.height / FONT_SIZE)));
    };

    reset();

    const tick = () => {
      // Fade previous frame
      ctx.fillStyle = `rgba(9,14,29,${FADE_ALPHA})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

      drops.forEach((drop, i) => {
        if (drop < 0) { drops[i]++; return; }
        const x = i * FONT_SIZE;
        const y = drop * FONT_SIZE;

        // Head: bright
        ctx.fillStyle = COLOR_HEAD;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y);

        // Mid (1 char back)
        if (drop > 1) {
          ctx.fillStyle = COLOR_MID;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FONT_SIZE);
        }

        // Tail (2+ chars back — filled by previous frames' fade)
        if (drop > 5 && Math.random() > 0.7) {
          ctx.fillStyle = COLOR_TAIL;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - FONT_SIZE * 2);
        }

        drops[i]++;
        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      });
    };

    let raf: number;
    let last = 0;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < FPS_INTERVAL) return;
      last = t;
      tick();
    };
    raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(reset);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity, mixBlendMode: 'screen' }}
    />
  );
}
