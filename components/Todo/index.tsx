import React, { useState } from 'react'
import { RiCloseCircleLine } from 'react-icons/ri'
import { TiEdit, TiInputChecked, TiInputCheckedOutline } from 'react-icons/ti'
import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'
import { useStores } from 'stores'

export interface ITodoProps {
  todoList: ITask[]
  projectId: string
  completeTodo: (id: string) => void
  unCompleteTodo: (id: string) => void
  removeTodo: (id: string) => void
  updateTodo: (id: string, todoData: ITask) => void
}
const Todo = (props: ITodoProps) => {
  const { taskStore } = useStores()
  const { tasks } = taskStore
  const { todoList, completeTodo, removeTodo, updateTodo, unCompleteTodo, projectId } = props
  const [edit, setEdit] = useState<ITask>({
    id: undefined,
    description: '',
    isActive: true,
    name: ''
  })

  const submitUpdate = (value) => {
    if (edit?.id) {
      updateTodo(edit.id, value)
      setEdit({})
    }
  }

  if (edit.id) {
    return <FormTodo edit={edit} onSubmit={submitUpdate} projectId={projectId} todoList={tasks} />
  }

  return (
    <>
      <div className="todo-row">
        <div>Task Name</div>
        <div>Description</div>
        <div>Project Name</div>
        <div>Assignee</div>
        <div>Parent Task</div>
        <div>Actions</div>
      </div>
      {Array.isArray(todoList) && todoList.length > 0
        ? todoList.map((todo) => (
            <div className={todo.status === 'done' ? 'todo-row complete' : 'todo-row'} key={todo.id}>
              <div>{todo.name}</div>
              <div>{todo.description}</div>
              <div>{todo?.project?.name ?? 'No Project'}</div>
              <div>{todo?.assignee?.name ?? 'No One'}</div>
              <div>{todo?.parent?.name ?? 'No Parent'}</div>
              <div className="icons">
                {todo.status === 'done' ? (
                  <TiInputChecked onClick={() => unCompleteTodo(todo?.id ?? '')} />
                ) : (
                  <TiInputCheckedOutline onClick={() => completeTodo(todo?.id ?? '')} />
                )}
                <RiCloseCircleLine onClick={() => removeTodo(todo?.id ?? '')} className="delete-icon" />
                <TiEdit onClick={() => setEdit(todo)} className="edit-icon" />
              </div>
            </div>
          ))
        : 'There is no task is assigned to you'}
    </>
  )
}

export default Todo
