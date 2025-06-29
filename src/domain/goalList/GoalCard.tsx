import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  IconButton,
  Chip,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import type { GoalDTO } from "../../services/goalService";

interface GoalCardProps {
  goal: GoalDTO;
  onToggleComplete: (id: string, status: string) => void;
  onEdit: (goal: GoalDTO) => void;
  onDelete: (id: string) => void;
}

export const GoalCard = ({
  goal,
  onToggleComplete,
  onEdit,
  onDelete,
}: GoalCardProps) => (
  <Card
    key={goal.id}
    sx={{
      opacity: goal.status === "completed" ? 0.8 : 1,
      bgcolor:
        goal.status === "completed" ? "action.hover" : "background.paper",
    }}
  >
    <CardContent>
      <Stack spacing={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{goal.title}</Typography>
          <Box>
            <IconButton
              onClick={() =>
                onToggleComplete(
                  goal.id!,
                  goal.status === "completed" ? "inComplete" : "completed"
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
            <IconButton onClick={() => onEdit(goal)} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(goal.id!)} color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        <Typography color="text.secondary">{goal.description}</Typography>
        {goal.targetDate && (
          <Box display="flex" gap={1} alignItems="center">
            <Typography variant="body2" color="text.secondary">
              Target Date: {new Date(goal.targetDate).toLocaleDateString()}
            </Typography>
            {new Date(goal.targetDate) > new Date() && (
              <Chip
                label={`${Math.ceil(
                  (new Date(goal.targetDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )} days left`}
                color="primary"
                size="small"
              />
            )}
          </Box>
        )}
      </Stack>
    </CardContent>
  </Card>
);
