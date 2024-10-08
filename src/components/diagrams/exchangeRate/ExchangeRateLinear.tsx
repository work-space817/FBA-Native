import React, { memo, useCallback, useEffect, useState } from "react";
import getExchangeRate from "../../../api/currencyBeacon/getExchangeRate";
import ComponentsLayout from "../../../core/layouts/components/ComponentsLayout";
import {
  DimensionValue,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LineDiagram from "./LineDiagram";
import ExchangeRateList from "./ExchangeRateList";
import { useTheme } from "../../../core/themes/useTheme";

const theme = useTheme();

const ExchangeRateLinear = memo(() => {
  const { loading, rateUSD, rateEUR } = ExchangeRateList();
  const [customLayoutWidth, setCustomLayoutWidth] = useState<number>(0);
  const handleCustomLayout = useCallback((e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setCustomLayoutWidth(width);
  }, []);
  return (
    <ComponentsLayout
      onLayout={handleCustomLayout}
      title="Exchange Rate Diagram"
      // style={{ gap: 10 }}
    >
      <View style={{ gap: 10 }}>
        <Text style={styles.descriptionText}>UAH & USD</Text>
        <LineDiagram
          width={customLayoutWidth}
          data={rateUSD}
          loading={loading}
          currency="USD"
        />
        <Text style={styles.descriptionText}>UAH & EUR</Text>
        <LineDiagram
          width={customLayoutWidth}
          data={rateEUR}
          loading={loading}
          currency="EUR"
        />
      </View>
    </ComponentsLayout>
  );
});
const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 14,
    fontFamily: "Quicksand_400Regular",
    color: theme.subText,
  },
});

export default ExchangeRateLinear;
