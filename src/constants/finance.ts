export const PERIODS = ["1 Day", "1 Week", "1 Month", "1 Year", "All"] as const;
export type Period = typeof PERIODS[number];

export const CURRENCIES = ["USD", "PEN"] as const;
export type Currency = typeof CURRENCIES[number];

export const RANDOM_NAMES = ["Sarah", "Alex", "Taylor"] as const;
