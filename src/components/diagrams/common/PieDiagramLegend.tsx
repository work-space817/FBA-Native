import { StyleSheet, Text, View, ViewProps } from "react-native";
import React, { FC } from "react";
import SelectCategoriesSVG from "../../../helpers/SVG/common/SelectCategoriesSVG";
interface IPieDiagramLegend extends ViewProps {
  category: string;
  count: number;
  value: number;
  typeOfAction: string;
}

const PieDiagramLegend: FC<IPieDiagramLegend> = ({
  style,
  category,
  count,
  value,
  typeOfAction,
}) => {
  return (
    <View style={[styles.layout, style]}>
      <View style={styles.caterogyView}>
        <SelectCategoriesSVG id={category} />
        <View>
          <Text style={styles.legendText}>{category}</Text>
          <Text style={styles.legendText}>
            {count} {typeOfAction}
          </Text>
        </View>
      </View>

      <View>
        <Text style={styles.legendText}>{value} &#8372;</Text>
      </View>
    </View>
  );
};

export default PieDiagramLegend;

const styles = StyleSheet.create({
  layout: {
    // padding: 5,
    paddingVertical: 8,
    borderBottomColor: "rgba(0,0,0,.2)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  caterogyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  legendText: {
    fontSize: 12,
    fontFamily: "Quicksand_600SemiBold",
  },
});
