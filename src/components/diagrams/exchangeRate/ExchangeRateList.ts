import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import getExchangeRate from "../../../api/currencyBeacon/getExchangeRate";

const ExchangeRateList = () => {
  const [rateUSD, setRateUSD] = useState<any[]>([]);
  const [rateEUR, setRateEUR] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const now = new Date();

  const day = now.getDate().toString().padStart(2, "0");
  const month = (number: number = 0) =>
    (now.getMonth() + number).toString().padStart(2, "0");
  const year = now.getFullYear();

  const rangeFrom = `${year}-${month()}-${day}`;
  const rangeTo = `${year}-${month(1)}-${day}`;

  const getData = async () => {
    setLoading(true);
    try {
      const USD = await getExchangeRate("USD", rangeFrom, rangeTo);

      setRateUSD(USD);
      // console.log("USD: ", USD);
      const EUR = await getExchangeRate("EUR", rangeFrom, rangeTo);
      setRateEUR(EUR);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return { loading, rateUSD, rateEUR };
};

export default ExchangeRateList;
