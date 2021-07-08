import React from 'react';

const PhoneFooter = () => {

    return(
        <div className="phone-footer">
            <div className="phone-footer__text">
                Class Engage was built by Matt Milton. It was initially concieved and created as a final project for the Flatiron School Full Stack Software Engineering Bootcamp, Seattle Campus, 2020. 
                For employment inqueries, Matt can be reached at 
                    <div className="phone-footer__text-email">
                        MattMilton57@gmail.com
                    </div>            
            </div>
            <div className="phone-footer__links">
                {/* <div className="phone-footer__resume">
                    <a href="">
                        <div className="">
                            Future Resume Link
                        </div>
                    </a>
                </div> */}
                <div className="phone-footer__github">
                    <a className="phone-footer__github-link" href="https://github.com/MattMilton57/ClassEngage-Frontend">
                        <span >
                            github frontend
                        </span>
                    </a>
                </div>

                <div className="phone-footer__github">
                    <a className="phone-footer__github-link" href="https://github.com/MattMilton57/classEngageDeploy-backendAPI">
                        <div>
                            github backend API
                        </div>
                    </a>
                </div>
            </div>
        </div>
    ) 
}
export default PhoneFooter