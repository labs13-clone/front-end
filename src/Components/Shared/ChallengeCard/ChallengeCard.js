import React from 'react';
import './ChallengeCard.css';

const ChallengeCard = () => {
    return (
        <div className="challenge-wrapper">
            <div className="header-flex">
                <h3>Jibba Jabba challenge</h3>
                <h3>+</h3>
            </div>
            <p>
                You've got chickens (2 legs), cows (4 legs) and pigs (4 legs) on your farm.
                Return the total number of legs on your farm.
            </p>
            <div className="header-flex">
                <div>
                    <button className="category">Math</button>
                    <button className="category">Algorithms</button>
                </div>
                <div>Very Easy</div>
            </div>
        </div>
    );
}

export default ChallengeCard;