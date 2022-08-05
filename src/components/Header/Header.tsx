import { observer } from "mobx-react-lite";
import {useCallback} from "react";
import useStore from "../../hooks/useStore";
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  Select,
  Toolbar,
  Typography,
  Button
} from "@mui/material";
import User from "../common/User/User";

function Header() {

  const { Users, Boards } = useStore();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box display="flex" alignItems="center">
              <Typography variant="h5">Dashboard:</Typography>
              <FormControl variant="outlined">
                <Select
                  style={{ backgroundColor: "white", margin: 10, minWidth: 120 }}
                  size="small"
                  native
                  value={Boards?.active?.id || ""}
                  onChange={(e) => Boards.actionSelectBoard(e.target.value)}
                >
                  {Boards.list.map((b) => {
                    return (
                      <option key={b.id} value={b.id}>
                        {b.title}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <Button variant="contained" color="error" size="large" onClick={() => Boards.actionClearClosedTasks()}>Clear Closed Tasks</Button>
            </Box>
          </Grid>
          <Grid item>
            <User {...Users?.me} />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default observer(Header);
