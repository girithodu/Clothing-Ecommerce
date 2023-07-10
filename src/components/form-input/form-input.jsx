import React, { useRef } from "react";
import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  //otherProps is an object with the remaining props

  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default FormInput;
