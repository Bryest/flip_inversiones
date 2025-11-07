import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Button from "../components/Button";
import { useFinanceStore } from "../store/useFinanceStore";
import { IMAGES } from "../constants/images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const login = useFinanceStore(s => s.login);

  const handleGo = () => {
    login();
    navigation.replace("Dashboard");
  };

  return (
    <LinearGradient
      colors={["#E3E3E3", "#101010", "#000000"]} // smooth gradient top → dark bottom
      locations={[0, 0.7, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      className="flex-1"
    >
      {/* Centered logo section */}
      <View className="flex-1 justify-center items-center mt-12">
        <Image
          source={IMAGES.loginMainTransparent}
          resizeMode="contain"
          className="w-[400] h-[400] mb-8"
        />
        <Text className="text-white text-center text-4xl font-bold px-10">
          Optimize Your Money Management Effortlessly
        </Text>
      </View>

      {/* Buttons section */}
      <View className="px-6 pb-12">
        <Button
          title="Continue with Apple"
          variant="outline"
          icon={<Ionicons name="logo-apple" size={18} color="black" />}
          onPress={handleGo}
        />
        <View className="h-3" />
        <Button
          title="Continue with Google"
          variant="filled"
          icon={<FontAwesome name="google" size={16} color="white" />}
          onPress={handleGo}
        />
        <View className="h-3" />
        <Button
          title="Sign up!"
          variant="text"
          onPress={handleGo}
        />
      </View>
    </LinearGradient>
  );
}
