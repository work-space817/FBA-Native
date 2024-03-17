import { parse } from "date-fns";

const DateFormater = (transactionDate: string) => {
  const dateInMilliseconds = parse(
    transactionDate,
    "yyyy-MM-dd",
    new Date()
  ).getTime();
  return dateInMilliseconds;
};

export default DateFormater;
