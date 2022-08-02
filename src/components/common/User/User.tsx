import { Avatar } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { IUser } from "../../../store/userStore";

const User = (user: IUser) => {
  return (
    <Box display="flex" alignItems="center">
      <Avatar src={user?.avatar} alt={user?.name} />
      <span style={{ padding: 5 }}>{user?.name}</span>
    </Box>
  );
};

export default User;
