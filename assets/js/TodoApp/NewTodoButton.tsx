import React from "react";
import Icon from "./NewTodoButton/icon";

interface Props {
  onClick(): void;
}

const NewTodoButton = ({ onClick }: Props) => {
  return (
    <button className="new_todo_button" onClick={onClick}>
      <span className="new_todo_button__icon">
        <Icon />
      </span>
      New Todo
    </button>
  );
};

export default NewTodoButton;
