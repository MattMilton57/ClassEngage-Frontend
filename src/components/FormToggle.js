import React from 'react';
import sprite from "../img/sprite.svg";

const FormToggle = () =>{
return(
    <span className="form-toggle">
    <svg className="form-toggle-icon">
            <use href={sprite + "#icon-cross"} ></use>
        </svg>
    </span>
)
}
export default FormToggle;