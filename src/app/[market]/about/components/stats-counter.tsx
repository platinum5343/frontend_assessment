"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValue,
  useTransform,
  useInView,
  motion,
} from "framer-motion";

interface StatsItem {
  value: number;
  suffix?: string;
  label: string;
  description: string;
}

interface StatsCounterProps {
  items: StatsItem[];
  stagger?: number;
}

function CountUp({
  to,
  suffix = "",
  delay = 0,
}: {
  to: number;
  suffix?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const display = useTransform(count, (val) => {
    const n = Math.floor(val);
    return suffix ? `${n}${suffix}` : n.toString();
  });

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [isInView, count, to]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.2, delay: delay + 0.3 }}
    >
      {display}
    </motion.span>
  );
}

function StatCard({
  item,
  index,
  stagger,
}: {
  item: StatsItem;
  index: number;
  stagger: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.4, delay: index * stagger }}
    >
      <motion.div
        className="text-5xl font-bold text-emerald-600 mb-2"
        initial={{ scale: 0.8, rotate: -5 }}
        animate={isInView ? { scale: 1, rotate: 0 } : undefined}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: index * stagger,
        }}
      >
        <CountUp
          to={item.value}
          suffix={item.suffix}
          delay={index * stagger}
        />
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.label}</h3>
      <p className="text-sm text-slate-600">{item.description}</p>
    </motion.div>
  );
}

export default function StatsCounter({
  items,
  stagger = 0.15,
}: StatsCounterProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {items.map((item, i) => (
        <StatCard key={i} item={item} index={i} stagger={stagger} />
      ))}
    </div>
  );
}
