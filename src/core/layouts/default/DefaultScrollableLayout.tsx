import React, { useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface IDefaultScrollableLayout extends ScrollViewProps {
  outterStyle?: ViewStyle;
  onRefreshComponents: () => void;
}

const DefaultScrollableLayout = ({
  outterStyle,
  onRefreshComponents,
  ...props
}: IDefaultScrollableLayout) => {
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
        {...props}
        extraHeight={keyboardAwarePosition}
        enableResetScrollToCoords={false}
        enableOnAndroid={true}
        keyboardOpeningTime={0}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.innerLayout, props.style]}
        onScroll={handleScroll}
        scrollEventThrottle={8}
        bounces={scrollPosition < 200 ? true : false}
        keyboardDismissMode={"on-drag"}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {props.children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerLayout: {
    backgroundColor: "rgba(140,0,255,.1)",
    flex: 1,
    // justifyContent: "space-between",
  },
  innerLayout: {
    // paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
});

export default DefaultScrollableLayout;
