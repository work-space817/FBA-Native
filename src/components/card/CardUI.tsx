import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { auth } from "../../api/firebase/config";
import getUserInformation from "../../api/firebase/user/userInfo/getUserInformation";
import { ISignUp } from "../auth/registration/types";
import CustomLoading from "../UI/CustomLoading";

const CardUI = () => {
  const [userData, setUserData] = useState<ISignUp>();

  useEffect(() => {
    const userInfo = async () => {
      const fetchUserInfo = await getUserInformation();
      setUserData(fetchUserInfo);
    };
    userInfo();
  }, []);

  const currentDate = () => {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  };
  const randomDigit = () => {
    let digitArray = [];
    for (let i = 0; i < 16; i++) {
      const getRandomDigit = Math.floor(Math.random() * 10);
      digitArray.push(getRandomDigit);
      if ((i + 1) % 4 === 0) {
        digitArray.push("  ");
      }
    }
    return digitArray;
  };
  return (
    <>
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitleText}>cloudcash</Text>
          <Text style={styles.cardOptionalText}>PREMIUM ACCOUNT</Text>
        </View>

        <View style={styles.digitLayout}>
          <Text style={styles.digitText}>{randomDigit()}</Text>
        </View>

        <View style={styles.infoLayout}>
          <View style={styles.columnLayout}>
            <Text style={styles.textSmall}>Card holder</Text>
            <Text style={styles.textMedium}>{userData?.email}</Text>
          </View>
          <View style={styles.columnLayout}>
            <Text style={styles.textSmall}>Current date</Text>
            <Text style={styles.textMedium}>{currentDate()}</Text>
          </View>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(126,76,215,.75)",
    borderRadius: 18,
    width: "60%",
    marginHorizontal: 6,
    padding: 12,
    justifyContent: "space-between",
  },
  cardTitleText: {
    color: "white",
    fontSize: 15,
    fontFamily: "Quicksand_700Bold",
  },
  cardOptionalText: {
    color: "rgba(255,255, 255, 0.50)",
    fontSize: 10,
    fontFamily: "Quicksand_500Medium",
  },
  digitLayout: {
    alignItems: "center",
  },
  digitText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Quicksand_500Medium",
  },
  infoLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnLayout: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  textSmall: {
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: "Quicksand_500Medium",
  },
  textMedium: {
    fontSize: 12,
    color: "white",
    fontFamily: "Quicksand_500Medium",
  },
});
export default CardUI;
