import { View, Text } from "react-native";
import { useFinanceStore } from "../store/useFinanceStore";
import { fmtMoney } from "../utils/format";

export default function BalanceCard() {
  const balance = useFinanceStore(s => s.balance);
  const currency = useFinanceStore(s => s.currency);

  return (
    <View className="bg-transparent w-full items-end px-2 py-2">
      <Text
        className="text-[#1E3A8A] text-6xl font-[Nunito-bold] tracking-tight text-right mr-8"
        style={{ lineHeight: 64 }}
      >
        {fmtMoney(balance, currency)}
      </Text>
    </View>
  );
}
