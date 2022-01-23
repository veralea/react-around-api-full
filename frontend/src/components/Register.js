import React from 'react';
import { withRouter  } from 'react-router-dom';
import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.register(e,email, password);
  }

  function redirectToLogin() {
    props.history.push("/signin");
    props.updateHeader("Sign up");
  }

  return (
    <section className='access'>
      <form className='access__form' onSubmit={handleSubmit}>
      <h2 className="access__title">{`${props.title}`}</h2>
      <input type="email" className="access__input" onChange = {handleEmailChange}
        name="email" value={email} placeholder="Email" required />
      <span className="access__error"></span>
      <input type="password" className="access__input" onChange = {handlePasswordChange}
        name="password" value={password} placeholder="Password" required />
      <span className="access__error"></span>
      <button type="submit" name="submit"
          className="button access__button">
          {props.buttonText}
      </button>
      </form>
      <span className="access__link" onClick={redirectToLogin}>
        Already a member? Log in here!
      </span>
    </section>
  );
}
  
export default withRouter(Register);