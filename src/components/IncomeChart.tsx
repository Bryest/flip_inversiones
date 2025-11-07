import { View, Text } from "react-native";
import {
  CartesianChart,
  Line,
  Area,
  useChartPressState,
} from "victory-native";

import {
  LinearGradient,
  DashPathEffect,
  Skia,
  useFont,
  vec,
} from "@shopify/react-native-skia";

import {
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import dayjs from "dayjs";

import { useFinanceStore } from "../store/useFinanceStore";
import { fmtMoney } from "../utils/format";
import { sumSeries } from "../utils/chart";
import { palette } from "../constants/colors";

import notoRegular from "../../assets/NotoSans/NotoSans-Regular.ttf";
import { computeDynamicDomain } from "../utils/chartScale";
import { mapDataForPeriod } from "../utils/periodMapper";
import { ChartDatum } from "../types/chart";
import ChartTooltip from "./ChartToolTip";
import ChartCursor from "./ChartCursor";

let chartBoundsRef: any = null;


export default function IncomeChart() {
  const income = useFinanceStore((s) => s.income);
  const currency = useFinanceStore((s) => s.currency);
  const period = useFinanceStore((s) => s.period);
  const total = sumSeries(income);

  /* Limit data by period */
  const normalizedIncome: ChartDatum[] = income.map((d) => ({
    x: typeof d.x === "string" ? d.x : dayjs(d.x).format("ddd"),
    y: d.y,
  }));

  const baseData = mapDataForPeriod(normalizedIncome, period);

  const first = baseData[0];
  const last = baseData[baseData.length - 1];

  const data = [
    { x: " ", y: first?.y ?? 0 },
    ...baseData,
    { x: "  ", y: last?.y ?? 0 },
  ];

  const skFont = useFont(notoRegular, 12);

  const { state, isActive } = useChartPressState({
    x: "",
    y: { y: 0 },
  });

  const rawX = useDerivedValue(() => state.x.position.value);
  const rawY = useDerivedValue(() => state.y.y.position.value);
  const rawValue = useDerivedValue(() => state.y.y.value.value);

  const dashedPath = useDerivedValue(() => {
    if (!isActive || !chartBoundsRef) return Skia.Path.Make();
    const p = Skia.Path.Make();
    p.moveTo(rawX.value, chartBoundsRef.top + 10);
    p.lineTo(rawX.value, chartBoundsRef.bottom - 10);
    return p;
  });

  const domain = computeDynamicDomain(data);

  return (
    <View className="bg-transparent rounded-2xl mt-4">
      <View className="flex-row items-center justify-between mb-2 px-2">
        <Text className="text-2xl font-notoSemi">
          Income
        </Text>
        <Text className="text-2xl font-notoSemi">
          {fmtMoney(total, currency)}
        </Text>
      </View>

      <View style={{ height: 300 }}>
        <CartesianChart
          data={data}
          xKey="x"
          yKeys={["y"]}
          padding={{ bottom: 40 }}
          domain={{ y: [domain.min, domain.max] }}
          domainPadding={{ top: 20 }}
          xAxis={{
            font: skFont,
            tickCount: data.length,
            labelOffset: 12,
            lineWidth: 0,
            labelColor: "#9CA3AF",
          }}
          yAxis={[
            {
              tickCount: 7,
              labelColor: "#9CA3AF",
              lineColor: "rgba(0,0,0,0.12)",
              lineWidth: 1,
              labelOffset: 6,
              linePathEffect: <DashPathEffect intervals={[4, 6]} />,
            },
          ]}
          chartPressState={state}
        >
          {({ points, chartBounds }) => {
            chartBoundsRef = chartBounds;

            return (
              <>
                <Area
                  points={points.y}
                  y0={chartBounds.bottom}
                  curveType="natural"
                >
                  <LinearGradient
                    start={vec(chartBounds.left, chartBounds.top + 20)}
                    end={vec(chartBounds.left, chartBounds.bottom)}
                    colors={[
                      "rgba(89,103,245,0.18)",
                      "rgba(89,103,245,0)",
                    ]}
                  />
                </Area>

                <Line
                  points={points.y}
                  curveType="natural"
                  strokeWidth={3}
                  color={palette.orange}
                />

                <ChartCursor
                  isActive={isActive}
                  dashedPath={dashedPath}
                  rawX={rawX}
                  rawY={rawY}
                />
              </>
            );
          }}
        </CartesianChart>

        <ChartTooltip
          rawX={rawX}
          rawY={rawY}
          rawValue={rawValue}
          isActive={isActive}
          currency={currency}
        />
      </View>
    </View>
  );
}
