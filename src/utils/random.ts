// src/utils/random.ts
export const randInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const pick = <T,>(arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];
