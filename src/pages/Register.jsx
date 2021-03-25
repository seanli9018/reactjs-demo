import React, { useState } from 'react';

// import redux
import {connect} from 'react-redux';

// import component
import Button from '../components/Button';
import TextInput from '../components/input/TextInput';

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';


function Register(props) {
  // for form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmedPassword: ""
  })

  // for form fields validations.
  const [errors, setErrors] = useState({});

  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const { locale } = props;
  const pageText = useLanguagePageText(locale);

  // handle email input change function
  function handleEmailChange(e) {
    // deep copy current state data
    let formDataObj = JSON.parse(JSON.stringify(formData));
    // change copied data
    formDataObj.email = e.target.value;
    // setState the changed copy data to state
    setFormData(formDataObj);
  }

  // handle password input change function
  function handlePasswordChange(e) {
    // deep copy current state data
    let formDataObj = JSON.parse(JSON.stringify(formData));
    // change copied data
    formDataObj.password = e.target.value;
    // setState the changed copy data to state
    setFormData(formDataObj);
  }

  // handle email input change function
  function handleConfirmedPasswordChange(e) {
    // deep copy current state data
    let formDataObj = JSON.parse(JSON.stringify(formData));
    // change copied data
    formDataObj.confirmedPassword = e.target.value;
    // setState the changed copy data to state
    setFormData(formDataObj);
  }

  //validate field
  function validateField(...field) {
    // deep copy errors state
    let errorsObj = JSON.parse(JSON.stringify(errors));

    // email field validate
    if(field.length === 0 || field.indexOf('email') >= 0){
      let re = /^\w+[\w-]+@\w+[\w-]+(\.[-\w]+)+$/;
      if(!formData.email) { // if no email input
        errorsObj.email = pageText.signUpValidateMsg ? pageText.signUpValidateMsg[0] : '';
      }else if (!re.test(formData.email)){ // if there is email and NOT pass the reg test
        errorsObj.email = pageText.signUpValidateMsg ? pageText.signUpValidateMsg[1] : '';
      }else { //if there is email input and pass the reg test
        errorsObj.email = "";
      }
    }

    // password field validate
    if(field.length === 0 || field.indexOf('password') >= 0){
      // password has to be 6-15 in length, no Space
      // password needs to include at least one letter, capital letter, number, and special character.
      let regArray = [/^\S{6,15}$/, /[A-Z]/, /[a-z]/, /[0-9]/, /[!@#$%^&*)(_\-=?/<>.,+|~`]/];
      let testResult = regArray.every(e => e.test(formData.password));
      if(!formData.password) { // if no password input
        errorsObj.password = pageText.signUpValidateMsg ? pageText.signUpValidateMsg[2] : '';
      }else if(!testResult){ // if the password NOT pass the reg test.
        errorsObj.password = pageText.signUpValidateMsg ? pageText.signUpValidateMsg[3] : '';
      }else{ //if there is email input
        errorsObj.password = "";
      }
    }

    // confirmed password field validate
    if(field.length === 0 || field.indexOf('confirmedPassword') >= 0){
      if(!formData.confirmedPassword) { // if no confirm password input
        errorsObj.confirmedPassword = pageText.signUpValidateMsg ? pageText.signUpValidateMsg[4] : '';
      } else { //if confirm password looks good
        errorsObj.confirmedPassword = "";
      }
    }

    //matching password and confirm password
    if(field.length === 0 || field.indexOf('matchPassword') >= 0) {
      if (formData.confirmedPassword !== formData.password) { // if not matching
        errorsObj.confirmedPassword = pageText.signUpValidateMsg ? pageText.signUpValidateMsg[5] : '';
      } else { //if confirm password looks good
        errorsObj.confirmedPassword = "";
      }
    }

    // set error state
    setErrors(errorsObj);

    // once click submit btn, validate errorsObj.
    for (let k in errorsObj) {
      if(!!errorsObj[k]){
        return false; // if there is item in errorsObj: Not pass
      }
    }
    return true; // if there is NO item in errorObj: Passed;
  }

  // handle form submit
  function onSubmit() {
    // run validate func, it validates all fields when no parameters passing in;
    const validateResult = validateField();

    // do something once passed or NOT passed.
    if(validateResult){
      React.$auth.setUserAuth(formData.email); // set auth;
      props.history.push('/') // redirect to home page;
      React.$notice.success(pageText.signUpNoticeMsg[0],
        pageText.signUpNoticeMsg[1], 6)
    }else{
      React.$notice.error(pageText.signUpNoticeMsg[2],
        pageText.signUpNoticeMsg[3], 6)
    }
  }

  // render virtual element
  return (
    <div className="register-wrapper">
      <div className="register-container">
        <div>
          <h3>{pageText.signUpTitle || ""}</h3>
        </div>
        <form className="general-form">
          <TextInput
            inputTitle={pageText.signUpInputTitle ? pageText.signUpInputTitle[0] : ""}
            value={formData.email}
            onChange={(e) => handleEmailChange(e)}
            onBlur={() => validateField("email")}
          />
          <span className="input-error">{errors.email || ""}</span>
          <TextInput
            inputTitle={pageText.signUpInputTitle ? pageText.signUpInputTitle[1] : ""}
            value={formData.password}
            inputType="password"
            onChange={(e) => handlePasswordChange(e)}
            onBlur={() => validateField("password", "matchPassword")}
          />
          <span className="input-error">{errors.password || ""}</span>
          <TextInput
            inputTitle={pageText.signUpInputTitle ? pageText.signUpInputTitle[2] : ""}
            value={formData.confirmedPassword}
            inputType="password"
            onChange={(e) => handleConfirmedPasswordChange(e)}
            onBlur={() => validateField("confirmedPassword", "matchPassword")}
          />
          <span className="input-error">{errors.confirmedPassword || ""}</span>
          <Button showBtn={true} btnClass="sign-up-btn" value={pageText.signUpSubmitBtn || ""} onClickFunction={() => onSubmit()}/>
        </form>
      </div>
    </div>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

// export component
export default connect(mapStateToProps, null)(Register);