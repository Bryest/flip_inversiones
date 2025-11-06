import { View, Text, Pressable } from "react-native";
import { PERIODS, Period } from "../constants/finance";
import { useFinanceStore } from "../store/useFinanceStore";

export default function PeriodTabs() {
  const period = useFinanceStore(s => s.period);
  const setPeriod = useFinanceStore(s => s.setPeriod);

  return (
    <View className="flex-row justify-between mt-2">
      {PERIODS.map(p => {
        const active = p === period;
        return (
          <Pressable
            key={p}
            onPress={() => setPeriod(p as Period)}
            className={`px-4 py-2 rounded-xl ${
              active ? "bg-[#5967F5]" : "bg-[#E5E7EB]"
            }`}
          >
            <Text
              className={`text-sm font-semibold ${
                active ? "text-white" : "text-[#374151]"
              }`}
            >
              {p}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
