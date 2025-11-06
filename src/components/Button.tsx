import { Pressable, View, Text } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

type Variant = "filled" | "outline" | "text";

type ButtonProps = {
  title: string;
  variant?: Variant;
  icon?: React.ReactNode;
  onPress: () => void;
};

// ✅ Button component compatible with NativeWind
export default function Button({
  title,
  variant = "filled",
  icon,
  onPress,
}: ButtonProps) {
  const base = "w-full py-4 rounded-full items-center justify-center flex-row";

  const variants: Record<
    Variant,
    { container: string; text: string }
  > = {
    filled: {
      container: "bg-[#4F46E5]",
      text: "text-white",
    },
    outline: {
      container: "bg-white",
      text: "text-gray-900",
    },
    text: {
      container: "bg-transparent",
      text: "text-blue-600",
    },
  };

  const current = variants[variant];

  return (
    <Pressable onPress={onPress} className={`${base} ${current.container}`}>
      <Text className={`text-base font-semibold ${current.text}`}>{title}</Text>
      {icon && <View className="ml-2">{icon}</View>}
    </Pressable>
  );
}
