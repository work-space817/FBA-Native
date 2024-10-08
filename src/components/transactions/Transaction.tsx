import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import React, { FC, useEffect, useRef, useState } from "react";
import { ITransaction } from "./types";
import SelectCategoriesSVG from "../../helpers/SVG/common/SelectCategoriesSVG";
import TransactionSVG from "../../helpers/SVG/UI/TransactionSVG";
import getTransactionData from "../../api/firebase/transactions/getTransactionData";
import { TransactionListActionType } from "../../store/reducers/transactionReducers/types";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDoc,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import updateUserInformation from "../../api/firebase/user/userInfo/updateUserInformation";
import { RootState } from "../../store";
import { limitedText } from "../../helpers/functions/limitedText";
import { Categories } from "../common/category/types";
import { useTheme } from "../../core/themes/useTheme";

interface ITransactionView extends ViewProps {}

const theme = useTheme();

const Transaction: FC<ITransaction & ITransactionView> = ({
  transactionTitle,
  transactionValue,
  transactionTime,
  transactionDate,
  selectedCategories,
  transactionType,
  id,
  ...props
}) => {
  const limitedTitle = limitedText(transactionTitle, 20);
  const transactionValueType =
    transactionType === Categories.incomeTransaction ? "+" : "-";

  const { userBalance } = useSelector((store: RootState) => store.userBalance);
  const [startPosition, setStartPosition] = useState({ x: 0 });
  const [tapPosition, setTapPosition] = useState({ x: 0 });
  const dispatch = useDispatch();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (event, gestureState) => {
        setStartPosition({ x: gestureState.x0 });
      },
      onPanResponderMove: (event, gestureState) => {
        setTapPosition({ x: gestureState.moveX });
      },
    })
  ).current;

  useEffect(() => {
    if (tapPosition.x > 0 && startPosition.x - tapPosition.x > 75) {
      Animated.timing(pan, {
        toValue: -50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else if (tapPosition.x > 0 && tapPosition.x - startPosition.x > 75) {
      Animated.timing(pan, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(pan, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [tapPosition]);
  const transactionDelete = async () => {
    try {
      const { transactionQuerySnapshot } = await getTransactionData();

      const selectedTransaction = transactionQuerySnapshot.docs.find((doc) =>
        doc.id === id ? doc : null
      ) as QueryDocumentSnapshot<DocumentData, DocumentData>;
      const selectedData = selectedTransaction?.data() as ITransaction;

      if (selectedData.transactionType === Categories.incomeTransaction) {
        updateUserInformation({
          currentBalance: userBalance - selectedData.transactionValue,
        });
      } else if (
        selectedData.transactionType === Categories.outcomeTransaction
      ) {
        updateUserInformation({
          currentBalance: userBalance + selectedData.transactionValue,
        });
      }

      deleteDoc(selectedTransaction.ref);
      dispatch({
        type: TransactionListActionType.UPDATE_TRANSACTION_LIST,
        payload: false,
      });
    } catch (error) {
      console.error("Сталася помилка при видаленні цілі:", error);
    }
  };
  return (
    <View>
      <Animated.View
        style={[
          styles.animatedLayout,
          {
            transform: [{ translateX: pan.x }, { translateY: 0 }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.layout, props.style]}>
          <View style={styles.titleLayout}>
            <TransactionSVG id={transactionType} width={18} height={18} />
            <Text style={styles.text}>{transactionTime}</Text>
            <SelectCategoriesSVG id={selectedCategories as string} />
            <Text style={styles.text}>{limitedTitle}</Text>
          </View>
          <View style={styles.valueLayout}>
            <Text style={[styles.transactionValueStyle, styles.text]}>
              {transactionValueType} {transactionValue} &#8372;
            </Text>
          </View>
        </View>
      </Animated.View>
      <TouchableOpacity
        onPress={transactionDelete}
        style={[styles.optionalView, styles.leftViewStyle]}
      >
        <TransactionSVG id={"Delete"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={transactionDelete}
        style={[styles.optionalView, styles.rightViewStyle]}
      >
        <TransactionSVG id={"Delete"} />
      </TouchableOpacity>
    </View>
  );
};
export default Transaction;

const styles = StyleSheet.create({
  optionalView: {
    position: "absolute",
    width: 50,
    height: 40,
    top: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: theme.text,
  },
  leftViewStyle: {
    left: 0,
  },
  rightViewStyle: {
    right: 0,
  },
  animatedLayout: {
    zIndex: 10,
    position: "relative",
  },
  layout: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 0,
    borderWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.componentsBackground,
  },
  titleLayout: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
    alignItems: "center",
  },
  valueLayout: {
    width: "20%",
    alignItems: "flex-end",
  },
  bordering: {
    borderColor: theme.red,
    borderWidth: 1,
    borderStyle: "solid",
  },
  transactionValueStyle: {
    fontSize: 14,
    fontFamily: "Quicksand_600SemiBold",
  },
});
