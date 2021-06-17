import React from 'react';
import auth from '../services/auth';
import logo_svg from "../img/logo-hand.svg";
import LogInForm from '../forms/LogInForm';
import RegisterForm from '../forms/RegisterForm';
import PhoneFooter from "../components/PhoneFooter"
import ContactFooter from "../components/ContactFooter"
// import { api } from '../services/api'

const LandingPage = (props) => {
  const {logIn} = props

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
        <PhoneFooter />
      </div>
    </div>
  )
}
export default LandingPage