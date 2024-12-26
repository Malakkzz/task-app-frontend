// Styled components for the Task Page
import styled from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";
export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const TaskTable = styled.div`
  margin-top: 30px;
  display: table;
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.div`
  display: table-row;
  background-color: #f4f4f4;
`;

export const TableHeaderCell = styled.div`
  display: table-cell;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border: 1px solid #ddd;
`;

export const TableRow = styled.div`
  display: table-row;
  cursor: move;
`;

export const TableCell = styled.div`
  display: table-cell;
  padding: 12px;
  border: 1px solid #ddd;
`;

export const AddTaskButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: absolute;
  bottom: 20px;
  right: 20px;

  &:hover {
    background-color: #45a049;
  }
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px); /* Apply background blur */
  z-index: 999;
`;
export const FormPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  width: 400px;
  border-radius: 15px;
  animation: fadeIn 0.3s ease-in-out;
`;

export const CloseIcon = styled(IoCloseCircleOutline)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: black;

  &:hover {
    color: #333; /* Slightly darkened color on hover */
  }
`;
export const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;
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
