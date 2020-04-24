import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

interface TodoItem {
  id: number | string;
  content: string;
  isCompleted: boolean;
}

interface TodoItemsQueryResult {
  todoItems: TodoItem[];
}

const TodoList = () => {
  const { data, loading } = useQuery<TodoItemsQueryResult>(gql`
    {
      todoItems {
        id
        content
        isCompleted
      }
    }
  `);

  return (
    <div className="todo_list">
      <h3 className="todo_list__header">Todo Items</h3>
      <ul className="todo_list__list">
        {data?.todoItems
          ? data.todoItems.map((item) => (
              <li
                key={item.id}
                className={
                  item.isCompleted
                    ? "todo_list__item todo_list__item--completed"
                    : "todo_list__item"
                }
              >
                {item.content}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default TodoList;
