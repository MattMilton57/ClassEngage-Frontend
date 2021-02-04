import React from 'react';
import  Button from './Button';
import { Link } from 'react-router-dom';

const ButtonContainer = ({buttons, onLogOut}) => {
    
    // const handleClick = (e) => {
    //     e.preventDefault()
    //     console.log('clicked')
    //     onLogOut()
    // }

return(
    <div className='Buttons'>
        {buttons.map(button => <div key={button.id}><Button label={button.Label} destination={button.Destination}/></div>)}
        {/* <div> <button onClick={onLogout}>Log Out</button></div>   */}
        <div> <button onClick={onLogOut}><Link to={'/'}>Log Out</Link></button></div>  

    </div>
) 
}

export default ButtonContainer;