import { sendRequest } from "../api";

export async function getAllTasks() {
  return await sendRequest("get", "/task");
}

export async function createTask(data) {
  return await sendRequest("post", "/task/create", data);
}

export async function reorderTask(data) {
  return await sendRequest("post", "/task/reorder", data);
}
