import React, { useState } from 'react';
import Todo from '../Todo';
import FormTodo from 'components/FormTodo';
import { ITask } from 'interfaces/task';
import { useStores } from 'stores';

export interface IToDoListProps {
  projectId: string
}

function TodoList(props: IToDoListProps) {
  const { projectId } = props
  const { taskStore } = useStores()
  const { tasks } = taskStore

  const addTodo = (todo: ITask) => {
    taskStore.addTask({...todo, projectId, startDate: new Date(todo?.startDate ?? ''), dueDate: new Date(todo?.dueDate ?? '')})
  };

  const updateTodo = (todoId: string, newValue) => {
    taskStore.editTask(todoId, newValue)
  };

  const removeTodo = (id: string) => {
    updateTodo(id, { isDeleted: true })
  };

  const completeTodo = (id: string) => {
    updateTodo(id, { status: 'done' })
  };

  return (
    <>
      <h1>{`Add task to Project`}</h1>
      <FormTodo onSubmit={addTodo} />
      <Todo
        todoList={tasks}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
