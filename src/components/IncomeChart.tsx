// ✅ IncomeChart — Victory Native XL + Skia + NativeWind — Final Version

import { View, Text } from "react-native";
import {
  CartesianChart,
  Line,
  Area,
  useChartPressState,
} from "victory-native";

import {
  Circle,
  LinearGradient,
  RoundedRect,
  Text as SkiaText,
  Path,
  DashPathEffect,
  Skia,
  useFont,
  vec,
} from "@shopify/react-native-skia";

import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import dayjs from "dayjs";
import inter from "../../assets/inter-variable.ttf";

import { useFinanceStore } from "../store/useFinanceStore";
import { fmtMoney } from "../utils/format";
import { sumSeries } from "../utils/chart";
import { palette } from "../constants/colors";

// ✅ chart bounds from render — stored safely
let chartBoundsRef: any = null;

export default function IncomeChart() {
  const income = useFinanceStore((s) => s.income);
  const currency = useFinanceStore((s) => s.currency);
  const total = sumSeries(income);

  // ✅ Always enforce Sun → Sat order
  const weekOrder = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // ✅ Sort properly
  const baseData = income
    .map((d) => {
      const label = dayjs(d.x).format("ddd");
      return {
        x: label,
        y: d.y,
        _order: weekOrder.indexOf(label),
      };
    })
    .sort((a, b) => a._order! - b._order!)
    .map(({ _order, ...rest }) => rest);

  // ✅ Add ghost points at beginning/end (smooth edges + correct X axis)
  const first = baseData[0];
  const last = baseData[baseData.length - 1];

  const data = [
    { x: " ", y: first?.y ?? 0 }, // ghost left
    ...baseData,
    { x: "  ", y: last?.y ?? 0 }, // ghost right
  ];

  // ✅ Font
  const font = useFont(inter, 12);

  // ✅ Chart gesture state
  const { state, isActive } = useChartPressState<{
    x: string;
    y: Record<"y", number>;
  }>({
    x: "",
    y: { y: 0 },
  });

  // ✅ Raw animated values (never put JS inside)
  const rawX = useDerivedValue(() => state.x.position.value);
  const rawY = useDerivedValue(() => state.y.y.position.value);
  const rawValue = useDerivedValue(() => state.y.y.value.value);

  // ✅ Smooth Skia dashed cursor line
  const dashedPath = useDerivedValue(() => {
    if (!isActive || !chartBoundsRef) return Skia.Path.Make();
    const p = Skia.Path.Make();
    p.moveTo(rawX.value, chartBoundsRef.top + 10);
    p.lineTo(rawX.value, chartBoundsRef.bottom - 10);
    return p;
  });

  // ✅ Tooltip style (React Native layer, outside Skia)
  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: isActive ? 1 : 0,
    position: "absolute",
    left: rawX.value - 55,
    top: rawY.value - 80,
  }));

  return (
    <View className="bg-transparent rounded-2xl mt-4">
      {/* ✅ Header */}
      <View className="flex-row items-center justify-between mb-2 px-2">
        <Text className="text-lg font-semibold">Income</Text>
        <Text className="text-gray-500 font-semibold">
          Total {fmtMoney(total, currency)}
        </Text>
      </View>

      {/* ✅ CHART CONTAINER */}
      <View style={{ height: 300 }}>
        <CartesianChart
          data={data}
          xKey="x"
          yKeys={["y"]}
          padding={{ bottom: 40 }}
          domainPadding={{ top: 20 }}
          xAxis={{
            font,
            labelColor: "#9CA3AF",
            lineColor: "#E5E7EB",
            tickCount: data.length,
            labelOffset: 12,
          }}
          chartPressState={state}
        >
          {({ points, chartBounds }) => {
            chartBoundsRef = chartBounds;

            return (
              <>
                {/* ✅ Area UNDER the line */}
                <Area points={points.y} y0={chartBounds.bottom} curveType="natural">
                  <LinearGradient
                    start={vec(chartBounds.left, chartBounds.top + 20)}
                    end={vec(chartBounds.left, chartBounds.bottom)}
                    colors={[
                      "rgba(89,103,245,0.18)",
                      "rgba(89,103,245,0)",
                    ]}
                  />
                </Area>

                {/* ✅ Main Line */}
                <Line
                  points={points.y}
                  curveType="natural"
                  strokeWidth={3}
                  color={palette.orange}
                />

                {/* ✅ Skia elements INSIDE chart */}
                {isActive && (
                  <>
                    {/* dashed line */}
                    <Path
                      path={dashedPath}
                      color="rgba(89,103,245,0.6)"
                      strokeWidth={2}
                      style="stroke"
                    >
                      <DashPathEffect intervals={[6, 6]} />
                    </Path>

                    {/* point */}
                    <Circle cx={rawX} cy={rawY} r={7} color="white" />
                    <Circle cx={rawX} cy={rawY} r={4} color="#5967F5" />
                  </>
                )}
              </>
            );
          }}
        </CartesianChart>

        {/* ✅ Tooltip ABOVE CHART (React Native layer — not clipped) */}
        <Animated.View style={[tooltipStyle, { position: "absolute" }]}>
          {isActive && (
            <View
              style={{
                width: 110,
                height: 55,
                borderRadius: 12,
                backgroundColor: "#DCE4FF",
                padding: 6,
                justifyContent: "center",
              }}
            >
              <Text className="text-sm font-semibold text-blue-900">
                {fmtMoney(rawValue.value, currency)}
              </Text>

              <Text className="text-xs text-gray-500">
                {dayjs().format("DD MMM, YYYY")}
              </Text>
            </View>
          )}
        </Animated.View>
      </View>
    </View>
  );
}
