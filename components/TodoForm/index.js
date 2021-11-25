import React, { useState, useEffect, useRef } from 'react';

function TodoForm(props) {
  const [input, setInput] = useState(props.edit ? props.edit.value : {});

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    props.onSubmit({
      id: Math.floor(Math.random() * 1000000000) + 1,
      text: input
    });
    setInput({});
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      {props.edit ? (
        <>
          <input
            placeholder='Update your item'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='todo-input edit'
          />
          <button onClick={handleSubmit} className='todo-button edit'>
            Update
          </button>
        </>
      ) : (
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
            name='text'
            type='radio'
            ref={inputRef}
            id='low'
          />
          <label htmlFor='low' className='todo-label'>Low</label>
          <input
            value='medium'
            onChange={handleChange}
            name='text'
            type='radio'
            ref={inputRef}
            id='medium'
          />
          <label htmlFor='medium' className='todo-label'>Medium</label>
          <input
            value='high'
            onChange={handleChange}
            name='text'
            type='radio'
            ref={inputRef}
            id='high'
          />
          <label htmlFor='high' className='todo-label'>High</label>
          <br/>
          <button onClick={handleSubmit} className='todo-button'>
            Add todo
          </button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
