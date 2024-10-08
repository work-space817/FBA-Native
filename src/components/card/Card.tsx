import { View, StyleSheet, Text } from "react-native";
import { memo } from "react";
import CustomCalendarHeader from "../../lib/react-native-calendars/CustomCalendarHeader";
import BalanceView from "../balance/BalanceView";
import CardView from "./CardView";
import ComponentsLayout from "../../core/layouts/components/ComponentsLayout";

const Card = memo(() => {
  return (
    <ComponentsLayout title="Card">
      {/* <Text style={styles.titleText}>Card</Text> */}
      {/* <View style={styles.cardAndBalace}>
     <CustomCalendarHeader /> 
      </View> */}
      <View style={styles.cardAndBalace}>
        <CardView />
        <BalanceView />
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
    // width: "100%",
    marginVertical: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Card;
