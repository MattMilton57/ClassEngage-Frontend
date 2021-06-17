import React from 'react';

const PhoneFooter = () => {

    return(
        <div className="phone-footer">
            <div className="phone-footer__text">
                Class Engage was built by Matt Milton. It was initially concieved and created as a final project for the Flatiron School Full Stack Software Engineering Bootcamp, Seattle Campus, 2020.
            </div>
            <div className="phone-footer__links">
                <div className="phone-footer__resume">
                    <a href="">
                        <div className="">
                            Future Resume Link
                        </div>
                    </a>
                </div>
                <div className="phone-footer__github">
                    <a href="https://github.com/MattMilton57/ClassEngage-Frontend">
                        <div className="">
                            github frontend
                        </div>
                    </a>
                </div>

                <div className="phone-footer__github">
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
export default PhoneFooter