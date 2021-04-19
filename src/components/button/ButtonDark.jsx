import React from 'react';
import PropTypes from 'prop-types'

function ButtonDark(props) {
  // get props
  const { showBtn, value, onClickFunction, btnClass, fullWidth }= props;

  // render virtual element
  return (
    <>
      <input
        type="button"
        className={"btn " + (btnClass ? btnClass : "")}
        value={value}
        style={{display: showBtn ? "block" : "none", backgroundColor: "#404040", color: "#ffffff", width: fullWidth ? "100%" : "auto"}}
        onClick={onClickFunction}
      />
    </>
  )
}

// specify Button component prop types
ButtonDark.propTypes = {
  showBtn: PropTypes.bool,
  value: PropTypes.string.isRequired,
  btnClass: PropTypes.string,
  fullWidth: PropTypes.bool,
  onClickFunction: PropTypes.func.isRequired
}

ButtonDark.defaultProps = {
  showBtn: true,
  fullWidth: false
}

export default ButtonDark;