import { Text, View } from "react-native";
import DefaultLayout from "../layouts/default/DefaultLayout";

export default function StatisticScreen({ navigation }: any) {
  return (
    <DefaultLayout navigation={navigation}>
      <View>
        <Text>StatisticScreen</Text>
      </View>
    </DefaultLayout>
  );
}
