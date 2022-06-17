
import { observer } from "mobx-react-lite";
import React from "react";
import useStore from "../../hooks/useStore";
import {
  AppBar,
  Box,
  FormControl,
  Grid,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import  User from "../common/User/User";

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
                  style={{ backgroundColor: "white", margin: 10 }}
                  sx={{ m: 1, minWidth: 120 }} size="small"
                  native
                  value={Boards?.active?.id || ""}
                  onChange={(e) => {
                    const id: string = e.target.value;
                    Boards.selectBoard(id);
                  }}
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
