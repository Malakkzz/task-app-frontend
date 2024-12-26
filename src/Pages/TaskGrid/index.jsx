import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GridContainer, GridHeader, GridItem } from "./styles";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

const TaskGrid = ({
  columns,
  tasks,
  columnWidths,
  handleResize,
  handleSort,
  handleOnDragEnd,
}) => {
  return (
    <GridContainer>
      <GridHeader>
        {columns.map((col) => (
          <ResizableBox
            key={col.key}
            width={columnWidths[col.key]}
            height={30}
            axis="x"
            resizeHandles={["e"]}
            minConstraints={[50, 30]}
            maxConstraints={[500, 30]}
            onResizeStop={(e, data) => handleResize(col.key, data.size.width)}
          >
            <span
              style={{
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                padding: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleSort(col.key)}
            >
              {col.label}
            </span>
          </ResizableBox>
        ))}
      </GridHeader>

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tasks && tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <GridItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {columns.map((col) => (
                          <span
                            key={col.key}
                            style={{
                              width: columnWidths[col.key],
                              display: "inline-block",
                              textAlign: "center",
                              padding: "5px",
                            }}
                          >
                            {task[col.key]}
                          </span>
                        ))}
                      </GridItem>
                    )}
                  </Draggable>
                ))
              ) : (
                <p>No tasks available</p>
              )}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </GridContainer>
  );
};

export default TaskGrid;
