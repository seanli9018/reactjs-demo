import React, {useState} from 'react';
import PropTypes from 'prop-types'

//import from antd icon
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons'


function TextInput(props) {
  // get props
  const {inputTitle, inputType, className, value, onChange, onBlur} = props;

  // store initial props.inputType, the state input type can be set to "text"
  const [type, setType] = useState(props.inputType)

  // icon style object ready to use
  const iconStyle = {
    fontSize: "14px",
    position: "absolute",
    right: "0",
    height: "30px",
    marginTop: "8px",
    boxSizing: "border-box",
    color: "#ccc",
    minWidth: "30px"
  }

  // handle eye icon onClick event
  function handleEyeSwitch(){
    if(type === "password") {
      setType("text") // if current type === "password", then we switch it to "text"
    } else {
      setType("password")
    }
  }

  // prepare eyeIconDom, dynamic render based on input type
  // if input type === password, we render eye invisible icon dom, else we render eye icon dom
  const eyeIconDom = (
    <a onClick={()=>{handleEyeSwitch()}}>
      {type === "password" ? <EyeInvisibleOutlined style={iconStyle}/>: <EyeOutlined style={iconStyle} />}
    </a>
  )

  // render
  return (
    <>
      <div style={{position: "relative", marginTop: "15px"}}>
        <label htmlFor={inputTitle}>{inputTitle}</label>
        <input
          type={type}
          className={"text-input " + (className ? className: "")}
          id={inputTitle}
          value={value}
          style={{width: "100%"}}
          onChange={(e) => onChange(e)}
          onBlur={(e) => onBlur(e)}
        />
        {/*If props.inputType is password, we render this icon, if the type is text, we do not render any icon*/}
        {inputType==="password" ? eyeIconDom : null}
      </div>
    </>
  )
}

// specify Button component prop types
TextInput.propTypes = {
  inputTitle: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  inputType: PropTypes.string,
  className: PropTypes.string
}

TextInput.defaultProps = {
  inputType: "text"
}

export default TextInput;