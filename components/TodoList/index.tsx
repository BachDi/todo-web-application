import React from 'react'
import Todo from '../Todo'
import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'
import { useStores } from 'stores'
import { observer } from 'mobx-react'

export interface IToDoListProps {
  projectId: string
}

function TodoList(props: IToDoListProps) {
  const { projectId } = props
  const { taskStore } = useStores()
  const { tasks } = taskStore

  function getDate(todo: ITask) {
    return {
      startDate: new Date(todo?.startDate ?? '') || new Date(),
      dueDate: new Date(todo?.dueDate ?? '') || new Date()
    }
  }

  const addTodo = (todo: ITask) => {
    taskStore.addTask({ ...todo, projectId, ...getDate(todo) })
  }

  const updateTodo = (todoId: string, todoData: ITask) => {
    taskStore.editTask(todoId, { ...todoData, ...getDate(todoData) })
  }

  const removeTodo = (id: string) => {
    updateTodo(id, { isDeleted: true })
  }

  const completeTodo = (id: string) => {
    updateTodo(id, { status: 'done' })
  }

  return (
    <>
      <h1>{`Add task to Project`}</h1>
      <FormTodo onSubmit={addTodo} />
      <Todo todoList={tasks} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
    </>
  )
}

export default observer(TodoList)
