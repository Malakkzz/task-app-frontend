import styled from "styled-components";
import { IoCloseCircleOutline } from "react-icons/io5";

export const AddTaskButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  position: fixed;
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
  backdrop-filter: blur(10px);
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
    color: #333;
  }
`;
export const FormHeader = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;
