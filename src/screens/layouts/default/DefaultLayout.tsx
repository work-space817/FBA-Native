import React, { ReactNode, useEffect, useState } from "react";
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  ViewProps,
} from "react-native";
import DefaultHeader from "./DefaultHeader";
import DefaultNavbar from "./DefaultNavbar";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useDispatch } from "react-redux";
import { ScrollEnableActionType } from "../../../store/reducers/types";

interface DefaultLayoutProps extends ViewProps {
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

  const dispatch = useDispatch();
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.y;
    setScrollPosition(position);
  };
  useEffect(() => {
    if (scrollPosition < 600) {
      dispatch({ type: ScrollEnableActionType.PARENTS_SCROLLING_TRUE });
    } else {
      dispatch({ type: ScrollEnableActionType.CHILDREN_SCROLLING_TRUE });
    }
  }, [scrollPosition]);

  const { parentsScrolling } = useSelector(
    (store: RootState) => store.scrollEnable
  );
  console.log("scrollPosition in layout", scrollPosition);
  console.log("isScrolling in layout", parentsScrolling);
  return (
    <View style={styles.outerLayout}>
      <ScrollView
        contentContainerStyle={styles.innerLayout}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        // onScroll={handleScroll}
        // scrollEnabled={parentsScrolling}
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
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20,
  },
});

export default DefaultLayout;
