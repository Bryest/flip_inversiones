import { View, Text } from "react-native";
import { useFinanceStore } from "../store/useFinanceStore";
import { fmtMoney } from "../utils/format";

export default function BalanceCard() {
    const balance = useFinanceStore(s => s.balance);
    const currency = useFinanceStore(s => s.currency);
    
    return (
        <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <View className="flex-row items-center justify-between">
                <Text className="text-gray-500">Your Active Balance</Text>
            </View>
            <Text className="text-4xl font-bold mt-2">{fmtMoney(balance, currency)}</Text>
        </View>
    );
}
