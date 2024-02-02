import React, { useCallback, useEffect, useState } from "react";
import getExchangeRate from "../../../api/currencyBeacon/getExchangeRate";
import ComponentsLayout from "../../../screens/layouts/components/ComponentsLayout";
import { DimensionValue, StyleSheet, Text, View } from "react-native";
import LineDiagram from "./LineDiagram";
import ExchangeRateList from "./ExchangeRateList";

const ExchangeRateLinear = () => {
  const { loading, rateUSD, rateEUR } = ExchangeRateList();
  console.log("loading: ", loading);
  const [customLayoutWidth, setCustomLayoutWidth] = useState<number>(0);
  const handleCustomLayout = useCallback((width: any) => {
    setCustomLayoutWidth(width);
  }, []);
  return (
    <ComponentsLayout onLayout={handleCustomLayout} style={{ gap: 10 }}>
      <Text style={styles.titleText}>Exchange Rate Diagram</Text>
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
    </ComponentsLayout>
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Quicksand_400Regular",
  },
});

export default ExchangeRateLinear;
