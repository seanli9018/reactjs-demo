import React from 'react';
import PropTypes from 'prop-types'

// import component
import Button from "../components/Button";
import TextInput from "../components/input/TextInput";

function Register(props) {
  // get props

  // render virtual element
  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div>
          <h3>Sign Up</h3>
        </div>
        <form action="" className="general-form">
          <TextInput inputTitle="Email"/>
          <TextInput inputTitle="Password" inputType="password"/>
          <TextInput inputTitle="Confirm Password" inputType="password"/>
          <Button showBtn={true} btnClass="sign-up-btn" value="Sign Up" onClickFunction={() => {alert("clicked")}}/>
        </form>
      </div>
    </div>
  )
}

// specify Button component prop types
Register.propTypes = {
}

export default Register;