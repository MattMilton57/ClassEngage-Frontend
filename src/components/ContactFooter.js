import React from 'react';

const ContactFooter = ({}) => {

    return(
        <div className="navBar__profile">
            <div className="navBar__profile-links">
                <div className="navBar__profile-text">
                    Class Engage was built by Matt Milton. It was initially concieved and created as a final project for the Flatiron School Full Stack Software Engineering Bootcamp, Seattle Campus, 2020.
                </div>
                <div className="navBar__profile-resume">
                    <a href="">
                        <div className="">
                            Future Resume Link
                        </div>
                    </a>
                </div>
                <div className="navBar__profile-github">
                    <a href="https://github.com/MattMilton57/ClassEngage-Frontend">
                        <div className="">
                            github frontend
                        </div>
                    </a>
                </div>
                <div className="navBar__profile-specs">
                    <a href="https://github.com/MattMilton57/classEngageDeploy-backendAPI">
                        <div className="">
                            github backend API
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default ContactFooter