import React from 'react';
import { Link } from 'react-router-dom';


const Button = ({label, destination}) => {
return(
    <button className='button'>
        <Link to={destination}>
            {label}
        </Link>
    </button>
) 
}
export default Button;