import React from 'react';
import { Link } from 'react-router-dom';


const Button = ({label, destination}) => {
return(
    <div id='button'>
        <Link to={destination}>
                <h2>{label}</h2>
        </Link>
    </div>
) 
}
export default Button;