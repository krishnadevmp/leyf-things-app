import { createBrowserRouter } from "react-router-dom";
import { GoalList } from "./domain/goalList/GoalList";
import GoalDetails from "./domain/goalForm/GoalDetails";

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
        path: ":id/edit",
        element: <GoalDetails />,
      },
    ],
  },
]);

export default router;
