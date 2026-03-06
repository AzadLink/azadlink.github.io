"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return count;
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

interface StatItemProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

function StatItem({ value, label, suffix = "+" }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 2500, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center group">
      <div className="font-[Space_Grotesk] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2 tabular-nums">
        {formatNumber(count)}
        <span className="text-brand-400">{suffix}</span>
      </div>
      <div className="text-sm sm:text-base text-neutral-400 font-medium">
        {label}
      </div>
    </div>
  );
}

interface StatsCounterProps {
  stats: {
    value: number;
    label: string;
  }[];
}

export function StatsCounter({ stats }: StatsCounterProps) {
  return (
    <div className={`grid grid-cols-2 gap-8 lg:gap-12 ${stats.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"}`}>
      {stats.map((stat) => (
        <StatItem key={stat.label} value={stat.value} label={stat.label} />
      ))}
    </div>
  );
}
