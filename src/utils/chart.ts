// src/utils/chart.ts
import { Period } from "../constants/finance";
import dayjs from "dayjs";

export type Point = { x: Date; y: number };

export const generateSeries = (period: Period): Point[] => {
    const now = dayjs();
    const steps =
        period === "1 Day" ? 24 :
            period === "1 Week" ? 7 :
                period === "1 Month" ? 30 :
                    period === "1 Year" ? 12 : 30;

    const delta =
        period === "1 Day" ? "hour" :
            period === "1 Year" ? "month" : "day";

    const base = Math.random() * 500 + 200;
    return Array.from({ length: steps }, (_, i) => {
        const x = now.subtract(steps - 1 - i, delta as any).toDate();
        // pequeña onda + ruido
        const y = base + Math.sin(i / 2) * 150 + Math.random() * 120;
        return { x, y: Math.max(0, Math.round(y * 100) / 100) };
    });
};

export const sumSeries = (data: Point[]) =>
    Math.round(data.reduce((a, b) => a + b.y, 0) * 100) / 100;
