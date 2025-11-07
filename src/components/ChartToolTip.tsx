import { View, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import dayjs from "dayjs";
import { fmtMoney } from "../utils/format";

interface Props {
  rawX: any;
  rawY: any;
  rawValue: any;
  isActive: boolean;
  currency: "USD" | "PEN";
}

export default function ChartTooltip({
  rawX,
  rawY,
  rawValue,
  isActive,
  currency,
}: Props) {
  const tooltipStyle = useAnimatedStyle(() => ({
    opacity: isActive ? 1 : 0,
    position: "absolute",
    left: rawX.value - 55,
    top: rawY.value - 80,
  }));

  return (
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
          <Text className="text-blue-900 text-sm font-notoBlack">
            {fmtMoney(rawValue.value, currency)}
          </Text>

          <Text className="text-gray-500 text-xs font-noto">
            {dayjs().format("DD MMM, YYYY")}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}
