import { CardContent, Typography } from "@mui/material";
import React from "react";
import { ITask } from "../../../store/sectionStore";
import User from "../../common/User/User";
import useStore from "../../../hooks/useStore";

const Task = React.memo((task: ITask) => {
  
  const { Users } = useStore();
  const user = Users.users.find((u) => u.id == task.assigneeID);

  return (
    <CardContent>
      <Typography color="textPrimary" gutterBottom style={{ fontSize: 18 }}>
        {task?.title}
      </Typography>
      <Typography color="textPrimary" gutterBottom>
        {task?.description}
      </Typography>
      {user != undefined && <User {...user} />}
    </CardContent>
  );
})

export default Task;
