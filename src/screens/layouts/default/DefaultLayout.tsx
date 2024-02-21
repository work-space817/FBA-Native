import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import DefaultHeader from "./DefaultHeader";
import DefaultNavbar from "./DefaultNavbar";

interface DefaultLayoutProps extends ViewProps {
  outterStyle?: ViewStyle;
  innerStyle?: ViewStyle;
  navigation: any;
  onRefreshComponents?: any;
}

const DefaultLayout = ({
  outterStyle,
  innerStyle,
  children,
  navigation,
  onRefreshComponents,
}: DefaultLayoutProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    onRefreshComponents();
    setRefreshing(false);
  }, [onRefreshComponents]);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollPosition(event.nativeEvent.contentOffset.y);
  };

  return (
    <View style={[styles.outerLayout, outterStyle]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.innerLayout, innerStyle]}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={scrollPosition < 200 ? true : false}
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
    backgroundColor: "rgba(140,0,255,.1)",
    flex: 1,
    justifyContent: "space-between",
  },
  innerLayout: {
    paddingTop: 40,
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

export default DefaultLayout;
