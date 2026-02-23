import { Stack, Button, IconButton } from "@mui/material";
import { TextFieldElement } from "react-hook-form-mui";
import type {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import DeleteIcon from "@mui/icons-material/Delete";
import type { GoalDTO } from "../../services/goalService";

interface MilestoneFormProps {
  fields: FieldArrayWithId<GoalDTO, "mileStones", "id">[];
  append: UseFieldArrayAppend<GoalDTO, "mileStones">;
  remove: UseFieldArrayRemove;
  control: Control<GoalDTO>;
}

const MileStoneForm = ({
  fields,
  append,
  remove,
  control,
}: MilestoneFormProps) => {
  return (
    <Stack spacing={2}>
      {fields.map((field, index) => (
        <Stack direction="row" spacing={2} key={field.id} alignItems="center">
          <TextFieldElement
            name={`mileStones.${index}.title`}
            control={control}
            label="Milestone Title"
            size="small"
          />
          <TextFieldElement
            name={`mileStones.${index}.dueDate`}
            control={control}
            label="Due Date"
            type="date"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <IconButton onClick={() => remove(index)} color="error">
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
      <Button
        variant="outlined"
        onClick={() =>
          append({ title: "", dueDate: undefined, status: "incomplete" })
        }
      >
        Add Milestone
      </Button>
    </Stack>
  );
};

export default MileStoneForm;
