import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import './ChallengeCard.css';

const ChallengeCard = (props) => {

    const [difficulty, setDifficulty] = useState('Easy');

    useEffect(() => {
        const level = props.challenge.difficulty;
        convirtToAString(level);
    }, []);

    function convirtToAString (level) {
        
            if(level >= 1 && level <=33) {
                setDifficulty('Easy');
            }
    
            if(level >= 34 && level <=66) {
                setDifficulty('Medium');
            }
    
            if(level >= 67 && level <=100) {
                setDifficulty('Hard');
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
                        <div className="category">{props.challenge.categories[0].name}</div>
                    </div>
                    <div>{difficulty}</div>
                </div>
            </div>
        </Link>
    );
}

export default ChallengeCard;