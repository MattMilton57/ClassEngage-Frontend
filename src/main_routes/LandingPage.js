import React from 'react';
import auth from '../services/auth';
import logo_svg from "../img/logo-hand.svg";
import LogInForm from '../forms/LogInForm';
import RegisterForm from '../forms/RegisterForm';
import ContactFooter from "../components/ContactFooter"
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

          <div className="landing-page__content-form">
          <input type="checkbox" className="landing-page__content-form-checkbox" id="landing-page-toggle"/>

            <div className="landing-page__content-form-login">
              <LogInForm {...props} logIn={logIn}/>
            </div>
            <div className="landing-page__content-form-register">
              <RegisterForm {...props} logIn={logIn}/>
            </div>
          </div>
        </div>
        <div className="landing-page__profile">
          <div className="landing-page__profile-text">
              Class Engage was built by Matt Milton. It was initially concieved and created as a final project for the Flatiron School Full Stack Software Engineering Bootcamp, Seattle Campus, 2020.
          </div>

          <div className="landing-page__profile-links">
            <div className="landing-page__profile-resume">
                <a href="https://www.github.com/MattMilton57">
                    <div className="">
                        Resume
                    </div>
                </a>
            </div>

            <div className="landing-page__profile-github">
                <a href="https://www.github.com/MattMilton57">
                    <div className="">
                        github depot
                    </div>
                </a>
            </div>

            <div className="landing-page__profile-specs">

            <a href="https://www.github.com/MattMilton57">
                    <div className="">
                        Project Specifications
                    </div>
                </a>
            </div>
          </div>
        </div>
          
          
          {/* {/* <input type="checkbox" class="landing-page__checkbox testclass landing-page__checkbox-login" id="login-toggle"/>
          <label for="login-toggle" className="landing-page__button landing-page__button--login">Log in</label> */}

          
          {/* <label for="landing-page-toggle" className="landing-page__button landing-page__button--register">register</label>  */}






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