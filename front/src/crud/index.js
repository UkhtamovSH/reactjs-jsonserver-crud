import React, { useEffect, useState } from 'react';
import { createName, getNames, removeName } from './api';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import FormElement from './Form';
import { toast } from 'react-toastify';
import axios from 'axios';

const Crud = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState([]);

  useEffect(() => {
    getNames();
  }, []);

  const getNames = async () => {
    return await axios
      .get('http://localhost:5000/data')
      .then((name) => setNames(name.data));
  };

  const createName = async (name) => {
    return await axios.post('http://localhost:5000/data', name);
  };

  const removeName = async (id) => {
    return await axios.delete(`http://localhost:5000/data/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createName({ name })
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is created`);
        getNames();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = (id, name) => {
    if (window.confirm('Are you sure wandted to delete')) {
      setLoading(true);
      removeName(id)
        .then((res) => {
          setLoading(false);
          toast.error(`${name} is deleted`);
          getNames();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false);
            toast.error(err.response.data);
          }
        });
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FormElement
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
          {names &&
            names.map((item, index) => {
              const { id, name } = item;
              return (
                <div key={index}>
                  <span>{name}</span>
                  <Link to={`/update/${id}`}>Edit</Link>
                  <span onClick={() => handleRemove(id, name)}>Delete</span>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
};

export default Crud;
