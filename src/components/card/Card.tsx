import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import { View, StyleSheet, Text } from "react-native";
import CardUI from "./CardUI";
import BalanceUI from "./BalanceUI";
import { memo } from "react";
import CustomCalendarHeader from "../../lib/react-native-calendars/CustomCalendarHeader";

const Card = memo(() => {
  return (
    <ComponentsLayout>
      <View style={styles.cardAndBalace}>
        <Text style={styles.titleText}>Card</Text>
        {/* <CustomCalendarHeader /> */}
      </View>
      <View style={styles.cardAndBalace}>
        <CardUI />
        <BalanceUI />
      </View>
    </ComponentsLayout>
  );
});

const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  cardAndBalace: {
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Card;
