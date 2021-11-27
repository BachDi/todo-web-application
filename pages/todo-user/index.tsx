import React, { useEffect, useState } from 'react'

import FormTodo from 'components/FormTodo'
import { ITask } from 'interfaces/task'
import { useStores } from 'stores'
import { observer } from 'mobx-react'
import Todo from 'components/Todo'
import { Form } from 'react-bootstrap'
import dayjs from 'dayjs'
import omit from 'lodash/omit'

function TodoUser() {
  const { taskStore, authStore, projectStore, userStore } = useStores()
  const [projectId, setProjectId] = useState('')
  const { tasks } = taskStore
  const { user } = authStore
  const { userDetail } = userStore
  const { projects } = projectStore
  function getDate(todo: ITask) {
    return {
      startDate: dayjs(todo?.startDate).toDate(),
      dueDate: dayjs(todo?.dueDate).toDate()
    }
  }

  async function addTodo(todo: ITask) {
    await taskStore.addTask({
      ...omit(todo, ['assignee', 'project', 'parent', 'startDate', 'dueDate']),
      projectId,
      ...getDate(todo),
      assigneeTo: user.id
    })
    fetchData()
  }

  async function updateTodo(todoId: string, todoData: ITask) {
    await taskStore.editTask(todoId, {
      ...omit(todoData, ['assignee', 'project', 'parent', 'startDate', 'dueDate']),
      ...getDate(todoData),
      updatedAt: new Date()
    })
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
  useEffect(() => {
    authStore.getMyUser()
    projectStore.getList()
  }, [])

  async function fetchData() {
    if (user?.id) {
      // TODO: filter task in joined projects
      // await userStore.getDetail(user.id, {
      //   include: [
      //     {
      //       relation: 'projectUsers',
      //       scope: {
      //         include: [
      //           {
      //             relation: 'project',
      //             scope: {
      //               include: [
      //                 {
      //                   relation: 'tasks'
      //                   // scope: {
      //                   //   where: { isDeleted: { neq: true } },
      //                   //   include: [{ relation: 'project' }, { relation: 'assignee' }, { relation: 'parent' }]
      //                   // }
      //                 }
      //               ]
      //             }
      //           }
      //         ]
      //       }
      //     }
      //   ]
      // })

      await taskStore.getList({
        where: {
          isDeleted: { neq: true },
          // Users only see task is created/assignee by/to them. Or task is created by other user.
          // Can not see task is created by admin that assign to other users.
          // This may be a bug. Cause task is get from all instead of by joined project.
          or: [{ assigneeTo: user.id }, { createdBy: user.id }, { isCreatedByAdmin: false }]
        },
        include: [{ relation: 'project' }, { relation: 'assignee' }, { relation: 'parent' }]
      })
    }
  }

  useEffect(() => {
    fetchData()
  }, [user])

  // TODO: get task in joined projects
  // useEffect(() => {
  //   if (userDetail) {
  //     const tasks = getValidArray(userDetail?.projectUsers).map((projectUser) => {
  //       return getValidArray(projectUser?.project?.tasks)
  //     })
  //     taskStore.setTasks(flatten(tasks))
  //   }
  // }, [userDetail])

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
      <FormTodo onSubmit={addTodo} todoList={tasks} projectId={projectId} />
      <Todo
        projectId={projectId}
        todoList={tasks}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        unCompleteTodo={unCompleteTodo}
      />
    </div>
  )
}

export default observer(TodoUser)
