import { Card } from "@mui/material";
import { observer } from "mobx-react-lite";
import React from "react";
import { Draggable, DraggingStyle, NotDraggingStyle } from "react-beautiful-dnd";
import { ISection } from "../../../store/sectionStore";
import Task from "./../Task/Task";

function getItemStyle(draggableStyle: DraggingStyle | NotDraggingStyle | undefined) {
  return {
    padding: 9,
    marginBottom: 8,
    ...draggableStyle
  }
};

function Column( section: ISection ) {
  return (
    <div>
      {section?.tasks?.map((task, index) => {
        return (
          <Draggable draggableId={task.id} key={task.id} index={index}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style = {getItemStyle(provided.draggableProps.style)}
              >
                <Task {...task} />
              </Card>
            )}
          </Draggable>
        );
      })}
    </div>
  );
}

export default observer(Column);