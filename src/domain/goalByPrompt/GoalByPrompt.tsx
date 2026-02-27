import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import {
  Button,
  Stack,
  Paper,
  Typography,
  Divider,
  InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";
import { useCreateGoalByPrompt } from "../../services/goalService";

interface GoalByPromptProps {
  onSubmit: (data: { prompt: string }) => void;
  loading?: boolean;
}

const GoalByPrompt = () => {
  const methods = useForm<{ prompt: string }>({
    defaultValues: { prompt: "" },
  });
  const navigate = useNavigate();
  const { mutateAsync: createGoal } = useCreateGoalByPrompt();

  const onSubmit = async (data: { prompt: string }) => {
    await createGoal(data);

    navigate("/goal-tracker");
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Create Goal with AI
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <FormContainer formContext={methods} onSuccess={onSubmit}>
        <Stack spacing={2}>
          <TextFieldElement
            name="prompt"
            label="Describe your goal and milestones"
            placeholder="e.g. I want to run a marathon in 6 months and need milestones for training."
            fullWidth
            required
            multiline
            minRows={3}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SmartToyIcon color="primary" />
                </InputAdornment>
              ),
            }}
            // disabled={loading}
          />
          <Button
            type="submit"
            variant="contained"
            // disabled={loading}
            startIcon={<SmartToyIcon />}
          >
            Generate with AI
          </Button>
        </Stack>
      </FormContainer>
    </Paper>
  );
};

export default GoalByPrompt;
