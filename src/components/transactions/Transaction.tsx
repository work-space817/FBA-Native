import { Animated, PanResponder, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ITransaction } from "./types";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import TransactionSVG from "../../helpers/SVG/UI/TransactionSVG";

const Transaction: FC<ITransaction> = ({
  transactionTitle,
  transactionValue,
  transactionTime,
  transactionDate,
  selectedCategories,
  transactionType,
  id,
  style,
}) => {
  const transformTitle = () => {
    if (transactionTitle.length > 20) {
      return transactionTitle.substring(0, 10) + "...";
    }
    return transactionTitle;
  };
  const transactionValueType =
    transactionType === "Income transaction" ? "+" : "-";

  const [startPosition, setStartPosition] = useState({ x: 0 });
  const [tapPosition, setTapPosition] = useState({ x: 0 });

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        setStartPosition({ x: gestureState.x0 });
      },
      onPanResponderMove: (event, gestureState) => {
        setTapPosition({ x: gestureState.moveX });
      },
    })
  ).current;

  useEffect(() => {
    if (tapPosition.x > 0 && startPosition.x - tapPosition.x > 75) {
      Animated.timing(pan, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (tapPosition.x > 0 && tapPosition.x - startPosition.x > 75) {
      Animated.timing(pan, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(pan, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [tapPosition]);

  return (
    <View>
      <Animated.View
        style={[
          styles.animatedLayout,
          {
            transform: [{ translateX: pan.x }, { translateY: 0 }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.layout, style]}>
          <View style={styles.titleLayout}>
            <TransactionSVG id={transactionType} width={18} height={18} />
            <Text>{transactionTime}</Text>
            <SelectCategoriesSVG id={selectedCategories as string} />
            <Text>{transformTitle()}</Text>
          </View>
          <View style={styles.valueLayout}>
            <Text style={styles.transactionValueStyle}>
              {transactionValueType} {transactionValue} &#8372;
            </Text>
          </View>
        </View>
      </Animated.View>
      <View style={[styles.optionalView, styles.leftViewStyle]}>
        <TransactionSVG id={"Delete"} />
      </View>
      <View style={[styles.optionalView, styles.rightViewStyle]}>
        <TransactionSVG id={"Delete"} />
      </View>
    </View>
  );
};
export default Transaction;

const styles = StyleSheet.create({
  optionalView: {
    position: "absolute",
    width: 50,
    height: 40,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  leftViewStyle: {
    left: 0,
  },
  rightViewStyle: {
    right: 0,
  },
  animatedLayout: {
    zIndex: 10,
    position: "relative",
  },
  layout: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 0,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,245,250,1)",
  },
  titleLayout: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
    alignItems: "center",
  },
  valueLayout: {
    width: "20%",
    alignItems: "flex-end",
  },
  bordering: {
    borderColor: "red",
    borderWidth: 1,
    borderStyle: "solid",
  },
  transactionValueStyle: {
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
  },
});
