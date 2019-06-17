import React from "react";
import landing1 from '../../../images/landing1.svg';
import landing2 from '../../../images/landing2.svg';
import landing3 from '../../../images/landing3.svg';
require('./LandingPage.css')


const LandingPageContent = props => {

    const login = () => props
        .auth
        .login();

    return (
        <div className="landingContainer">
            <div className="landingContent">
                <header>
                    <h1>Clone Coding</h1>
                    <div>
                        <button onClick={login}>Sign In / Register</button>
                    </div>
                </header>
                <div className="topContent">
                    <h2>Achieve mastery through challenge</h2>
                    <div className="topText">
                        <p>
                            Clone Coding is the best platform to help you enhance your skills, expand your
                            knowledge, and prepare for technical interviews.
                        </p>
                        <div className="topButtons">
                            <button>Continue with Google</button>
                            <button>Continue with Github</button>
                        </div>
                    </div>
                </div>
                <div className="content-cards">
                    <div className="content-cards__centered">
                        <div className="card">
                            <div>
                                <h2>Take Code Challenges</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                </p>
                            </div>
                            <img src={landing1} />
                        </div>
                        <div className="card">
                            <img src={landing2}/>
                            <div>
                                <h2>Create Your Own Challenges</h2>
                                <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                </p>
                            </div>
                        </div>
                        <div className="card">
                            <div>
                                <h2>Earn XP For Your Progress</h2>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                </p>
                            </div>
                            <img src={landing3} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LandingPageContent;