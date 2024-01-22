import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";
import HeaderSVG from "../../helpers/SVG/layoutComponents/HeaderSVG";

const CustomLoadingAnimation = () => {
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 150,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateX]);

  const animatedStyles = {
    transform: [
      {
        translateX,
      },
    ],
  };
  return (
    <View style={styles.loading}>
      <Animated.View style={animatedStyles}>
        <HeaderSVG id="Cloud" />
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  loading: {
    width: "50%",
    justifyContent: "flex-start",
  },
});

export default CustomLoadingAnimation;
