import React from 'react';
import PropTypes from 'prop-types'

function Button(props) {
  // get props
  const { showBtn, value, onClickFunction, btnClass }= props;

  // render virtual element
  return (
    <>
      <input
        type="button"
        className={"btn " + (btnClass ? btnClass : "")}
        value={value}
        style={{display: showBtn ? "block" : "none"}}
        onClick={() => onClickFunction()}
      />
    </>
  )
}

// specify Button component prop types
Button.propTypes = {
  showBtn: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  onClickFunction: PropTypes.func.isRequired
}

export default Button;