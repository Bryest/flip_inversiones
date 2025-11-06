import { View, Text, Image } from "react-native";
import { useFinanceStore } from "../store/useFinanceStore";
import { Fontisto } from "@expo/vector-icons";

export default function Header() {
    const user = useFinanceStore(s => s.userName) ?? "User";
    return (
        <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-3">
                <Image source={{ uri: "https://i.pravatar.cc/100" }} className="w-10 h-10 rounded-full" />
                <View>
                    <Text className="text-xl font-semibold">Good morning, {user}!</Text>
                </View>
            </View>
            <Fontisto name="bell" size={24} color="black" />
        </View>
    );
}
