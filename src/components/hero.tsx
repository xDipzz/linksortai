"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Hero(props: {
  capsuleText: string;
  capsuleLink: string;
  title: React.ReactNode; 
  subtitle: string;
  credits?: React.ReactNode;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div 
        className="container flex max-w-4xl flex-col items-center gap-6 text-center parallax-container"
        style={{ "--parallax-offset": `${scrollY * 0.1}px` } as React.CSSProperties}
      >
        <Link
          href={props.capsuleLink}
          className="glass-card px-4 py-2 text-sm font-medium hover:bg-white/20 transition-all duration-300 fade-in-up"
        >
          {props.capsuleText}
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight fade-in-up max-w-4xl">
          {props.title}
        </h1>
        
        <p className="max-w-2xl text-base sm:text-lg text-gray-200 leading-relaxed fade-in-up">
          {props.subtitle}
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center mt-6 fade-in-up">
          <Link
            href={props.primaryCtaLink}
            className="btn-primary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-lg border-0"
          >
            {props.primaryCtaText}
          </Link>

          <Link
            href={props.secondaryCtaLink}
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center justify-center rounded-xl px-6 py-3 text-base font-semibold text-white shadow-lg"
          >
            {props.secondaryCtaText}
          </Link>
        </div>

        {props.credits && (
          <p className="text-xs text-gray-400 mt-6 fade-in-up">{props.credits}</p>
        )}
      </div>
    </section>
  );
}