import { StyleSheet, Text, View } from "react-native";
import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";
import CustomButton from "../../../components/UI/CustomButton";

export default function SettingsScreen() {
  const onRefreshComponents = () => {
    console.log("Refreshing components...");
  };

  return (
    <DefaultScrollableLayout onRefreshComponents={onRefreshComponents}>
      <View>
        <CustomButton onPress={() => {}}>
          <Text>Setting</Text>
        </CustomButton>
      </View>
    </DefaultScrollableLayout>
  );
}
