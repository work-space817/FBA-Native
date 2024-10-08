import { FC, ReactElement, ReactNode, useState } from "react";
import {
  View,
  StyleSheet,
  ViewProps,
  LayoutChangeEvent,
  ViewStyle,
  Platform,
  Text,
} from "react-native";
import { useTheme } from "../../themes/useTheme";

interface IComponentsLayout extends ViewProps {
  title?: string;
}

const theme = useTheme();

const ComponentsLayout: FC<IComponentsLayout> = (props) => {
  return (
    <View {...props} style={[styles.layout, props.style]}>
      {props.title && <Text style={styles.titleText}>{props.title}</Text>}
      {props.children}
    </View>
  );
};
const styles = StyleSheet.create({
  layout: {
    backgroundColor: theme.componentsBackground,
    borderRadius: 18,
    paddingVertical: 6,
    paddingHorizontal: 12,
    shadowColor: theme.shadow,
    marginVertical: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Quicksand_700Bold",
    marginBottom: 8,
    color: theme.text,
  },
});

export default ComponentsLayout;
