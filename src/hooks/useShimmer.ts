"use client";

import { useState, useEffect } from "react";

export interface UseShimmerOptions {
  duration?: number;
  delay?: number;
}

export function useShimmer(options: UseShimmerOptions = {}) {
  const { duration = 1000, delay = 0 } = options;
  const [showShimmer, setShowShimmer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShimmer(false);
    }, duration + delay);

    return () => clearTimeout(timer);
  }, [duration, delay]);

  return {
    showShimmer,
    setShowShimmer,
  };
}
