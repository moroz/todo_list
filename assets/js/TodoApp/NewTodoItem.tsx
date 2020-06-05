import React, { useState, useCallback, FormEvent, KeyboardEvent } from "react";
import { useMutation } from "@apollo/react-hooks";
import { GET_TODO_ITEMS } from "./TodoList";
import { gql } from "apollo-boost";
import TodoItem from "./types/TodoItem";

interface CreateTodoItemResult {
  newTodo: TodoItem;
}

const CREATE_TODO_ITEM = gql`
  mutation createTodoItem($content: String!) {
    newTodo: createTodoItem(content: $content) {
      id
      isCompleted
      content
    }
  }
`;

interface Props {
  handleHide(): void;
}

const NewTodoItem = ({ handleHide }: Props) => {
  const [content, setContent] = useState("");
  const [createTodoItem] = useMutation<CreateTodoItemResult>(CREATE_TODO_ITEM, {
    update(cache, { data: { newTodo } }) {
      const { todoItems } = cache.readQuery({ query: GET_TODO_ITEMS });
      cache.writeQuery({
        query: GET_TODO_ITEMS,
        data: {
          todoItems: [...todoItems, newTodo]
        }
      });
    }
  });

  const submit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      await createTodoItem({ variables: { content } });
      setContent("");
    },
    [createTodoItem, content]
  );

  const handleBlur = async () => {
    const trimmed = content.trim();
    if (trimmed !== "") await submit();
    handleHide();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleBlur();
    }
  };

  return (
    <form className="todo_item new_todo_item" onSubmit={submit}>
      <button className="todo_item__toggle" />
      <input
        className="todo_item__content"
        value={content}
        onBlur={handleBlur}
        onKeyUp={handleKeyUp}
        autoFocus
        onChange={(e) => setContent(e.target.value)}
      />
    </form>
  );
};

export default NewTodoItem;
