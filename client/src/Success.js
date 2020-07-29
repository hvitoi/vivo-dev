import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div className="ui container">
      <h1>Sucesso!</h1>
      <Link to={'/'}>Voltar ao formulário</Link>
    </div>
  );
};

export default Success;
