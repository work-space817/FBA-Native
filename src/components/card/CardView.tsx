import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useCardController } from "./useCardController";
import { limitedText } from "../../helpers/functions/limitedText";
import { colors } from "../../core/themes/colors";
import { useTheme } from "../../core/themes/useTheme";

const theme = useTheme();

const CardView = memo(() => {
  const { userData, randomDigit, today } = useCardController();
  const limitedEmail = limitedText(userData.email, 18);

  return (
    <>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitleText}>cloudcash</Text>
          <Text style={styles.cardOptionalText}>PREMIUM ACCOUNT</Text>
        </View>

        <View style={styles.digitLayout}>
          <Text style={styles.digitText}>{randomDigit()}</Text>
        </View>

        <View style={styles.infoLayout}>
          <View style={styles.columnLayout}>
            <Text style={styles.textSmall}>Card holder</Text>
            <Text style={styles.textMedium}>{limitedEmail}</Text>
          </View>
          <View style={styles.columnLayout}>
            <Text style={styles.textSmall}>Current date</Text>
            <Text style={styles.textMedium}>{today}</Text>
          </View>
        </View>
      </View>
    </>
  );
});
const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.purple,
    borderRadius: 18,
    width: "60%",
    marginHorizontal: 6,
    padding: 12,
    justifyContent: "space-between",
  },
  cardTitleText: {
    color: colors.white.default,
    fontSize: 15,
    fontFamily: "Quicksand_700Bold",
  },
  cardOptionalText: {
    color: colors.white.white500,
    fontSize: 10,
    fontFamily: "Quicksand_500Medium",
  },
  digitLayout: {
    alignItems: "center",
  },
  digitText: {
    fontSize: 16,
    color: colors.white.default,
    fontFamily: "Quicksand_500Medium",
  },
  infoLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnLayout: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  textSmall: {
    fontSize: 10,
    color: colors.white.white500,
    fontFamily: "Quicksand_500Medium",
  },
  textMedium: {
    fontSize: 12,
    color: colors.white.default,
    fontFamily: "Quicksand_500Medium",
  },
});
export default CardView;
