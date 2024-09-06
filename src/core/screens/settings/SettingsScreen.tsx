import { StyleSheet, Text, View } from "react-native";
import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";

export default function SettingsScreen() {
  const onRefreshComponents = () => {
    console.log("Refreshing components...");
  };
  return (
    <DefaultScrollableLayout onRefreshComponents={onRefreshComponents}>
      <View>
        <Text>Setting</Text>
      </View>
    </DefaultScrollableLayout>
  );
}
