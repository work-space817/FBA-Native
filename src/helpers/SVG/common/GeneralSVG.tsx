import { memo } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IGeneralSVG extends SvgProps {
  id: string;
}

const GeneralSVG = memo(({ id, width = "24", height = "24" }: IGeneralSVG) => {
  switch (id) {
    case "Search":
      return (
        <Svg width={width} height={height} viewBox="0 0 32 32">
          <Path
            fill="rgba(0,0, 0, 0.75)"
            d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"
          />
        </Svg>
      );
    case "Hash":
      return (
        <Svg width={width} height={height} viewBox="0 0 256 256">
          <Path
            fill="rgba(0,0, 0, 0.75)"
            d="M224,108a12,12,0,0,0,0-24H180.19678l7.60986-41.85352a12.00017,12.00017,0,0,0-23.61328-4.293L155.80322,84H116.19678l7.60986-41.85352a12.00017,12.00017,0,0,0-23.61328-4.293L91.80322,84H43.63672a12,12,0,1,0,0,24H87.43945L80.167,148H32a12,12,0,0,0,0,24H75.80322l-7.60986,41.85352a12.00017,12.00017,0,1,0,23.61328,4.293L100.19678,172h39.60644l-7.60986,41.85352a12.00017,12.00017,0,1,0,23.61328,4.293L164.19678,172h48.1665a12,12,0,1,0,0-24H168.56055l7.27246-40Zm-79.833,40H104.56055l7.27246-40h39.60644Z"
          />
        </Svg>
      );
    default:
      return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
          <Path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-4.5v2H11v-2Zm3-7a3.984,3.984,0,0,1-1.5,3.122A3.862,3.862,0,0,0,13.063,15H11.031a5.813,5.813,0,0,1,2.219-3.936A2,2,0,0,0,13.1,7.832a2.057,2.057,0,0,0-2-.14A1.939,1.939,0,0,0,10,9.5,1,1,0,0,1,8,9.5V9.5a3.909,3.909,0,0,1,2.319-3.647,4.061,4.061,0,0,1,3.889.315A4,4,0,0,1,16,9.5Z" />
        </Svg>
      );
  }
});
export default GeneralSVG;
