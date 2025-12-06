import { useEffect, useState } from "react";

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  isPrimary: boolean;
}

export function FloatingBackground() {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);

  useEffect(() => {
    const newShapes: FloatingShape[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 80,
      delay: Math.random() * 10,
      duration: 20 + Math.random() * 20,
      isPrimary: Math.random() > 0.5,
    }));
    setShapes(newShapes);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, hsl(28 57% 46% / 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, hsl(191 100% 50% / 0.12) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, hsl(28 57% 46% / 0.08) 0%, transparent 50%),
            radial-gradient(circle at 60% 70%, hsl(191 100% 50% / 0.08) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute rounded-full animate-float opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
            background: shape.isPrimary
              ? "linear-gradient(135deg, hsl(28 57% 46%), hsl(191 100% 50%))"
              : "linear-gradient(135deg, hsl(191 100% 50%), hsl(28 57% 46%))",
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.duration}s`,
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
}
