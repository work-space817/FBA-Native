import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import DefaultHeader from "./DefaultHeader";
import DefaultNavbar from "./DefaultNavbar";

interface DefaultLayoutProps {
  children: ReactNode;
  navigation: any;
}

const DefaultLayout = ({ children, navigation }: DefaultLayoutProps) => {
  return (
    <View style={styles.outerLayout}>
      <View style={styles.innerLayout}>
        <DefaultHeader navigation={navigation} />
        {children}
      </View>
      <DefaultNavbar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerLayout: {
    flex: 1,
    justifyContent: "space-between",
  },
  innerLayout: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default DefaultLayout;
