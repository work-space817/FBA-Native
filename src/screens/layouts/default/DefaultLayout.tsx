import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import DefaultHeader from "./DefaultHeader";
import DefaultNavbar from "./DefaultNavbar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

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
  const { keyboardAwarePosition } = useSelector(
    (store: RootState) => store.scrollViewPosition
  );

  return (
    <View style={[styles.outerLayout, outterStyle]}>
      <KeyboardAwareScrollView
        extraHeight={keyboardAwarePosition}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.innerLayout, innerStyle]}
        onScroll={handleScroll}
        scrollEventThrottle={8}
        bounces={scrollPosition < 200 ? true : false}
        keyboardDismissMode={"on-drag"}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <DefaultHeader />
        {children}
      </KeyboardAwareScrollView>
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
