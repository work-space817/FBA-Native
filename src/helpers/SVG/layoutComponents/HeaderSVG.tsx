import React from "react";
import { View } from "react-native";
import Svg, { Path, SvgProps } from "react-native-svg";

interface IHeaderSVG extends SvgProps {
  id: string;
}

const HeaderSVG = ({ id, width = "50", height = "50" }: IHeaderSVG) => {
  switch (id) {
    case "Cloud":
      return (
        <View>
          <Svg
            fill="#000000"
            height={height}
            width={width}
            viewBox="0 0 297 297"
          >
            <Path
              d="M297,136.323c0-26.571-19.465-48.683-44.885-52.821c-4.065-17.137-19.496-29.921-37.857-29.921
	c-11.905,0-23.075,5.484-30.393,14.63c-9.301,0.275-17.778,3.846-24.338,9.564c-9.537-6.058-20.836-9.581-32.946-9.581
	c-26.92,0-50.84,17.866-58.805,43.182c-14.73,6.543-25.134,19.856-28.007,35.564C17.169,151.124,0,170.982,0,194.775
	c0,26.823,21.822,48.645,48.645,48.645h142.882c31.535,0,57.598-23.811,61.195-54.395C277.841,184.633,297,162.68,297,136.323z
	 M191.526,224.065H48.645c-16.151,0-29.29-13.139-29.29-29.29s13.139-29.291,29.29-29.291c5.344,0,9.677-4.333,9.677-9.677
	c0-12.834,8.214-24.057,20.441-27.926c3.3-1.045,5.791-3.773,6.532-7.154c4.216-19.224,21.578-33.177,41.286-33.177
	c23.313,0,42.28,18.966,42.28,42.28c0,0.311-0.012,0.619-0.023,0.928l-0.014,0.422c-0.094,3.045,1.25,5.956,3.63,7.857
	c2.38,1.902,5.518,2.574,8.464,1.811c3.444-0.89,7.013-1.341,10.609-1.341c23.314,0,42.28,18.966,42.28,42.279
	C233.806,205.098,214.84,224.065,191.526,224.065z M251.915,169.429c-5.738-28.084-30.635-49.277-60.389-49.277
	c-1.352,0-2.704,0.044-4.05,0.132c-1.728-11.068-6.413-21.17-13.218-29.47c3.09-2.056,6.79-3.264,10.773-3.264
	c0.812,0,1.643,0.056,2.543,0.172c3.907,0.504,7.719-1.41,9.656-4.835c3.471-6.138,9.996-9.951,17.027-9.951
	c10.779,0,19.548,8.769,19.548,19.548c0,5.344,4.333,9.677,9.677,9.677c18.837,0,34.162,15.325,34.162,34.162
	C277.645,152.251,266.687,165.665,251.915,169.429z"
            />
          </Svg>
        </View>
      );
    case "LogOut":
      return (
        <View>
          <Svg width="35" height="35" viewBox="0 0 24 24">
            <Path d="M16,17V14H9V10H16V7L21,12L16,17M14,2A2,2 0 0,1 16,4V6H14V4H5V20H14V18H16V20A2,2 0 0,1 14,22H5A2,2 0 0,1 3,20V4A2,2 0 0,1 5,2H14Z" />
          </Svg>
        </View>
      );
    default:
      return null;
  }
};

export default HeaderSVG;
