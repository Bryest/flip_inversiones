// src/store/useFinanceStore.ts
import { create } from "zustand";
import { Currency, PERIODS, Period, RANDOM_NAMES, BALANCE_MIN, BALANCE_MAX } from "../constants/finance";
import { pick, randInt } from "../utils/random";
import { generateSeries } from "../utils/chart";

type State = {
    userName: string | null;
    currency: Currency;
    balance: number;        // activo principal
    period: Period;
    income: ReturnType<typeof generateSeries>;
};

type Actions = {
    login: () => void;
    setCurrency: (c: Currency) => void;
    setPeriod: (p: Period) => void;
    regenerateIncome: () => void;
    reset: () => void;
};

export const useFinanceStore = create<State & Actions>()((set, get) => ({
    userName: null,
    currency: "USD",
    balance: 0,
    period: "1 Week",
    income: [],

    login: () => {
        const userName = pick(RANDOM_NAMES);
        const balance = randInt(BALANCE_MIN, BALANCE_MAX);
        const period = "1 Week" as Period;
        const income = generateSeries(period);
        set({ userName, balance, period, income });
    },

    setCurrency: (currency) => set({ currency }),
    setPeriod: (period) => { set({ period }); get().regenerateIncome(); },
    regenerateIncome: () => set({ income: generateSeries(get().period) }),
    reset: () => set({ userName: null, balance: 0, period: "1 Week", income: [] }),
}));
