import { ChartDatum } from "../types/chart";

export type PeriodType =
    | "1 Day"
    | "1 Week"
    | "1 Month"
    | "1 Year"
    | "All";

export function mapDataForPeriod(
    income: ChartDatum[],
    period: PeriodType
): ChartDatum[] {
    switch (period) {
        case "1 Day": {
            const labels = ["9AM", "12PM", "3PM", "6PM"];
            return labels.map((label, i) => ({
                x: label,
                y: income[i]?.y ?? income[0]?.y ?? 0,
            }));
        }

        case "1 Week": {
            const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            return labels.map((label, i) => ({
                x: label,
                y: income[i]?.y ?? income[0]?.y ?? 0,
            }));
        }

        case "1 Month": {
            const labels = ["1", "5", "10", "15", "20", "25"];
            return labels.map((label, i) => ({
                x: label,
                y: income[i]?.y ?? income[0]?.y ?? 0,
            }));
        }

        case "1 Year": {
            const labels = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            return labels.map((label, i) => ({
                x: label,
                y: income[i]?.y ?? income[0]?.y ?? 0,
            }));
        }

        case "All": {
            const labels = ["2020", "2021", "2022", "2023", "2024"];
            return labels.map((label, i) => ({
                x: label,
                y: income[i]?.y ?? income[0]?.y ?? 0,
            }));
        }

        default:
            return income;
    }
}
