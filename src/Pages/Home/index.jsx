import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getAllTasks, reorderTask } from "../../utils/api/tasks";
import TaskGrid from "./../../Pages/TaskGrid";
import TaskForm from "./../../Pages/TaskForm";
import FilterInput from "./../../Pages/FilterInput";
import {
  AddTaskButton,
  Backdrop,
  FormPopup,
  FormHeader,
  CloseIcon,
} from "./styles";

const Home = () => {
  const initialColumnWidths = {
    taskName: 200,
    assignee: 150,
    dueDate: 150,
    issueDate: 150,
    hoursSpent: 120,
    project: 150,
    difficulty: 100,
  };

  const [columnWidths, setColumnWidths] = useState(initialColumnWidths);
  const [newTask, setNewTask] = useState({
    taskName: "",
    assignee: "",
    dueDate: "",
    issueDate: "",
    hoursSpent: 0,
    project: "",
    difficulty: "EASY",
  });
  const [filters, setFilters] = useState({ assignee: "" });
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: tasksData, isLoading: isGettingTasks } = useQuery({
    queryKey: ["get-all-tasks"],
    queryFn: getAllTasks,
  });

  const { mutate: createTaskFn, isPending: isCreating } = useMutation({
    mutationKey: ["create-task"],
    mutationFn: createTask,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["get-all-tasks"] }),
  });

  const { mutate: reorderTaskFn } = useMutation({
    mutationKey: ["reorder-task"],
    mutationFn: reorderTask,
  });

  const handleResize = (key, newWidth) =>
    setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
  const handleInputChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
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
    setShowForm(false);
  };
  const toggleForm = () => setShowForm(!showForm);

  const columns = [
    { key: "taskName", label: "Task Name" },
    { key: "assignee", label: "Assignee" },
    { key: "dueDate", label: "Due Date" },
    { key: "issueDate", label: "Issue Date" },
    { key: "hoursSpent", label: "Hours Spent" },
    { key: "project", label: "Project" },
    { key: "difficulty", label: "Difficulty" },
  ];

  const filteredTasks = tasksData?.data.filter((task) =>
    task.assignee.toLowerCase().includes(filters.assignee.toLowerCase())
  );

  const handleSort = (column) => {
    // Sorting logic...
  };

  const handleOnDragEnd = (result) => {
    // Drag-and-drop logic...
  };

  return (
    <div>
      <h1>Task Management</h1>
      <FilterInput filters={filters} setFilters={setFilters} />
      <TaskGrid
        columns={columns}
        tasks={filteredTasks || tasksData?.data || []} // Default to an empty array if tasksData is undefined
        columnWidths={columnWidths}
        handleResize={handleResize}
        handleSort={handleSort}
        handleOnDragEnd={handleOnDragEnd}
      />

      <AddTaskButton onClick={toggleForm}>Add Task</AddTaskButton>
      {showForm && (
        <>
          <Backdrop />
          <FormPopup>
            <FormHeader>Add New Task</FormHeader>
            <CloseIcon onClick={toggleForm} />
            <TaskForm
              newTask={newTask}
              handleInputChange={handleInputChange}
              handleAddTask={handleAddTask}
              isCreating={isCreating}
            />
          </FormPopup>
        </>
      )}
    </div>
  );
};

export default Home;
