import styled from "styled-components";
export const AddTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f9f9f9;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;
export const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 16px;
  background-color: #f9f9f9;

  &:focus {
    border-color: #4caf50;
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 12px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;