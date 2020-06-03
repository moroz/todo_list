import React from "react";
import Icon from "./NewTodoButton/icon";

interface Props {}

const NewTodoButton = ({}: Props) => {
  return (
    <div className="new_todo_button">
      <span className="new_todo_button__icon">
        <Icon />
      </span>
      New Todo Item
    </div>
  );
};

export default NewTodoButton;
