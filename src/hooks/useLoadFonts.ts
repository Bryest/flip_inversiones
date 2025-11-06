import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useLoadFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Inter: require("../../assets/inter-variable.ttf"), // ✅ Adjust path if needed
        Nunito: require("../../assets/nunitosans-variable.ttf"), // ✅ Adjust path if needed
      });
      setLoaded(true);
    })();
  }, []);

  return loaded;
}
