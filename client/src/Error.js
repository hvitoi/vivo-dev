import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="ui container">
      <h1>Ocorreu algum problema.</h1>
      <Link to={'/'}>Voltar ao formulário</Link>
    </div>
  );
};

export default Error;
