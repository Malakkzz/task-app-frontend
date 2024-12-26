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
//   GroupTasksButton,
  Header,
  Input,
  Select,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TaskTable,
} from "./styles";
export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    taskName: "",
    assignee: "",
    dueDate: "",
    issueDate: "",
    hoursSpent: 0,
    project: "",
    difficulty: "Easy",
  });

  
  
  

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
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: tasks.length + 1,
        issueDate: new Date().toLocaleDateString(),
      },
    ]);
    setNewTask({
      taskName: "",
      assignee: "",
      dueDate: "",
      issueDate: "",
      hoursSpent: 0,
      project: "",
      difficulty: "Easy",
    });
    setShowForm(false); // Hide the form after task is added
  };
  // Toggle form visibility
  const toggleForm = () => {
    setShowForm(!showForm);
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
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.taskName}</TableCell>
            <TableCell>{task.assignee}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell>{task.issueDate}</TableCell>
            <TableCell>{task.hoursSpent}</TableCell>
            <TableCell>{task.project}</TableCell>
            <TableCell>{task.difficulty}</TableCell>
          </TableRow>
        ))}
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
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Select>
              <Button type="submit">Add Task</Button>
            </AddTaskForm>
          </FormPopup>
        </>
      )}
    </Container>
  );
}
