import { useForm } from "react-hook-form-mui";
import { useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import {
  useCreateGoal,
  useGetGoalById,
  useUpdateGoal,
  type GoalDTO,
} from "../../services/goalService";
import { useNavigate } from "react-router-dom";

const useGoalDetailsController = (goalId?: string) => {
  const navigate = useNavigate();
  const methods = useForm<GoalDTO>({
    defaultValues: {
      title: "",
      description: "",
      targetDate: "",
      mileStones: [],
    },
  });

  const { control, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mileStones",
  });

  const { data: goal } = useGetGoalById(goalId);
  const { mutateAsync: createGoal } = useCreateGoal();
  const { mutateAsync: updateGoal } = useUpdateGoal();

  useEffect(() => {
    if (goal) {
      reset({
        ...goal,
        targetDate: goal?.targetDate
          ? new Date(goal.targetDate).toISOString().slice(0, 10)
          : "",
        mileStones: goal.mileStones?.map((mileStone) => ({
          ...mileStone,
          dueDate: mileStone?.dueDate
            ? new Date(mileStone?.dueDate).toISOString().slice(0, 10)
            : "",
        })),
      });
    }
  }, [goal, reset]);

  const onSubmit = async (data: GoalDTO) => {
    if (goalId) {
      await updateGoal({
        ...data,
        id: goalId,
      });
    } else {
      await createGoal({
        ...data,
        status: "incomplete",
        priority: "medium",
      });
    }
    navigate("/goal-tracker");
  };

  return {
    methods,
    fields,
    append,
    remove,
    onSubmit,
  };
};

export default useGoalDetailsController;
