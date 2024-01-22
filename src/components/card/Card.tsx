import ComponentsLayout from "../../screens/layouts/components/ComponentsLayout";
import { View, StyleSheet, Text } from "react-native";
import CardUI from "./CardUI";
import BalanceUI from "./BalanceUI";

const Card = () => {
  return (
    <ComponentsLayout>
      <Text style={styles.titleText}>Card</Text>
      <View style={styles.cardAndBalace}>
        <CardUI />
        <BalanceUI />
      </View>
    </ComponentsLayout>
  );
};
const styles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
  },
  cardAndBalace: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Card;
