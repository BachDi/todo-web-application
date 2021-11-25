import React, { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

const FormTodo = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : '');
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
    reset
  } = useForm()
  // const onSubmit = data => {
  //   console.log(data);
  //   setInput(data)
  //   reset()
  // }
  return (
    <div className="form">
      <form onSubmit={handleSubmit(props.onSubmit)}>
        <div>
          <label className="todo-label">Name: </label>
          <input className="todo-input" {...register('name', { required: true })} />
        </div>
        <div>
          <label className="todo-label">Description: </label>
          <input className="todo-input" {...register('description')} />
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
        <button onClick={handleSubmit} className="todo-button">
          Add todo
        </button>
      </form>
    </div>
  )
}

export default FormTodo
