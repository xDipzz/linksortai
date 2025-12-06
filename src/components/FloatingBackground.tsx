import { useEffect, useState, useMemo } from "react";

interface FloatingOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  type: "primary" | "secondary" | "accent";
  blur: number;
}

interface GridLine {
  id: number;
  orientation: "horizontal" | "vertical";
  position: number;
  opacity: number;
}

export function FloatingBackground() {
  const [orbs, setOrbs] = useState<FloatingOrb[]>([]);

  useEffect(() => {
    const generateOrbs = (): FloatingOrb[] => {
      const types: ("primary" | "secondary" | "accent")[] = ["primary", "secondary", "accent"];
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 60 + Math.random() * 200,
        delay: Math.random() * 8,
        duration: 15 + Math.random() * 20,
        type: types[Math.floor(Math.random() * types.length)],
        blur: 40 + Math.random() * 60,
      }));
    };

    setOrbs(generateOrbs());
  }, []);

  const orbColors = {
    primary: "hsl(28 65% 50%)",
    secondary: "hsl(185 100% 55%)",
    accent: "hsl(280 70% 50%)",
  };

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 80%, hsl(28 65% 50% / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 80% 20%, hsl(185 100% 55% / 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 100% 80% at 50% 50%, hsl(280 70% 50% / 0.03) 0%, transparent 60%)
          `
        }}
      />

      {/* Animated mesh gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            conic-gradient(from 180deg at 50% 50%, 
              hsl(28 65% 50% / 0.05) 0deg, 
              transparent 60deg, 
              hsl(185 100% 55% / 0.05) 120deg, 
              transparent 180deg,
              hsl(280 70% 50% / 0.05) 240deg,
              transparent 300deg,
              hsl(28 65% 50% / 0.05) 360deg
            )
          `,
          animation: 'spin 60s linear infinite'
        }}
      />

      {/* Floating orbs with glow */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full animate-float"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle at 30% 30%, ${orbColors[orb.type]}, transparent 70%)`,
            opacity: 0.15,
            filter: `blur(${orb.blur}px)`,
            animationDelay: `${orb.delay}s`,
            animationDuration: `${orb.duration}s`,
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, hsl(var(--background)) 100%)`
        }}
      />
    </div>
  );
}
