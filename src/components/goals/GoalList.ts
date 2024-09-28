import { useEffect, useState } from "react";
import { IGoal } from "./types";
import { useDispatch, useSelector } from "react-redux";
import getGoalsData from "../../api/firebase/goals/getGoalsData";
import { RootState } from "../../store";
import { GoalListActionType } from "../../store/reducers/goalReducers/types";

const GoalList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isUpdatedGoaliList } = useSelector(
    (store: RootState) => store.goalList
  );

  const fetchUserGoals = async () => {
    try {
      setLoading(true);
      const { goalsData } = await getGoalsData();

      dispatch({
        type: GoalListActionType.GOAL_LIST,
        payload: goalsData,
      });
      setLoading(false);
    } catch (error) {
      console.error("Сталася помилка при отриманні цілей користувача:", error);
    }
  };
  useEffect(() => {
    fetchUserGoals();
    return () => {
      fetchUserGoals();
    };
  }, [isUpdatedGoaliList]);
  return loading;
};

export default GoalList;
