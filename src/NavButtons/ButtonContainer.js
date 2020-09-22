import React from 'react';
import  Button from './Button';

const ButtonContainer = ({buttons}) => {
return(
    <div className='Buttons'>
        {buttons.map(button => <div key={button.id}><Button label={button.Label} destination={button.Destination}/></div>)}
    </div>
) 
}

export default ButtonContainer;