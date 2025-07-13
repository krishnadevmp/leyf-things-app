import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateGoal,
  useUpdateGoal,
  type GoalDTO,
} from "../../services/goalService";
const useGoalFormController = (goal?: GoalDTO, onClose?: () => void) => {
  const addGoal = useCreateGoal();
  const updateGoal = useUpdateGoal();

  const { control, handleSubmit, reset } = useForm<GoalDTO>({
    defaultValues: {
      title: goal?.title || "",
      description: goal?.description || "",
      targetDate: "",
    },
  });

  useEffect(() => {
    reset({
      title: goal?.title || "",
      description: goal?.description || "",
      targetDate: goal?.targetDate,
    });
  }, [goal, reset]);

  const onSubmit = (data: GoalDTO) => {
    const goalData: GoalDTO = {
      ...data,
      status: "inComplete",
    };

    if (goal) {
      updateGoal.mutateAsync({ ...goal, ...goalData });
    } else {
      addGoal.mutateAsync({ ...goalData, priority: "Medium" });
    }

    reset();
    onClose?.();
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
  };
};

export default useGoalFormController;
