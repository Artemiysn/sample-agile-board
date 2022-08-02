import { useCallback, useState } from "react";
import {
  Select,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Box,
  InputLabel,
  FormControl,
  Button,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import useStore from "../../../hooks/useStore";

interface newTaskDialogProps {
  open: boolean;
  sectionId: string | null;
  handleClose: () => void;
}

interface ITaskState {
  title: string;
  description: string;
  assigneeID: string;
}

export default function NewTaskDialog(props: newTaskDialogProps) {

  const [taskState, setTaskState] = useState<ITaskState>({
    title: "",
    description: "",
    assigneeID: "",
  });

  const { Users, Boards } = useStore();

  const updateTaskState = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setTaskState((prevTaskState: ITaskState) => ({
      ...prevTaskState,
      [name]: value,
    }));
  };

  const updateUser = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;
    setTaskState((prevTaskState: ITaskState) => ({
      ...prevTaskState,
      [name]: value,
    }));
  };

  const createTask = useCallback(
    (event) => {
      event.preventDefault();
      if (props.sectionId === null) return null;
      Boards.active?.addTask(props.sectionId, taskState);
      props.handleClose();
      setTaskState({ title: "", description: "", assigneeID: "" });
    },
    [taskState, Boards, props.handleClose, props.sectionId]
  );

  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle id="alert-dialog-title" style={{ padding: "16px 32px" }}>
        Creating A New Task:
      </DialogTitle>
      <form onSubmit={createTask}>
        <DialogContent style={{ minWidth: 500 }}>
          <Box p={1}>
            <TextField
              fullWidth
              required
              type="text"
              name="title"
              label="Title"
              onChange={updateTaskState}
              value={taskState?.title || ""}
            />
          </Box>
          <Box p={1}>
            <TextField
              required
              fullWidth
              type="text"
              multiline
              name="description"
              label="Description"
              onChange={updateTaskState}
              value={taskState?.description || ""}
            />
          </Box>
          <Box p={1}>
            <FormControl fullWidth>
              <InputLabel id="assignee-select">Assignee</InputLabel>
              <Select
                required
                style={{
                  width: "100%",
                }}
                label="Assignee"
                labelId="assignee-select"
                name="assigneeID"
                defaultValue=""
                value={taskState?.assigneeID || ""}
                onChange={updateUser}
              >
                <MenuItem value="" disabled>
                  <em>-</em>
                </MenuItem>
                {Users?.users?.map((user) => {
                  return (
                    <MenuItem value={user.id} key={user.id}>
                      {user.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Close
          </Button>
          <Button type="submit" color="primary">
            Create
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
