import { FC, memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import SelectCategoriesSVG from "../../../helpers/SVG/common/SelectCategoriesSVG";
import CustomButton from "../../UI/CustomButton";
import ComponentsLayout from "../../../core/layouts/components/ComponentsLayout";
import { ISelectCategoriesProps } from "./types";
import { useCategoryController } from "./useCategoryController";

const SelectCategories: FC<ISelectCategoriesProps> = memo(
  ({ title, categoriesList }) => {
    const { categoryByType, selectIcon, isActive, isSelected } =
      useCategoryController(categoriesList);

    return (
      <>
        <Text>{title}</Text>
        <View style={styles.itemsList}>
          {categoryByType.map((icon, index) => (
            <ComponentsLayout style={styles.categoriesLayout} key={icon.id}>
              <CustomButton
                onPress={() => selectIcon(icon.id, index)}
                style={styles.category}
                title={icon.id}
                theme={isActive == index && isSelected ? "primary" : "none"}
              >
                <SelectCategoriesSVG id={icon.id} />
              </CustomButton>
            </ComponentsLayout>
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
  categoriesLayout: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 2,
    borderRadius: 12,
    elevation: 5,
  },
  category: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 12,
    gap: 5,
    borderWidth: 0,
  },
});

export default SelectCategories;
