import React from "react";
import client from "./client";
import { ApolloProvider } from "@apollo/react-hooks";

const TodoApp = () => {
  return (
    <ApolloProvider client={client}>
      <h1>Hello from React!</h1>
    </ApolloProvider>
  );
};

export default TodoApp;
