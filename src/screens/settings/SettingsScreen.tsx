import { StyleSheet, Text, View } from "react-native";
import DefaultLayout from "../layouts/default/DefaultLayout";

export default function SettingsScreen({ navigation }: any) {
  return (
    <DefaultLayout navigation={navigation}>
      <View>
        <Text>Setting</Text>
      </View>
    </DefaultLayout>
  );
}
