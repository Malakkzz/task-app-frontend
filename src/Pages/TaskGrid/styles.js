import styled from "styled-components";
export const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

export const GridHeader = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  padding: 10px 0;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ddd;

  span {
    flex-shrink: 0;
    padding: 0 10px;
    text-align: center;
    cursor: ew-resize;
    position: relative;

    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 5px;
      cursor: ew-resize;
    }

    &:last-child {
      &:after {
        display: none;
      }
    }
  }
`;

export const GridItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;

  &:last-child {
    border-bottom: none;
  }

  span {
    flex-shrink: 0;
    padding: 0 10px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &:last-child {
      border-right: none;
    }
  }
`;
