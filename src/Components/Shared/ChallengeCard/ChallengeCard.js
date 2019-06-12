import React from 'react';
import './ChallengeCard.css';

const ChallengeCard = (props) => {
    return (
        <div className="challenge-wrapper">
            <div className="header-flex">
                <h3>{props.challenge.title}</h3>
                <h3>+</h3>
            </div>
            <p>
                {props.challenge.description}
            </p>
            <div className="header-flex">
                <div>
                    <button className="category">Math</button>
                    <button className="category">Algorithms</button>
                </div>
                <div>{props.challenge.difficulty}</div>
            </div>
        </div>
    );
}

export default ChallengeCard;