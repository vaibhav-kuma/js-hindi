"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerFast } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function StaggerContainer({
  children,
  className,
  fast = false,
}: {
  children: ReactNode;
  className?: string;
  fast?: boolean;
}) {
  return (
    <motion.div
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      animate="visible"
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}