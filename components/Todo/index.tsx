import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit, TiInputChecked } from 'react-icons/ti'
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

  const submitUpdate = (value) => {
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

  return (
    <>
      <div className="todo-row">
        <div>Task Name</div>
        <div>Description</div>
        <div>Project Name</div>
        <div>Assignee</div>
        <div>Actions</div>
      </div>
      {Array.isArray(todoList) && todoList.length > 0
        ? todoList.map((todo) => (
            <div className={todo.status === 'done' ? 'todo-row complete' : 'todo-row'} key={todo.id}>
              <div>{todo.name}</div>
              <div>{todo.description}</div>
              <div>{todo?.project?.name ?? ''}</div>
              <div>{todo?.assignee?.name ?? ''}</div>
              <div className="icons">
                <TiInputChecked onClick={() => completeTodo(todo?.id ?? '')} />
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
          ))
        : 'There is no task is assigned to you'}
    </>
  )
}

export default Todo
