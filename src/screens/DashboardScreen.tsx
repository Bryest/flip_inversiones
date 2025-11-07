import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView } from "react-native";
import Header from "../components/Header";
import CurrencySelector from "../components/CurrencySelector";
import PeriodTabs from "../components/PeriodTabs";
import BalanceCard from "../components/BalanceCard";
import IncomeChart from "../components/IncomeChart";

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 32,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* User */}
        <View className="mb-8">
          <Header />
        </View>

        <View className="flex-row justify-between items-center mb-2">
          <Text className="font-notoMedium text-xl">Your Active Balance </Text>
          <CurrencySelector />
        </View>

        <BalanceCard />

        <View className="mt-6 mb-6">
          <PeriodTabs />
        </View>

        <View className="mt-2">
          <IncomeChart />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
