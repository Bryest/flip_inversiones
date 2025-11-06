// src/screens/LoginScreen.tsx
import { ImageBackground, View, Text } from "react-native";
import Button from "../components/Button";
import { useFinanceStore } from "../store/useFinanceStore";
import { IMAGES } from "../constants/images";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any>;

export default function LoginScreen({ navigation }: Props) {
  const login = useFinanceStore(s => s.login);

  const handleGo = () => {
    login();
    navigation.replace("Dashboard");
  };

  return (
    <ImageBackground source={IMAGES.loginMainTransparent} resizeMode="contain" className="flex-1 bg-black">
      <View className="flex-1 justify-end px-5 pb-10">
        <Text className="text-white text-3xl font-bold mb-4">Optimize Your Money Management Effortlessly</Text>
        <Button title="Continue with Apple " onPress={handleGo} />
        <View className="h-3" />
        <Button title="Continue with Google  G" variant="ghost" onPress={handleGo} />
        <View className="h-3" />
        <Button title="Sign up!" variant="ghost" onPress={handleGo} />
      </View>
    </ImageBackground>
  );
}
