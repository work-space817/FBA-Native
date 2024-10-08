import {
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../../../../components/UI/CustomButton";
import IntroductionSVG from "../../../../helpers/SVG/auth/IntroductionSVG";
import { ScreenNames, TabNames } from "../../../navigation/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { AuthUserActionType } from "../../../../store/reducers/userReducers/types";
import CustomLoadingAnimation from "../../../../components/UI/CustomLoadingAnimation";
import { TabsNavigation } from "../../../navigation/TabNavigation";
import { StackNavigation } from "../../../navigation/Navigation";
import { useTheme } from "../../../themes/useTheme";

const theme = useTheme();

const IntroductionScreen = memo(() => {
  const { width } = Dimensions.get("window");
  const { navigate } = useNavigation<TabsNavigation & StackNavigation>();

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const { isAuth } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const uid = await AsyncStorage.getItem("uid");
        if (uid) {
          dispatch({ type: AuthUserActionType.LOGIN_USER });
          navigate(TabNames.TabName, TabNames.Tabs.HomeScreen);
        } else {
          dispatch({ type: AuthUserActionType.LOGOUT_USER });
        }
      } catch (error: any) {
        console.error("User auth error:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    console.log("isAuth:", isAuth);
    getUserId();
  }, [isAuth]);

  return (
    <View style={styles.layout}>
      <IntroductionSVG width={"100%"} height={width * 0.75} />
      <View style={styles.viewTitle}>
        <Text style={styles.title}>Welcome to FBA</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet consectetur. A ut pellentesque amet
          phasellus augue. Neque at felis pulvinar malesuada varius egestas dis
          cras.
        </Text>
      </View>
      {isAuth || isLoading ? (
        <CustomLoadingAnimation />
      ) : (
        <View style={styles.viewButton}>
          <CustomButton
            theme="primary"
            title={"Login"}
            style={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => navigate(ScreenNames.LoginScreen)}
          />
          <CustomButton
            title={"Register"}
            style={styles.button}
            titleStyle={styles.buttonTitle}
            onPress={() => navigate(ScreenNames.RegisterScreen)}
          />
        </View>
      )}
    </View>
  );
});

export default IntroductionScreen;

const styles = StyleSheet.create({
  layout: {
    backgroundColor: theme.background,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 16,
    gap: 32,
  },
  viewTitle: {
    gap: 16,
  },
  title: {
    color: theme.text,
    fontWeight: "600",
    fontSize: 32,
    lineHeight: 38.4,
    textAlign: "left",
  },
  subtitle: {
    color: theme.text,
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19.2,
    textAlign: "left",
  },
  viewButton: {
    width: "100%",
    gap: 8,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonTitle: {
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 18,
  },
});
