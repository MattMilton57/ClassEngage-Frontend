import React from 'react';

const InfoBox = ({text, data}) => {

const handleData = () => {
    if (!data){
        return (<div>Loading</div>)
    }else{
        return(

             <div className="info-box__data">
                {data}
            </div>

        )
    }
}

    return(
        <div className="info-box">

            <div className="info-box__text">
                {text}
            </div>

            {handleData()}

        </div>
    ) 
}
export default InfoBox