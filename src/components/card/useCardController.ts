import { format } from "date-fns";
import { useState, useEffect } from "react";
import getUserInformation from "../../api/firebase/user/userInfo/getUserInformation";
import { ISignUp } from "../auth/registration/types";

export const useCardController = () => {
  const [userData, setUserData] = useState<ISignUp>({
    email: "",
    password: "",
    currentBalance: "",
  });

  useEffect(() => {
    const userInfo = async () => {
      const { userData } = await getUserInformation();
      setUserData(userData);
    };
    userInfo();
  }, []);

  const today = format(new Date(), "dd.MM.yyyy");
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
  return { userData, randomDigit, today };
};
