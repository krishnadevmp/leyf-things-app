import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  LinearProgress,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Sort as SortIcon } from "@mui/icons-material";
import useGoalListController from "./useGoalListController";
import { GoalCard } from "./GoalCard";
import { useNavigate } from "react-router-dom";

export const GoalList = () => {
  const {
    filters,
    handleToggleComplete,
    handleDelete,
    handleFilterChange,
    handleSortChange,
    sortedGoals,
    completedCount,
    progress,
    goals,
  } = useGoalListController();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" fontWeight={600}>
            My Goals
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("add")}
          >
            + Add New Goal
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("add-with-ai")}
          >
            + Add New Goal with AI
          </Button>
        </Box>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="subtitle1" fontWeight={500}>
                Progress Overview
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor:
                      progress === 100 ? "success.main" : "primary.main",
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {completedCount} of {goals?.length ?? 0} goals completed (
                {Math.round(progress)}%)
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status Filter</InputLabel>
                  <Select
                    labelId="status-label"
                    value={filters.status}
                    label="Status Filter"
                    onChange={handleFilterChange}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="completed">Completed</MenuItem>
                    <MenuItem value="incomplete">Incomplete</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  Sort Goals By
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  value={filters.sortBy}
                  onChange={handleSortChange}
                  size="small"
                  color="primary"
                >
                  <ToggleButton value="targetDate">
                    <SortIcon fontSize="small" sx={{ mr: 1 }} />
                    Target Date
                    {filters.sortBy === "targetDate" &&
                      (filters.sortOrder === "asc" ? "↑" : "↓")}
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Stack spacing={2}>
          {sortedGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};
