import { Pressable, Text, PressableProps } from "react-native";

type Props = PressableProps & {
  title: string;
  variant?: "primary" | "ghost";
};

export default function Button({ title, variant = "primary", ...rest }: Props) {
  const base = "w-full py-4 rounded-2xl items-center";
  const styles =
    variant === "primary"
      ? `${base} bg-indigo-600`
      : `${base} border border-gray-300 bg-white`;
  const txt =
    variant === "primary"
      ? "text-white font-semibold"
      : "text-gray-900 font-semibold";

  return (
    <Pressable className={styles} {...rest}>
      <Text className={txt}>{title}</Text>
    </Pressable>
  );
}
