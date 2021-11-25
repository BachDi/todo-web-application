import React, { useState } from 'react';
import TodoForm from '../TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import FormTodo from 'components/FormTodo';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    description: "",
    dueDate: "",
    isActive: "",
    name: "",
    startDate: "",
  });

  const submitUpdate = value => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      description: "",
      dueDate: "",
      isActive: "",
      name: "",
      startDate: "",
    });
  };

  if (edit.id) {
    return <FormTodo edit={edit} onSubmit={submitUpdate} />
  }

  return todos.map((todo, index) => (
    <div
      className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
      key={index}
    >
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.name}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, name: todo.name, description: todo.description, dueDate: todo.dueDate, isActive: todo.isActive, startDate: todo.startDate, })}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Todo;
