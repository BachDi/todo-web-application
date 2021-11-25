import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit } from 'react-icons/ti'
import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'

export interface ITodoProps {
  todoList: ITask[]
  completeTodo: (id: string) => void
  removeTodo: (id: string) => void
  updateTodo: (id: string, todoData: ITask) => void
}
const Todo = (props: ITodoProps) => {
  const { todoList, completeTodo, removeTodo, updateTodo } = props
  const [edit, setEdit] = useState<ITask>({
    id: undefined,
    description: '',
    isActive: true,
    name: ''
  })

  const submitUpdate = value => {
    if (edit?.id) {
      updateTodo(edit.id, value)
      setEdit({
        id: undefined,
        description: '',
        isActive: true,
        name: ''
      })
    }
  }

  if (edit.id) {
    return <FormTodo edit={edit} onSubmit={submitUpdate} />
  }

  function handleClickComplete() {
    if (edit?.id) {
      completeTodo(edit.id)
    }
  }

  return (
    <>
      {todoList.map((todo, index) => (
        <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
          <div key={todo.id} onClick={handleClickComplete}>
            {todo.name}
          </div>

          <div key={todo.id} onClick={handleClickComplete}>
            {todo.description}
          </div>

          <div key={todo.id} onClick={handleClickComplete}>
            Project Name
          </div>

          <div className="icons">
            <RiCloseCircleLine onClick={() => removeTodo(todo?.id ?? '')} className="delete-icon" />
            <TiEdit
              onClick={() =>
                setEdit({
                  id: todo.id,
                  name: todo.name,
                  description: todo.description,
                  dueDate: todo.dueDate,
                  isActive: todo.isActive,
                  startDate: todo.startDate
                })
              }
              className="edit-icon"
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default Todo
