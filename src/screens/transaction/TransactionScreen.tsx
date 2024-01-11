import { Text, View } from "react-native";
import DefaultLayout from "../layouts/default/DefaultLayout";

export default function TransactionScreen({ navigation }: any) {
  return (
    <DefaultLayout navigation={navigation}>
      <View>
        <Text>TransactionScreen</Text>
      </View>
    </DefaultLayout>
  );
}
