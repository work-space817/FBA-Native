import { FC, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ISelectCategories,
  SelectCategoriesActionType,
} from "../../store/reducers/types";
import { View, Text, StyleSheet } from "react-native";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import CustomButtonWithoutFeedback from "../UI/CustomButtonWithoutFeedback";

interface ISelectCategoriesProps {
  icons: any[];
  title: string;
}
const SelectCategories: FC<ISelectCategoriesProps> = memo(
  ({ icons, title }) => {
    const { isSelected } = useSelector(
      (store: any) => store.selectCategories as ISelectCategories
    );
    const [isActive, setisActive] = useState<number | null>(null);
    const dispatch = useDispatch();

    const selectIcon = (e: any, index: number) => {
      const seletedCategories = e.currentTarget.textContent;
      setisActive(index);
      const selectedCategory = dispatch({
        type: SelectCategoriesActionType.SELECT_CATEGORIES,
        payload: seletedCategories,
      });
    };

    return (
      <View style={styles.layout}>
        <Text>{title}</Text>
        <View style={styles.itemsList}>
          {icons.map((icon, index) => (
            <CustomButtonWithoutFeedback
              onPress={(e) => selectIcon(e, index)}
              style={styles.items}
              title={icon.id}
              theme={isActive == index && isSelected ? "primary" : "none"}
              key={index}
            >
              <SelectCategoriesSVG id={icon.id} />
            </CustomButtonWithoutFeedback>
          ))}
        </View>
      </View>
    );
  }
);
const styles = StyleSheet.create({
  layout: {},
  itemsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 14,
  },
});

export default SelectCategories;
