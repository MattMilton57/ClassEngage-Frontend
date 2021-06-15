import React from 'react';
import logo_svg from "../img/logo-hand.svg";
import sprite from "../img/sprite.svg";
import {Link} from "react-router-dom";

const ContactFooter = ({}) => {

    return(
        // <div >
        //                 <Link to={'https:www.github.com/MattMilton57'}>
        //                     <div className="0">github</div>
        //                     <svg className="navBar__link-list--link-icon">
        //                         <use href={sprite + "#icon-pencil"} ></use>
        //                     </svg>
        //                 </Link>
        // </div>

<div className="navBar__profile">
    <div className="navBar__profile-links">
        <div className="navBar__profile-text">
            Class Engage was built by Matt Milton. It was initially concieved and created as a final project for the Flatiron School Full Stack Software Engineering Bootcamp, Seattle Campus, 2020.
        </div>

        <div className="navBar__profile-resume">
            <a href="https://www.github.com/MattMilton57">
                <div className="">
                    Resume
                </div>
            </a>
        </div>

        <div className="navBar__profile-github">
            <a href="https://www.github.com/MattMilton57">
                <div className="">
                    github depot
                </div>
            </a>
        </div>

        <div className="navBar__profile-specs">

        <a href="https://www.github.com/MattMilton57">
                <div className="">
                    Project Specifications
                </div>
            </a>
        </div>
    </div>
</div>


)
}
export default ContactFooter
{/* <a href="https://www.github.com/MattMilton57">my github</a> */}