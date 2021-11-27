import React, { useEffect } from 'react'
import Todo from '../Todo'
import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'
import { useStores } from 'stores'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'

export interface IToDoListProps {
  projectId: string
}

function TodoList(props: IToDoListProps) {
  const { projectId } = props
  const { taskStore, authStore } = useStores()
  const { tasks } = taskStore
  const { user } = authStore
  function getDate(todo: ITask) {
    return {
      startDate: dayjs(todo?.startDate).toDate(),
      dueDate: dayjs(todo?.dueDate).toDate()
    }
  }

  async function addTodo(todo: ITask) {
    await taskStore.addTask({ ...todo, projectId, ...getDate(todo), createdBy: user.id })
    fetchData()
  }

  async function updateTodo(todoId: string, todoData: ITask) {
    await taskStore.editTask(todoId, { ...todoData, ...getDate(todoData), updatedAt: new Date() })
    fetchData()
  }

  async function removeTodo(id: string) {
    updateTodo(id, { isDeleted: true })
  }

  async function completeTodo(id: string) {
    updateTodo(id, { status: 'done' })
  }

  async function unCompleteTodo(id: string) {
    updateTodo(id, { status: 'doing' })
  }
  async function fetchData() {
    await taskStore.getList({
      where: { isDelete: { neq: true }, projectId },
      include: [{ relation: 'project' }, { relation: 'assignee' }, { relation: 'parent' }]
    })
  }

  useEffect(() => {
    fetchData()
  }, [projectId])

  return (
    <>
      <h1>{`Add task to Project`}</h1>
      <FormTodo onSubmit={addTodo} projectId={projectId} todoList={tasks} />
      <Todo
        todoList={tasks}
        projectId={projectId}
        completeTodo={completeTodo}
        unCompleteTodo={unCompleteTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  )
}

export default observer(TodoList)
