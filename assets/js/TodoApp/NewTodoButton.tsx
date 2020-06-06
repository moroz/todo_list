import React from "react";
import PlusIcon from "./PlusIcon";

interface Props {
  onClick(): void;
}

const NewTodoButton = ({ onClick }: Props) => {
  return (
    <button className="new_todo_button" onClick={onClick}>
      <span className="new_todo_button__icon">
        <PlusIcon />
      </span>
      New Reminder
    </button>
  );
};

export default NewTodoButton;
