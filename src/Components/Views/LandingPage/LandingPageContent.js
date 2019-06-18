import React from "react";
import landing1 from '../../../images/landing1.svg';
import landing2 from '../../../images/landing2.svg';
import landing3 from '../../../images/landing3.svg';
import testimonial1 from '../../../images/testimonials1.png';
import testimonial2 from '../../../images/testimonials2.png';
import testimonial3 from '../../../images/testimonials3.png';
import logo from '../../../images/Logo.svg';
require('./LandingPage.css')


const LandingPageContent = props => {

    const login = () => props
        .auth
        .login();

    return (
        <div className="landingContainer">
            <div className="landingContent">
                <div className="cta">
                    <header className="header">
                        <img src={logo} />
                    </header>
                    <div className="topContent">
                        <h2>Achieve mastery through challenge</h2>
                        <div className="topText">
                            <p>
                                Clone Coding is the best platform to help you enhance your skills, expand your
                                knowledge, and prepare for technical interviews.
                            </p>

                            <button onClick={login}>Join to Challenge</button>
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
                <div className="landingContent">
                    <h3 className="testimonials-header">Testimonials</h3>
                    <div className="cta testimonials">
                        <div className="testimonial-card card-sm">
                            <div>
                                <img src={testimonial1}/>
                            </div>
                            <h3>Eileen Cuevas</h3>
                            <p>ChallengeJS goes beyond teaching basic syntax and instead teaches its users how to think like programmers. Great start I love the look and content thus far.</p>
                        </div>
                        <div className="testimonial-card">
                            <div>
                            <img src={testimonial3}/>
                            </div>
                            <h3>Kai Lovingfoss</h3>
                            <p>I am a teacher and I believe coding is an excellent way to teach critical thinking and problem-solving skills. Use this site as a homework, a center, or in a lab setting. Activities are self-paced, so differentiation is easy. However, it is still a good idea, if possible, to seat a more experienced computer user with one who is less experienced. Explain to students that coding is a critical skill in today's world filled with technology and will also be a valuable skill in the other job market.</p>
                        </div>
                        <div className="testimonial-card card-sm">
                        <div>
                            <img src={testimonial2}/>
                            </div>
                            <h3>Nedim Omerovic</h3>
                            <p>It is my favorite site to practice problems, learned a lot from it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LandingPageContent;