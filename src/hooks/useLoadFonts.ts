import * as Font from "expo-font";
import { useEffect, useState } from "react";

export default function useLoadFonts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await Font.loadAsync({
        Inter: require("../../assets/inter-variable.ttf"),
        NotoSansBlack: require("../../assets/NotoSans/NotoSans-Black.ttf"),
        NotoSansBold: require("../../assets/NotoSans/NotoSans-ExtraBold.ttf"),
        NotoSansMedium: require("../../assets/NotoSans/NotoSans-Medium.ttf"),
        NotoSansRegular: require("../../assets/NotoSans/NotoSans-Regular.ttf"),
        NotoSansSemiBold: require("../../assets/NotoSans/NotoSans-SemiBold.ttf"),
      });
      setLoaded(true);
    })();
  }, []);

  return loaded;
}
