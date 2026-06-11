"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardHeaderProps {
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  iconVariant?: "gold" | "purple" | "blue" | "emerald";
  className?: string;
}

const iconVariants = {
  gold: "icon-badge-gold text-gold",
  purple: "icon-badge-purple text-neon-purple",
  blue: "icon-badge-blue text-neon-blue",
  emerald: "icon-badge border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
};

export function CardHeader({
  eyebrow,
  title,
  icon: Icon,
  iconVariant = "purple",
  className,
}: CardHeaderProps) {
  return (
    <div className={cn("mb-8 flex items-start justify-between gap-4", className)}>
      <div>
        <motion.p
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card-title mb-2"
        >
          {eyebrow}
        </motion.p>
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="card-headline"
        >
          {title}
        </motion.h3>
      </div>
      <motion.div
        whileHover={{ scale: 1.08, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400 }}
        className={cn("shrink-0", iconVariants[iconVariant])}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </motion.div>
    </div>
  );
}
