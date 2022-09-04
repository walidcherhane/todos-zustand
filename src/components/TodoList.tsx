import * as React from "react";
import { Button, Input, Flex, Checkbox, Heading } from "@chakra-ui/react";
import useStore from "../store";

function TodoListItems() {
  const store = useStore();

  return (
    <>
      {store.todos?.map((todo) => (
        <Flex pt={2} key={todo.id}>
          <Checkbox onClick={() => store.toggleTodo(todo.id)} />
          <Input
            mx={2}
            value={todo.text}
            onChange={(evt) => store.updateTodo(todo.id, evt.target.value)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
            }}
          />
          <Button onClick={() => store.removeTodo(todo.id)}>Delete</Button>
        </Flex>
      ))}
    </>
  );
}

function TodoList() {
  return (
    <>
      <Heading>Todo List</Heading>
      <TodoListItems />
    </>
  );
}

export default TodoList;
