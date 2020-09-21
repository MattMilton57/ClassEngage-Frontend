import React from 'react';
import { Link } from 'react-router-dom';

const Teacher = ({name, id, whoAmI}) => {
return(
    
        <div key={id} id='Teacher' onClick={e => whoAmI(id)}>
            <Link to="/selectClass">
                {name}
            </Link>
        </div>

) 
}

export default Teacher;

{/* <Link to="/classlist">
<button type="button">
    class list
</button>
</Link> */}