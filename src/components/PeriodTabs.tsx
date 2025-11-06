import { View, Text, Pressable } from "react-native";
import { PERIODS, Period } from "../constants/finance";
import { useFinanceStore } from "../store/useFinanceStore";

export default function PeriodTabs() {
    const active = useFinanceStore(s => s.period);
    const setPeriod = useFinanceStore(s => s.setPeriod);
    return (
        <View className="flex-row flex-wrap gap-2">
            {PERIODS.map(p => {
                const isActive = p === active;
                return (
                    <Pressable
                        key={p}
                        onPress={() => setPeriod(p as Period)}
                        className={`px-3 py-1 rounded-xl border ${isActive ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"}`}>
                        <Text className={isActive ? "text-white" : "text-gray-900"}>{p}</Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
