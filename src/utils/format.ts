import dayjs from "dayjs";
import numeral from "numeral";
import { Currency } from "../constants/finance";

export const currencySymbol = (c: Currency) => (c === "USD" ? "$" : "S/.");

export const fmtMoney = (value: number, currency: Currency) =>
  `${currencySymbol(currency)}${numeral(value).format("0,0.00")}`;

export const fmtDate = (iso: string) => dayjs(iso).format("DD MMM, YYYY");
