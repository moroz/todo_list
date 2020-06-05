import React, { useState, useCallback } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import TodoItem from "./types/TodoItem";
import TodoListItem from "./TodoListItem";
import NewTodoButton from "./NewTodoButton";
import NewTodoItem from "./NewTodoItem";

interface TodoItemsQueryResult {
  todoItems: TodoItem[];
}
export const GET_TODO_ITEMS = gql`
  {
    todoItems {
      id
      content
      isCompleted
    }
  }
`;
const TodoList = () => {
  const { data } = useQuery<TodoItemsQueryResult>(GET_TODO_ITEMS);
  const [formShowing, setFormShowing] = useState(false);
  const showForm = useCallback(() => {
    setFormShowing(true);
  }, []);
  const hideForm = () => setFormShowing(false);

  return (
    <div className="todo_list">
      <h3 className="todo_list__header">Todo Items</h3>
      <div className="todo_list__list">
        {data?.todoItems?.map((item: TodoItem) => (
          <TodoListItem key={item.id} {...item} />
        ))}
        {formShowing ? <NewTodoItem handleHide={hideForm} /> : null}
      </div>
      <footer className="footer">
        <NewTodoButton onClick={showForm} />
      </footer>
    </div>
  );
};

export default TodoList;
