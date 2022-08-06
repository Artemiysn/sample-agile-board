import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import useStore from "../../../hooks/useStore";
import { Box, Grid, Typography, Paper, Button } from "@mui/material";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "../Column/Column";
import NewTaskDialog from "../NewTaskDialog/NewTaskDialog";

function getListStyle(isDraggingOver: boolean) {
  return {
    backgroundColor: isDraggingOver ? "lightblue" : "lightgray",
    padding: 8,
    minHeight: 500,
  };
}

function Dashboard() {

  const { Boards } = useStore();
  const [newTaskToSection, setNewTaskToSection] = useState<null | string>(null);

  const closeDialog = useCallback(() => {
    setNewTaskToSection(null);
  }, [setNewTaskToSection]);

  const onDragEnd = useCallback(
    (event: DropResult) => {
      const { source, destination, draggableId: taskId } = event;
      if (destination == undefined) return null;
      const sourceId = source.droppableId;
      const destinationId = destination.droppableId;
      const destinationIndex = destination.index;
      Boards.active?.moveTask(
        taskId,
        sourceId,
        destinationId,
        destinationIndex
      );
    },
    [Boards]
  );

  return (
    <Box p={2}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={3}>
          {Boards.active?.sections?.map((section) => {
            return (
              <Grid item key={section.id} xs>
                <Paper>
                  <Box
                    p={1}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h5">{section?.title}</Typography>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setNewTaskToSection(section.id)}
                    >
                      Add
                    </Button>
                  </Box>
                  <Droppable droppableId={section.id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={getListStyle(snapshot.isDraggingOver)}
                        >
                          <Column {...section} />
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </DragDropContext>
      <NewTaskDialog
        {...{
          open: Boolean(newTaskToSection),
          sectionId: newTaskToSection,
          handleClose: closeDialog,
        }}
      />
    </Box>
  );
}

export default observer(Dashboard);
