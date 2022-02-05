import React from 'react';

const FormElement = ({ handleSubmit, name, setName }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='formGroup'>
        <input
          type='text'
          placeholder='Enter name'
          style={{ width: '50%' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />

        <button>Submit</button>
        <button onClick={() => setName('')}>Cancel</button>
      </div>
    </form>
  );
};

export default FormElement;
