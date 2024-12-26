import React from "react";
import { AddTaskForm, Input, Select, Button } from "./styles";

const TaskForm = ({ newTask, handleInputChange, handleAddTask, isCreating }) => {
  return (
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
      <Select name="difficulty" value={newTask.difficulty} onChange={handleInputChange}>
        <option value="EASY">Easy</option>
        <option value="MEDIUM">Medium</option>
        <option value="HARD">Hard</option>
      </Select>
      <Button type="submit" disabled={isCreating}>
        Add Task
      </Button>
    </AddTaskForm>
  );
};

export default TaskForm;
