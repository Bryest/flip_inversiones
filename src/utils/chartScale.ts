export function computeDynamicDomain(data: Array<{ y: number }>) {
  if (!data || data.length === 0) return { min: 0, max: 100 };

  let values = data.map((d) => d.y);
  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    max = min + 10; // evita quedarse plano
  }

  const padding = (max - min) * 0.25; // ✅ deja espacio arriba/abajo

  return {
    min: min - padding,
    max: max + padding,
  };
}
