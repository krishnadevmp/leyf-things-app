import { useParams, useNavigate } from "react-router-dom";
import { TextFieldElement, FormContainer } from "react-hook-form-mui";
import { Button, Stack, Typography, Paper, Divider } from "@mui/material";
import useGoalDetailsController from "./useGoalDetailsController";
import MileStoneForm from "../milstone/MileStoneForm";

const GoalDetails = () => {
  const { id: goalId } = useParams();
  const navigate = useNavigate();
  const { methods, fields, append, remove, onSubmit } =
    useGoalDetailsController(goalId);

  return (
    <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        {goalId ? "Edit Goal" : "Create Goal"}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <FormContainer formContext={methods} onSuccess={onSubmit}>
        <Stack spacing={2}>
          <TextFieldElement name="title" label="Title" fullWidth required />
          <TextFieldElement
            name="description"
            label="Description"
            fullWidth
            multiline
            rows={3}
            required
          />
          <TextFieldElement
            name="targetDate"
            label="Target Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />

          <MileStoneForm
            fields={fields}
            append={append}
            remove={remove}
            control={methods.control}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button type="submit" variant="contained">
              {goalId ? "Update" : "Create"}
            </Button>
          </Stack>
        </Stack>
      </FormContainer>
    </Paper>
  );
};

export default GoalDetails;
