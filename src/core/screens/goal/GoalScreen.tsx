import DefaultScrollableLayout from "../../layouts/default/DefaultScrollableLayout";
import GoalSlider from "../../../components/goals/GoalSlider";
import GoalEdit from "../../../components/goals/GoalEdit";
import GoalPieDiagram from "../../../components/diagrams/goalDiagrams/goalPieDiagram/GoalPieDiagram";

export default function GoalScreen() {
  const onRefreshComponents = () => {
    console.log("Refreshing components...");
  };

  return (
    <DefaultScrollableLayout onRefreshComponents={onRefreshComponents}>
      <GoalSlider />
      <GoalEdit />
      <GoalPieDiagram />
    </DefaultScrollableLayout>
  );
}
