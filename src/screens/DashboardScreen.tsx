import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import CurrencySelector from "../components/CurrencySelector";
import PeriodTabs from "../components/PeriodTabs";
import BalanceCard from "../components/BalanceCard";
import IncomeChart from "../components/IncomeChart";

export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-[#F3F4F6]" contentContainerStyle={{ padding: 16 }}>
      <Header />
      <View className="mt-4 flex-row justify-between items-center">
        <Text className="text-gray-500">Your Active Balance</Text>
        <CurrencySelector />
      </View>
      <BalanceCard />
      <View className="mt-4">
        <PeriodTabs />
      </View>
      <IncomeChart />
    </ScrollView>
  );
}
