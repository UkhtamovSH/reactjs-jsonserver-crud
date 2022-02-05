import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Crud from '../crud';
import Update from '../crud/Update';

const Routess = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Crud />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </>
  );
};

export default Routess;
