import dayjs from 'dayjs'
import { IUser } from 'interfaces/user'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useStores } from 'stores'
import { getValidArray } from 'utils/common'

const FormTodo = (props) => {
  const { userStore } = useStores()
  const { users } = userStore
  const [usersList, setUsersList] = useState<IUser[]>([])
  const { edit, onSubmit, todoList: tasks, projectId } = props
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset
  } = useForm()
  // const onSubmit = data => {
  //   console.log(data);
  //   setInput(data)
  //   reset()
  // }

  console.log('hello', tasks)

  useEffect(() => {
    userStore.getList({ where: { isDeleted: { neq: true } }, include: [{ relation: 'projectUsers' }] })
  }, [projectId])

  useEffect(() => {
    const validUser: IUser[] = projectId
      ? users.filter((user) =>
          getValidArray(user?.projectUsers).some((projectUser) => projectUser.projectId === projectId)
        )
      : users
    setUsersList(validUser)
  }, [users])

  useEffect(() => {
    reset({
      ...edit,
      startDate: dayjs(edit?.startDate).format('YYYY-MM-DD'),
      dueDate: dayjs(edit?.dueDate).format('YYYY-MM-DD')
    })
  }, [edit])
  return (
    <div className="form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="todo-label">Name: </label>
          <input className="todo-input" {...register('name', { required: true })} />
        </div>
        <div>
          <label className="todo-label">Description: </label>
          <input className="todo-input" {...register('description')} />
        </div>
        <div>
          <label className="todo-label">Select Parent Task: </label>
          <Form.Select className="select-list" aria-label="Default select example" {...register('parentId')}>
            <option value={undefined}>No Parent Task</option>
            {Array.isArray(tasks) &&
              tasks.map((task) => {
                return (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                )
              })}
          </Form.Select>
        </div>
        <div>
          <label className="todo-label">Assign To: </label>
          <Form.Select className="select-list" aria-label="Default select example" {...register('assigneeTo')}>
            <option value={undefined}>No Assign</option>
            {Array.isArray(usersList) &&
              usersList.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user?.name ?? user.username}
                  </option>
                )
              })}
          </Form.Select>
        </div>

        <div>
          <label className="todo-label">Start Date: </label>
          <input className="todo-input" type="date" {...register('startDate')} />
        </div>
        <div>
          <label className="todo-label">Due Date: </label>
          <input className="todo-input" type="date" {...register('dueDate')} />
        </div>
        <div>
          <label className="todo-label">Active: </label>
          <input className="todo-input" type="checkbox" {...register('isActive')} />
        </div>
        <div>
          <label className="todo-label">Priority: </label>
          <input value="low" name="priority" type="radio" id="low" defaultChecked />
          <label htmlFor="low" className="todo-label">
            Low
          </label>
          <input value="normal" name="priority" type="radio" id="normal" />
          <label htmlFor="normal" className="todo-label">
            Normal
          </label>
          <input value="high" name="priority" type="radio" id="high" />
          <label htmlFor="high" className="todo-label">
            High
          </label>
        </div>
        <div>
          <label className="todo-label">Status: </label>
          <input value="todo" name="text" type="radio" id="todo" defaultChecked />
          <label htmlFor="todo" className="todo-label">
            Todo
          </label>
          <input value="doing" name="text" type="radio" id="doing" />
          <label htmlFor="doing" className="todo-label">
            Doing
          </label>
          <input value="done" name="text" type="radio" id="done" />
          <label htmlFor="done" className="todo-label">
            Done
          </label>
        </div>
        <button type="submit" className="todo-button">
          {edit?.id ? 'Update' : 'Add'} todo
        </button>
      </form>
    </div>
  )
}

export default observer(FormTodo)
