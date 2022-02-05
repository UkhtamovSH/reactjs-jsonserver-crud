import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import FormElement from './Form';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const history = useNavigate();

  useEffect(() => {
    getName();
  }, []);

  const getName = async () => {
    return await axios
      .get(`http://localhost:5000/data/${id}`)
      .then((d) => setName(d.data.name));
  };

  const updateName = async (id, name) => {
    return await axios.put(`http://localhost:5000/data/${id}`, name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateName(id, { name })
      .then((res) => {
        setLoading(false);
        setName('');
        toast.success(`${res.data.name} is updated`);
        history('/');
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
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
        </>
      )}
    </div>
  );
};

export default Update;
