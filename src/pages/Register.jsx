import React, { useState } from 'react';
import PropTypes from 'prop-types'

// import component
import Button from "../components/Button";
import TextInput from "../components/input/TextInput";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [errors, setErrors] = useState({});

  // handle email input change function
  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  // handle password input change function
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // handle email input change function
  function handleConfirmedPasswordChange(e) {
    setConfirmedPassword(e.target.value);
  }

  //validate field
  function validateField(...field) {
    // deep copy errors state
    let errorsObj = JSON.parse(JSON.stringify(errors));
    // email field validate
    if(field.indexOf('email') >= 0){
      if(!email) { // if no email input
        errorsObj.email = '* Email is required.';
      }else { //if there is email input
        errorsObj.email = "";
      }
    }
    // password field validate
    if(field.indexOf('password') >= 0){
      if(!password) { // if no password input
        errorsObj.password = '* password is required.';
      }else { //if there is email input
        errorsObj.password = "";
      }
    }
    // confirmed password field validate
    if(field.indexOf('confirmedPassword') >= 0){
      if(!confirmedPassword) { // if no confirm password input
        errorsObj.confirmedPassword = '* confirm password is required.';
      } else { //if confirm password looks good
        errorsObj.confirmedPassword = "";
      }
    }

    //matching password and confirm password
    if(field.indexOf('matchPassword') >= 0){
      if(confirmedPassword !== password) { // if not matching
        errorsObj.confirmedPassword = '* password and confirm password is not matching.';
      } else { //if confirm password looks good
        errorsObj.confirmedPassword = "";
      }
    }

    // set error state
    setErrors(errorsObj);
  }

  // handle form submit
  function onSubmit(e) {
    e.preventDefault();
    console.log({
      email: email,
      password: password,
      confirmedPassword: confirmedPassword
    });
  }

  // render virtual element
  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div>
          <h3>Sign Up</h3>
        </div>
        <form onSubmit={(e)=>{onSubmit(e)}} className="general-form">
          <TextInput
            inputTitle="Email"
            value={email}
            onChange={(e) => handleEmailChange(e)}
            onBlur={(e) => validateField("email")}
          />
          <span className="input-error">{errors.email || ""}</span>
          <TextInput
            inputTitle="Password"
            value={password}
            inputType="password"
            onChange={(e) => handlePasswordChange(e)}
            onBlur={(e) => validateField("password", "matchPassword")}
          />
          <span className="input-error">{errors.password || ""}</span>
          <TextInput
            inputTitle="Confirm Password"
            value={confirmedPassword}
            inputType="password"
            onChange={(e) => handleConfirmedPasswordChange(e)}
            onBlur={(e) => validateField("confirmedPassword", "matchPassword")}
          />
          <span className="input-error">{errors.confirmedPassword || ""}</span>
          <Button showBtn={true} btnClass="sign-up-btn" value="Sign Up" onClickFunction={() => {
            alert("clicked")
          }}/>
          {/*<button type="submit">Submit</button>*/}
        </form>
      </div>
    </div>
  )
}

// specify Button component prop types
Register.propTypes = {
}

export default Register;