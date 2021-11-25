import React, { useState } from 'react';
import TodoForm from '../TodoForm/index.js';
import Todo from '../Todo';
import FormTodo from 'components/FormTodo/index.js';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = todo => {

    const newTodos = [...todos, todo];

    setTodos(newTodos);
    console.log(...todos);
  };

  const updateTodo = (todoId, newValue) => {

    setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = id => {
    const removedArr = [...todos].forEach(todo => {
      if (todo.id === id) {
        todo.isDeleted = true
      }});

    setTodos(removedArr);
  };

  const completeTodo = id => {
    let updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>{`What's the task?`}</h1>
      <FormTodo onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
