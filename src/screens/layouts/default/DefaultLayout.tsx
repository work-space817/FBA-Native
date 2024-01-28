import React, { ReactNode } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import DefaultHeader from "./DefaultHeader";
import DefaultNavbar from "./DefaultNavbar";

interface DefaultLayoutProps {
  children: ReactNode;
  navigation: any;
  onRefreshComponents?: any;
}

const DefaultLayout = ({
  children,
  navigation,
  onRefreshComponents,
}: DefaultLayoutProps) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefreshComponents();
    setRefreshing(false);
  }, [onRefreshComponents]);
  return (
    <View style={styles.outerLayout}>
      <ScrollView
        contentContainerStyle={styles.innerLayout}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DefaultHeader />
        {children}
      </ScrollView>
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
    paddingBottom: 20,
  },
});

export default DefaultLayout;
