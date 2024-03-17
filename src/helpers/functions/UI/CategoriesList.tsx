import { useMemo } from "react";
const CategoriesList = () => {
  const incomeCategoriesList = useMemo(
    () => [{ id: "Salary" }, { id: "Social payment" }, { id: "Other" }],
    []
  );
  const outcomeCategoriesList = useMemo(
    () => [
      { id: "Transport" },
      { id: "Shopping" },
      { id: "Travels" },
      { id: "Renovation" },
      { id: "Holidays" },
      { id: "Entertainment" },
      { id: "Other" },
    ],
    []
  );
  const allCategoriesList = useMemo(
    () => [...incomeCategoriesList, ...outcomeCategoriesList],
    []
  );
  console.log("allCategoriesList: ", allCategoriesList);
  return { incomeCategoriesList, outcomeCategoriesList, allCategoriesList };
};

export default CategoriesList;
