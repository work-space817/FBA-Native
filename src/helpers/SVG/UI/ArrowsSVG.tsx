import { memo } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
interface IArrowsSVG extends SvgProps {
  id: "ArrowLeft" | "ArrowRight" | "ArrowDown";
}

const ArrowsSVG = memo(({ id, width, height }: IArrowsSVG) => {
  switch (id) {
    case "ArrowLeft":
      return (
        <Svg width={width} height={height} viewBox="0 0 13 23" fill="none">
          <Path
            d="M11.5969 1.67163L1.9635 11.3051L11.5969 20.9385"
            stroke="#7e4cd7d9"
            strokeWidth="2.58466"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "ArrowRight":
      return (
        <Svg width={width} height={height} viewBox="0 0 13 23" fill="none">
          <Path
            d="M1.49229 1.67163L11.1257 11.3051L1.49229 20.9385"
            stroke="#7e4cd7d9"
            strokeWidth="2.58466"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "ArrowDown":
      return (
        <Svg
          width={width}
          height={height}
          viewBox="0 0 13 23"
          transform="rotate(-90)"
          fill="none"
        >
          <Path
            d="M11.5969 1.67163L1.9635 11.3051L11.5969 20.9385"
            stroke="#7e4cd7d9"
            strokeWidth="2.58466"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );

    default:
      return <Svg></Svg>;
  }
});
export default ArrowsSVG;
