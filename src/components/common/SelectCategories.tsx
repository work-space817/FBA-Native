import { FC, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ISelectCategories,
  SelectCategoriesActionType,
} from "../../store/reducers/types";
import { View, Text, StyleSheet } from "react-native";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import CustomButtonWithoutFeedback from "../UI/CustomButtonWithoutFeedback";
import { RootState } from "../../store";

interface ISelectCategoriesProps {
  icons: any[];
  title: string;
}
const SelectCategories: FC<ISelectCategoriesProps> = memo(
  ({ icons, title }) => {
    const { isSelected } = useSelector(
      (store: RootState) => store.selectCategories as ISelectCategories
    );
    const [isActive, setisActive] = useState<number | null>(null);
    const dispatch = useDispatch();

    const selectIcon = (iconId: string, index: number) => {
      setisActive(index);
      const selectedCategory = dispatch({
        type: SelectCategoriesActionType.SELECT_CATEGORIES,
        payload: iconId,
      });
    };

    return (
      <>
        <Text>{title}</Text>
        <View style={styles.itemsList}>
          {icons.map((icon, index) => (
            <CustomButtonWithoutFeedback
              onPress={() => selectIcon(icon.id, index)}
              style={styles.items}
              title={icon.id}
              theme={isActive == index && isSelected ? "primary" : "none"}
              key={index}
            >
              <SelectCategoriesSVG id={icon.id} />
            </CustomButtonWithoutFeedback>
          ))}
        </View>
      </>
    );
  }
);
const styles = StyleSheet.create({
  itemsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginVertical: 10,
    paddingLeft: 5,
  },
  items: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 15,
  },
});

export default SelectCategories;
