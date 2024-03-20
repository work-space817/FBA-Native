import { memo } from "react";
import Svg, { Circle, G, Path, SvgProps } from "react-native-svg";

interface ICalendarSVG extends SvgProps {
  id: string;
}

const CalendarSVG = memo(
  ({ id, width = "24", height = "24" }: ICalendarSVG) => {
    switch (id) {
      case "Calendar":
        return (
          <Svg width={width} height={height} viewBox="0 0 35 35">
            <Path d="M29.545,34.75H5.455a5.211,5.211,0,0,1-5.2-5.2V8.56a5.21,5.21,0,0,1,5.205-5.2h24.09a5.21,5.21,0,0,1,5.2,5.205V29.545A5.211,5.211,0,0,1,29.545,34.75ZM5.455,5.855A2.708,2.708,0,0,0,2.75,8.56V29.545a2.709,2.709,0,0,0,2.705,2.7h24.09a2.708,2.708,0,0,0,2.7-2.7V8.56a2.707,2.707,0,0,0-2.7-2.7Z" />
            <Path d="M33.5,17.331H1.541a1.25,1.25,0,0,1,0-2.5H33.5a1.25,1.25,0,0,1,0,2.5Z" />
            <Path d="M9.459,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,9.459,9.155Z" />
            <Path d="M25.542,9.155a1.249,1.249,0,0,1-1.25-1.25V1.5a1.25,1.25,0,0,1,2.5,0V7.905A1.25,1.25,0,0,1,25.542,9.155Z" />
          </Svg>
        );
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
      default:
        return (
          <Svg width={width} height={height} viewBox="0 0 24 24">
            <Path d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.011,9.011,0,0,1,12,21Zm1-4.5v2H11v-2Zm3-7a3.984,3.984,0,0,1-1.5,3.122A3.862,3.862,0,0,0,13.063,15H11.031a5.813,5.813,0,0,1,2.219-3.936A2,2,0,0,0,13.1,7.832a2.057,2.057,0,0,0-2-.14A1.939,1.939,0,0,0,10,9.5,1,1,0,0,1,8,9.5V9.5a3.909,3.909,0,0,1,2.319-3.647,4.061,4.061,0,0,1,3.889.315A4,4,0,0,1,16,9.5Z" />
          </Svg>
        );
    }
  }
);
export default CalendarSVG;
