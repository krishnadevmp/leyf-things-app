import { useEffect } from "react";
import { useGoalStore } from "../store/useGoalStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { TextFieldElement } from "react-hook-form-mui";
import {
  useCreateGoal,
  useUpdateGoal,
  type GoalDTO,
} from "../services/goalService";

interface GoalFormProps {
  goal?: GoalDTO;
  onClose?: () => void;
  open: boolean;
}

export const GoalForm = ({ goal, onClose, open }: GoalFormProps) => {
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
  }, [goal, open, reset]);

  const onSubmit = (data: GoalDTO) => {
    const goalData: GoalDTO = {
      title: data.title,
      description: data.description,
      targetDate: data.targetDate,
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

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{goal ? "Edit Goal" : "Create New Goal"}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextFieldElement
              name="title"
              control={control}
              label="Title"
              required
              fullWidth
              placeholder="Enter goal title"
              variant="outlined"
            />
            <TextFieldElement
              name="description"
              control={control}
              label="Description"
              required
              fullWidth
              multiline
              rows={4}
              placeholder="Enter goal description"
              variant="outlined"
            />
            <TextFieldElement
              name="targetDate"
              control={control}
              label="Target Date"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {goal ? "Update Goal" : "Create Goal"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
