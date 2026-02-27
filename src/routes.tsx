import { createBrowserRouter } from "react-router-dom";
import { GoalList } from "./domain/goalList/GoalList";
import GoalDetails from "./domain/goalForm/GoalDetails";
import GoalByPrompt from "./domain/goalByPrompt/GoalByPrompt";

const router = createBrowserRouter([
  {
    path: "/goal-tracker",
    children: [
      {
        index: true,
        element: <GoalList />,
      },
      {
        path: "add",
        element: <GoalDetails />,
      },
      {
        path: "add-with-ai",
        element: <GoalByPrompt />,
      },
      {
        path: ":id/edit",
        element: <GoalDetails />,
      },
    ],
  },
]);

export default router;
