import React from 'react';
import {Link} from 'react-router-dom';
import {difficultyToString} from '../../../Utility/difficultyToString';
import './ChallengeCard.css';

const ChallengeCard = (props) => {

    const categories = props.challenge.categories.map(cat => <button key={cat.id} className="category">{cat.name}</button>);

    console.log(props.challenge)

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
                        {categories}
                    </div>
                    <div>{difficultyToString(props.challenge.difficulty)}</div>
                </div>
            </div>
        </Link>
    );
}

export default ChallengeCard;