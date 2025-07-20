import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type { GoalDTO } from "../../services/goalService";
import MilestoneCard from "../milstone/MileStoneCard";

interface GoalCardProps {
  goal: GoalDTO;
  onToggleComplete: (id: string, status: string) => void;
  onEdit: (goal: GoalDTO) => void;
  onDelete: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "completed":
      return "success";
    case "incomplete":
      return "default";
    default:
      return "default";
  }
};

export const GoalCard = ({
  goal,
  onToggleComplete,
  onEdit,
  onDelete,
}: GoalCardProps) => {
  const completed =
    goal.mileStones?.filter((m) => m.status === "completed").length || 0;
  const total = goal.mileStones?.length || 1;
  const progress = (completed / total) * 100;

  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="flex-start"
            flexGrow={1}
          >
            <IconButton
              onClick={() =>
                onToggleComplete(
                  goal.id!,
                  goal.status === "completed" ? "incomplete" : "completed"
                )
              }
              color={goal.status === "completed" ? "success" : "default"}
            >
              {goal.status === "completed" ? (
                <CheckCircleIcon />
              ) : (
                <RadioButtonUncheckedIcon />
              )}
            </IconButton>

            <Box sx={{ textAlign: "left" }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="h6">{goal.title}</Typography>
                <Chip
                  label={goal.status}
                  size="small"
                  color={getStatusColor(goal.status ?? "")}
                />
              </Stack>
              <Typography color="text.secondary">{goal.description}</Typography>
              {goal.targetDate && (
                <Typography variant="body2" color="text.secondary">
                  Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                </Typography>
              )}
            </Box>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                width: 100,
                borderRadius: 1,
                backgroundColor: "action.hover",
                "& .MuiLinearProgress-bar": {
                  backgroundColor:
                    progress === 100 ? "success.main" : "primary.main",
                },
              }}
            />
            <IconButton onClick={() => onEdit(goal)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(goal.id!)} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>

        <Box mt={2}>
          {goal.mileStones?.map((milestone) => (
            <MilestoneCard
              key={milestone.id}
              title={milestone.title}
              id={milestone.id!}
              status={milestone.status}
              dueDate={milestone.dueDate}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
