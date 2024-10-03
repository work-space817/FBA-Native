import React from "react";
import Svg, { G, Path, Rect, SvgProps } from "react-native-svg";

interface INavbarSVG extends SvgProps {
  id: "Home" | "Transactions" | "Statistic" | "Goals";
}

const NavbarSVG = ({ id }: INavbarSVG) => {
  switch (id) {
    case "Home":
      return (
        <Svg width="31" height="30" viewBox="0 0 31 30" fill="none">
          <Rect width="30" height="30" transform="translate(0.986343)" />
          <Path
            d="M23.35 8H8.62271C7.71897 8 6.98634 8.7835 6.98634 9.75V20.25C6.98634 21.2165 7.71897 22 8.62271 22H23.35C24.2537 22 24.9863 21.2165 24.9863 20.25V9.75C24.9863 8.7835 24.2537 8 23.35 8Z"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M6.98634 13H24.9863"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "Transactions":
      return (
        <Svg width="31" height="30" viewBox="0 0 31 30" fill="none">
          <Rect width="30" height="30" transform="translate(0.986343)" />
          <Path
            d="M12.1774 9.28638H24.5567"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12.1774 14.9999H24.5567"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M12.1774 20.7134H24.5567"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M7.41637 9.2865H7.42493"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M7.41613 14.9999H7.42469"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M7.41613 20.7134H7.42469"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "Statistic":
      return (
        <Svg width="31" height="30" viewBox="0 0 31 30" fill="none">
          <Path
            d="M7.4445 23.5415L7.4445 6.45776"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M7.4443 23.5413L24.528 23.5413"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <Path
            d="M11.2809 16.6341C13.5086 14.5994 15.1065 13.436 16.9083 11.8206L18.0265 16.2009L22.8993 12.0935"
            stroke="#00000080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      );
    case "Goals":
      return (
        <Svg width="26" height="25" viewBox="0 0 16 16">
          <Path
            fill="#00000080"
            d="M11,1 C11.5523,1 12,1.44772 12,2 L12,3 L13,3 C14.1046,3 15,3.89543 15,5 L15,13 C15,14.1046 14.1046,15 13,15 L3,15 C1.89543,15 1,14.1046 1,13 L1,5 C1,3.89543 1.89543,3 3,3 L4,3 L4,2 C4,1.44772 4.44772,1 5,1 C5.55228,1 6,1.44772 6,2 L6,3 L10,3 L10,2 C10,1.44772 10.4477,1 11,1 Z M4,5 L3,5 L3,13 L13,13 L13,5 L12,5 C12,5.55228 11.5523,6 11,6 C10.4477,6 10,5.55228 10,5 L6,5 C6,5.55228 5.55228,6 5,6 C4.44772,6 4,5.55228 4,5 Z M9.12102,7.29289 C9.51154,6.90237 10.1447,6.90237 10.5352,7.29289 C10.9258,7.68342 10.9258,8.31658 10.5352,8.70711 L7.70711,11.5352 C7.31658,11.9258 6.68342,11.9258 6.29289,11.5352 L5.29289,10.5352 C4.90237,10.1447 4.90237,9.51154 5.29289,9.12102 C5.68342,8.73049 6.31658,8.73049 6.70711,9.12102 L7,9.41391 L9.12102,7.29289 Z"
          />
        </Svg>
      );
    default:
      return null;
  }
};

export default NavbarSVG;
