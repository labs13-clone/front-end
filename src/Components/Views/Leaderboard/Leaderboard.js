import React from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RankCard from './RankCard';

import './Leaderboard.css';

const Leaderboard = (props) => {

    const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-content">
                <div className="leaderboard-header">
                    <div className="stars-left">
                        <FontAwesomeIcon icon="star" className="star"/>
                        <FontAwesomeIcon icon="star" className="star star__middle"/>
                        <FontAwesomeIcon icon="star" className="star"/>
                    </div>

                    <h3>Leaderboard</h3>

                    <div className="stars-right">
                        <FontAwesomeIcon icon="star" className="star"/>
                        <FontAwesomeIcon icon="star" className="star star__middle"/>
                        <FontAwesomeIcon icon="star" className="star"/>
                    </div>
                </div>

                <div className="leaderboard-ranks">
                    {testArr.map((card, index) => <RankCard card={card} index={index}/>)}
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;