import React, { useState } from "react";
import {
  AddTaskButton,
  AddTaskForm,
  Backdrop,
  Button,
  CloseIcon,
  Container,
  FormHeader,
  FormPopup,
  Header,
  Input,
  Select,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TaskTable,
} from "./styles";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getAllTasks, reorderTask } from "../../utils/api/tasks";

export default function Home() {
  const [newTask, setNewTask] = useState({
    taskName: "",
    assignee: "",
    dueDate: "",
    issueDate: "",
    hoursSpent: 0,
    project: "",
    difficulty: "EASY",
  });
  const queryClient = useQueryClient();

  const [showForm, setShowForm] = useState(false); // State to toggle form visibility
  // Function to handle task form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };
  // Function to handle task form submission
  const handleAddTask = (e) => {
    e.preventDefault();
    const data = {
      name: newTask.taskName,
      assignee: newTask.assignee,
      dueDate: new Date(newTask.dueDate),
      hours: parseInt(newTask.hoursSpent),
      project: newTask.project,
      difficulty: newTask.difficulty,
    };
    setNewTask({
      taskName: "",
      assignee: "",
      dueDate: "",
      issueDate: "",
      hoursSpent: 0,
      project: "",
      difficulty: "EASY",
    });
    createTaskFn(data);
    setShowForm(false); // Hide the form after task is added
  };
  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const { data: tasksData, isLoading: isGettingTasks } = useQuery({
    queryKey: ["get-all-tasks"],
    queryFn: getAllTasks,
  });
  const { mutate: createTaskFn, isPending: isCreating } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-all-tasks"],
      });
    },
  });

  const { mutate: reorderTaskFn } = useMutation({
    mutationKey: ["reorder-task"],
    mutationFn: reorderTask,
  });

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(tasksData.data);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    queryClient.setQueryData(["get-all-tasks"], {
      data: items,
    });

    reorderTaskFn(
      items.map((item, index) => ({
        id: item.id,
        order: index + 1,
      }))
    );
  };

  return (
    <Container>
      <Header>Task Management</Header>

      <TaskTable>
        <TableHeader>
          <TableHeaderCell>Task Name</TableHeaderCell>
          <TableHeaderCell>Assignee</TableHeaderCell>
          <TableHeaderCell>Due Date</TableHeaderCell>
          <TableHeaderCell>Issue Date</TableHeaderCell>
          <TableHeaderCell>Hours Spent</TableHeaderCell>
          <TableHeaderCell>Project</TableHeaderCell>
          <TableHeaderCell>Difficulty</TableHeaderCell>
        </TableHeader>
        {!isGettingTasks && (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable
              droppableId="tasks"
              isDropDisabled={false}
              isCombineEnabled={false}
            >
              {(provided) => (
                <span {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksData?.data.map((task, index) => {
                    const key = `${index}${task.createdAt}`;
                    return (
                      <Draggable key={key} draggableId={key} index={index}>
                        {(provided) => (
                          <TableRow
                            key={task.id}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TableCell>{task.name}</TableCell>
                            <TableCell>{task.assignee}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>{task.createdAt}</TableCell>
                            <TableCell>{task.hours}</TableCell>
                            <TableCell>{task.project}</TableCell>
                            <TableCell>{task.difficulty}</TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </span>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </TaskTable>

      <AddTaskButton onClick={toggleForm}>Add Task</AddTaskButton>

      {showForm && (
        <>
          <Backdrop />
          <FormPopup>
            <FormHeader>Add New Task</FormHeader>
            <CloseIcon onClick={toggleForm} />
            <AddTaskForm onSubmit={handleAddTask}>
              <Input
                type="text"
                name="taskName"
                placeholder="Task Name"
                value={newTask.taskName}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="assignee"
                placeholder="Assignee"
                value={newTask.assignee}
                onChange={handleInputChange}
                required
              />
              <Input
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                required
              />
              <Input
                type="number"
                name="hoursSpent"
                placeholder="Hours Spent"
                value={newTask.hoursSpent}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="project"
                placeholder="Project"
                value={newTask.project}
                onChange={handleInputChange}
                required
              />
              <Select
                name="difficulty"
                value={newTask.difficulty}
                onChange={handleInputChange}
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </Select>
              <Button type="submit" disabled={isCreating}>
                Add Task
              </Button>
            </AddTaskForm>
          </FormPopup>
        </>
      )}
    </Container>
  );
}
