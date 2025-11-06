// src/components/CurrencySelector.tsx
import { View, Text, Pressable } from "react-native";
import { CURRENCIES, Currency } from "../constants/finance";
import { useFinanceStore } from "../store/useFinanceStore";

export default function CurrencySelector() {
    const currency = useFinanceStore(s => s.currency);
    const setCurrency = useFinanceStore(s => s.setCurrency);

    return (
        <View className="flex-row gap-2">
            {CURRENCIES.map(c => {
                const active = c === currency;
                return (
                    <Pressable
                        key={c}
                        onPress={() => setCurrency(c)}
                        className={`px-3 py-1 rounded-xl border ${active ? "bg-indigo-600 border-indigo-600" : "bg-white border-gray-300"}`}>
                        <Text className={active ? "text-white" : "text-gray-900"}>
                            {c === "USD" ? "US Dollar" : "Soles"}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
