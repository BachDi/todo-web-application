import React, { useState } from 'react';
import Todo from '../Todo';
import FormTodo from 'components/FormTodo';
import { ITask } from 'interfaces/task';

function TodoList() {
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const addTodo = (todo: ITask) => {
    const newTodoList = [...todoList, todo];
    setTodoList(newTodoList);
    console.log(...todoList);
  };

  const updateTodo = (todoId: string, newValue) => {
    setTodoList(prev => prev.map(item => (item.id === todoId ? newValue : item)));
  };

  const removeTodo = (id: string) => {
    const removedArr = [...todoList].map(todo => {
      if (todo.id === id) {
        todo.isDeleted = true
      }
      return todo;
    });
    setTodoList(removedArr);
  };

  const completeTodo = (id: string) => {
    let updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        todo.status = 'done';
      }
      return todo;
    });
    setTodoList(updatedTodoList);
  };

  return (
    <>
      <h1>{`What's the task?`}</h1>
      <FormTodo onSubmit={addTodo} />
      <Todo
        todoList={todoList}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
