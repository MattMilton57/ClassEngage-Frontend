import React from 'react';
import logo_svg from "../img/logo-hand.svg";
import LogInForm from '../forms/LogInForm';
import RegisterForm from '../forms/RegisterForm';
// import { api } from '../services/api'

const LandingPage = (props) => {
  const {logIn} = props
  // render(){
    return(
      <div class="landing">
        {/* <div className="landing__logo"> */}
          <embed src={logo_svg} alt="Logo" class="landing__logo--box"/>
        {/* </div> */}
          
          <input type="checkbox" class="landing__checkbox testclass landing__checkbox-login" id="login-toggle"/>
          <label for="login-toggle" className="landing__button landing__button--login">Log in</label>

          
          <input type="checkbox" class="landing__checkbox landing__checkbox-register" id="register-toggle"/>
          <label for="register-toggle" className="landing__button landing__button--register">register</label>

          {/* <div className="landing__formbox"> */}

            <LogInForm {...props} logIn={logIn}/>
            <RegisterForm {...props} logIn={logIn}/>
          {/* </div> */}




{/* //// Gradient outline ////// */}
        {/* <div className="landing__buttons">
          <div className="landing__buttons--inner"> 
            <button className="landing__button landing__buttons--inner--log-in">Log in</button>
            <button className="landing__button landing__buttons--inner--register">Register</button>
          </div>
        </div> */}

        

      {/* <div className="register">  
        <RegisterForm {...props} logIn={logIn}/>
      </div> */}
      {/* <br></br>
      <button class='btn' onClick={e=> console.log('test')}>Button for tests</button> */}
      </div>
    )
  // }

}
export default LandingPage