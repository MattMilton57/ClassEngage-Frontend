import React from 'react';
import logo_svg from "../img/logo-hand.svg";
import LogInForm from '../forms/LogInForm';
import RegisterForm from '../forms/RegisterForm';
// import { api } from '../services/api'

const LandingPage = (props) => {
  const {logIn} = props
  // render(){
    return(
      <div className="landing-page">

        <div className="landing-page__content">
          <div className="landing-page__content-logo">
            <embed src={logo_svg} alt="Logo" class="landing-page__content-logo--box"/>
          </div>

          <div className="landing-page__content-login">
            <LogInForm {...props} logIn={logIn}/>
          </div>
        </div>
          
            {/* <RegisterForm {...props} logIn={logIn}/> */}
          
          {/* <input type="checkbox" class="landing-page__checkbox testclass landing-page__checkbox-login" id="login-toggle"/>
          <label for="login-toggle" className="landing-page__button landing-page__button--login">Log in</label>

          
          <input type="checkbox" class="landing-page__checkbox landing-page__checkbox-register" id="register-toggle"/>
          <label for="register-toggle" className="landing-page__button landing-page__button--register">register</label> */}






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