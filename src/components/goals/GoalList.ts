import { useEffect, useState } from "react";
import { IGoal } from "./types";
import { useDispatch, useSelector } from "react-redux";
import getGoalsData from "../../api/firebase/goals/getGoalsData";
import { GoalListActionType, IGoalList } from "../../store/reducers/types";
import { RootState } from "../../store";

const GoalList = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { isUpdatedGoaliList } = useSelector(
    (store: RootState) => store.goalList as IGoalList
  );

  const fetchUserGoals = async () => {
    try {
      setLoading(true);
      const fetchGoals = await getGoalsData();
      const goalsData = fetchGoals.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IGoal[];
      const setGoalList = dispatch({
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
