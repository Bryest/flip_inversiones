import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import CurrencySelector from "../components/CurrencySelector";
import PeriodTabs from "../components/PeriodTabs";
import BalanceCard from "../components/BalanceCard";
import IncomeChart from "../components/IncomeChart";

export default function DashboardScreen() {
  return (
    <ScrollView
      className="flex-1 bg-[#F3F4F6]"
      contentContainerStyle={{
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 32,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* 🧠 Header Section */}
      <View className="mb-6">
        <Header />
      </View>

      {/* 💰 Balance Section */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-gray-500 text-base">Your Active Balance</Text>
        <CurrencySelector />
      </View>

      <BalanceCard />

      {/* 📆 Period Tabs */}
      <View className="mt-6 mb-4">
        <PeriodTabs />
      </View>

      {/* 📈 Income Chart */}
      <View className="mt-4">
        <IncomeChart />
      </View>
    </ScrollView>
  );
}
