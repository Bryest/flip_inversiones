// src/components/IncomeChart.tsx
import { Text, View } from "react-native";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import inter from "../../assets/inter-variable.ttf";
import { palette } from "../constants/colors";
import { useFinanceStore } from "../store/useFinanceStore";
import { fmtMoney, fmtDate } from "../utils/format";
import { sumSeries } from "../utils/chart";

export default function IncomeChart() {
  const income = useFinanceStore(s => s.income);
  const currency = useFinanceStore(s => s.currency);

  const total = sumSeries(income);

  const data = income.map((d) => ({ x: new Date(d.x).getTime(), y: d.y }));

  const font = useFont(inter, 12);

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { y: 0 },
  });

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mt-4">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-lg font-semibold">Income</Text>
        <Text className="text-gray-500">Total {fmtMoney(total, currency)}</Text>
      </View>

      <View style={{ height: 240 }}>
        <CartesianChart
          data={data}
          xKey="x"
          yKeys={["y"]}
          axisOptions={{ font }}
          chartPressState={state}
        >
          {({ points }) => (
            <>
              <Line points={points.y} color={palette.orange} strokeWidth={3} />
              {isActive && (
                <Circle
                  cx={state.x.position}
                  cy={state.y.y.position}
                  r={6}
                  color={palette.orange}
                />
              )}
            </>
          )}
        </CartesianChart>
      </View>
    </View>
  );
}
