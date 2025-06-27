import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Goal } from '../types/goal';
import { useGoalStore } from '../store/useGoalStore';
import {
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

interface GoalFormProps {
  goal?: Goal;
  onClose?: () => void;
  open: boolean;
}

export const GoalForm = ({ goal, onClose, open }: GoalFormProps) => {
  const addGoal = useGoalStore((state) => state.addGoal);
  const updateGoal = useGoalStore((state) => state.updateGoal);
  
  const [title, setTitle] = useState(goal?.title || '');
  const [description, setDescription] = useState(goal?.description || '');
  const [targetDate, setTargetDate] = useState(
    goal?.targetDate ? new Date(goal.targetDate).toISOString().split('T')[0] : ''
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const goalData = {
      title,
      description,
      targetDate: targetDate ? new Date(targetDate) : undefined,
    };

    if (goal) {
      updateGoal({ ...goal, ...goalData });
    } else {
      addGoal(goalData);
    }

    setTitle('');
    setDescription('');
    setTargetDate('');
    onClose?.();
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTargetDate(e.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{goal ? 'Edit Goal' : 'Create New Goal'}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              required
              fullWidth
              placeholder="Enter goal title"
              variant="outlined"
            />
            <TextField
              label="Description"
              value={description}
              onChange={handleDescriptionChange}
              required
              fullWidth
              multiline
              rows={4}
              placeholder="Enter goal description"
              variant="outlined"
            />
            <TextField
              label="Target Date"
              type="date"
              value={targetDate}
              onChange={handleDateChange}
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
            {goal ? 'Update Goal' : 'Create Goal'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}; 