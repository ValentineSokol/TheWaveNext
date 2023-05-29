export const getAnimationsEnabled = () => !window?.matchMedia('(prefers-reduced-motion: reduce)').matches;
