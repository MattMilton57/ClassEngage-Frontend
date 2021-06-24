import React from 'react';
const ContactFooter = ({}) => {
    return(
        <div className="navBar__profile">
            <div className="navBar__profile-links">
                <div className="navBar__profile-text">
                    Class Engage was built by Matt Milton. It was initially concieved and created as a final project for the Flatiron School Full Stack Software Engineering Bootcamp, Seattle Campus, 2020. 
                    For employment inqueries, Matt can be reached at 
                        <div className="navBar__profile-text-email">
                            MattMilton57@gmail.com
                        </div>
                </div>
                <div className="navBar__profile-github">
                    <a className="navBar__profile-github-link" href="https://github.com/MattMilton57/ClassEngage-Frontend">
                        <span >
                            github frontend
                        </span>
                    </a>
                </div>
                <div className="navBar__profile-github">
                    <a className="navBar__profile-github-link" href="https://github.com/MattMilton57/classEngageDeploy-backendAPI">
                        <div>
                            github backend API
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}
export default ContactFooter