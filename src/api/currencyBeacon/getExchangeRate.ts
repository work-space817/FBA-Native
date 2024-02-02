const getExchangeRate = async (
  base: string,
  startDate: string,
  endDate: string
) => {
  const URL = `https://api.currencybeacon.com/v1/timeseries`;
  const API_KEY = `3VVZDiDF8BF3ZMKlDQlYaVP207g1XYXH`;
  const SYMBOLS = `UAH`;

  const response = await fetch(
    `${URL}?api_key=${API_KEY}&base=${base}&start_date=${startDate}&end_date=${endDate}&symbols=${SYMBOLS}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();
  // console.log("Результат getExchangeRate:", result);
  const data = Object.keys(result.response).map((date) => {
    return {
      label: date,
      value: +result[date].UAH.toFixed(2),
    };
  });
  return data;
};

export default getExchangeRate;
