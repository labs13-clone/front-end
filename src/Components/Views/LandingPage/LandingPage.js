import React, { useState } from "react";
import landing1 from "../../../images/landing1.svg";
import landing2 from "../../../images/landing2.svg";
import landing3 from "../../../images/landing3.svg";
import testimonial1 from "../../../images/testimonials1.png";
import testimonial2 from "../../../images/testimonials2.png";
import testimonial3 from "../../../images/testimonials3.png";
import daniel from "../../../images/daniel.PNG";

require("./LandingPage.css");

const LandingPageContent = (props) => {
  const [classes, setClasses] = useState("landing-page__start-btn");

  const login = () => props.auth.login();

  function scrollFunction() {
    var y = window.scrollY;
    if (y >= 300) {
      setClasses("landing-page__start-btn show");
    } else {
      setClasses("landing-page__start-btn");
    }
  }

  window.addEventListener("scroll", scrollFunction);

  return (
    <div className="landing-container">
      <div className="landing-page__start">
        <h3 className={classes}>
          <span onClick={login}>Challenge Yourself</span>
        </h3>
      </div>
      <div className="top-content">
        <div className="top-content-left">
          <h1>ChallengeJS</h1>
          <h2>Achieve mastery through challenge</h2>
          <p>
            ChallengeJS is the best platform to help you enhance your skills,
            expand your knowledge, and prepare for technical interviews.
          </p>
        </div>
        <button onClick={login}>Come Challenge Yourself</button>
      </div>
      <div className="content-cards">
        <div className="card">
          <div>
            <h2>Take Code Challenges</h2>
            <p>
              Improve your Javascript skills by challenging yourself with our
              diverse set of code challenges! We have numerous challenges
              searchable by difficulty and topics.
            </p>
          </div>
          <img src={landing1} />
        </div>
        <div className="card">
          <img src={landing2} />
          <div>
            <h2>Create Your Own Challenges</h2>
            <p>
              Challenge others by writing your own Javascript challenges. Our
              easy to use interface makes it simple to create new challenges,
              and share them with your friends.
            </p>
          </div>
        </div>
        <div className="card">
          <div>
            <h2>Gain Experience Points</h2>
            <p>
              Track your progress by earning experience points, challenge
              yourself by competing with others, and show off your ranking to
              your peers.
            </p>
          </div>
          <img src={landing3} />
        </div>
      </div>
      <div className="landingContent">
        <h3 className="testimonials-header">Testimonials</h3>
        <div className="cta testimonials">
          <div className="testimonial-card card-sm">
            <div>
              <img src={testimonial1} />
            </div>
            <h3>Eileen Cuevas</h3>
            <p>
              ChallengeJS goes beyond teaching basic syntax and instead teaches
              its users how to think like programmers. Great start I love the
              look and content thus far.
            </p>
          </div>
          <div className="testimonial-card card-sm">
            <div>
              <img src={testimonial3} />
            </div>
            <h3>Kai Lovingfoss</h3>
            <p>
              Coding is a critical skill in today's world filled with
              technology, and will also be a valuable skill in the other job
              market. ChallengeJS is by far the best way to improve your skills!
            </p>
          </div>
          <div className="testimonial-card card-sm">
            <div>
              <img src={testimonial2} />
            </div>
            <h3>Nedim Omerovic</h3>
            <p>
              ChallengeJS is my favorite site to practice coding challenges. I
              have learned a lot from completing them.
            </p>
          </div>
        </div>
      </div>

      <div className="content-cards">
        <h2 className="about-card__heading">Meet Our Team</h2>
        <div className="about-cards">
          <div className="about-card">
            <img
              src="https://avatars0.githubusercontent.com/u/30749439?s=460&v=4"
              className="about-card__img"
            />
            <h3 className="about-card__name">Anubhav Bhambri</h3>
            <p className="about-card__title">Web Developer</p>
            <a
              className="about-card__link"
              href="https://github.com/Anubhav311"
              target="_blank"
            >
              <i className="fab fa-github-square about-card__i"></i>
            </a>
          </div>

          <div className="about-card">
            <img
              src="https://avatars2.githubusercontent.com/u/43450021?s=460&v=4"
              className="about-card__img"
            />
            <h3 className="about-card__name">Chase Fulks</h3>
            <p className="about-card__title">Software Engineer</p>
            <a
              className="about-card__link"
              href="https://github.com/chasefulks"
              target="_blank"
            >
              <i className="fab fa-github-square about-card__i"></i>
            </a>
          </div>

          <div className="about-card">
            <img src={daniel} className="about-card__img" />
            <h3 className="about-card__name">Daniel Mendez</h3>
            <p className="about-card__title">Software Engineer</p>
            <a
              className="about-card__link"
              href="https://github.com/dan2014"
              target="_blank"
            >
              <i className="fab fa-github-square about-card__i"></i>
            </a>
          </div>

          <div className="about-card">
            <img
              src="https://avatars3.githubusercontent.com/u/40373184?s=460&v=4"
              className="about-card__img"
            />
            <h3 className="about-card__name">Lidiia Gallagher</h3>
            <p className="about-card__title">Software Engineer</p>
            <a
              className="about-card__link"
              href="https://github.com/Lidiia92"
              target="_blank"
            >
              <i className="fab fa-github-square about-card__i"></i>
            </a>
          </div>

          <div className="about-card">
            <img
              src="https://avatars1.githubusercontent.com/u/43946230?s=460&v=4"
              className="about-card__img"
            />
            <h3 className="about-card__name">William Connatser</h3>
            <p className="about-card__title">Software Engineer</p>
            <a
              className="about-card__link"
              href="https://github.com/WilliamConnatser"
              target="_blank"
            >
              <i className="fab fa-github-square about-card__i"></i>
            </a>
          </div>

          <div className="about-card">
            <img src="/Sepi Profile Photo.jpg" className="about-card__img" />
            <h3 className="about-card__name">Sepi Khoshgoftar</h3>
            <p className="about-card__title">UX Designer</p>
            <a
              className="about-card__link"
              href="https://www.linkedin.com/in/sepi-khoshgoftar/"
              target="_blank"
            >
              <i className="fab fa-linkedin about-card__i"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandingPageContent;
