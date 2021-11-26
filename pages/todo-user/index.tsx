import React, { useEffect, useState } from 'react'

import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'
import { useStores } from 'stores'
import { observer } from 'mobx-react'
import Todo from 'components/Todo'
import { Form } from 'react-bootstrap'

function TodoUser() {
  const { taskStore, authStore, projectStore } = useStores()
  const [projectId, setProjectId] = useState('')
  const { tasks } = taskStore
  const { user } = authStore
  const { projects } = projectStore
  function getDate(todo: ITask) {
    return {
      startDate: new Date(todo?.startDate ?? '') || new Date(),
      dueDate: new Date(todo?.dueDate ?? '') || new Date()
    }
  }

  const addTodo = (todo: ITask) => {
    taskStore.addTask({ ...todo, projectId, ...getDate(todo), assigneeTo: user.id, createdBy: user.id })
    user?.id && taskStore.getList({ where: { assigneeTo: user.id }, include: [{ relation: 'project' }] })
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
  useEffect(() => {
    authStore.getMyUser()
    projectStore.getList()
  }, [])

  useEffect(() => {
    if (user?.id) {
      taskStore.getList({ where: { assigneeTo: user.id }, include: [{ relation: 'project' }] })
    }
  }, [user])

  return (
    <div className="todo-app">
      <h1>Project Name</h1>
      <Form.Select
        className="mt-2"
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
