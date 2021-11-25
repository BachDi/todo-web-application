import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import '../index.css'

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const onSubmit = (data) => {
    console.log(data);
    history.push("/login");
  };
  // console.log(watch("name")); // watch input value by passing the name of it

  return (
    <div className="form">
    <h1>Signup Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <>
          <label className='todo-label'>Name: </label>
          <br/>
          <input
            value={input}
            onChange={handleChange}
            name='name'
            className='todo-input'
            ref={inputRef}
          />
          <br/>
          <label className='todo-label'>Description: </label>
          <br/>
          <input
            value={input}
            onChange={handleChange}
            name='description'
            className='todo-input'
            ref={inputRef}
          />
          <br/>
          <label className='todo-label'>Start Date: </label>
          <br/>
          <input
            value={input}
            onChange={handleChange}
            name='startDate'
            type='date'
            className='todo-input'
            ref={inputRef}
          />
          <br/>
          <label className='todo-label'>Due Date: </label>
          <br/>
          <input
            value={input}
            onChange={handleChange}
            name='dueDate'
            type='date'
            className='todo-input'
            ref={inputRef}
          />
          <br/>
          <label className='todo-label'>Active: </label>
          <br/>
          <input
            onChange={handleChange}
            value='true'
            name='isActive'
            type='checkbox'
            className='todo-input'
            ref={inputRef}
          />
          <br/>
          <label className='todo-label'>Priority: </label>
          <br/>
          <input
            value='low'
            onChange={handleChange}
            name='priority'
            type='radio'
            ref={inputRef}
            id='low'
          />
          <label htmlFor='low' className='todo-label'>Low</label>
          <input
            value='normal'
            onChange={handleChange}
            name='priority'
            type='radio'
            ref={inputRef}
            id='normal'
          />
          <label htmlFor='normal' className='todo-label'>Normal</label>
          <input
            value='high'
            onChange={handleChange}
            name='priority'
            type='radio'
            ref={inputRef}
            id='high'
          />
          <label htmlFor='high' className='todo-label'>High</label>
          <br/>
          <label className='todo-label'>Status: </label>
          <br/>
          <input
            value='todo'
            onChange={handleChange}
            name='text'
            type='radio'
            ref={inputRef}
            id='todo'
          />
          <label htmlFor='todo' className='todo-label'>Todo</label>
          <input
            value='doing'
            onChange={handleChange}
            name='text'
            type='radio'
            ref={inputRef}
            id='doing'
          />
          <label htmlFor='doing' className='todo-label'>Doing</label>
          <input
            value='done'
            onChange={handleChange}
            name='text'
            type='radio'
            ref={inputRef}
            id='done'
          />
          <label htmlFor='done' className='todo-label'>Done</label>
          <br/>
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      </form>
    </div>
  );
};

export default SignupForm;
