import { View, Text } from "react-native";
import { useFinanceStore } from "../store/useFinanceStore";
import { fmtMoney } from "../utils/format";

export default function BalanceCard() {
  const balance = useFinanceStore(s => s.balance);
  const currency = useFinanceStore(s => s.currency);

  return (
    <View className="bg-transparent w-full px-2 py-2 flex flex-row justify-end">
      <Text
        className="text-[#1E3A8A] text-6xl font-notoMedium tracking-tight
               w-full text-right leading-[64px]"
      >
        {fmtMoney(balance, currency)}
      </Text>
    </View>

  );
}
