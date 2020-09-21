import React from 'react';
import  Button from './Button';

const ButtonContainer = ({buttons}) => {
return(
    <div id='Buttons'>
        {buttons.map(button => <div key={button.id}><Button label={button.Label} destination={button.Destination}/></div>)}
    </div>
) 
}

export default ButtonContainer;