import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
  Chip,
  IconButton,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "@mui/icons-material";
import { useUpdateMilestoneStatus } from "../../services/mileStoneService";

export interface MilestoneProps {
  id: string;
  title: string;
  status: string;
  dueDate?: string;
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

export default function MileStoneCard({
  id,
  title,
  status,
  dueDate,
}: MilestoneProps) {
  const { mutate: toggleMilestoneStatus } = useUpdateMilestoneStatus();
  const handleToggleComplete = (id: string, status: string) => {
    toggleMilestoneStatus({ id, status });
  };
  const isComplete = status === "completed";
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ textAlign: "left" }}>
        <Stack direction="row" alignItems="flex-start" spacing={2}>
          <IconButton
            onClick={() =>
              handleToggleComplete(
                id,
                status === "completed" ? "incomplete" : "completed"
              )
            }
            color={isComplete ? "success" : "default"}
          >
            {isComplete ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
          </IconButton>

          <Box>
            <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
              <Typography variant="h6">{title}</Typography>
              <Chip
                label={status}
                size="small"
                color={getStatusColor(status)}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Due: {dueDate || "N/A"}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}
