import { Text, View } from "react-native";
import DefaultLayout from "../layouts/default/DefaultLayout";
export default function HomeScreen({ navigation }: any) {
  return (
    <DefaultLayout navigation={navigation}>
      <View>
        <Text>Homepage</Text>
      </View>
    </DefaultLayout>
  );
}
