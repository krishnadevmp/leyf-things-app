import { GoalForm } from "../goalForm/GoalForm";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Chip,
  LinearProgress,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Sort as SortIcon,
} from "@mui/icons-material";
import useGoalListController from "./useGoalListController";

export const GoalList = () => {
  const {
    filters,
    editingGoal,
    setEditingGoal,
    showForm,
    setShowForm,
    handleToggleComplete,
    handleDelete,
    handleFilterChange,
    handleSortChange,
    sortedGoals,
    completedCount,
    progress,
    goals,
  } = useGoalListController();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" component="h1" gutterBottom>
            My Goals
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
          >
            Add New Goal
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h6">Progress</Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary">
                {completedCount} of {goals?.length ?? 0} goals completed (
                {Math.round(progress)}%)
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Box>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Filter by Status"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="incomplete">Incomplete</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <ToggleButtonGroup
                exclusive
                value={filters.sortBy}
                onChange={handleSortChange}
              >
                <ToggleButton value="targetDate">
                  <SortIcon />
                  Target Date{" "}
                  {filters.sortBy === "targetDate" &&
                    (filters.sortOrder === "asc" ? "↑" : "↓")}
                </ToggleButton>
                {/* <ToggleButton value="createdAt">
                  <SortIcon />
                  Created Date{" "}
                  {filters.sortBy === "createdAt" &&
                    (filters.sortOrder === "asc" ? "↑" : "↓")}
                </ToggleButton> */}
              </ToggleButtonGroup>
            </Grid>
          </Grid>
        </Box>

        <Stack spacing={2}>
          {sortedGoals.map((goal) => (
            <Card
              key={goal.id}
              sx={{
                opacity: goal.status === "completed" ? 0.8 : 1,
                bgcolor:
                  goal.status === "completed"
                    ? "action.hover"
                    : "background.paper",
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">{goal.title}</Typography>
                    <Box>
                      <IconButton
                        onClick={() =>
                          handleToggleComplete(
                            goal.id!,
                            goal.status === "completed"
                              ? "inComplete"
                              : "completed"
                          )
                        }
                        color={
                          goal.status === "completed" ? "success" : "default"
                        }
                      >
                        {goal.status === "completed" ? (
                          <CheckCircleIcon />
                        ) : (
                          <RadioButtonUncheckedIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={() => setEditingGoal(goal)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(goal.id!)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Typography color="text.secondary">
                    {goal.description}
                  </Typography>
                  {goal.targetDate && (
                    <Box display="flex" gap={1} alignItems="center">
                      <Typography variant="body2" color="text.secondary">
                        Target Date:{" "}
                        {new Date(goal.targetDate).toLocaleDateString()}
                      </Typography>
                      {new Date(goal.targetDate) > new Date() && (
                        <Chip
                          label={`${Math.ceil(
                            (new Date(goal.targetDate).getTime() -
                              new Date().getTime()) /
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
          ))}
        </Stack>
      </Stack>

      <GoalForm open={showForm} onClose={() => setShowForm(false)} />

      {editingGoal ? (
        <GoalForm
          open={!!editingGoal}
          goal={editingGoal || undefined}
          onClose={() => setEditingGoal(null)}
        />
      ) : null}
    </Container>
  );
};
