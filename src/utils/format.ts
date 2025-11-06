import dayjs from "dayjs";
import numeral from "numeral";
import { Currency } from "../constants/finance";

export const currencySymbol = (c: Currency) =>
  c === "USD" ? "$" : "S/.";

export function fmtMoney(value: number, currency: Currency) {
  return `${currencySymbol(currency)}${numeral(value).format("0,0.00")}`;
}

export function fmtDate(iso: string) {
  return dayjs(iso).format("DD MMM, YYYY");
}
