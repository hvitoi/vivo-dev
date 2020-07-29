import React from 'react';
import axios from 'axios';

import { useForm } from 'react-hook-form'; // Hooks
import history from './history'; // Histórico de navegação

// ---

const Form = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const skills = ['HTML', 'CSS', 'JS', 'Python', 'Django', 'iOS', 'Android'];

  const onSubmit = async (data) => {
    // Exclui campos em branco
    for (let key in data) {
      if (data[key] === '' || data[key] == null) delete data[key];
    }
    // Envia resposta
    try {
      await axios.post('/api', data);
      history.push('/success');
    } catch {
      history.push('/error');
    }
  };

  const renderCheckListOptions = (skill) => {
    return [...Array(11)].map((_, i) => (
      <div key={skill + i} className="form-check form-check-inline">
        <input
          type="radio"
          name={skill.toLowerCase()}
          value={i}
          className="form-check-input"
          ref={register()}
        />
        <label className="form-check-label" htmlFor={skill}>
          {i}
        </label>
      </div>
    ));
  };

  const renderCheckList = (skills) => {
    return skills.map((skill) => (
      <fieldset key={skill + '-group'} className="form-group">
        <legend className="col-form-label pt-0">{skill}</legend>
        {renderCheckListOptions(skill)}
      </fieldset>
    ));
  };

  return (
    <div className="container">
      <h1>Vaga para programador</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Nome completo</label>
          <input
            name="name"
            type="text"
            maxLength="30"
            placeholder="Digite aqui seu nome"
            className="form-control"
            ref={register({ required: true })}
          />
          {errors.name && errors.name.message}
        </div>

        <div className="form-group">
          <label htmlFor="email">Endereço de email</label>
          <input
            name="email"
            type="email"
            placeholder="Digite aqui seu email"
            className="form-control"
            ref={register({
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // validação de email do react-hook-form
                message: 'Endereço de email inválido.'
              }
            })}
          />
          {errors.email && errors.email.message}
        </div>

        <hr />
        <h4>Habilidades técnicas</h4>
        <br />

        {renderCheckList(skills)}

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Form;
