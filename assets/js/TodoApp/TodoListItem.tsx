import React, { useCallback, useState, ChangeEvent } from "react";
import TodoItem from "./types/TodoItem";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const TOGGLE_TODO_ITEM = gql`
  mutation($id: ID!) {
    toggleTodoItem(id: $id) {
      id
      isCompleted
    }
  }
`;

const UPDATE_TODO_ITEM = gql`
  mutation updateTodoItem($id: ID!, $content: String!) {
    updateTodoItem(id: $id, content: $content) {
      id
      content
    }
  }
`;

const TodoListItem = ({ id, content, isCompleted }: TodoItem) => {
  const [text, setText] = useState(content);
  const [toggleItem] = useMutation(TOGGLE_TODO_ITEM);
  const [updateItem] = useMutation(UPDATE_TODO_ITEM);
  const handleToggle = useCallback(() => {
    toggleItem({ variables: { id } });
  }, [id, toggleItem]);
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newText = e.target.value;
      setText(newText);
    },
    [setText]
  );
  const onBlur = useCallback(() => {
    updateItem({ variables: { id, content: text } });
  }, [text, updateItem]);

  return (
    <div className="todo_item">
      <button
        className={`todo_item__toggle ${
          isCompleted ? "todo_item__toggle--completed" : ""
        }`}
        onClick={handleToggle}
      />
      <input
        className="todo_item__content"
        value={text}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default TodoListItem;
