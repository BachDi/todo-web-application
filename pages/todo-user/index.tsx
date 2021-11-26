import React, { useEffect, useState } from 'react'

import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'
import { useStores } from 'stores'
import { observer } from 'mobx-react'
import Todo from 'components/Todo'
import { Form } from 'react-bootstrap'
import dayjs from 'dayjs'

function TodoUser() {
  const { taskStore, authStore, projectStore } = useStores()
  const [projectId, setProjectId] = useState('')
  const { tasks } = taskStore
  const { user } = authStore
  const { projects } = projectStore
  function getDate(todo: ITask) {
    return {
      startDate: dayjs(todo?.startDate).toDate(),
      dueDate: dayjs(todo?.dueDate).toDate()
    }
  }

  async function addTodo(todo: ITask) {
    await taskStore.addTask({ ...todo, projectId, ...getDate(todo), assigneeTo: user.id, createdBy: user.id })
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
  useEffect(() => {
    authStore.getMyUser()
    projectStore.getList()
  }, [])

  async function fetchData() {
    if (user?.id) {
      await taskStore.getList({
        where: { assigneeTo: user.id },
        include: [{ relation: 'project' }, { relation: 'assignee' }]
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  return (
    <div className="todo-app">
      <h1>Project Name</h1>
      <Form.Select
        className="select-list"
        aria-label="Default select example"
        onChange={(event) => setProjectId(event.target.value)}
      >
        <option>Select Project</option>
        {Array.isArray(projects) &&
          projects.map((project) => {
            return (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            )
          })}
      </Form.Select>
      <h1>{`Add task to Project`}</h1>
      <FormTodo onSubmit={addTodo} />
      <Todo todoList={tasks} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} />
    </div>
  )
}

export default observer(TodoUser)
