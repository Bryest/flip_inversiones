import { Circle, Path, DashPathEffect } from "@shopify/react-native-skia";

interface Props {
  isActive: boolean;
  dashedPath: any;
  rawX: any;
  rawY: any;
}

export default function ChartCursor({ isActive, dashedPath, rawX, rawY }: Props) {
  if (!isActive) return null;

  return (
    <>
      {/* Vertical dashed line */}
      <Path
        path={dashedPath}
        color="rgba(89,103,245,0.6)"
        strokeWidth={2}
        style="stroke"
      >
        <DashPathEffect intervals={[6, 6]} />
      </Path>

      {/* Outer circle */}
      <Circle cx={rawX} cy={rawY} r={7} color="white" />

      {/* Inner circle */}
      <Circle cx={rawX} cy={rawY} r={4} color="#5967F5" />
    </>
  );
}
