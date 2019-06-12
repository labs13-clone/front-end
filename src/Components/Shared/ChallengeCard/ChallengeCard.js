import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './ChallengeCard.css';

const ChallengeCard = (props) => {

    const [difficulty, setDifficulty] = useState('easy');

    function convirtToAString () {
        
            if(props.challenge.difficulty >= 1 && props.challenge.difficulty <=33) {
                setDifficulty('easy');
            }
    
            if(props.challenge.difficulty >= 34 && props.challenge.difficulty <=66) {
                setDifficulty('meduim');
            }
    
            if(props.challenge.difficulty >= 35 && props.challenge.difficulty <=100) {
                setDifficulty('hard');
        }

    }
    return (
        <Link to={`/challenges/${props.challenge.id}`}>
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
                    <div>{difficulty}</div>
                </div>
            </div>
        </Link>
    );
}

export default ChallengeCard;