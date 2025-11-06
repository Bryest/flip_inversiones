import { View, Text, Image } from "react-native";
import { useFinanceStore } from "../store/useFinanceStore";

export default function Header() {
    const user = useFinanceStore(s => s.userName) ?? "User";
    return (
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
                <Image source={{ uri: "https://i.pravatar.cc/100" }} className="w-10 h-10 rounded-full" />
                <View>
                    <Text className="text-gray-600">Good morning,</Text>
                    <Text className="text-xl font-semibold">{user}!</Text>
                </View>
            </View>
            <Text className="text-2xl">🔔</Text>
        </View>
    );
}
