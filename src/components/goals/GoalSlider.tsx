import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { memo, useRef } from "react";
import Goal from "./Goal";
import ArrowsSVG from "../../helpers/SVG/UI/ArrowsSVG";
import GoalList from "./GoalList";
import { useSelector } from "react-redux";
import { IGoalList } from "../../store/reducers/types";
import GoalEmpty from "./GoalEmpty";
import CustomLoadingAnimation from "../UI/CustomLoadingAnimation";

const GoalSlider = memo(() => {
  const fetchGoalData = GoalList();
  const { goalList } = useSelector((store: any) => store.goalList as IGoalList);
  const flatListRef = useRef<FlatList>(null);

  const scrollToNextItem = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: goalList.length - 1,
      });
    }
  };

  const scrollToPreviousItem = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        index: 0,
      });
    }
  };

  return (
    <View style={styles.layout}>
      <TouchableOpacity
        onPress={scrollToPreviousItem}
        style={{ justifyContent: "center", height: 140 }}
      >
        <ArrowsSVG id="ArrowLeft" width={"12"} height={"24"} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.flatList}>
        {fetchGoalData ? (
          <CustomLoadingAnimation />
        ) : (
          <FlatList
            ref={flatListRef}
            data={goalList}
            horizontal
            renderItem={({ item }) => (
              <Goal
                cost={item.cost}
                expireDate={item.expireDate}
                title={item.title}
                selectedCategories={item.selectedCategories}
                id={item.expireDate}
              />
            )}
            ListFooterComponent={() => <GoalEmpty />}
          />
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={scrollToNextItem}
        style={{ justifyContent: "center", height: 140 }}
      >
        <ArrowsSVG id="ArrowRight" width={"12"} height={"24"} />
      </TouchableOpacity>
    </View>
  );
});

export default GoalSlider;

const styles = StyleSheet.create({
  layout: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    gap: 5,
  },
  flatList: {
    flexDirection: "row",
  },
});
